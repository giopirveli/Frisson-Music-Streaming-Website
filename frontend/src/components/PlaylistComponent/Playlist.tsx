"use client";
import styles from "../PlaylistComponent/Playlist.module.scss"
import { useState } from "react";
import PenButton from "../PenBtn/PenButton";
import BinButton from "../DeleteBinBtn/BinButton";
import { StaticImageData } from "next/image";


interface PlaylistProps {
  title: string;
  imageUrl: string | StaticImageData;
}


export default function PlaylistComponent({ title, imageUrl }: PlaylistProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.imageWrapper} ${isHovered && styles.hoveredImgWrapper}`}>
        <img src={typeof imageUrl === "string"?imageUrl :imageUrl.src} alt="Playlist Button" className={styles.playlistImage} />
      </div>
      {isHovered && (
        <div className={styles.PenButton}>
          <div className={styles.btnWhiteBackground}>
            <PenButton />
          </div>
          <div className={styles.btnWhiteBackground}>
            <BinButton />
          </div>
        </div>
      )}
      <div className={styles.textWrapper}>
        <p className={styles.text}>{title}</p>
      </div>
    </div>
  );
}