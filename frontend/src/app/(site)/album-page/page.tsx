"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import SongListTable from "@/components/SongListTable/SongListTable";
import { useEffect, useMemo, useCallback } from "react";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import "@/styles/defaults/defaultGrid.scss";
import AlbumFetch from "@/components/Fetcher/Albums";

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  useEffect(() => {
    setActiveTab(1);
  }, [setActiveTab]);

  const albums = useMemo(() => Array.from({ length: 6 }), []);
  const goDetails = useCallback(() => setActiveTab(2), [setActiveTab]);

  return (
    <main className={styles.main}>
      <h4>trending now</h4>
      {activeTab === 1 && (
        <div className={`Grid`}>
          {albums.map((_, i) => (
            <AlbumCard key={i} title="album title" imageUrl={photo} onClick={goDetails} />
          ))}

          {/* <AlbumFetch /> */}
        </div>
      )}

      {activeTab === 2 && (
        <>
          <NewsComponent
            plays={"Released 07/12/2023"}
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <div>
            <SongListTable />
          </div>
        </>
      )}
    </main>
  );
}
