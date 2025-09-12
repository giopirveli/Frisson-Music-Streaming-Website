"use client";
import Style from "./ThreeDotsBtn.module.scss";
import Image from "next/image";

interface Props {
  iconColor: "gray" | "white" | "black";
}

const iconSrc: Record<Props["iconColor"], string> = {
  gray: "/icons/ThreeDots/grayThreeDots.svg",
  black: "/icons/ThreeDots/blackThreeDots.svg",
  white: "/icons/ThreeDots/whiteThreeDots.svg",
};

export default function ThreeDotsBtn({ iconColor }: Props) {
  return (
    <button className={Style.threeDotsBtn}>
      <Image alt="Three dots icon" src={iconSrc[iconColor]} width={24} height={24} />
    </button>
  );
}
