"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useEffect, useState } from "react";
import { Colors } from "../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";
import { usePathname } from "next/navigation";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import ArtistCard from "@/components/ArtistCard/ArtistCard";

export default function ArtistPage() {
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useActiveTab();
  const songs = [{ title: "ed sheeran",img:"" }, { title: "sza" }, { title: "bellie eilishi" }, { title: "taylor swift" }, { title: "bellie eilish" }, { title: "taylor swift" }]

  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <div className={styles.artistPage}>
          <h4>trending now</h4>
          <div className={styles.artistCard}>

            {Array.from(songs).map((_, i) =>
              <ArtistCard key={i} imageUrl={photo} onClick={() => setActiveTab(2)} title={songs[i].title} />
            )}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <>
          <NewsComponent
            color={Colors.White}
            title="peggy gou"
            button="follow"
            imageUrl="/Images/NewsComponent/peggyGou.jpg"
            verified
            plays={`745,090 fans`}
          />
          <Table />
        </>
      )}
    </main>
  );
}
