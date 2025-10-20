"use client";
import styles from "./page.module.scss";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import MusicCard from "@/components/MusicCard/MusicCard";
import TopCharts from "@/components/TopCharts/TopCharts";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Link from "next/link";
import "@/styles/defaults/defaultGrid.scss";

export default function Home() {

  return (
    <main className={styles.main}>
      <NewsComponent
        title="Top Hit Of The Week"
        imageUrl="/Images/NewsComponent/NewComponentTest.jpg"
        plays={`22222 Plays`}
      />

      <section className={styles.topHitsSection}>
        <div className={styles.topHitsSectionTextBox}>
          <h2>Top Hits</h2>

          <Link href={"/top-hits-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={`scrollbar`}> {/*styles.topHitsSectionCardsBox*/}

          {Array.from({ length: 9 }).map((_, i) =>
            <MusicCard key={i}
              title="Anyma"
              artist="Genesys II"
              imageUrl="/Images/MusicCard/MusicCardPhoto.jpg"
            />
          )}
        </div>
      </section>

      <section className={styles.topChartsSection}>
        <div className={styles.topChartsSectionTextBox}>
          <h2>Top Charts</h2>
          <Link href={"/top-charts-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={` scrollbar`}>

          {Array.from({ length: 9 }).map((_, i) =>
            <div className={styles.topCharts} key={i}>
              <TopCharts
                title="Sugar (feat. Francesco)"
                artist="By Robin Schulz"
                imageUrl="/Images/TopCharts/TopChartsImage.jpg"
                duration={345}
              />
              <TopCharts
                title="Sugar (feat. Francesco)"
                artist="By Robin Schulz"
                imageUrl="/Images/TopCharts/TopChartsImage.jpg"
                duration={345}
              />
            </div>

          )
          }


        </div>
      </section>

      <section className={styles.albumSection}>
        <div className={styles.albumSectionTextBox}>
          <h2>Popular Albums</h2>
          <Link href={"/album-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={`scrollbar`}>
          {Array.from({ length: 9 }).map((_, i) =>
            <AlbumCard key={i}
              title="Of Monsters And Men"
              artist="Fever Dream"
              imageUrl="/Images/AlbumCard/AlbumPhoto.jpg"
            />
          )
          }



        </div>
      </section>

      <section className={styles.artistSection}>
        <div className={styles.artistSectionTextBox}>
          <h2>Popular Artists</h2>
          <Link href={"/artist-page"}>
            <span>See all</span>
          </Link>
        </div>
        <div className={`scrollbar`}>
          {Array.from({ length: 9 }).map((_, i) =>
            <ArtistCard title="Billie Eilish" key={i} imageUrl="/Images/ArtistCard/ArtistPhoto.jpg" />
          )}

        </div>
      </section>
    </main>
  );
}
