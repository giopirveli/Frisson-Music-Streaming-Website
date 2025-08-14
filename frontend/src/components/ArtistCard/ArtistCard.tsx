"use client";
import styles from "../ArtistCard/ArtistCard.module.scss";
import Image from "next/image";
import HeartBtn from "../heartBtn/heartBtn";
import ThreeDotsBtn from "../3dots/3dots";
import { useState } from "react";
import ArtistPhoto from "../ArtistCard/ArtistPhoto.jpg"

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
      <div className={styles.imageWrapper}>
        <Image src={ArtistPhoto} alt="Artist Card" className={styles.artistImage} />
      </div>
      {isHovered && (
        <div className={styles.heartButton}>
          <HeartBtn />
          <ThreeDotsBtn />
        </div>
      )}
      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{"Billie Eilish"}</p>
      </div>
    </div>
  );
}