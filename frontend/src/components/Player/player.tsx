"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import Style from "./player.module.scss";
import HeartBtn from "../heartbtn/heartBtn";
import { useAudioControls } from "@/hooks/useAudioControls";
import type { Track } from "./playerType";

type PlayerProps = {
  playlist: Track[];
  initialIndex?: number;
};

export default function Player({ playlist, initialIndex = 0 }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const {
    // state
    isPlaying, currentTime, duration, progressPercent,
    isDragging, previewTime, volume,
    currentTrack,

    // transport
    nextTrack, prevTrack,
    isShuffle, toggleShuffle,
    repeatMode, toggleRepeatMode,
    isMuted, toggleMute,

    // handlers
    handlePlayPause, handleEnded,
    handleChange, handleClickProgressBar, handleThumbMouseDown,

    // utils
    formatTime,
  } = useAudioControls({ audioRef, progressRef, playlist, initialIndex });

  const safeTrack = useMemo(() => currentTrack, [currentTrack]);
  if (!playlist?.length || !safeTrack) return null;

  return (
    <div className={Style.playerBackgraund} aria-label="Audio Player">
      {/* BG / Cover */}
      <div className={Style.musicPhoto}>
        {safeTrack.imageUrl ? (
          <Image fill alt="image" src={safeTrack.imageUrl} />
        ) : (
          <div className={Style.coverFallback} />
        )}
      </div>

      <div className={Style.mainControlBox}>
        <div className={Style.controlBoxesDurection}>
          {/* LEFT — Heart + Progress */}
          <div className={Style.controlBoxFirstPart}>
            <HeartBtn iconColor="gray" liked={false} onToggle={() => { /* lift state if needed */ }} />

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
                  <div className={Style.progressFill} style={{ width: `${progressPercent}%` }} />
                  <div
                    className={Style.progressThumb}
                    style={{ left: `calc(${progressPercent}% - 6px)` }}
                    onMouseDown={handleThumbMouseDown}
                  />
                </div>
              </div>

              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* RIGHT — Info + Transport + Volume */}
          <div className={Style.controlBoxSecondPart}>
            {/* Track info */}
            <div className={Style.InfoBox}>
              <span>{safeTrack.title ?? "No Information"}</span>
              <span>{safeTrack.artistName ?? "No Information"}</span>
            </div>

            {/* Transport */}
            <div className={Style.functionalIconsBox}>
              <button
                className={`${Style.functionalIconButton} ${isShuffle ? Style.shuffleBtnSctived : ""}`}
                onClick={toggleShuffle}
                aria-label="Shuffle"
                title={isShuffle ? "Shuffle: ON" : "Shuffle: OFF"}
                aria-pressed={isShuffle}
                data-active={isShuffle ? "true" : "false"}
              >
                <Image src={"/icons/Player/Shuflle.svg"} alt="Shuffle" width={24} height={24} />
              </button>

              <button className={Style.functionalIconButton} onClick={prevTrack} aria-label="Previous" title="Previous">
                <Image src="/icons/Player/PlayPrevious.svg" alt="Previous" width={24} height={24} />
              </button>

              <button
                className={Style.PlayPauseButton}
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause" : "Play"}
              >
                <Image
                  src={isPlaying ? "/icons/Player/Pause.svg" : "/icons/Player/Play.svg"}
                  alt="Play/Pause"
                  width={48}
                  height={48}
                />
              </button>

              <button className={Style.functionalIconButton} onClick={nextTrack} aria-label="Next" title="Next">
                <Image src="/icons/Player/PlayNext.svg" alt="Next" width={24} height={24} />
              </button>

              <button
                className={`${Style.functionalIconButton} ${repeatMode === "one" ? Style.repeatBtnSctived : ""}`}
                onClick={toggleRepeatMode}
                aria-label="Repeat"
                title={repeatMode === "one" ? "Repeat one" : "Repeat off"}
              >
                <Image src="/icons/Player/Repeat.svg" alt="Repeat" width={24} height={24} />
              </button>
            </div>

            {/* Volume */}
            <div className={Style.volumeControlBox}>
              <button
                className={Style.functionalIconButton}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                title={isMuted ? "Unmute" : "Mute"}
              >
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
                  background: `linear-gradient(to right, #fff 0%, #fff ${volume}%, #444 ${volume}%, #444 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio */}
      <audio
        ref={audioRef}
        src={safeTrack.audioSrc}
        preload="metadata"
        onEnded={handleEnded}
      />
    </div>
  );
}
