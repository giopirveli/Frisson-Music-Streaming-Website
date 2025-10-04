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
  id: string;
  albumName?: string;
  imageUrl?: string | StaticImageData;
}

export default function PlaylistPage() {
  const { activeTab, setActiveTab } = useActiveTab();
  const pathname = usePathname();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  // Demo playlists
  const [demoAlbums, setDemoAlbums] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: crypto.randomUUID(),
      albumName: `Playlist ${i + 1}`,
    }))
  );

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
            {/* Demo playlists */}
            {demoAlbums.map((album) => (
              <PlaylistComponent
                key={album.id}
                title={album.albumName}
                imageUrl={photo}
                onClick={() => setActiveTab(2)}
                onDelete={() =>
                  setDemoAlbums(prev => prev.filter(a => a.id !== album.id))
                }
              />
            ))}

            {/* Real playlists */}
            {albums.map((album) => (
              <PlaylistComponent
                key={album.id}
                title={album.albumName || "playlist"}
                imageUrl={album.imageUrl} // undefined triggers gradient
                onClick={() => setActiveTab(2)}
                onEdit={() => console.log(`Edit playlist ${album.albumName}`)}
                onDelete={() =>
                  setAlbums(prev => prev.filter(a => a.id !== album.id))
                }
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
            <Searchbar />
            <Table />
          </div>
        </div>
      )}

      {/* Modal to create new playlist */}
      {isCreateOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          onClick={closeCreate}
        >
          <div
            className={styles.modalCenter}
            onClick={(e) => e.stopPropagation()}
          >
            <CreatePlaylistCard
              previewOnClick={() => setIsCreateOpen(false)}
              onSave={({ name, imageFile }) => {
                const id =
                  (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
                    ? crypto.randomUUID()
                    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

                const newAlbum = {
                  id,
                  albumName: name,
                  imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
                } satisfies Album;

                setAlbums((prev) => [newAlbum, ...prev]);
                setIsCreateOpen(false);
              }}
            />


          </div>
        </div>
      )}
    </main>
  );
}
