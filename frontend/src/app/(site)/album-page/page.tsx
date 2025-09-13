"use client";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import SongListTable from "@/components/SongListTable/SongListTable";
import { useEffect, useState } from "react";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";
import "@/../styles/defaults/defaultGrid.scss";
import { usePathname } from "next/navigation";
import { useActiveTab } from "@/components/Context/ActiveTabContext";


export default function AlbumPage() {
  const {activeTab, setActiveTab} = useActiveTab();
  const pathname = usePathname();


  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  return (



    <main className={styles.main}>

      {activeTab === 1 && 
      <div className="albumCard">
        {Array.from({ length: 6 }).map((_, i) => (
          <AlbumCard key={i} onClick={() =>setActiveTab(2)} title="album title" imageUrl={photo}></AlbumCard>
        ))}
      </div>}


      {activeTab === 2 &&
        <>
          <NewsComponent
            plays={"Released 07/12/2023"}
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <div>
            <SongListTable />
          </div>
        </>}
    </main >
  );
}
