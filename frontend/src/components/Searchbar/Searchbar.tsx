"use client"
import styles from "./Searchbar.module.scss";
import Image from "next/image";
type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconName?: string;
};

export default function Searchbar({
  onChange,
  placeholder = "Search...",
}: Props) {

  return (
      <div className={`${styles.wrapper} .searchbar-global`}>
        <Image
          className={styles.icon}
          src="/icons/Header/magnifier.svg"
          width={24}
          height={24}
          alt="search icon"
        />

        <input
          type="text" 
          className={styles.search}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("გაუშვი search ფუნქცია:", e.currentTarget.value);
            }
          }}
          />
      </div>
  );
}
