"use client";

import styles from "./AlbumCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";
import HeartBtn from "../HeartBtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDotsBtn/ThreeDotsBtn";
import ThreeDotsList from "../ThreeDotsList/ThreeDotsList";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

interface AlbumCardProps {
  title?: string;
  artistName?: string;
  coverUrl: string | StaticImageData;
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

export default function AlbumCard({
  title,
  artistName,
  coverUrl,
  onClick,
  hideHoverEfect = false,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    middleware: [
      offset(8),
      flip({ padding: 96, fallbackPlacements: ["top-end"], fallbackStrategy: "bestFit" }),
      shift({ padding: 96 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { event: "click" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation(); // prevents hover buttons from triggering onClick
  };

  const showHoverControls = (isHovered || isMenuOpen) && !hideHoverEfect;

  // Fix for Floating UI warning
  const floatingDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (floatingDivRef.current) {
      refs.setFloating(floatingDivRef.current);
    }
  }, [refs, isMenuOpen]);

  return (
    <div
      className={`${styles.card} ${artistName ? "" : styles.cardHightPx}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // triggers parent tab change
    >
      <div className={styles.imageWrapperBox}>
        <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
          <Image
            src={coverUrl}
            alt={`${title}${artistName ? ` — ${artistName}` : ""}`}
            className={styles.musicImage}
            fill
          />
        </div>

        {showHoverControls && (
          <div className={styles.heartButton}>
            <div className={styles.btnWhiteBackground} onMouseDown={stop} onClick={stop}>
              <HeartBtn
                liked={isLiked}
                iconColor={isLiked ? "black" : "gray"}
                onToggle={() => setIsLiked((v) => !v)}
              />
            </div>

            <div
              ref={(el) => refs.setReference(el)}
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
              ref={floatingDivRef} // fix applied here
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
        {artistName && <p className={styles.textBottom}>{artistName}</p>}
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
