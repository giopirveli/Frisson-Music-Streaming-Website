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
  hight?: string | number;
  onClick?: () => void;
}

export default function AlbumCard({ title, artist, imageUrl,onClick }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`${styles.card} ${artist ? "" : styles.cardHightPx}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
 onClick={onClick}
     >
      <div className={`${styles.imageWrapperBox}`}> 
        <div className={`${styles.imageWrapper} ${isHovered && styles.hoveredImgWrapper}`} >
          <Image src={imageUrl} alt="Music Card" className={styles.musicImage} fill />
        </div>

        {isHovered && (
          <div className={styles.heartButton}>
            <div className={styles.btnWhiteBackground}>
              <HeartBtn  />
            </div>
            <div className={styles.btnWhiteBackground}>
              <ThreeDotsBtn iconColor="black"/>
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
