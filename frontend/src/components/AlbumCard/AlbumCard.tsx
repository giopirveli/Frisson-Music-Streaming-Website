"use client";

import styles from "../AlbumCard/AlbumCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect, useRef } from "react";
import HeartBtn from "../Heartbtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDotsBtn/ThreeDotsBtn";
import ThreeDotsList from "../ThreeDotsList/ThreeDotsList";

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";

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
  title,
  artist,
  imageUrl,
  onClick,
  hideHoverEfect = false,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const PLAYER_H = 96;

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    middleware: [
      offset(8),
      flip({
        padding: PLAYER_H,
        fallbackPlacements: ["top-end"],
        fallbackStrategy: "bestFit",
      }),
      shift({ padding: PLAYER_H }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { event: "click" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const showHoverControls = (isHovered || isMenuOpen) && !hideHoverEfect;

  // Fixed: assign floating ref via useRef + useEffect
  const floatingDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (floatingDivRef.current) {
      refs.setFloating(floatingDivRef.current);
    }
  }, [refs, isMenuOpen]);

  return (
    <div
      className={`${styles.card} ${artist ? "" : styles.cardHightPx}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={styles.imageWrapperBox}>
        <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
          <Image
            src={imageUrl}
            alt={`${title}${artist ? ` — ${artist}` : ""}`}
            className={styles.musicImage}
            fill
          />
        </div>

        {showHoverControls && (
          <div className={styles.heartButton}>
            {/* Heart button */}
            <div className={styles.btnWhiteBackground} onMouseDown={stop} onClick={stop}>
              <HeartBtn
                liked={isLiked}
                iconColor={isLiked ? "black" : "gray"}
                onToggle={() => setIsLiked((v) => !v)}
              />
            </div>

            {/* Three dots button */}
            <div
              ref={(el) => refs.setReference(el)} // fixed callback ref
              {...getReferenceProps({
                className: styles.btnWhiteBackground,
                onMouseDown: stop,
                onPointerDown: stop,
                onClick: stop,
                "aria-expanded": isMenuOpen,
                "aria-haspopup": "menu",
              })}
            >
              <ThreeDotsBtn iconColor="black" open={isMenuOpen} />
            </div>
          </div>
        )}

        {isMenuOpen && (
          <FloatingPortal>
            <div
              ref={floatingDivRef} // fixed via useEffect
              {...getFloatingProps({
                style: { ...floatingStyles, zIndex: 9999 },
                className: styles.threeDotsMeniuCoordinates,
                onMouseDown: stop,
                onClick: stop,
              })}
              data-open="true"
            >
              <ThreeDotsList />
            </div>
          </FloatingPortal>
        )}
      </div>

      <div className={styles.textWrapper}>
        {artist && <p className={styles.textBottom}>{artist}</p>}
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
