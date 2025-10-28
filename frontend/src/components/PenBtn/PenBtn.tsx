"use client";
// import { Colors } from "../../styles/colors.enum";
import styles from "../PenBtn/Pen.module.scss";
import Image from "next/image";

// type props = {
//   bgcolor?: Colors;
// };

export default function PenButton() {
  return (
    <button className={styles.PenButton}>
      <Image alt="Pen Button" src="/icons/PenBtn/Pen, Edit.svg" width={24} height={24} />
    </button>
  );
}
