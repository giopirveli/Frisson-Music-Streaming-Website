"use client";
import Style from "./player.module.scss";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { useAudioControls } from "@/hooks/useAudioControls";
import HeartBtn from "../heartBtn/heartBtn";

export default function Player() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);

    const {
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
        handleChange,        // ✅ from hook
    } = useAudioControls(audioRef, progressRef);




 





    return (
        <div className={Style.playerBackgraund}>
            <div className={Style.musicPhoto}></div>
            <div className={Style.mainControlBox}>
                <div className={Style.controlBoxesDurection}>
                    <div className={Style.controlBoxFirstPart}>
                        <HeartBtn />

                        <div className={Style.rangeControlBox}>
                            <span>{formatTime(isDragging ? previewTime : currentTime)}</span>
                            <div
                                ref={progressRef}
                                className={Style.progressBarWrapper}
                                onClick={handleClickProgressBar}
                            >
                                <div className={Style.progressTrack}>
                                    <div
                                        className={Style.progressFill}
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                    <div
                                        className={Style.progressThumb}
                                        style={{ left: `${progressPercent}%` }}
                                        onMouseDown={handleThumbMouseDown}
                                    ></div>
                                </div>
                            </div>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className={Style.controlBoxSecondPart}>
                        <div className={Style.InfoBox}>
                            <span>No Information</span>
                            <span>No Information</span>
                        </div>

                        <div className={Style.functionalIconsBox}>

                            <button className={Style.functionalIconButton}>
                                <Image
                                    src="/icons/Player/Shuflle.svg"
                                    alt="Shuflle"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button className={Style.functionalIconButton}>
                                <Image
                                    src="/icons/Player/PlayPrevious.svg"
                                    alt="PlayPrevious"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button
                                className={Style.PlayPauseButton}
                                onClick={togglePlay}
                            >
                                <Image
                                    src={
                                        isPlaying
                                            ? "/icons/Player/Pause.svg"
                                            : "/icons/Player/Play.svg"
                                    }
                                    alt="PlayPause"
                                    width={48}
                                    height={48}
                                />
                            </button>
                            <button className={Style.functionalIconButton}>
                                <Image
                                    src="/icons/Player/PlayNext.svg"
                                    alt="PlayNext"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button className={Style.functionalIconButton} onClick={reapetSong} >
                                <Image
                                    src="/icons/Player/Repeat.svg"
                                    alt="Repeat"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>

                        <div className={Style.volumeControlBox}>
                            <Image
                                src="/icons/Player/Volume.svg"
                                alt="Volume icon"
                                width={24}
                                height={24}
                            />
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={volume}
                                onChange={handleChange}
                                style={{
                                    background: `linear-gradient(to right, white 0%, white ${volume}%, #444 ${volume}%, #444 100%)`
                                }}
                                className={Style.slider}
                            />




                        </div>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src="/songs/test.mp3" preload="metadata" />
        </div>
    );
}
