"use client";

import styles from "./MusicCard.module.scss";
import { useState } from "react";
import HeartBtn from "../Heartbtn/HeartBtn";
import ThreeDotsBtn from "../ThreeDots/ThreeDotsBtn";
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

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

export default function MusicCard({
  title,
  artist,
  imageUrl,
  onClick,
  hideHoverEfect = false,
}: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { event: "click" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const showHoverControls = (isHovered || open) && !hideHoverEfect;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`${styles.imageWrapper} ${
          isHovered ? styles.hoveredImgWrapper : ""
        }`}
      >
        <img
          src={imageUrl}
          alt={`${title} — ${artist}`}
          className={styles.musicImage}
        />
      </div>

      {showHoverControls && (
        <div className={styles.heartButton}>
          <div
            className={styles.btnWhiteBackground}
            onMouseDown={stop}
            onClick={stop}
          >
            <HeartBtn
              iconColor={isLiked ? "black" : "gray"}
              liked={isLiked}
              onToggle={() => setIsLiked((v) => !v)}
            />
          </div>

          <ThreeDotsBtn
            ref={refs.setReference}
            {...getReferenceProps({
              className: styles.threeDotsBtn,
              onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
              "aria-expanded": open,
              "aria-haspopup": "menu",
            })}
            iconColor="black"
            open={open}
          />
        </div>
      )}

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            {...getFloatingProps({
              style: { ...floatingStyles, zIndex: 99999 },
              className: styles.threeDotsMenuCoordinates,
              onMouseDown: stop,
              onClick: stop,
            })}
          >
            <ThreeDotsList />
          </div>
        </FloatingPortal>
      )}

      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{title}</p>
        <p className={styles.textBottom}>{artist}</p>
      </div>
    </div>
  );
}
