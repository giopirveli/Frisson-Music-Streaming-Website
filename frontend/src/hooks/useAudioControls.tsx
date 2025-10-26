"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Track } from "@/components/Player/playerType";

type RepeatMode = "off" | "one";

type UseAudioControlsArgs = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
  playlist: Track[];
  initialIndex?: number;
};

type UseAudioControlsReturn = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isDragging: boolean;
  previewTime: number;
  progressPercent: number;

  currentIndex: number;
  currentTrack?: Track;
  nextTrack: () => void;
  prevTrack: () => void;

  isShuffle: boolean;
  toggleShuffle: () => void;

  repeatMode: RepeatMode;
  toggleRepeatMode: () => void;

  isMuted: boolean;
  toggleMute: () => void;

  togglePlay: () => Promise<void> | void;
  handlePlayPause: () => Promise<void> | void;
  handleEnded: () => void;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickProgressBar: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleThumbMouseDown: () => void;

  formatTime: (t: number) => string;
};

export function useAudioControls({
  audioRef,
  progressRef,
  playlist,
  initialIndex = 0,
}: UseAudioControlsArgs): UseAudioControlsReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentTrack = useMemo(
    () => (playlist && playlist.length ? playlist[currentIndex] : undefined),
    [playlist, currentIndex]
  );

  const [isShuffle, setIsShuffle] = useState(false);
  // keep vars to avoid warnings, for future use
  const shuffleBag = useRef<number[]>([]);
  const shuffleHistory = useRef<number[]>([]);

  const isShuffleRef = useRef(isShuffle);
  useEffect(() => {
    isShuffleRef.current = isShuffle;
  }, [isShuffle]);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const makeBag = (len: number, exclude?: number) => {
    const arr = Array.from({ length: len }, (_, i) => i);
    if (exclude != null && len > 1) arr.splice(exclude, 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const forcePlayRef = useRef(false);
  const playReqIdRef = useRef(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !currentTrack) return;

    a.load();

    if (!forcePlayRef.current) return;
    const myId = ++playReqIdRef.current;

    const tryPlay = () => {
      if (playReqIdRef.current !== myId) return;
      a.play().catch(() => {
        /* ignored */
      });
    };

    if (a.readyState >= 2) tryPlay();
    else a.addEventListener("loadeddata", tryPlay, { once: true });

    forcePlayRef.current = false;
    return () => a.removeEventListener("loadeddata", tryPlay);
  }, [audioRef, currentTrack]);

  useEffect(() => {
    if (isShuffle && playlist?.length) {
      shuffleBag.current = makeBag(playlist.length, currentIndexRef.current);
      shuffleHistory.current = [currentIndexRef.current];
    }
  }, [isShuffle, playlist?.length]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => {
      if (!isDragging) setCurrentTime(a.currentTime);
    };
    const onMeta = () => {
      if (!Number.isNaN(a.duration)) setDuration(a.duration);
    };

    if (a.readyState >= 1) onMeta();

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
    };
  }, [audioRef, isDragging]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = Math.min(Math.max(volume, 0), 100) / 100;
  }, [volume, audioRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(Math.min(Math.max(v, 0), 100));
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {
        /* ignored */
      }
    } else {
      a.pause();
    }
  };

  const handlePlayPause = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await togglePlay();
      } catch {
        /* ignored */
      }
    } else {
      a.pause();
      playReqIdRef.current++;
    }
  };

  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const toggleRepeatMode = () => setRepeatMode((m) => (m === "off" ? "one" : "off"));

  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    const next = !isMuted;
    a.muted = next;
    setIsMuted(next);
  };

  const nextTrack = () => {
    if (!playlist?.length) return;
    forcePlayRef.current = true;
    setCurrentIndex((i) => (i + 1) % playlist.length);
  };

  const prevTrack = () => {
    if (!playlist?.length) return;
    forcePlayRef.current = true;
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };

  const toggleShuffle = () => setIsShuffle((on) => !on);

  const handleClickProgressBar = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const a = audioRef.current;
      const bar = progressRef.current;
      if (!a || !bar || duration === 0) return;

      const rect = bar.getBoundingClientRect();
      const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const newTime = percent * duration;

      a.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [audioRef, progressRef, duration]
  );

  const handleThumbMouseDown = () => {
    setIsDragging(true);
    setPreviewTime(currentTime);
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !progressRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      setPreviewTime(percent * duration);
    },
    [isDragging, duration, progressRef]
  );

  const onMouseUp = useCallback(() => {
    const a = audioRef.current;
    if (!isDragging || !a) return;
    a.currentTime = previewTime;
    setCurrentTime(previewTime);
    setIsDragging(false);
  }, [audioRef, isDragging, previewTime]);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  const formatTime = (t: number) => {
    if (!Number.isFinite(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent =
    duration > 0 ? ((isDragging ? previewTime : currentTime) / duration) * 100 : 0;

  const handleEnded = () => {
    const a = audioRef.current;
    if (!a) return;

    if (repeatMode === "one") {
      forcePlayRef.current = true;
      a.currentTime = 0;
      a.play().catch(() => {
        /* ignored */
      });
      return;
    }
    forcePlayRef.current = true;
    nextTrack();
  };

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isDragging,
    previewTime,
    progressPercent,
    currentIndex,
    currentTrack,
    nextTrack,
    prevTrack,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeatMode,
    isMuted,
    toggleMute,
    togglePlay,
    handlePlayPause,
    handleEnded,
    handleChange,
    handleClickProgressBar,
    handleThumbMouseDown,
    formatTime,
  };
}
