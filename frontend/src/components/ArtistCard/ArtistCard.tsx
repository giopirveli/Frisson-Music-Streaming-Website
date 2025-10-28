"use client";

import styles from "./ArtistCard.module.scss";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";
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

interface ArtistCardProps {
  id : number|string,
  name: string;
  artistUrl: string | StaticImageData;
  onClick?: () => void;
  hideHoverEfect?: boolean;
}

export default function ArtistCard({
  id,
  name,
  artistUrl,
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

  // Fixed floating ref
  const floatingDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (floatingDivRef.current) {
      refs.setFloating(floatingDivRef.current);
    }
  }, [refs, isMenuOpen]);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`${styles.imageWrapper} ${isHovered ? styles.hoveredImgWrapper : ""}`}>
        <Image
          src={artistUrl}
          alt={`${name} Artist`}
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

          {/* Fixed ref using callback */}
          <div
            ref={(el) => refs.setReference(el)}
            {...getReferenceProps({
              className: styles.btnWhiteBackground,
              onMouseDown: stop,
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
            ref={floatingDivRef}
            {...getFloatingProps({
              style: { ...floatingStyles, zIndex: 99999 },
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

      <div className={styles.textWrapper}>
        <p className={styles.textTop}>{name}</p>
      </div>
    </div>
  );
}
