"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./Table.module.scss";

import AlbumCard from "../AlbumCard/AlbumCard";
import SongListTable from "../SongListTable/SongListTable";

// your image should be at: frontend/public/Images/table/albumphoto.png
const albumPhoto = "/Images/table/albumphoto.png";

export default function Table() {
  const [activeTab, setActiveTab] = useState(1);
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/music")
      .then((res) => setSongs(res.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <div className={styles.table}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <div
          className={activeTab === 1 ? styles.active : ""}
          onClick={() => setActiveTab(1)}
        >
          top songs
        </div>
        <div
          className={activeTab === 2 ? styles.active : ""}
          onClick={() => setActiveTab(2)}
        >
          albums
        </div>
        <div
          className={activeTab === 3 ? styles.active : ""}
          onClick={() => setActiveTab(3)}
        >
          biography
        </div>
      </div>

      {/* Table */}
      {activeTab === 1 && <SongListTable />}

      {/* {activeTab === 2 && (
        <div className={styles.album}>
          <AlbumCard title="no information" imageUrl={albumPhoto} />
          <AlbumCard title="no information" imageUrl={albumPhoto} />
          <AlbumCard title="no information" imageUrl={albumPhoto} />
          <AlbumCard title="no information" imageUrl={albumPhoto} />
        </div>
      )} */}

      {activeTab === 3 && (
        <div className={styles.bio}>
          <div className={styles.bioPic}>
            <Image src={albumPhoto} alt="bio photo" width={400} height={400} />
          </div>
          <div className={styles.bioTexts}>
            <h1>peggy gou</h1>
            <p>
              Peggy Gou (born July 3, 1991) is a South Korean DJ and producer
              based in Berlin. Originally from Incheon, South Korea, she began
              taking piano lessons at the age of 8 and moved to London during
              her teenage years to study English. After a brief return to South
              Korea, Gou returned to England to study at the London College of
              Fashion. During this time, she also honed her skills in music
              production, a hobby she had started in her younger years. Upon
              moving to Berlin, Gou made her official debut in 2016 with the EPs
              <i> Art of War </i>and<i> Art of War II</i>, both released by the
              independent label Rekids, releasing a third EP titled{" "}
              <i>Seek for Maktoop</i> the same year. As her reputation grew, she
              landed gigs at some of the world’s most iconic venues, becoming
              the first Korean DJ to perform at the legendary Berlin nightclub
              Berghain. She has also shared the stage with renowned artists such
              as DJ Koze, Moodymann, The Blessed Madonna, and secured spots at
              festivals like Coachella, Glastonbury, and Primavera Sound. In
              2018, Peggy Gou released the EP <i>Once</i> via Ninja Tune
              Records, followed by the DJ mix album{" "}
              <i>DJ-Kicks: Peggy Gou</i> (2019), released by !K7 Records. In
              addition to receiving rave reviews, the album marked her first
              appearance on the Billboard chart, peaking at number 9. Heavily
              inspired by 90s dance music, the single <q>I Go</q> was released
              in 2021 and reached number 39 on the Hot Dance/Electronic Songs
              chart. Her debut album <i>I Hear You</i> was released in July
              2024, through XL Recordings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
