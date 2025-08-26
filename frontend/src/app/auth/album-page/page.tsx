"use client";
import NewsComponent from "@/components/NewsComponent/NewsComponent";
import styles from "../../../app/auth/AlbumPage/page.module.scss"
import SongListTable from "@/components/SongListTable/SongListTable";

export default function AlbumPage() {
return(
<main className={styles.main}>
  <NewsComponent plays={"Released 07/12/2023"} title="Seek For Marktoop" imageUrl="/Images/NewsComponent/NewComponentTest.jpg" />
  <div>
    <SongListTable/>
  </div>

</main>


)
}