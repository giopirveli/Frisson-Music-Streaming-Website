"use client"
import Button from "@/components/Button/Button";
import plusIcon from "../../../../public/icons/Button/plusIcon.svg"; // local image import
import styles from "./page.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";

export default function PlaylistPage() {
  return (
    <main className={styles.main}>
      <div className={styles.h1}>
        <h1  className={styles.h1}>my playlists</h1>
        <div className={styles.searchbar}>
        <Searchbar></Searchbar>
          <Button text="new playlist" icon={plusIcon}  />
        </div>
      </div>
    </main>
  );
}
