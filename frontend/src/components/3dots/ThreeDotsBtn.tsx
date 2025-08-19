"use client";
import Style from "./ThreeDotsBtn.module.scss";
import Image from "next/image";

export default function ThreeDotsBtn() {
  return (
    <button className={`${Style.threeDotsBtn}`}>
      <Image alt="Heart icon" src="/icons/3dots/3dots.svg" width={24} height={24} /> {/* propebi daamate rom zomebi chaewodebodes */}
    </button>
  );
}
