"use client";
import Button from "../button/button";
import styles from "./NewsComponent.module.scss";
import Image from "next/image";
interface NewsComponentProps {
  imageUrl: string;
  title: string;
  plays: number;
}

export default function NewsComponent({ imageUrl, title, plays }: NewsComponentProps) {
  return (

    <div className={styles.wrapper}>
      <Image className={styles.card} fill src={imageUrl} alt="banner" />


      <div className={styles.content}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.plays}>{plays.toLocaleString()} Plays</p>
        </div>
        <Button text="play again" width={150} height={50} />
      </div>
    </div>



  );
}
