import Image from "next/image";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
   return (
<>
      <aside className={styles.sidebar}>
      <Image src="/icons/Sidebar/logo.png" className={styles.frisson} width={98} height={83} alt="logo" />
      
      
      <div className={styles.menu}>
<div className={styles.mainMenu}>

         <div>
            <Image src="/icons/Sidebar/home.svg" width={24} height={24} alt="logo" />
            <p>home</p>
         </div>
         <div>
            <Image src="/icons/Sidebar/recommendations.svg" width={24} height={24} alt="logo" />
            <p>recommendations</p>

         </div>
         <div>
            <Image src="/icons/Sidebar/topHits.svg" width={24} height={24} alt="logo" />
            <p>top hits</p>
         </div>
         <div>
            <Image src="/icons/Sidebar/topCharts.svg" width={24} height={24} alt="logo" />            
            <p>top charts</p>

         </div>
</div>

      <div className={styles.collectionMenu}>
         <h4>collection</h4>
         <div>
            <Image src="/icons/Sidebar/playlists.svg" width={24} height={24} alt="logo" />
            <p>playlists</p>
         </div>
         <div>
            <Image src="/icons/Sidebar/favorites.svg" width={24} height={24} alt="logo" />            
            <p>favorites</p>
         </div>
      </div>


      <div className={styles.discoverMenu}>
         <h4>discover</h4>
         <div>
            <Image src="/icons/Sidebar/artist.svg" width={24} height={24} alt="logo" />
            <p>artist</p>
         </div>
         <div>
            <Image src="/icons/Sidebar/album.svg" width={24} height={24} alt="logo" />            
            <p>album</p>
         </div>
      </div>


      </div>

      </aside>


</>
   )

}