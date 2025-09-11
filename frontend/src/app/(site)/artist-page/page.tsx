"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useState } from "react";
import { Colors } from "../../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";

interface Song {
  id?: number | string;
  pic?: string;
  name?: string;
  album?: string;
  time?: string;
  liked?: boolean;
  artist?: string;    // for bio
  biography?: string;
}

// ✅ props ამოღებულია page-ის სიგნატურიდან
export default function ArtistPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [activeTab, setActiveTab] = useState(1);

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

            {/* backend-ისთვის:
            {songs.map((song) => (
              <ArtistCard key={song.id} onClick={() => setActiveTab(2)} imageUrl={song.pic} title={song.artist} />
            ))} */}
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
