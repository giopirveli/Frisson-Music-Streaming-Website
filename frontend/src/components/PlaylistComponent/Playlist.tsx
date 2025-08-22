"use client";
import styles from "../PlaylistComponent/Playlist.module.scss"
import { useState } from "react";
import PenButton from "../PenBtn/PenButton";


interface PlaylistProps {
  title: string;
  imageUrl: string;
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
        <img src={imageUrl} alt="Playlist Button" className={styles.playlistImage} />
      </div>
      {isHovered && (
        <div className={styles.PenButton}>
          <div className={styles.btnWhiteBackground}>
            <PenButton />
          </div>
          <div className={styles.btnWhiteBackground}>
            {/* <Btn /> */}
          </div>
        </div>
      )}
      <div className={styles.textWrapper}>
        <p className={styles.text}>{title}</p>
      </div>
    </div>
  );
}