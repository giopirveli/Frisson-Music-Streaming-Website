"use client";
import { Colors } from "../../../styles/colors.enum";
import styles from "../DeleteBinBtn/Bin.module.scss";
import Image from "next/image";

type Props = {
  bgcolor?: Colors;
  onClick?: () => void;
};

export default function BinButton({ bgcolor, onClick }: Props) {
  return (
    <button className={styles.BinButton} onClick={onClick}>
      <Image
        alt="Bin Button"
        src="/icons/DeleteBinBtn/DeleteBin.svg"
        width={24}
        height={24}
      />
    </button>
  );
}
