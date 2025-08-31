"use client";
import Searchbar from "../Searchbar/Searchbar";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import arrow from "@/../public/icons/Header/arrow.svg";

type Props = {
   onArrowClick?: () => void;
   showArrow?: boolean;
}

export default function Header({ onArrowClick, showArrow = false }: Props) {
   const pathname = usePathname();  // 'usePathname' = keyword, 'pathname' = ours

   // ========================
   // Hide Searchbar on certain pages
   // ========================
   const hideSearchbarOn = [
      "/playlists", // random useless link
      "/playlists-page" // link 
   ];

   const hideSearchbar = hideSearchbarOn.some(route => pathname.toLowerCase().startsWith(route));
   return (
      <header className={styles.header}> {/* only show header if not in hidden routes */}
         <div className={styles.searchbar}>
            {hideSearchbar ? (
               <Image src={arrow} className={styles.arrow} alt="arrow" onClick={onArrowClick} />
            ) : (
               <div className={styles.searchArrow}>
                  <Image src={arrow} className={styles.arrow} alt="arrow" onClick={onArrowClick} />
                  <Searchbar placeholder="artists, tracks, albums" />
               </div>
            )}
         </div>
         <Link href={"sign-in"} ><Image src="/icons/Header/user.svg" className={styles.user} width={32} height={32} alt="user icon" /> {/* assetshi unda iyos amis icon */}</Link>
      </header>

   )
}