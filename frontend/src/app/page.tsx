'use client';
import styles from "./page.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import NewsComponent from "@/components/NewsComponent/NewsComponent";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar></Sidebar>

      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>
        <NewsComponent
         imageUrl={"string"}
         title={"New Hit"}
         plays={543534953}
        ></NewsComponent>
        </main>
      </div>

    </div>
  );
}
