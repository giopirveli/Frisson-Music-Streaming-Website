"use client";

import Searchbar from "../Searchbar/Searchbar";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import arrow from "@/../public/icons/Arrow/arrow.svg";
import { useActiveTab } from "@/components/Context/ActiveTabContext";

export default function Header() {
  const pathname = usePathname();
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, ""); // remove trailing slash
  const { activeTab, setActiveTab } = useActiveTab();

  // Pages logic
  const noHeaderPages = ["/top-hits-page", "/top-charts-page"]; // no search, no arrow
  const arrowConditionalPages = ["/artist-page", "/album-page"]; // arrow appears only if activeTab===2

  // Robust main page detection
  const isHomePage = normalizedPath === "" || normalizedPath === "/" || normalizedPath === "/index";

  let content = null;

  // 1️⃣ Home page: search only
  if (isHomePage) {
    content = <Searchbar placeholder="artists, tracks, albums" />;

    // 2️⃣ Pages with nothing in header (Top-Hits / Top-Charts)
  } else if (noHeaderPages.some((route) => normalizedPath.startsWith(route))) {
    content = null;

    // 3️⃣ Playlists page: arrow only when activeTab === 2, no searchbar
  } else if (
    normalizedPath.startsWith("/playlists") ||
    normalizedPath.startsWith("/playlists-page")
  ) {
    content = (
      <div className={styles.searchArrow}>
        {activeTab === 2 && (
          <Image src={arrow} className={styles.arrow} alt="arrow" onClick={() => setActiveTab(1)} />
        )}
      </div>
    );

    // 4️⃣ Artist & Album pages: search + conditional arrow
  } else if (arrowConditionalPages.some((route) => normalizedPath.startsWith(route))) {
    content = (
      <div className={styles.searchArrow}>
        {activeTab === 2 && (
          <Image src={arrow} className={styles.arrow} alt="arrow" onClick={() => setActiveTab(1)} />
        )}
        <Searchbar placeholder="artists, tracks, albums" />
      </div>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.searchbar}>{content}</div>

      <Link href="sign-in">
        <Image
          src="/icons/Header/user.svg"
          className={styles.user}
          width={32}
          height={32}
          alt="user icon"
        />
      </Link>
    </header>
  );
}
