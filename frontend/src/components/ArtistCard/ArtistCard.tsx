"use client";
import styles from "../ArtistCard/ArtistCard.module.scss";
import Image from "next/image";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDots/ThreeDotsBtn";
import { useState } from "react";

interface ArtistCardProps {
  title: string;
  imageUrl: string;
  onClick?: () => void;       
  hideHoverEfect?: boolean;   
}

export default function ArtistCard({ title, imageUrl, onClick, hideHoverEfect = false }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const showHoverControls = isHovered && !hideHoverEfect;

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
        <Image
          src={imageUrl}
          alt={`${title} Artist`}
          className={styles.artistImage}
          width={234}
          height={226}
        />
      </div>

      {showHoverControls && (
        <div className={styles.heartButton}>
          <div className={styles.btnWhiteBackground} onMouseDown={(e) => e.stopPropagation()} onClick={stopClick}>
            <HeartBtn
              liked={isLiked}
              iconColor={isLiked ? "black" : "gray"}
              onToggle={() => setIsLiked((prev) => !prev)}
            />
          </div>

          <div className={styles.btnWhiteBackground} onMouseDown={(e) => e.stopPropagation()} onClick={stopClick}>
            <ThreeDotsBtn iconColor="black" />
          </div>
        </div>
      )}

      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
