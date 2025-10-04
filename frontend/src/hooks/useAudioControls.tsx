"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// საჭიროების მიხედვით მოარგე ბილიკი:
import type { Track } from "@/components/Player/playerType";

type RepeatMode = "off" | "one";

type UseAudioControlsArgs = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
  playlist: Track[];
  initialIndex?: number;
};

type UseAudioControlsReturn = {
  // ಮೂಲ Control-ები
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isDragging: boolean;
  previewTime: number;
  progressPercent: number;

  // ახალი Transport/Queue/Repeat/Mute
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

  // Handlers
  togglePlay: () => Promise<void> | void;
  handlePlayPause: () => Promise<void> | void;
  handleEnded: () => void;

  // Volume / Progress
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickProgressBar: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleThumbMouseDown: () => void;

  // Utils
  formatTime: (t: number) => string;
};

export function useAudioControls({
  audioRef,
  progressRef,
  playlist,
  initialIndex = 0,
}: UseAudioControlsArgs): UseAudioControlsReturn {
  // ======== Base audio state (იქიდან, რაც უკვე გქონდა) ========
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  // ======== Track / Index ========
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentTrack = useMemo(
    () => (playlist && playlist.length ? playlist[currentIndex] : undefined),
    [playlist, currentIndex]
  );

  // ======== Shuffle Queue (bag + history) ========
  const [isShuffle, setIsShuffle] = useState(false);
  const [shuffleBag, setShuffleBag] = useState<number[]>([]);
  const [shuffleHistory, setShuffleHistory] = useState<number[]>([]);

  // Live refs stale-closure-ის თავიდან ასაცილებლად
  const isShuffleRef = useRef(isShuffle);
  useEffect(() => { isShuffleRef.current = isShuffle; }, [isShuffle]);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  // Fisher–Yates ჩანთა
  const makeBag = (len: number, exclude?: number) => {
    const arr = Array.from({ length: len }, (_, i) => i);
    if (exclude != null && len > 1) arr.splice(exclude, 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // ======== Auto-play cancel token ========
  const forcePlayRef = useRef(false);
  const playReqIdRef = useRef(0);

  // src ცვლისას — დატვირთე და თუ მოთხოვნილია, აუტოპლეი მხოლოდ user action-ის შემდეგ
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !currentTrack) return;

    a.load(); // არ ვაძალებთ ავტოპლეის — გადაწყვეტა ქვემოთ

    if (!forcePlayRef.current) return;
    const myId = ++playReqIdRef.current;

    const tryPlay = () => {
      if (playReqIdRef.current !== myId) return;
      a.play().catch(() => {});
    };

    if (a.readyState >= 2) tryPlay();
    else a.addEventListener("loadeddata", tryPlay, { once: true });

    forcePlayRef.current = false;
    return () => a.removeEventListener("loadeddata", tryPlay);
  }, [currentTrack?.audioSrc, audioRef]);

  // playlist-ის ზომის ცვლილებაზე — shuffle ჩანთა განახლდეს
  useEffect(() => {
    if (isShuffle && playlist?.length) {
      setShuffleBag(makeBag(playlist.length, currentIndexRef.current));
      setShuffleHistory([currentIndexRef.current]);
    }
  }, [isShuffle, playlist?.length]);

  // ======== Audio events ========
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => { if (!isDragging) setCurrentTime(a.currentTime); };
    const onMeta = () => { if (!Number.isNaN(a.duration)) setDuration(a.duration); };

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

  // გლობალური volume (0–100 → 0–1)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = Math.min(Math.max(volume, 0), 100) / 100;
  }, [volume, audioRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(Math.min(Math.max(v, 0), 100));
  };

  // ======== Play / Pause ========
  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try { await a.play(); } catch {}
    } else {
      a.pause();
    }
  };

  const handlePlayPause = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try { await togglePlay(); } catch {}
    } else {
      a.pause();
      playReqIdRef.current++; // გააუქმე pending autoplay
    }
  };

  // ======== Repeat ========
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const toggleRepeatMode = () => setRepeatMode((m) => (m === "off" ? "one" : "off"));

  // ======== Mute ========
  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    const next = !isMuted;
    a.muted = next;
    setIsMuted(next);
  };

  // ======== Transport (Next / Prev + Shuffle bag/history) ========
  const nextTrack = () => {
    if (!playlist?.length) return;
    forcePlayRef.current = true;

    if (!isShuffleRef.current) {
      setCurrentIndex((i) => (i + 1) % playlist.length);
      return;
    }

    // Shuffle: ისტორია + ჩანთა
    setShuffleHistory((h) => [...h, currentIndexRef.current]);

    setShuffleBag((bag) => {
      let nextBag = bag ?? [];
      if (playlist.length <= 1) {
        setCurrentIndex(currentIndexRef.current);
        return [];
      }
      if (nextBag.length === 0) {
        nextBag = makeBag(playlist.length, currentIndexRef.current);
      }
      const nextIdx = nextBag[0];
      if (nextIdx == null) {
        setCurrentIndex((i) => (i + 1) % playlist.length);
        return [];
      }
      setCurrentIndex(nextIdx);
      return nextBag.slice(1);
    });
  };

  const prevTrack = () => {
    if (!playlist?.length) return;
    forcePlayRef.current = true;

    if (!isShuffleRef.current) {
      setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
      return;
    }

    setShuffleHistory((h) => {
      if (h.length === 0) {
        setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
        return h;
      }
      const prevIdx = h[h.length - 1];

      // სურვილისამებრ: მიმდინარე ჩავაგდოთ ჩანთის ბოლოში, რომ მომავალში ისევ გამოჩნდეს
      setShuffleBag((bag) => ([...(bag ?? []), currentIndexRef.current]));

      setCurrentIndex(prevIdx);
      return h.slice(0, -1);
    });
  };

  const toggleShuffle = () => {
    setIsShuffle((on) => {
      if (!on) {
        setShuffleBag(makeBag(playlist.length, currentIndexRef.current));
        setShuffleHistory([currentIndexRef.current]);
      } else {
        setShuffleBag([]);
        setShuffleHistory([]);
      }
      return !on;
    });
  };

  // ======== Progress Bar ========
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

  // ======== Format / Percent ========
  const formatTime = (t: number) => {
    if (!Number.isFinite(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent =
    duration > 0 ? ((isDragging ? previewTime : currentTime) / duration) * 100 : 0;

  // ======== Ended Handler (Repeat One / Next) ========
  const handleEnded = () => {
    const a = audioRef.current;
    if (!a) return;

    if (repeatMode === "one") {
      forcePlayRef.current = true;
      a.currentTime = 0;
      a.play().catch(() => {});
      return;
    }
    forcePlayRef.current = true;
    nextTrack();
  };

  return {
    // base
    isPlaying, currentTime, duration, volume,
    isDragging, previewTime, progressPercent,

    // transport / queue
    currentIndex, currentTrack,
    nextTrack, prevTrack,

    // shuffle / repeat / mute
    isShuffle, toggleShuffle,
    repeatMode, toggleRepeatMode,
    isMuted, toggleMute,

    // handlers
    togglePlay,
    handlePlayPause,
    handleEnded,

    // volume / progress
    handleChange,
    handleClickProgressBar,
    handleThumbMouseDown,

    // utils
    formatTime,
  };
}
