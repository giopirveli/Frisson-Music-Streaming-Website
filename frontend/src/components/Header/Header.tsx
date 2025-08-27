"use client";
import Searchbar from "../Searchbar/Searchbar";
import styles from "./Header.module.scss";
import Image from "next/image";
import { usePathname } from 'next/navigation';


export default function Header() {
   const pathname = usePathname();  // 'usePathname' = keyword, 'pathname' = ours

   // ========================
   // Hide Searchbar on certain pages
   // ========================
   const hideSearchbarOn = [
      "/auth/playlists", // random useless link
      "/auth/playlists-page" // link 
   ];
   const hideSearchbar = hideSearchbarOn.some(route => pathname.toLowerCase().startsWith(route));
   return (
      <header className={styles.header}> {/* only show header if not in hidden routes */}
         {!hideSearchbar &&
            <div className={styles.searchbar}>
               <Searchbar placeholder={"artists, tracks, albums"} />
            </div>}
         <Image src="/icons/Header/user.svg" className={styles.user} width={32} height={32} alt="user icon" /> {/* assetshi unda iyos amis icon */}
      </header>

   )
}