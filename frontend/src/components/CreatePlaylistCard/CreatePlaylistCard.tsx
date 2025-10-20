"use client";

import { useState, useRef } from "react";
import styles from "./CreatePlaylistCard.module.scss";
import Image from "next/image";
import Button from "../Button/Button";

export type CreatePlaylistPayload = {
  name: string;
  imageFile?: File | null;
};

export default function CreatePlaylistCard({
  isPreviousArrow,
  previewOnClick,
  onSave,
}: {
  isPreviousArrow?: boolean;
  previewOnClick?: () => void;
  onSave?: (payload: CreatePlaylistPayload) => void;
}) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave?.({ name: name.trim(), imageFile });
  };

  return (
    <div className={styles.card}>
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

        {/* Upload zone */}
        <div
          className={styles.dropZone}
          onClick={() => inputRef.current?.click()}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          ) : (
            <div className={styles.controlSize}>
              <Image alt="Upload icon" fill src={"/icons/CreatePlaylist/CreatePlaylist.svg"} />
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.saveBtn}>
          <Button text="Save" onClick={handleSave} /> 
        </div>
      </div>
    </div>
  );
}
