"use client";
import { useState } from "react";
import  Style  from "./heart.module.scss";
import Image from "next/image";


export default function heartBtn() {
    const [liked, setLiked] = useState(false);
    
    return (
        <button
            className={`${Style.heartButton} ${liked ? Style.liked : ""}`}
            onClick={() =>{setLiked(!liked)}}
        >
            <Image
                alt="Heart icon"
                src="/icons/HeartButton/heart-syle-1.svg"
                width={24}
                height={24}
            />
        </button>
    )
}

