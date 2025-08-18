'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Player from "@/components/Player/player";
import Table from "@/components/Table/Table";
import SongListTable from "@/components/SongListTable/SongListTable";



export default function Home() {
  return (
    <>
      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
          <SongListTable></SongListTable>
        </main>
      </div>
      <Player />
  </>
  );
}
