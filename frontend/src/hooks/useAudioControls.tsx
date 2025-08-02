// useAudioControls.tsx
import { useEffect, useState, useCallback } from "react";
import type { RefObject } from "react";

export function useAudioControls(audioRef: RefObject<HTMLAudioElement | null>, progressRef: RefObject<HTMLDivElement | null>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(30);

  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    if (audio.readyState >= 1) updateDuration();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [isDragging]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // ✅ ეს დაამატე
    }
  }, [volume]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    console.log("volume:", newVolume); // ✅ აქ უნდა დაიბეჭდოს 0–100
    setVolume(newVolume);
  };


  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const reapetSong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  };


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

  const handleThumbMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !progressRef.current || !audioRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const percent = Math.min(Math.max(moveX / rect.width, 0), 1);
      const newTime = percent * duration;
      setPreviewTime(newTime);
    },
    [isDragging, duration]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !audioRef.current) return;
    setIsDragging(false);
    audioRef.current.currentTime = previewTime;
    setCurrentTime(previewTime);
  }, [isDragging, previewTime]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const progressPercent = ((isDragging ? previewTime : currentTime) / duration) * 100 || 0;

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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