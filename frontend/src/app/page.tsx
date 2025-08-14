'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import MusicCard from "@/components/MusicCard/MusicCard";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <NewsComponent title="lddlld" imageUrl="/Images/NewComponentTest.jpg" plays={22222} />
          <section className={styles.topHitsSection}>
            <div className={styles.topHitsSectionTextBox}>
            <h2>Top Hits</h2>
            <span>See all</span>
            </div>
            <div className={styles.topHitsSectionCardsBox}>
 <AlbumCard title="eee" artist="eeee" imageUrl="/Images/AlbumCard/AlbumPhoto.jpg"/>
          <MusicCard title="eee" artist="eeee" imageUrl="/Images/MusicCard/MusicCardPhoto.jpg" />
          <ArtistCard  title="eee"  imageUrl="/Images/ArtistCard/ArtistPhoto.jpg"/>
            </div>

          </section>
        </main>
      </div>
      <Player />
    </div>
  );
}
