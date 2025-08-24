"use client";
import styles from "../MusicCard/MusicCard.module.scss";
import { useState } from "react";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDots/ThreeDotsBtn";

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
}

export default function MusicCard({ title, artist, imageUrl }: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.imageWrapper} ${isHovered && styles.hoveredImgWrapper}`}>
        <img src={imageUrl} alt="Music Card" className={styles.musicImage} />
      </div>
      {isHovered && (
        <div className={styles.heartButton}>
          <div className={styles.btnWhiteBackground}>
            <HeartBtn iconColor="black" />
          </div>
          <div className={styles.btnWhiteBackground}>
            <ThreeDotsBtn iconColor="black" />
          </div>
        </div>
      )}
      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{title}</p>
        <p className={styles.textBottom}>{artist}</p>
      </div>
    </div>
  );
}
