"use client";
import {Colors} from "../../../styles/colors.enum";
import { useState } from "react";
import styles from "../PenBtn/Pen.module.scss"
import Image from "next/image";

type props ={
    bgcolor?:Colors
}

export default function PenButton({bgcolor}:props) {
    return (
        <button className={styles.PenButton}>
          <Image
                alt="Pen Button"
                src="/icons/PenBtn/Pen, Edit.svg"

                width={24}
                height={24}
          />
        </button>
    )
}