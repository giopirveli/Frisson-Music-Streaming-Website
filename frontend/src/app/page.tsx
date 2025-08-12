'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import ArtistCard from "@/components/ArtistCard/ArtistCard"

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

          <ArtistCard
           title= {'Billie yle'}  
           imageUrl= {'string'}
          ></ArtistCard>
        </main>
      </div>

    </div>
  );
}
