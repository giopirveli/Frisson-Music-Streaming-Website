"use client";
import { useState } from "react";
import style from "./Heart.module.scss";
import Image from "next/image";
import black from "/public/icons/HeartButton/defaultBlack.svg";
import gray from "/public/icons/HeartButton/defaultGray.svg";

type props = {
    liked: boolean;
    onToggle: () => void;
    iconColor: "gray" | "black";
}

export default function HeartBtn({ iconColor, liked, onToggle }: props) {
    const src = iconColor === "black" ? black : gray;
    return (
        <button
            className={`${style.heartButton} ${liked ? style.liked : ""}`}
            onClick={onToggle}
        >
            <Image
                alt="Heart icon"
                src={src}
                width={24}
                height={24}
            /> {/* propebi daamate rom zomebi chaewodebodes */}
        </button>
    )
}

