'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import NewsComponent from "@/components/NewsComponent/NewsComponent";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <NewsComponent plays={54455} title="Top Hit  Of the week" imageUrl="/Images/NewsComponent/NewComponentTest.jpg"/>
        </main>
      </div>
      <Player />
    </div>
  );
}
