// components/ThreeDots/ThreeDotsBtn.tsx
"use client";
import Style from "./ThreeDotsBtn.module.scss";
import Image from "next/image";
import { forwardRef } from "react";

type IconColor = "gray" | "white" | "black";

const iconSrc: Record<IconColor, string> = {
  gray: "/icons/ThreeDots/grayThreeDots.svg",
  black: "/icons/ThreeDots/blackThreeDots.svg",
  white: "/icons/ThreeDots/whiteThreeDots.svg",
};

interface ThreeDotsBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconColor?: IconColor;
  open?: boolean;
}

const ThreeDotsBtn = forwardRef<HTMLButtonElement, ThreeDotsBtnProps>(
  ({ iconColor = "white", open = false, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={Style.threeDotsBtn}
        aria-haspopup="menu"
        aria-expanded={open}
        {...rest}
      >
        <Image alt="More options" src={iconSrc[iconColor]} width={24} height={24} />
      </button>
    );
  }
);

ThreeDotsBtn.displayName = "ThreeDotsBtn";
export default ThreeDotsBtn;
