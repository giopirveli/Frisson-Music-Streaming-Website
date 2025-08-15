"use client";
import styles from "../AlbumCard/AlbumCard.module.scss";
import Image from "next/image";
import HeartBtn from "../heartBtn/heartBtn";
import ThreeDotsBtn from "../3dots/3dots";
import { useState } from "react";

interface AlbumCardProps {
  title?: string;
  artist?: string;
  imageUrl: string;
}

export default function AlbumCard({ title, artist, imageUrl }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.imageWrapper} ${isHovered && styles.hoveredImgWrapper}`}>
        <Image src={imageUrl} alt="Music Card" className={styles.musicImage} width={234} height={202} />
      </div>
      {isHovered && (
        <div className={styles.heartButton}>
          <div className={styles.btnWhiteBackground}>
            <HeartBtn />
          </div>
          <div className={styles.btnWhiteBackground}>
            <ThreeDotsBtn />
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
