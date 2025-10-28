"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Albums.module.scss";
import Image from "next/image";
import "../../styles/Defaults/defaultGrid.scss"

interface Album {
  id: number;
  name: string;
  artistUrl: string;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>("https://frisson-music-app.s3.eu-north-1.amazonaws.com/Artist/artists.json")
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error loading albums:", error);
      });
  }, []);

  return (
    <div className={`Grid`}>
      {albums.map((a) => (
        <div key={a.id} className={styles.card}>
          <div className={styles.imageWrapperBox}>
            <Image
              src={a.artistUrl}
              alt={a.name}
              width={234}
              height={201}
              className={`${styles.albumImage} ${styles.musicImage}`}
            />
          </div>

          <div className={styles.textWrapper}>
            <h3 className={styles.textTop}>{a.name}</h3>
            <p className={styles.textBottom}>{a.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
