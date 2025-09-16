"use client";
import styles from "../PlaylistComponent/Playlist.module.scss";
import { useState } from "react";
import PenButton from "../PenBtn/PenButton";
import BinButton from "../DeleteBinBtn/BinButton";
import { StaticImageData } from "next/image";

interface PlaylistProps {
  title: string;
  imageUrl: string | StaticImageData;
  onClick?: () => void;      
  onEdit?: () => void;       
  onDelete?: () => void;     
}

export default function PlaylistComponent({
  title,
  imageUrl,
  onClick,
  onEdit,
  onDelete,
}: PlaylistProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showHoverControls = isHovered;

  const stopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}  
    >
      <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
        <img
          src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
          alt="Playlist"
          className={styles.playlistImage}
        />
      </div>

      {showHoverControls && (
        <div className={styles.PenButton}>
          <div
            className={styles.btnWhiteBackground}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              stopClick(e);
            }}
          >
            <PenButton />
          </div>

          <div
            className={styles.btnWhiteBackground}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              stopClick(e);
            }}
          >
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
