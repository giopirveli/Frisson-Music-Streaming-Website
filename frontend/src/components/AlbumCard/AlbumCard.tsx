"use client";
import styles from "../AlbumCard/AlbumCard.module.scss";
import Image from "next/image";
import AlbumPhoto from "../AlbumCard/AlbumPhoto.jpg";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../3dots/ThreeDotsBtn";
import { useState } from "react";

interface AlbumCardProps {
  title: string;
  artist: string;
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
      <div className={styles.imageWrapper}>
        <Image src={AlbumPhoto} alt="Music Card" className={styles.musicImage} />
      </div>
      {isHovered && (
        <div className={styles.heartButton}>
          <HeartBtn />
          <ThreeDotsBtn />
        </div>
      )}
      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{title}</p>
        <p className={styles.textBottom}>{artist}</p>
      </div>
    </div>
  );
}
