'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

export default function Home() {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const widthLost = screenWidth - viewportWidth;
  const heightLost = screenHeight - viewportHeight;

  console.log("Width lost to scrollbars, sidebars, etc:", widthLost);
  console.log("Height lost to browser UI:", heightLost);

  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>

      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>

        </main>
      </div>

    </div>
  );
}
