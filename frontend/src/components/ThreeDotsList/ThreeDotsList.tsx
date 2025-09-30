// components/ThreeDots/ThreeDotsList.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./ThreeDotsList.module.scss";
import arrow from "../../../public/icons/Arrow/arrow.svg";
import Button from "../Button/button";
import CreatePlaylistCard from "../CreatePlaylistCard/CreatePlaylistCard";

type Playlist = { id?: string; name?: string; withoutPlaylist?: boolean; };

const mockPlaylists: Playlist[] = [
  { id: "1", name: "Playlist 1" },
  { id: "2", name: "Playlist 2" },
  { id: "3", name: "Playlist 3" },
  { id: "4", name: "Playlist 1" },
  { id: "5", name: "Playlist 2" },
  { id: "6", name: "Playlist 3" },
  { id: "7", name: "Playlist 1" },
  { id: "8", name: "Playlist 2" },
];

export default function ThreeDotsList({withoutPlaylist}:Playlist) {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const stop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const toggleCheck = (id: string) =>
    setSelected((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div
      className={styles.ListboxContainer}
      onMouseDown={stop}
      onClick={stop}
    >
      {activeTab === 1 && (
        <div className={styles.Listbox} role="menu" aria-label="More options">
          {!withoutPlaylist && <button
            type="button"
            className={styles.ListboxBtn}
            role="menuitem"
            onClick={() => setActiveTab(2)}
          >
            <Image src={"/icons/ThreeDots/disc.svg"} alt="" width={24} height={24} />
            <span>Add to playlists</span>
          </button>}

          <button
            type="button"
            className={styles.ListboxBtn}
            role="menuitem"
          >
            <Image src={"/icons/ThreeDots/album.svg"} alt="" width={24} height={24} />
            <span>View Album</span>
          </button>

          <button
            type="button"
            className={styles.ListboxBtn}
            role="menuitem"
          >
            <Image src={"/icons/ThreeDots/artist.svg"} alt="" width={24} height={24} />
            <span>View Artist</span>
          </button>
        </div>
      )}

      {activeTab === 2 && (
        <div className={styles.playListbox} role="dialog" aria-label="Add To Playlist">
          <div className={styles.playListboxHeader}>
            <button
              type="button"
              className={styles.backBtn}
              aria-label="Go back"
              onClick={() => setActiveTab(1)}
            >
              <Image src={arrow} width={20} height={20} alt="back" />
            </button>
            <span className={styles.title}>Add To Playlist</span>
          </div>

          <button
            type="button"
            className={styles.addPlayList}
            onClick={() => setActiveTab(3)}
          >
            <Image src={"/icons/ThreeDots/ic_round-plus.svg"} alt="" width={20} height={20} />
            New playlist
          </button>

          <div className={styles.playListboxContent}>
            <form
              className={styles.playListboxContentForm}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle selected playlist IDs
              }}
            >
              {mockPlaylists.map((pl) => (
                <label key={pl.id} className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                  />
                  <span>{pl.name}</span>
                </label>
              ))}
              <Button text="Save" />
            </form>
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div className={styles.CreatePlaylistCard}>
          <CreatePlaylistCard
            isPreviousArrow
            previewOnClick={() => setActiveTab(2)}
          />
        </div>
      )}
    </div>
  );
}
