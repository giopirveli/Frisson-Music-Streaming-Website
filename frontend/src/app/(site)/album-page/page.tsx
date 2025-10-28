"use client";

import { useMemo, useCallback } from "react";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import SongListTable from "@/components/SongListTable/SongListTable";
import AlbumFetch from "@/components/Fetcher/Albums";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import "../../../styles/defaults";
import styles from "./page.module.scss";

interface Album {
  id: number;
  title: string;
  artistName: string;
  coverUrl: string;
}

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  // placeholder albums
  const albums: Album[] = [
    { id: 1, title: "Album 1", artistName: "Artist 1", coverUrl: "/Images/placeholder.jpg" },
    { id: 2, title: "Album 2", artistName: "Artist 2", coverUrl: "/Images/placeholder.jpg" },
    { id: 3, title: "Album 3", artistName: "Artist 3", coverUrl: "/Images/placeholder.jpg" },
    { id: 4, title: "Album 4", artistName: "Artist 4", coverUrl: "/Images/placeholder.jpg" },
    { id: 5, title: "Album 5", artistName: "Artist 5", coverUrl: "/Images/placeholder.jpg" },
    { id: 6, title: "Album 6", artistName: "Artist 6", coverUrl: "/Images/placeholder.jpg" },
  ];

  const goDetails = useCallback(() => setActiveTab(2), [setActiveTab]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎵 Список альбомов</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {albums.map((album) => (
          <div key={album.id} style={{ width: "150px", textAlign: "center" }}>
            <img
              src={album.coverUrl}
              alt={album.title}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <p style={{ marginTop: "8px", fontWeight: "bold" }}>
              {album.title}
            </p>
            <p style={{ fontSize: "14px", color: "#888" }}>
              {album.artistName}
            </p>
          </div>
        ))}
      </div>

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
