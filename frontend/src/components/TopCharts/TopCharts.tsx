"use client";
import { useState } from "react";
import styles from "../TopCharts/TopCharts.module.scss";
import Image from "next/image";
import HeartBtn from "../heartBtn/heartBtn";
import ThreeDotsBtn from "../3dots/3dots";


interface TopChartsProps {
  title: string;
  artist: string;
  duration: number;
  imageUrl: string;
}

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TopCharts({ title, artist, duration, imageUrl }: TopChartsProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.TopChartsDiv}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imgAndWrapperBox}>
        <div className={styles.imageWrapper}>
          <Image src={imageUrl} alt="Top Chart" className={styles.image} width={72} height={72} />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.textTop}>{title}</p>
          <p className={styles.textBottom}>{artist}</p>
        </div>
      </div>


      <div className={styles.durectionAndButtonsBox}>
        <p className={styles.durationTime}>
          {formatDuration(duration)}
        </p>


        <div className={styles.buttons}>
          <div className={styles.buttonsWrapper} >
            <HeartBtn />
            <ThreeDotsBtn />
          </div>
        </div>

      </div>
    </div>
  )
}