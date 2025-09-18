// components/ThreeDots/ThreeDotsBtn.tsx
"use client";
import Style from "./ThreeDotsBtn.module.scss";
import Image from "next/image";

type IconColor = "gray" | "white" | "black";

const iconSrc: Record<IconColor, string> = {
  gray: "/icons/ThreeDots/grayThreeDots.svg",
  black: "/icons/ThreeDots/blackThreeDots.svg",
  white: "/icons/ThreeDots/whiteThreeDots.svg",
};

export default function ThreeDotsBtn({
  iconColor = "white",
  open = false,
  onToggle,
}: {
  iconColor?: IconColor;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      className={Style.threeDotsBtn}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={onToggle}
    >
      <Image alt="More options" src={iconSrc[iconColor]} width={24} height={24} />
    </button>
  );
}
