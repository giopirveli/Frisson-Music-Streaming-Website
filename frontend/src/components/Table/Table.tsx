"use client";
import styles from "./Table.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import HeartBtn from "../HeartBtn/HeartBtn";
import photo from "../../assets/images/table/artistphoto.png"
import ThreeDotsBtn from "../3dots/ThreeDotsBtn";

interface Song {
   id?: number | string;
   pic?: string;
   name?: string;
   album?: string;
   time?: string;
   liked?: boolean;
}

export default function Table({ id, pic, name, album, time, liked }: Song) {
   const [activeTab, setActiveTab] = useState("songs");
   const [songs, setSongs] = useState<Song[]>([]);
   /*
      useEffect(() => {
         axios
            .get("/songs")
            .then((res) => setSongs(res.data))
            .catch((error) =>
               console.error(error)
            );
      }, []);
   
   */
   return (
      <div className={styles.table}>
         {/* Tabs */}
         <div className={styles.tabs}>
            <div className={styles.nugo}>top songs</div>
            <div>albums</div>
            <div>biography</div>
         </div>

         {/* Table */}
         <table className={styles.list}>
            <thead>
               <tr className={styles.thead}>
                  <th className={styles.hash}>#</th>
                  <th className={styles.songTitle}>Song Name</th>
                  <th className={styles.albumTitle}>Album</th>
                  <th className={styles.timeTitle}>Time</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>

            <tbody className={styles.tbody}>

               <tr>
                  <td className={styles.songId}>{"?"}</td>
                  <td className={styles.songName}>
                     <div className={styles.imageWrapper}>
                        <Image
                           src={photo}
                           alt={"song name"}
                           width={48}
                           height={48}

                        />
                     </div>
                     {"no information"}
                  </td>
                  <td>{"no information"}</td>
                  <td>{"no information"}</td>
                  <td>
                     <HeartBtn />
                  </td>
                  <td><ThreeDotsBtn /></td>
               </tr>

               



               {/* ThreeDotsBtn still needs component
songs.map((song, i) => (
   <tr key={song.id}>
      <td>{(i + 1) || "?"}</td>
      <td className={styles.songName}>
         <div className={styles.imageWrapper}>
            <Image
               src={song.pic || photo}
               alt={song.name || "song name"}
               width={48}
               height={48}
            />
         </div>
         {song.name || "no information"}
      </td>
      <td>{song.album || "no information"}</td>
      <td>{song.time || "no information"}</td>
      <td>
         <HeartBtn />
      </td>
      <td><ThreeDotsBtn /></td> }
            </tr>
            ))

*/}


            </tbody>
         </table>
      </div >
   );
}
