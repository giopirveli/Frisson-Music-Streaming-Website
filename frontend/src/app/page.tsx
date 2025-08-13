'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import ArtistCard from "@/components/ArtistCard/ArtistCard"
import TopCharts from "@/components/TopCharts/TopCharts";

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

          <TopCharts
            title= {'string'}
            artist= {'string'}
            imageUrl= {'string'}
            duration= {240}
          ></TopCharts>
        </main>
      </div>

    </div>
  );
}
