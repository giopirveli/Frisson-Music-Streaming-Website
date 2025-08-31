"use client";
import Searchbar from "../Searchbar/Searchbar";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import arrow from "@/../public/icons/Header/arrow.svg";
import { useActiveTab } from "@/components/Context/ActiveTabContext"; // ← import hook

export default function Header({ showArrow = false }: { showArrow?: boolean }) {
   const { setActiveTab } = useActiveTab(); // ← get context
   const pathname = usePathname();  

   const hideSearchbarOn = ["/playlists", "/playlists-page"];
   const hideSearchbar = hideSearchbarOn.some(route => pathname.toLowerCase().startsWith(route));

   return (
      <header className={styles.header}>
         <div className={styles.searchbar}>
            {hideSearchbar ? (
               <Image src={arrow} className={styles.arrow} alt="arrow" onClick={() => setActiveTab(1)} />
            ) : (
               <div className={styles.searchArrow}>
                  <Image src={arrow} className={styles.arrow} alt="arrow" onClick={() => setActiveTab(1)} />
                  <Searchbar placeholder="artists, tracks, albums" />
               </div>
            )}
         </div>
         <Link href={"sign-in"}>
            <Image src="/icons/Header/user.svg" className={styles.user} width={32} height={32} alt="user icon" />
         </Link>
      </header>
   )
}
