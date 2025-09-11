import Image from "next/image";
import styles from "./SongListTable.module.scss";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDots/ThreeDotsBtn";
import photo from "../../assets/images/table/artistphoto.png";
import { useState } from "react";

interface Song {
  // Song aris prop
  id?: number | string;
  pic?: string;
  name?: string;
  album?: string;
  time?: string;
  liked?: boolean;
}

export default function SongListTable({ id, pic, name, album, time, liked }: Song) {
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
            <td className={styles.songId}>?</td>
            <td className={styles.songName}>
              <div className={styles.imageWrapper}>
                <Image src={photo} alt={"song name"} />
              </div>
              {"no information"}
            </td>
            <td>{"no information"}</td>
            <td>{"no information"}</td>
            <td>
              <HeartBtn iconColor="gray" />
            </td>
            <td>
              <ThreeDotsBtn iconColor="white" />
            </td>
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
    </div>
  );
}
