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
import { useEffect, useState } from "react";
import "@/../styles/defaults/default.scss";
import CreatePlaylistCard from "@/components/CreatePlaylistCard/CreatePlaylistCard";

interface Album {
  imageUrl?: string | StaticImageData;
  albumName?: string;
}

export default function PlaylistPage() {
  const { activeTab, setActiveTab } = useActiveTab();
  const pathname = usePathname();

  // ⬇️ ახლა გვაქვს state-ში
  const [albums, setAlbums] = useState<Album[]>([
    // შეგიძლია დატოვო ცარიელი []
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <>
          <div className={styles.h1}>
            <h1 className={styles.h1}>my playlists</h1>
            <div className={styles.searchbar}>
              <Searchbar placeholder="search in your album" />
              <div className={styles.addPlayListControl}>
                <Button text="new playlist" icon={plusIcon} onClick={openCreate} />
              </div>
            </div>
          </div>

          <div className={styles.albumCard}>
            {/* დემო ბარათები */}
            {[...Array(3)].map((_, i) => (
              <PlaylistComponent
                key={i}
                onClick={() => setActiveTab(2)}
                imageUrl={photo}
                title={`Playlist name ${i + 1}`}
              />
            ))}

            {/* რეალური state-იდან */}
            {albums.map((album, i) => (
              <PlaylistComponent
                key={`pl-${i}`}
                onClick={() => setActiveTab(2)}
                title={album.albumName || `playlist ${i + 1}`}
                {...(album.imageUrl ? { imageUrl: album.imageUrl } : {})}  // ⬅️ ეს ხსნის შეცდომას
              />
            ))}
          </div>
        </>
      )}

      {activeTab === 2 && (
        <div className={`ormocdatotxmeti cflex ${styles.nugo}`}>
          <NewsComponent imageUrl={banner} plays="11 songs" title={albums[0]?.albumName || "playlist 1"} />
          <div className={`ocdatormeti cflex`}>
            <Searchbar />
            <Table />
          </div>
        </div>
      )}

      {/* ⬇️ ცენტრალური მოდალი */}
      {isCreateOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className={styles.modalCenter}
            onClick={(e) => e.stopPropagation()}
          >
            <CreatePlaylistCard
              previewOnClick={() => setIsCreateOpen(false)}
              onSave={({ name }) => {
                setAlbums((prev) => [{ albumName: name, imageUrl: undefined }, ...prev]);
                setIsCreateOpen(false);
              }}
            />
          </div>
        </div>
      )}

    </main>
  );
}

