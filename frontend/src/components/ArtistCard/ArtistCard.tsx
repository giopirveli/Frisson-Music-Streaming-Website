"use client";
import styles from "../ArtistCard/ArtistCard.module.scss";
import Image from "next/image";
import HeartBtn from "../heartBtn/heartBtn";
import ThreeDotsBtn from "../3dots/3dots";
import { useState } from "react";


interface ArtistCardProps {
  title: string;
  imageUrl: string;
}

export default function ArtistCard({ title, imageUrl }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.imageWrapper} ${isHovered && styles.hoveredImgWrapper}`}>
        <Image src={imageUrl} alt="Artist Card" className={styles.artistImage} width={234} height={226} />
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
      </div>
    </div>
  );
}