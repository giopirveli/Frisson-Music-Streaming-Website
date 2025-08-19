"use client";
import {Colors} from "../../../styles/colors.enum";
import { useState } from "react";
import  style  from "./Heart.module.scss"; 
import Image from "next/image";

type props ={
    bgcolor?:Colors
}

export default function HeartBtn({bgcolor}:props) {
    const [liked, setLiked] = useState(false);
    return (
        <button
            className={`${style.heartButton } ${liked ? style.liked : ""}`}
            onClick={() => setLiked(!liked)}
        >
            <Image
                alt="Heart icon"
                src="/icons/HerartBtn/heart-syle-1.svg"

                width={24}
                height={24}
            /> {/* propebi daamate rom zomebi chaewodebodes */}
        </button>
    )
}

