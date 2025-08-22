"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
   const pathname = usePathname();
   const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
   return (
      <Link
         href={href}
         className={`${styles.item} ${isActive ? styles.active : ""}`}
         aria-current={isActive ? "page" : undefined}
      >
         <Image src={icon} width={20} height={20} alt="" />
         <span>{label}</span>
      </Link >
   );
}

export default function Sidebar() {
      const base = "/auth";
   return (
      <aside className={styles.sidebar}>
         <Link href="/" aria-label="Home" className={styles.frissonMainLogo}>
            <Image src="/icons/Sidebar/logo.png" width={78} height={63} alt="Frisson logo" />
         </Link>

         <nav className={styles.menu}>
            <div className={styles.mainMenu}>
               <NavItem href="/" icon="/icons/Sidebar/home.svg" label="home" />
               <NavItem href="/recommendations" icon="/icons/Sidebar/recommendations.svg" label="recommendations" />
               <NavItem href="/top-hits" icon="/icons/Sidebar/topHits.svg" label="top hits" />
               <NavItem href={`${base}/TopChartsPage`} icon="/icons/Sidebar/topCharts.svg" label="top charts" />
            </div>

            <div className={styles.collectionMenu}>
               <h4>collection</h4>
               <NavItem href="/playlists" icon="/icons/Sidebar/playlists.svg" label="playlists" />
               <NavItem href="/favorites" icon="/icons/Sidebar/favorites.svg" label="favorites" />
            </div>

            <div className={styles.discoverMenu}>
               <h4>discover</h4>
               <NavItem href="/auth/ArtistPage" icon="/icons/Sidebar/artist.svg" label="artist" />
               <NavItem href="/albums" icon="/icons/Sidebar/album.svg" label="album" />
            </div>
         </nav>
      </aside>
   );
}
