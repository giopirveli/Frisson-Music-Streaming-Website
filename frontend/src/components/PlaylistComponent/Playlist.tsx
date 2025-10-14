"use client";
import styles from "../PlaylistComponent/Playlist.module.scss";
import { useEffect, useState } from "react";
import PenButton from "../PenBtn/PenButton";
import BinButton from "../DeleteBinBtn/BinButton";
import { StaticImageData } from "next/image";
import Image from "next/image";
import axios from "axios";

interface PlaylistProps {
  id: number;
  description: string | StaticImageData;
  title?: string;
  imageUrl?: string | StaticImageData; // ← optional
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PlaylistComponent({
  id,
  description,
  title,
  imageUrl,
  onClick,
  onEdit,
  onDelete,
}: PlaylistProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);
  const showHoverControls = isHovered;

  useEffect(() => {
    axios
      .get<PlaylistProps[]>(`http://localhost:4000/playlists`) // fetch array
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setPlaylists(response.data);
      })
      .catch(console.error);
  }, []); // run only once

  const stopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const initial = (title?.trim()?.charAt(0) || "?").toUpperCase();

  return (
    <>
      {playlists.map((p) => (
        <div
          key={p.id} // use id if available
          className={`${styles.card}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
            {imageUrl ? (
              <Image
                src={typeof description === "string" ? description : description.src}
                alt="Playlist"
                fill
                className={styles.playlistImage}
              />
            ) : (
              <div className={styles.initialAvatar}>{initial}</div>
            )}
          </div>

          {showHoverControls && (
            <div className={styles.btnControlBox}>
              <div
                className={styles.btnWhiteBackground}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  stopClick(e);
                  onEdit?.();
                }}
                aria-label="Edit playlist"
              >
                <PenButton />
              </div>

              <div
                className={styles.btnWhiteBackground}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  stopClick(e);
                  onDelete?.();
                }}
                aria-label="Delete playlist"
              >
                <BinButton />
              </div>
            </div>
          )}

          <div className={styles.textWrapper}>
            <p className={styles.text}>{p.title}</p>
            {p.title && <p>{p.title}</p>}
          </div>
        </div>
      ))}
    </>
  );
}
