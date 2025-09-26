"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useEffect, useState } from "react";
import { Colors } from "../../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";
import { usePathname } from "next/navigation";
import { useActiveTab } from "@/components/Context/ActiveTabContext";

export default function ArtistPage() {
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useActiveTab();

  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <div className={styles.artistPage}>
          <h4>trending now</h4>
          <div className={styles.artistCard}>
            <AlbumCard imageUrl={photo} onClick={() => setActiveTab(2)} title="taylor swift" />
            <AlbumCard imageUrl={photo} onClick={() => setActiveTab(2)} title="bellie eilish" />
            <AlbumCard imageUrl={photo} onClick={() => setActiveTab(2)} title="sza" />
            <AlbumCard imageUrl={photo} onClick={() => setActiveTab(2)} title="ed sheeran" />
            <AlbumCard imageUrl={photo} onClick={() => setActiveTab(2)} title="Ariana Grande" />
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
