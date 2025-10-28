"use client";

import styles from "./Playlist.module.scss";
import { useState } from "react";
import PenButton from "../PenButton/PenButton";
import BinButton from "../DeleteBinBtn/DeleteBinBtn";
import Image, { StaticImageData } from "next/image";

interface PlaylistProps {
  id: number | string; // ✅ required
  description?: string; // optional
  title?: string; // optional
  imageUrl?: string | StaticImageData; // optional
  onClick?: () => void; // optional
  onEdit?: () => void; // optional
  onDelete?: () => void; // optional
}

export default function PlaylistComponent({
  id,
  description,
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

  const initial = (title?.trim()?.charAt(0) || "?").toUpperCase();

  return (
    <div
      key={id}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
        {imageUrl ? (
          <Image
            src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
            alt="Playlist"
            fill
            className={styles.playlistImage}
          />
        ) : (
          <div className={styles.initialAvatar}>{initial}</div>
        )}
      </div>

      {showHoverControls && (
        <div className={styles.btnControlBox}>
          <div
            className={styles.btnWhiteBackground}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              stopClick(e);
              onEdit?.();
            }}
            aria-label="Edit playlist"
          >
            <PenButton />
          </div>

          <div
            className={styles.btnWhiteBackground}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              stopClick(e);
              onDelete?.();
            }}
            aria-label="Delete playlist"
          >
            <BinButton />
          </div>
        </div>
      )}

      <div className={styles.textWrapper}>
        <p className={styles.text}>{title || "Playlist"}</p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
