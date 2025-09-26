"use client";
import Button from "@/components/Button/button";
import plusIcon from "../../../../public/icons/Button/plusIcon.svg";
import styles from "./page.module.scss";
import Searchbar from "@/components/Searchbar/Searchbar";
import PlaylistComponent from "@/components/PlaylistComponent/Playlist";
import photo from "../../../assets/images/table/albumphoto.png";
import { StaticImageData } from "next/image";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import Table from "@/components/Table/Table";
import banner from "@/../public/Images/playlistsPage/playlist.jpg";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/../styles/defaults/default.scss";

interface Album {
  imageUrl?: string | StaticImageData;
  albumName?: string;
}

export default function PlaylistPage() {
  const { activeTab, setActiveTab } = useActiveTab();
  const pathname = usePathname();

  const albums: Album[] = [];

  // Reset activeTab to 1 when navigating back to this page
  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <>
          <div className={styles.h1}>
            <h1 className={styles.h1}>my playlists</h1>
            <div className={styles.searchbar}>
              <Searchbar placeholder="search in your album" />
              <div className={styles.addPlayListControl}>
                <Button text="new playlist" icon={plusIcon} />
              </div>
            </div>
          </div>

          <div className={styles.albumCard}>
            {[...Array(7)].map((_, i) => (
              <PlaylistComponent
                key={i}
                onClick={() => setActiveTab(2)}
                imageUrl={photo}
                title={`Playlist name 1`}
              />
            ))}

            {albums.map((album, i) => (
              <PlaylistComponent
                key={i + 100}
                onClick={() => setActiveTab(2)}
                imageUrl={album.imageUrl || photo}
                title={album.albumName || `playlist ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === 2 && (
        <div className={`ormocdatotxmeti cflex ${styles.nugo}`}>
          <NewsComponent
            imageUrl={banner}
            plays="11 songs"
            title={albums[0]?.albumName || "playlist 1"}
          />
          <div className={`ocdatormeti cflex`}>
            {/* Keep page searchbar here */}
            <Searchbar />
            <Table />
          </div>
        </div>
      )}
    </main>
  );
}
