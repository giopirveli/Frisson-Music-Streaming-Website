'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import MusicCard from "@/components/MusicCard/MusicCard";
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
              <MusicCard title="Anyma" imageUrl="/Images/MusicCard/MusicCardPhoto.jpg" artist="Anyma" />
              <MusicCard title="Anyma" imageUrl="/Images/MusicCard/MusicCardPhoto.jpg" artist="Anyma" />
              <MusicCard title="Anyma" imageUrl="/Images/MusicCard/MusicCardPhoto.jpg" artist="Anyma" />
              <MusicCard title="Anyma" imageUrl="/Images/MusicCard/MusicCardPhoto.jpg" artist="Anyma" />
            </div>

          </section>
        </main>
      </div>
      <Player />
    </div>
  );
}
