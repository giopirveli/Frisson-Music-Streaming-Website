"use client";
import styles from "../AlbumCard/AlbumCard.module.scss";
import Image, { StaticImageData } from "next/image";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDots/ThreeDotsBtn";
import { useState } from "react";

interface AlbumCardProps {
  title: string;
  artist?: string;
  imageUrl: string | StaticImageData;
  width?: string | number;
  height?: string | number;
  hight?: string | number; // თუ სადმე ჯერ კიდევ იყენებ
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

export default function AlbumCard({
  title,
  artist,
  imageUrl,
  onClick,
  hideHoverEfect = false,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const showHoverControls = isHovered && !hideHoverEfect;

  const stopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.card} ${artist ? "" : styles.cardHightPx}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={styles.imageWrapperBox}>
        <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
          <Image
            src={imageUrl}
            alt={`${title}${artist ? ` — ${artist}` : ""}`}
            className={styles.musicImage}
            fill
            priority={false}
          />
        </div>

        {showHoverControls && (
          <div className={styles.heartButton}>
            <div className={styles.btnWhiteBackground} onMouseDown={(e) => e.stopPropagation()} onClick={stopClick}>
              <HeartBtn
                liked={isLiked}
                iconColor={isLiked ? "black" : "gray"}
                onToggle={() => setIsLiked((v) => !v)}  // ← მხოლოდ აქ ვტოგლავთ
              />
            </div>

            <div className={styles.btnWhiteBackground} onMouseDown={(e) => e.stopPropagation()} onClick={stopClick}>
              <ThreeDotsBtn
                iconColor="black"
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.textWrapper}>
        {artist && <p className={styles.textBottom}>{artist}</p>}
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
