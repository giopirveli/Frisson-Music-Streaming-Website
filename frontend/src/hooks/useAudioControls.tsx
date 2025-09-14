// useAudioControls.tsx
import { useEffect, useState, useCallback } from "react";
import type { RefObject } from "react";

export function useAudioControls(
  audioRef: RefObject<HTMLAudioElement | null>,
  progressRef: RefObject<HTMLDivElement | null>,
    onEnded?: () => void
) {
  /* ─────────────── STATE ─────────────── */
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(30);

  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  /* ─────────────── BASIC EVENTS ─────────────── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;


    const handleEnded = () => {
      // დავასუფთაოთ playing state და მოვუხმოთ შენს კოლბეკს
      setIsPlaying(false);
      onEnded?.();
    };


    const updateTime = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audio.readyState >= 1) updateDuration();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [isDragging, audioRef]);

  /* ─────────────── VOLUME ─────────────── */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(Math.max(volume, 0), 100) / 100;
    }
  }, [volume, audioRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(Math.min(Math.max(newVolume, 0), 100));
  };

  /* ─────────────── PLAY / PAUSE ─────────────── */
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // autoplay შეიძლება დაბლოკოს ბრაუზერმა
      }
    } else {
      audio.pause();
    }
  };

  const reapetSong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => { });
  };

  /* ─────────────── PROGRESS CLICK ─────────────── */
  const handleClickProgressBar = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !progressRef.current || duration === 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [audioRef, progressRef, duration]
  );

  /* ─────────────── DRAG SEEK ─────────────── */
  const handleThumbMouseDown = () => {
    setIsDragging(true);
    setPreviewTime(currentTime);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !progressRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const percent = Math.min(Math.max(moveX / rect.width, 0), 1);
      const newTime = percent * duration;
      setPreviewTime(newTime);
    },
    [isDragging, duration, progressRef]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !audioRef.current) return;
    audioRef.current.currentTime = previewTime;
    setCurrentTime(previewTime);
    setIsDragging(false);
  }, [isDragging, previewTime, audioRef]);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  /* ─────────────── AUTOPLAY ON TRACK CHANGE ─────────────── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // როცა src შეიცვლება, თავიდან ჩატვირთე და დაუკარი
    audio.load();
    audio.play().catch(() => {
      // autoplay შეიძლება დაბლოკოს, მაგრამ თუ user interaction უკვე იყო → ჩაირთვება
    });
  }, [audioRef.current?.src]);

  /* ─────────────── DERIVED ─────────────── */
  const progressPercent =
    duration > 0
      ? ((isDragging ? previewTime : currentTime) / duration) * 100
      : 0;

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  // ─────────────── ENDED listener ───────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.(); // თუ გადავეცით, გამოიძახებს
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [audioRef, onEnded]);
  /* ─────────────── API ─────────────── */
  return {
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    formatTime,
    reapetSong,
    volume,
    setVolume,
    handleClickProgressBar,
    handleThumbMouseDown,
    progressPercent,
    isDragging,
    previewTime,
    handleChange,
  };
}
