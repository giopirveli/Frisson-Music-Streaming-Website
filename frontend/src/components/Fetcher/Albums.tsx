"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Albums.module.scss";
import Image from "next/image";

interface Album {
  id: number;
  title: string;
  artistName: string;
  coverUrl: string;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>("https://frisson-music-app.s3.eu-north-1.amazonaws.com/albums.json")
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error loading albums:", error);
      });
  }, []);

  return (
    <div>
      {albums.map((a) => (
        <div key={a.id} className={styles.card}>
          <div className={styles.imageWrapperBox}>
            <Image
              src={a.coverUrl}
              alt={a.title}
              className={`${styles.albumImage} ${styles.musicImage}`}
            />
          </div>

          <div className={styles.textWrapper}>
            <h3 className={styles.textTop}>{a.title}</h3>
            <p className={styles.textBottom}>{a.artistName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
