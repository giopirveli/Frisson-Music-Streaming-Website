'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import MusicCard from "@/components/MusicCard/MusicCard";
export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <ArtistCard  title="eee"  imageUrl="/Images/ArtistCard/ArtistPhoto.jpg"/>
                    <AlbumCard title="eee" artist="eeee" imageUrl="/Images/AlbumCard/AlbumPhoto.jpg"/>
          <MusicCard title="eee" artist="eeee" imageUrl="/Images/MusicCard/MusicCardPhoto.jpg" />
        </main>
      </div>
      <Player />
    </div>
  );
}
