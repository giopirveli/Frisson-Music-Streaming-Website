"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./radio.module.css";

interface Radio {
  name: string;
  url: string;
  logo: string;
  language: "GE" | "ITA" | "FRA"; // ენები
}

const RadioPlayer: React.FC = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"GE" | "ITA" | "FRA">("GE");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // რადიოების ჩატვირთვა API-დან
  useEffect(() => {
    fetch("/radios.json")
      .then((res) => res.json())
      .then((data) => setRadios(data))
      .catch((err) => console.error("რადიო ვერ ჩაიტვირთა:", err));
  }, []);

  // ხმის ცვლილების მართვა
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // ფილტრი ენასა და საძიებო სიტყვის მიხედვით
  const filteredRadios = radios
    .filter((r) => r.language === selectedLanguage)
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const currentRadio = filteredRadios[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const nextRadio = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredRadios.length);
    setIsPlaying(false);
  };

  const prevRadio = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredRadios.length) % filteredRadios.length);
    setIsPlaying(false);
  };

  const radiosToShow = showAll ? filteredRadios : filteredRadios.slice(0, 3);

  // ენის არჩევა
  const handleLanguageChange = (lang: "GE" | "ITA" | "FRA") => {
    setSelectedLanguage(lang);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerBox}>
        {/* ენის არჩევის ღილაკები */}
        <div className={styles.languageButtons}>
          <button
            className={selectedLanguage === "GE" ? styles.activeLang : ""}
            onClick={() => handleLanguageChange("GE")}
          >
            📻 GE
          </button>
          <button
            className={selectedLanguage === "ITA" ? styles.activeLang : ""}
            onClick={() => handleLanguageChange("ITA")}
          >
            📻 ITA
          </button>
          <button
            className={selectedLanguage === "FRA" ? styles.activeLang : ""}
            onClick={() => handleLanguageChange("FRA")}
          >
            📻 FRA
          </button>
        </div>

        {/* საძიებო ველი */}
        <input
          type="text"
          placeholder="🔍 Find a Channel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        {currentRadio && (
          <div className={styles.radioBox}>
            {/* მიმდინარე რადიო */}
            <div className={styles.currentRadio}>
              <h3 className={styles.radioName}>{currentRadio.name}</h3>
              <Image
                src={currentRadio.logo}
                alt={currentRadio.name}
                width={180}
                height={180}
                className={`${styles.radioLogo} ${isPlaying ? styles.rotating : ""}`}
              />
            </div>

            {/* პლეიერი */}
            <div className={styles.playersBox}>
              <button onClick={prevRadio} className={styles.playerButton}>
                <Image
                  src="/Images/icons/playicon/backicon.svg"
                  alt="Previous"
                  width={40}
                  height={40}
                />
              </button>

              <button onClick={togglePlay} className={styles.playerButton}>
                <Image
                  src={
                    isPlaying
                      ? "/Images/icons/playicon/pauseicon.svg"
                      : "/Images/icons/playicon/playimg.svg"
                  }
                  alt={isPlaying ? "Pause" : "Play"}
                  width={50}
                  height={50}
                />
              </button>

              <button onClick={nextRadio} className={styles.playerButton}>
                <Image
                  src="/Images/icons/playicon/nexticon.svg"
                  alt="Next"
                  width={40}
                  height={40}
                />
              </button>

              {/* ხმის კონტროლი */}
              <div className={styles.volumeControl}>
                <button onClick={toggleMute} className={styles.muteBtn}>
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className={styles.volumeSlider}
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src={currentRadio.url}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              autoPlay={isPlaying}
            />
          </div>
        )}

        {/* რადიო სია */}
        <div className={styles.radioList}>
          {radiosToShow.map((radio, index) => (
            <div
              key={index}
              className={`${styles.radioItem} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
            >
              <Image
                src={radio.logo}
                alt={radio.name}
                width={50}
                height={50}
                className={styles.radioItemLogo}
              />
              <span className={styles.radioName}>{radio.name}</span>
            </div>
          ))}

          {filteredRadios.length > 3 && (
            <button
              className={styles.showAllButton}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Folded ⬆️" : "Show All ⬇️"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
