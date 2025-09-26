"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./SongListTable.module.scss";
import HeartBtn from "../HeartBtn/HeartBtn";
import photo from "../../assets/images/table/artistphoto.png";

type Song = {
  id: number | string;
  pic?: string;
  name?: string;
  album?: string;
  time?: string;
  liked?: boolean;
};

export default function SongListTable() {
  const [songs] = useState<Song[]>(
    Array.from({ length: 4 }).map((_, i) => ({
      id: i + 1,
      pic: "",
      name: "No information",
      album: "No information",
      time: "No information",
      liked: false,
    }))
  );

  return (
    <div className={styles.table}>
      <table className={styles.list}>

        <thead>
          <tr className={styles.thead}>
            <th>#</th>
            <th>Song Name</th>
            <th>Album</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {songs.map((song, i) => (
            <tr key={song.id}>
              <td className={styles.songId}>{i + 1}</td>

              <td className={styles.songName}>
                <div className={styles.imageWrapper}>
                  <Image src={song.pic || photo} alt={song.name ?? "song"} />
                </div>
                <span className={styles.text}>{song.name}</span>
              </td>
              <td>{song.album}</td>
              <td>{song.time}</td>
              <td>
                <HeartBtn iconColor="gray" onToggle={() => { /* wire later */ }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
