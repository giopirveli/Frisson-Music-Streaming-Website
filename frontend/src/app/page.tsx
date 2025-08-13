'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import Table from "@/components/Table/Table";



export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <Table liked={true} pic="/Images/MusicCard/MusicCardPhoto.jpg" name="good"></Table>
        </main>
      </div>
      <Player />
    </div>
  );
}
