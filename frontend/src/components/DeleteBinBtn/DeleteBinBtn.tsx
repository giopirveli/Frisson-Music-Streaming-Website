"use client";
import styles from "../DeleteBinBtn/DeleteBinBtn.module.scss";
import Image from "next/image";

export default function BinButton() {
  return (
    <button className={styles.BinButton}>
      <Image alt="Bin Button" src="/icons/DeleteBinBtn/DeleteBin.svg" width={24} height={24} />
    </button>
  );
}
