"use client";
import Style from "./ThreeDotsBtn.module.scss";
import Image from "next/image";


interface props {
  iconColor:"gray" | "white" | "black";
}


export default function ThreeDotsBtn({iconColor}:props) {
const iconSrc: any = {
  gray:  "/icons/ThreeDots/grayThreeDots.svg",
  black:  "/icons/ThreeDots/blackThreeDots.svg",
  white:  "/icons/ThreeDots/whiteThreeDots.svg",
};
const src = iconSrc[iconColor];


  return (
    <button className={`${Style.threeDotsBtn}`}>
      <Image alt="Heart icon" src={src} width={24} height={24} /> {/* propebi daamate rom zomebi chaewodebodes */}
    </button>
  );
}
