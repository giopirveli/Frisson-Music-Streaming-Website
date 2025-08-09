"use client";
import Style from "./3dots.module.scss";
import Image from "next/image";

export default function threeDotsBtn() {
  return (
    <button className={`${Style.threeDotsBtn}`}>
      <Image alt="Heart icon" src="/icons/3dots/3dots.svg" width={24} height={24} />
    </button>
  );
}
