"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./SongListTable.module.scss";
import HeartBtn from "../Heartbtn/HeartBtn";
import photo from "../../assets/images/table/artistphoto.png";
import ThreeDotsBtn from "../ThreeDotsBtn/ThreeDotsBtn";
import ThreeDotsList from "../ThreeDotsList/ThreeDotsList";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  size,
} from "@floating-ui/react";

type Song = {
  id: number | string;
  pic?: string;
  name?: string;
  album?: string;
  artist?: string;
  time?: string;
  liked?: boolean;
};

export default function SongListTable() {
  const [songs] = useState<Song[]>(
    Array.from({ length: 4 }).map((_, i) => ({
      id: i + 1,
      pic: "",
      name: "No information",
      album: "No information",
      artist: "No information",
      time: "No information",
      liked: false,
    }))
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<number | string | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const floatingDivRef = useRef<HTMLDivElement | null>(null);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const PLAYER_H = 96;

  const { refs, floatingStyles } = useFloating({
    open: menuOpen,
    onOpenChange: setMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(2),
      flip({
        crossAxis: true,
        rootBoundary: "viewport",
        fallbackPlacements: ["bottom-start", "top-end", "top-start"],
        fallbackStrategy: "bestFit",
        padding: 8,
      }),
      shift({
        crossAxis: true,
        rootBoundary: "viewport",
        padding: PLAYER_H + 8,
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.max(availableWidth, 220)}px`,
            maxHeight: `${Math.max(availableHeight - PLAYER_H - 8, 180)}px`,
            overflow: "auto",
          });
        },
        rootBoundary: "viewport",
        padding: 8,
      }),
    ],
  });

  useEffect(() => {
    if (floatingDivRef.current) {
      refs.setFloating(floatingDivRef.current);
    }
  }, [refs, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const trg = e.target as Node;
      const floatingEl = refs.floating.current;
      const refEl = refs.reference.current as Node | null;
      if (floatingEl && floatingEl.contains(trg)) return;
      if (refEl && refEl.contains(trg)) return;
      setMenuOpen(false);
      setActiveRowId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen, refs.floating, refs.reference]);

  const onThreeDotsClick = (e: React.MouseEvent<HTMLElement>, rowId: number | string) => {
    stop(e);
    const el = e.currentTarget as HTMLElement;
    lastTriggerRef.current = el;
    refs.setReference(el);
    setActiveRowId(rowId);
    setMenuOpen((v) => !v);
  };

  return (
    <div className={styles.table}>
      <table className={styles.list}>
        <thead>
          <tr className={styles.thead}>
            <th>#</th>
            <th>Song Name</th>
            <th>Album</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {songs.map((song, i) => (
            <tr key={song.id}>
              <td className={styles.songId}>{i + 1}</td>
              <td className={styles.songName}>
                <div className={styles.imageWrapper}>
                  <Image src={song.pic || photo} alt={song.name ?? "song"} />
                </div>
                <div className={styles.songNameBox}>
                  <span className={styles.songNameText}>{song.name}</span>
                  <span className={styles.songArtistText}>{song.artist}</span>
                </div>
              </td>
              <td>{song.album}</td>
              <td>{song.time}</td>
              <td>
                <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <span onMouseDown={stop} onClick={stop}>
                    <HeartBtn
                      iconColor="gray"
                      onToggle={() => {
                        /* wire later */
                      }}
                    />
                  </span>
                  <span
                    onMouseDown={stop}
                    onClick={(e) => onThreeDotsClick(e, song.id)}
                    aria-expanded={menuOpen && activeRowId === song.id}
                    aria-haspopup="menu"
                    style={{ display: "inline-flex", cursor: "pointer" }}
                  >
                    <ThreeDotsBtn iconColor="white" open={menuOpen && activeRowId === song.id} />
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {menuOpen && (
        <FloatingPortal>
          <div
            ref={floatingDivRef}
            style={{ ...floatingStyles, zIndex: 99999 }}
            onMouseDown={stop}
            onClick={stop}
            data-open="true"
          >
            <ThreeDotsList withoutPlaylist />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
