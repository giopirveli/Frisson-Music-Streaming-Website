'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";



export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>

      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <AlbumCard
          title= {'string'}
          artist= {'string'}
          imageUrl= {'string'}
          ></AlbumCard>
        </main>

      </div>
        <Player/>
    </div>
  );
}
