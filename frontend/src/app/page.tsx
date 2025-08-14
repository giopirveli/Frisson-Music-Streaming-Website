'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <AlbumCard title="eee" artist="eeee" imageUrl="/Images/AlbumCard/AlbumPhoto.jpg"/>
        </main>
      </div>
      <Player />
    </div>
  );
}
