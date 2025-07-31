'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>

      <Sidebar></Sidebar>
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>

        </main>
        <footer className={styles.footer}>

        </footer>
      </div>

      {/* Player at the bottom */}

    </div>
  );
}
