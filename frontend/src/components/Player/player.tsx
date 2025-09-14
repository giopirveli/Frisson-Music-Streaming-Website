"use client";

import Style from "./player.module.scss";
import Image from "next/image";
import { useRef, useState, useMemo, useEffect } from "react";
import { useAudioControls } from "@/hooks/useAudioControls";
import HeartBtn from "../HeartBtn/HeartBtn";
import { Track } from "./playerType";


type PlayerProps = {
  playlist: Track[];
  initialIndex?: number;
};

/* ─────────────── Component ─────────────── */
export default function Player({ playlist, initialIndex = 0 }: PlayerProps) {
  /* Refs */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  /* Local UI state */
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false)
  /* Current track index + derived current track */
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentTrack = useMemo(
    () => playlist?.[currentIndex],
    [playlist, currentIndex]
  );

  /* Audio controls (play/pause, time, volume, seeking etc.) */
  const {
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    formatTime,
    reapetSong,
    volume,
    handleClickProgressBar,
    handleThumbMouseDown,
    progressPercent,
    isDragging,
    previewTime,
    handleChange,
  } = useAudioControls(audioRef, progressRef);

  const audio = audioRef.current;

  /* ─────────────── გადასვლის გადმოსვლის შემთხვევაში ჩაირთოს ─────────────── */
  // useEffect(() => {
  //   if (!audio) return;
  //   audio.load()
  //   audio.play()
  // }, [currentIndex]);

  /* ─────────────── Guard: empty playlist ─────────────── */
  if (!playlist || playlist.length === 0) return null;

  /* ─────────────── Next / Prev handlers ─────────────── */
  const nextTrack = () => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
    audio?.play()
  };

  const prevTrack = () => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    audio?.play()

  };
  /* ─────────────── autoPlay ─────────────── */
  const handleEnded = () => {
    nextTrack()
  }
  /* ─────────────── shuffle btn ─────────────── */
  const shufflePLay = () => {
    if (playlist.length <= 1) return; // თუ მხოლოდ ერთი სიმღერაა, არაფერი შეიცვლებაfgf
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * playlist.length);
    }
    setCurrentIndex(newIndex);
  }
  /* ─────────────── isMuted btn ─────────────── */
  const toggleMute = () => {
    const newMuted = !isMuted;
    if (audio) {
      audio.muted = newMuted;
      setIsMuted(!isMuted)
    }
  }
  /* ─────────────── Render ─────────────── */
  return (
    <div className={Style.playerBackgraund} aria-label="Audio Player">
      {/* Cover / background */}
      <div className={Style.musicPhoto}>
        <Image fill alt="image" src={currentTrack?.imageUrl}></Image>
      </div>

      <div className={Style.mainControlBox}>
        <div className={Style.controlBoxesDurection}>
          {/* Left: progress + like */}
          <div className={Style.controlBoxFirstPart}>
            <HeartBtn
              iconColor="gray"
              liked={isLiked}
              onToggle={() => {
                setIsLiked(!isLiked)
              }}
            />

            <div className={Style.rangeControlBox}>
              <span>{formatTime(isDragging ? previewTime : currentTime)}</span>

              <div
                ref={progressRef}
                className={Style.progressBarWrapper}
                onClick={handleClickProgressBar}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={duration || 0}
                aria-valuenow={isDragging ? previewTime : currentTime}
              >
                <div className={Style.progressTrack}>
                  <div
                    className={Style.progressFill}
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div
                    className={Style.progressThumb}
                    style={{ left: `${progressPercent}%` }}
                    onMouseDown={handleThumbMouseDown}
                  />
                </div>
              </div>

              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: info + controls + volume */}
          <div className={Style.controlBoxSecondPart}>
            {/* Track info */}
            <div className={Style.InfoBox}>
              <span>{currentTrack?.title ?? "No Information"}</span>
              <span>{currentTrack?.artistName ?? "No Information"}</span>
            </div>

            {/* Transport controls */}
            <div className={Style.functionalIconsBox}>
              {/* (Optional) Shuffle – ჯერ ფუნქცია არ აქვს, მოგვიანებით */}
              <button className={Style.functionalIconButton} onClick={shufflePLay} aria-label="Shuffle">
                <Image
                  src="/icons/Player/Shuflle.svg"
                  alt="Shuflle"
                  width={24}
                  height={24}
                  onClick={shufflePLay}
                />
              </button>

              {/* Prev */}
              <button
                className={Style.functionalIconButton}
                onClick={prevTrack}
                aria-label="Previous"
              >
                <Image
                  src="/icons/Player/PlayPrevious.svg"
                  alt="PlayPrevious"
                  width={24}
                  height={24}
                />
              </button>

              {/* Play / Pause */}
              <button
                className={Style.PlayPauseButton}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <Image
                  src={isPlaying ? "/icons/Player/Pause.svg" : "/icons/Player/Play.svg"}
                  alt="PlayPause"
                  width={48}
                  height={48}
                />
              </button>

              {/* Next */}
              <button
                className={Style.functionalIconButton}
                onClick={nextTrack}
                aria-label="Next"
              >
                <Image
                  src="/icons/Player/PlayNext.svg"
                  alt="PlayNext"
                  width={24}
                  height={24}
                />
              </button>

              {/* Repeat current track (as-is, შენი ჰუკიდან) */}
              <button
                className={Style.functionalIconButton}
                onClick={reapetSong}
                aria-label="Repeat"
              >
                <Image
                  src="/icons/Player/Repeat.svg"
                  alt="Repeat"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Volume */}
            <div className={Style.volumeControlBox}>
              <button className={Style.functionalIconButton} onClick={toggleMute}>
                <Image
                  src={isMuted ? "/icons/Player/muted.svg" : "/icons/Player/Volume.svg"}
                  alt="Volume icon"
                  width={24}
                  height={24}
                />
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleChange}
                className={Style.slider}
                aria-label="Volume"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${volume}%, #444 ${volume}%, #444 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio element: დინამიკური წყარო აქტიური ტრეკიდან */}
      <audio ref={audioRef} src={currentTrack.audioSrc} preload="metadata" onEnded={handleEnded} />
    </div>
  );
}
console.log((0 - 1 + 4) % 4)