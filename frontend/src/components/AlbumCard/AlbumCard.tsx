"use client";
import styles from "../AlbumCard/AlbumCard.module.scss";
import Image, { StaticImageData } from "next/image";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDots/ThreeDotsBtn";
import ThreeDotsList from "../ThreeDots/ThreeDotsList";
import { useEffect, useRef, useState } from "react";

interface AlbumCardProps {
  title: string;
  artist?: string;
  imageUrl: string | StaticImageData;
  width?: string | number;
  height?: string | number;
  hight?: string | number;
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

export default function AlbumCard({
  title, artist, imageUrl, onClick, hideHoverEfect = false,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isTreeDotsMeniu, setisTreeDotsMeniu] = useState(false);

  const dotsBtnRef = useRef<HTMLDivElement | null>(null);  // ღილაკის wrapper
  const menuWrapRef = useRef<HTMLDivElement | null>(null); // მენიუს wrapper

  // outside-click + Escape
  useEffect(() => {
    if (!isTreeDotsMeniu) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      const onMenu = menuWrapRef.current?.contains(t) ?? false;
      const onBtn = dotsBtnRef.current?.contains(t) ?? false;
      if (!onMenu && !onBtn) setisTreeDotsMeniu(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setisTreeDotsMeniu(false); };

    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [isTreeDotsMeniu]);

  const showHoverControls = isHovered && !hideHoverEfect;
  const stopClick = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); };

  return (
    <div
      className={`${styles.card} ${artist ? "" : styles.cardHightPx}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ position: "relative" }} // აუცილებელია absolute ელემენტებისთვის
    >
      <div className={styles.imageWrapperBox}>
        <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
          <Image src={imageUrl} alt={`${title}${artist ? ` — ${artist}` : ""}`} className={styles.musicImage} fill />
        </div>

        {showHoverControls && (
          <div className={styles.heartButton}>
            <div className={styles.btnWhiteBackground} onMouseDown={(e) => e.stopPropagation()} onClick={stopClick}>
              <HeartBtn
                liked={isLiked}
                iconColor={isLiked ? "black" : "gray"}
                onToggle={() => setIsLiked(v => !v)}
              />
            </div>

            {/* ღილაკის wrapper + ref */}
            <div
              ref={dotsBtnRef}
              className={styles.btnWhiteBackground}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={stopClick}
            >
              <ThreeDotsBtn
                iconColor="black"
                open={isTreeDotsMeniu}
                onToggle={() => setisTreeDotsMeniu(v => !v)}
              />
            </div>
          </div>
        )}
      </div>

      {/* მენიუს wrapper + ref + stopPropagation */}
      {isTreeDotsMeniu && (
        <div
          ref={menuWrapRef}
         className={styles.TreeDotsMeniuCordinat}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <ThreeDotsList />
        </div>
      )
      }

      <div className={styles.textWrapper}>
        {artist && <p className={styles.textBottom}>{artist}</p>}
        <p className={styles.textTop}>{title}</p>
      </div>
    </div >
  );
}
