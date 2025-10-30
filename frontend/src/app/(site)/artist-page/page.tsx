"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useEffect, useState } from "react";
// import { Colors } from "../../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
// import AlbumCard from "@/components/AlbumCard/AlbumCard";
import { usePathname } from "next/navigation";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import axios from "axios";
import SongListTable from "@/components/SongListTable/SongListTable";

export default function ArtistPage() {
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useActiveTab();

  useEffect(() => {
    setActiveTab(1);
  }, [pathname, setActiveTab]);

  type Artist = {
    id: number | string;
    artistUrl: string;
    name: string;
  };

  const [res, setRes] = useState<Artist[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/authors")
      .then((res) => setRes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className={styles.main}>
      {activeTab === 1 && (
        <div className={styles.artistPage}>
          <h4>trending now</h4>
          <div className={styles.artistCard}>
            {res.length > 0 &&
              res.map((_, i) => (
                <ArtistCard
                  key={i}
                  id={i}
                  artistUrl={res[i].artistUrl}
                  name={res[i].name}
                  onClick={() => setActiveTab(2)}
                />
              ))}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <>
          <NewsComponent
            title="peggy gou"
            button="follow"
            imageUrl="/Images/NewsComponent/peggyGou.jpg"
            verified
            plays={`745,090 fans`}
          />
          <SongListTable />
        </>
      )}
    </main>
  );
}
