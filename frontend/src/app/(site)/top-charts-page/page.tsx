"use client";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import SongListTable from "@/components/SongListTable/SongListTable";

export default function ExamplePage() {
  return (
    <main className={styles.main}>
      <NewsComponent
        plays={"795,900 Plays"}
        title="Top Chart  Of the week"
        imageUrl="/Images/NewsComponent/NewComponentTest.jpg"
      />
      <div className={styles.searchbar}>
        <Searchbar placeholder={"Search Top Chart"} />
      </div>

      <SongListTable />
    </main>
  );
}
