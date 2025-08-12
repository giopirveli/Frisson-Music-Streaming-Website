import styles from "./Table.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Song {
   id: number | string;
   pic: string;
   name: string;
   album: string;
   time: string;
   liked: boolean;
}

export default function Table() {
   const [activeTab, setActiveTab] = useState("songs");
   const [songs, setSongs] = useState<Song[]>([]);

   useEffect(() => {
      axios
         .get("/api/songs")
         .then((res) => setSongs(res.data))
         .catch((error) =>
            console.error("no songs found yet")
         );
   }, []);

   return (
      <div className={styles.table}>
         {/* Tabs */}
         <div className={styles.tabs}>
            <div
               className={`${styles.tab} ${activeTab === "songs" ? styles.active : ""}`}
               onClick={() => setActiveTab("songs")}
            >
               Songs
            </div>
            <div
               className={`${styles.tab} ${activeTab === "albums" ? styles.active : ""}`}
               onClick={() => setActiveTab("albums")}
            >
               Albums
            </div>
         </div>

         {/* Table */}
         <table className={styles.list}>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Song Name</th>
                  <th>Album</th>
                  <th>Time</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>

            <tbody>
               {songs.map((song, i) => (
                  <tr key={song.id}>
                     <td>{i + 1}</td>
                     <td className={styles.songName}>
                        <div className={styles.imageWrapper}>
                           <Image
                              src={song.pic}
                              alt={song.name}
                              width={40}
                              height={40}
                              style={{ borderRadius: 4 }}
                           />
                        </div>
                        {song.name}
                     </td>
                     <td>{song.album}</td>
                     <td>{song.time}</td>
                     <td>{song.liked ? "❤️" : "🤍"}</td>
                     <td>⋯</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
