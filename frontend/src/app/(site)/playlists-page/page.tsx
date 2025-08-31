"use client"
import Button from "@/components/Button/Button";
import plusIcon from "../../../../public/icons/Button/plusIcon.svg"; // local image import
import styles from "./page.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useEffect, useState } from "react";
import PlaylistComponent from "@/components/PlaylistComponent/Playlist";
import photo from "../../../assets/images/table/albumphoto.png";
import { StaticImageData } from "next/image";
import axios from "axios";

/*
interface Song{
  id:number|string;
  pic?:string;
  name?:string;
  album?:string;
  time?:string;
  liked?:boolean;
  artist?:string;
  biography?:string;
}*/

interface Album {
  imageUrl?: string | StaticImageData;
  albumName?: string
}



export default function PlaylistPage({ imageUrl, albumName }: Album) {
  const [albums, setAlbums] = useState<Album[]>([]);
  
  /*useEffect(() => {
    axios.get("/albums")
      .then((res) => setAlbums(res.data))
      .catch((error) =>
        console.log(error + "album not found"))
  }
  )*/


  return (
    <main className={styles.main}>
      <div className={styles.h1}>
        <h1 className={styles.h1}>my playlists</h1>
        <div className={styles.searchbar}>
          <Searchbar></Searchbar>
          <Button text="new playlist" icon={plusIcon} />
        </div>
      </div>
      <div className={styles.albumCard}>

        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>
        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>
        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>
        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>
        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>
        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>
        <PlaylistComponent imageUrl={photo} title={`Playlist name 1`}></PlaylistComponent>



        {/*albums.map((album,i)=>(
          <PlaylistComponent key={i} imageUrl={album.imageUrl||photo}
           title={`${album.albumName} ${i}`}></PlaylistComponent>
        ))
        */}
      </div>
    </main>
  );
}
