"use client";

import styles from "../ArtistCard/ArtistCard.module.scss";
import Image from "next/image";
import { useState } from "react";
import HeartBtn from "../HeartBtn/HeartBtn";
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

interface ArtistCardProps {
  title: string;
  imageUrl: string;
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

export default function ArtistCard({
  title,
  imageUrl,
  onClick,
  hideHoverEfect = false,
}: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const PLAYER_H = 96; 

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: "bottom-end",
    strategy: "fixed", // <- overlay όλაზე ზემოდან
    middleware: [
      offset(8),
      flip({
        padding: PLAYER_H,                // ქვედა ზონას აფრთხილებ
        fallbackPlacements: ["top-end"],  // თუ ქვედა ადგილი ცოტა არის — ზემოთ
        fallbackStrategy: "bestFit",
      }),
      shift({ padding: PLAYER_H }),       // კიდეებთან არ „ეკრას“, პლეერის ზონაც ითვლება
    ],
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

  const showHoverControls = (isHovered || isMenuOpen) && !hideHoverEfect;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
        <Image
          src={imageUrl}
          alt={`${title} Artist`}
          className={styles.artistImage}
          width={234}
          height={226}
        />
      </div>

      {showHoverControls && (
        <div className={styles.heartButton}>
          <div className={styles.btnWhiteBackground} onMouseDown={stop} onClick={stop}>
            <HeartBtn
              iconColor={isLiked ? "black" : "gray"}
              liked={isLiked}
              onToggle={() => setIsLiked((v) => !v)}
            />
          </div>

          {/* Reference wrapper — ვტოვებთ მხოლოდ stopPropagation-ს, ტოგლი ახდენს useClick */}
          <div
            ref={refs.setReference}
            {...getReferenceProps({
              className: styles.btnWhiteBackground,
              onMouseDown: (e: any) => {
                // IMPORTANT: არავითარი setIsMenuOpen აქ — თორემ ორჯერ ტოგლდება
                stop(e);
              },
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
            ref={refs.setFloating}
            {...getFloatingProps({
              style: { ...floatingStyles, zIndex: 99999 },
              className: styles.threeDotsMeniuCoordinates, // შენს სახელებზე არ ვეხები
              onMouseDown: stop,
              onClick: stop,
            })}
            data-open="true"
          >
            <ThreeDotsList />
          </div>
        </FloatingPortal>
      )}

      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{title}</p>
      </div>
    </div>
  );
}
