"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ThreeDotsList.module.scss";
import arrow from "../../../public/icons/Arrow/arrow.svg";
import Button from "../Button/Button";
import CreatePlaylistCard, { CreatePlaylistPayload } from "../CreatePlaylistCard/CreatePlaylistCard";

type Playlist = { id: string; name: string; imageUrl?: string };

export default function ThreeDotsList({ withoutPlaylist }: { withoutPlaylist?: boolean }) {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Загружаем сохранённые плейлисты при старте
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists") || "[]");
    setPlaylists(saved);
  }, []);

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("playlists", JSON.stringify(playlists));
    }
  }, [playlists]);

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const handleSavePlaylist = (payload: CreatePlaylistPayload) => {
    const id = Date.now().toString();

    if (payload.imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const newPlaylist = { id, name: payload.name, imageUrl: base64 };
        setPlaylists((prev) => [...prev, newPlaylist]);

        // сохраняем сразу
        const updated = [...playlists, newPlaylist];
        localStorage.setItem("playlists", JSON.stringify(updated));
      };
      reader.readAsDataURL(payload.imageFile);
    } else {
      const newPlaylist = { id, name: payload.name };
      const updated = [...playlists, newPlaylist];
      setPlaylists(updated);
      localStorage.setItem("playlists", JSON.stringify(updated));
    }

    setActiveTab(2);
  };

  return (
    <div
      className={styles.ListboxContainer}
      onMouseDown={stop}
      onClick={stop}
    >
      {activeTab === 1 && (
        <div className={styles.Listbox} role="menu" aria-label="More options">
          {!withoutPlaylist && (
            <button
              type="button"
              className={styles.ListboxBtn}
              role="menuitem"
              onClick={() => setActiveTab(2)}
            >
              <Image src={"/icons/ThreeDots/disc.svg"} alt="" width={24} height={24} />
              <span>Add to playlists</span>
            </button>
          )}

          <button type="button" className={styles.ListboxBtn} role="menuitem">
            <Image src={"/icons/ThreeDots/album.svg"} alt="" width={24} height={24} />
            <span>View Album</span>
          </button>

          <button type="button" className={styles.ListboxBtn} role="menuitem">
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
                console.log("Selected playlists:", selected);
              }}
            >
              {playlists.map((pl) => (
                <label key={pl.id} className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={!!selected[pl.id]}
                    onChange={() =>
                      setSelected((p) => ({ ...p, [pl.id]: !p[pl.id] }))
                    }
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
            onSave={handleSavePlaylist}
          />
        </div>
      )}
    </div>
  );
}
