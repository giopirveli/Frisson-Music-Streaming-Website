"use client";

import { useCallback } from "react";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import SongListTable from "@/components/SongListTable/SongListTable";
import AlbumFetch from "@/components/Fetcher/Albums";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import "../../../styles/Defaults/defaultGrid.scss";
import styles from "./page.module.scss";
import Image from "next/image";

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  const goDetails = useCallback(() => setActiveTab(2), [setActiveTab]);

  return (
    <div style={{ padding: "20px" }}>


        <AlbumFetch />

      {activeTab === 2 && (
        <>
          <NewsComponent
            plays="Released 07/12/2023"
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <SongListTable />
        </>
      )}
    </div>
  );
}
