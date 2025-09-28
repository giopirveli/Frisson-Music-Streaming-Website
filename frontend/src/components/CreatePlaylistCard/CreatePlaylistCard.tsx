"use client";

import { useState } from "react";
import styles from "./CreatePlaylistCard.module.scss";
import Image from "next/image";
import Button from "../Button/button";

export type CreatePlaylistPayload = {
  name: string;
  imageFile?: File | null; // ახლა არ ვიყენებთ
};

export default function CreatePlaylistCard({
  isPreviousArrow,
  previewOnClick,
  onSave,
}: {
  isPreviousArrow?: boolean;
  previewOnClick?: () => void; // back/close
  onSave?: (payload: CreatePlaylistPayload) => void;
}) {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    onSave?.({ name: name.trim(), imageFile: null });
  };

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.header} ${isPreviousArrow ? styles.headerWithgap : ""}`}>
        {isPreviousArrow && (
          <button
            type="button"
            className={styles.backBtn}
            onClick={previewOnClick}
            aria-label="Back"
          >
            <Image src={"/icons/Arrow/arrow.svg"} width={20} height={20} alt="" />
          </button>
        )}

        <span className={styles.title}>Create New Playlist</span>
        <div />
      </div>

      <div className={styles.body}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Playlist name"
          maxLength={80}
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className={styles.dropZone} aria-hidden>
          <div className={styles.controlSize}>
            <Image alt="" fill src={"/icons/CreatePlaylist/CreatePlaylist.svg"} />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.saveBtn}>
          <Button text="Save" onClick={handleSave}  />
        </div>
      </div>
    </div>
  );
}

