"use client";
import { useState } from "react";
import  style  from "./Heart.module.scss"; 
import Image from "next/image";

type props ={
    iconColor: "gray" | "black"
}

export default function HeartBtn({iconColor}:props) {
    const [liked, setLiked] = useState(false);
    const src = iconColor === "black" ? "/icons/HeartButton/defaultBlack.svg" : "/icons/HeartButton/defaultGray.svg";
    return (
        <button
            className={`${style.heartButton } ${liked ? style.liked : ""}`}
            onClick={() => setLiked(!liked)}
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

