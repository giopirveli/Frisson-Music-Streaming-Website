"use client";
import styles from "./Table.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import HeartBtn from "../HeartBtn/HeartBtn";
import photo from "../../assets/images/table/artistphoto.png";
import albumPhoto from "../../assets/images/table/albumphoto.png";
import ThreeDotsBtn from "../3dots/ThreeDotsBtn";
import AlbumCard from "../AlbumCard/AlbumCard";

interface Song { // Song aris prop
   id?: number | string;
   pic?: string;
   name?: string;
   album?: string;
   time?: string;
   liked?: boolean;
   artist?: string; // for bio
   biography?: string;
}

export default function Table({ id, pic, name, album, time, liked }: Song) {
   const [activeTab, setActiveTab] = useState(1);
   const [songs, setSongs] = useState<Song[]>([]); // songs aris array



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
               className={activeTab === 2 ? styles.active : ""}>
               albums
            </div>
            <div
               onClick={() => setActiveTab(3)}
               className={activeTab === 3 ? styles.active : ""}>
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
                  <td className={styles.songId}>?</td>
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
                  <Image src={albumPhoto} onClick={() => setActiveTab(3)} alt="Artist Image" />
                  <p>no information</p>
               </div>
               {/* <AlbumCard artist="misi dzma" imageUrl={albumPhoto} /> */}

               <div>
                  <Image src={albumPhoto} onClick={() => setActiveTab(3)} alt="Artist Image" />
                  <p>no information</p>
               </div>

               <div>
                  <Image src={albumPhoto} onClick={() => setActiveTab(3)} alt="Artist Image" />
                  <p>no information</p>
               </div>

               <div>
                  <Image src={albumPhoto} onClick={() => setActiveTab(3)} alt="Artist Image" />
                  <p>no information</p>
               </div>


            </div>}





         {activeTab === 2 &&
            <div className={styles.album}>
               {songs.map((song, i) => (
                  <div key={song.id} onClick={() => setActiveTab(3)}>
                     <Image src={song.pic || photo} alt="Artist Image" />
                     <p>{song.name}</p>
                  </div>
               ))}

            </div>}


         {/* {activeTab === 3 && 
            <div className={styles.bio}>
               {songs.map((song, i) => (
                  <>
                     <div key={song.id} className={styles.bioPic}>
                        <Image src={song.pic || albumPhoto} alt="bio photo" />
                     </div>
                     <div className={styles.bioTexts}>
                        <h1>{song.artist}</h1>
                        <p>{song.biography}</p>
                     </div>
                  </>
               ))}

            </div>
             */}


         {activeTab === 3 &&
         <div className={styles.bio}>
            <div className={styles.bioPic}>
               <Image src={albumPhoto} alt="bio photo" />
            </div>
            <div className={styles.bioTexts}>
               <h1>peggy gou</h1>
               <p>Peggy Gou (born July 3, 1991) is a South Korean DJ and producer based in Berlin. Originally from Incheon, South Korea, she began taking piano lessons at the age of 8 and moved to London during her teenage years to study English. After a brief return to South Korea, Gou returned to England to study at the London College of Fashion. During this time, she also honed her skills in music production, a hobby she had started in her younger years. Upon moving to Berlin, Gou made her official debut in 2016 with the EPs Art of War and Art of War II, both released by the independent label Rekids, releasing a third EP titled Seek for Maktoop the same year. As her reputation grew, she landed gigs at some of the world's most iconic venues, becoming the first Korean DJ to perform at the legendary Berlin nightclub Berghain. She has also shared the stage with renowned artists such as DJ Koze, Moodymann, The Blessed Madonna, and secured spots at festivals like Coachella, Glastonbury, and Primavera Sound. In 2018, Peggy Gou released the EP Once via Ninja Tune Records, followed by the DJ mix album DJ-Kicks: Peggy Gou (2019), released by !K7 Records. In addition to receiving rave reviews, the album marked her first appearance on the Billboard chart, peaking at number 9. Heavily inspired by 90s dance music, the single "I Go" was released in 2021 and reached number 39 on the Hot Dance/Electronic Songs chart. Her debut album I Hear You was released in July, 2024 through XL Recordings.</p>
            </div>

         </div>}



      </div >
   );
}
