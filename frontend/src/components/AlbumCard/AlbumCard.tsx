"use client";
import styles from "../AlbumCard/AlbumCard.module.scss";
import Image from "next/image";
import HeartBtn from "../heartBtn/heartBtn";
import ThreeDotsBtn from "../3dots/3dots";
import { useState } from "react";

interface AlbumCardProps {
  title: string;
  artist?: string;
  imageUrl: string;
  width?: string | number;
  hight?: string | number
}

export default function AlbumCard({ title, artist, imageUrl }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.imageWrapperBox}`}>
        <div className={`${styles.imageWrapper} ${isHovered && styles.hoveredImgWrapper}`} >
          <Image src={imageUrl} alt="Music Card" className={styles.musicImage} fill />
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
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.textBottom}>{artist}</p>
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
