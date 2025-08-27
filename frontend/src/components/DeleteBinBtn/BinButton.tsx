"use client";
import {Colors} from "../../../styles/colors.enum";
import { useState } from "react";
import styles from "../DeleteBinBtn/Bin.module.scss"
import Image from "next/image";

type props ={
    bgcolor?:Colors
}

export default function BinButton({bgcolor}:props) {
    return (
        <button className={styles.BinButton}>
          <Image
                alt="Bin Button"
                src="/icons/DeleteBinBtn/DeleteBin.svg"

                width={24}
                height={24}
          />
        </button>
    )
}