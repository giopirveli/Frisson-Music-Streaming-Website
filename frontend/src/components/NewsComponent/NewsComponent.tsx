"use client";
import Button from "../Button/Button";
import styles from "./NewsComponent.module.scss";
import Image, { StaticImageData } from "next/image";

interface NewsComponentProps {
  imageUrl: string | StaticImageData;
  title: string;
  plays: number | string;
  artist?: string;
  verified?: boolean;
  button?: string;
}

export default function NewsComponent({
  imageUrl,
  title,
  plays,
  artist,
  verified,
  button,
}: NewsComponentProps) {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.card}
        fill
        src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
        alt="banner"
      />

      <div className={styles.content}>
        <div className={styles.textBox}>
          {verified && (
            <div className={styles.verified}>
              <Image
                src="/Images/NewsComponent/Vector.png"
                width={22}
                height={21}
                alt="verified icon"
              />
              <p>verified artist</p>
            </div>
          )}
          <h1 className={styles.title}>{artist || title}</h1>
          <p className={styles.plays}>{plays.toLocaleString()} </p>
        </div>
        <Button
          className={styles.button}
          text={button || "Listen Now"}
          height={50}
          icon="/icons/Button/Play.svg"
        />
      </div>
    </div>
  );
}
