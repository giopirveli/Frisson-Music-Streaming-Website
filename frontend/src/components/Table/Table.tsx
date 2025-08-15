"use client";
import styles from "./Table.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import HeartBtn from "../HeartBtn/HeartBtn";
import photo from "../../assets/images/table/artistphoto.png";
import albumPhoto from "../../assets/images/table/albumphoto.png";
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
   const [activeTab, setActiveTab] = useState(1); // songs
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
            <div
               className={activeTab === 1 ? styles.active : ""}
               onClick={() => setActiveTab(1)}>
               top songs
            </div>
            <div 
            onClick={() => setActiveTab(2)}
            className={activeTab === 2?styles.active: ""}>
               albums
               </div>
            <div 
            onClick={() => setActiveTab(3)}
            className={activeTab === 3?styles.active:""}>
                  biography
                  </div>
         </div>

         {/* Table */}

         {activeTab === 1 && <table className={styles.list}>
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

               {/* this is top Songs   ||  ThreeDotsBtn still needs component
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
            ))*/}

            </tbody>
         </table>
         }


         {activeTab === 2 &&
            <div className={styles.album}>

                  <div>
                     <Image src={albumPhoto} alt="Artist Image"  />
                     <p>no information</p>
                  </div>
               
                  <div>
                     <Image src={albumPhoto} alt="Artist Image"  />
                     <p>no information</p>
                  </div>
               
                  <div>
                     <Image src={albumPhoto} alt="Artist Image"  />
                     <p>no information</p>
                  </div>
               
                  <div>
                     <Image src={albumPhoto} alt="Artist Image" />
                     <p>no information</p>
                  </div>
               

            </div>}





         {/*activeTab === 2 &&
            <div className={styles.album}>
               {songs.map((song, i) => (
                  <div key={song.id}>
                     <Image src={song.pic || photo} alt="Artist Image"  />
                     <p>{song.name}</p>
                  </div>
               ))}

            </div>*/}


      </div >
   );
}
