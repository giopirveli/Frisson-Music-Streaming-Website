"use client";
import { useState } from "react";
import styles from "../TopCharts/TopCharts.module.scss";
import Image from "next/image";
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

interface TopChartsProps {
  title: string;
  artist: string;
  duration: number;
  imageUrl: string;
}

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TopCharts({ title, artist, duration, imageUrl }: TopChartsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
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

  return (
    <div className={styles.TopChartsDiv}>
      <div className={styles.imgAndWrapperBox}>
        <div className={styles.imageWrapper}>
          <Image src={imageUrl} alt="Top Chart" className={styles.image} width={72} height={72} />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.textTop}>{title}</p>
          <p className={styles.textBottom}>{artist}</p>
        </div>
      </div>

      <div className={styles.durectionAndButtonsBox}>
        <p className={styles.durationTime}>{formatDuration(duration)}</p>

        <div className={styles.buttons}>
          <div className={styles.buttonsWrapper}>
            <HeartBtn iconColor="gray" liked={isLiked} onToggle={() => setIsLiked((v) => !v)} />

            <div
              ref={refs.setReference}
              {...getReferenceProps({
                onMouseDown: (e: React.MouseEvent) => stop(e),
                "aria-expanded": isMenuOpen,
                "aria-haspopup": "menu",
              })}
            >
              <ThreeDotsBtn iconColor="gray" open={isMenuOpen} />
            </div>
          </div>

          {isMenuOpen && (
            <FloatingPortal>
              <div
                ref={refs.setFloating}
                {...getFloatingProps({
                  style: { ...floatingStyles, zIndex: 999 },
                  className: styles.threeDotsMeniuCoordinates,
                  onMouseDown: stop,
                  onClick: stop,
                })}
              >
                <ThreeDotsList />
              </div>
            </FloatingPortal>
          )}
        </div>
      </div>
    </div>
  );
}
