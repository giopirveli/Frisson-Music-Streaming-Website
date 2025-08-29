"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useState } from "react";
import { Colors } from "../../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";



interface Song { // Song aris prop // aq iyos da tu damwirda mere gamoviyeneb - achi
   id?: number | string;
   pic?: string;
   name?: string;
   album?: string;
   time?: string;
   liked?: boolean;
   artist?: string; // for bio
   biography?: string;
}

export default function ArtistPage({ id, pic, name, album, time, liked, artist, biography }: Song) {
   const [songs, setSongs] = useState<Song[]>([]);
   const [activeTab, setActiveTab] = useState(1);

   /*  useEffect(() => {
        axios.get("/songs")
           .then((res) => setSongs(res.data))
           .catch((error) =>
              console.log(error)
           )
     }, []);
  */

   return (
      <main className={styles.main}> {/* onClick={()=>setActiveTab(2)} */} {/* page changing code */}
         {activeTab === 1 && <div className={styles.artistPage}>
            <h4>trending now</h4>

            <div className={styles.artistCard}>

<AlbumCard imageUrl={photo} onClick={()=>setActiveTab(2)} title="taylor swift"></AlbumCard>
<AlbumCard imageUrl={photo} onClick={()=>setActiveTab(2)} title="bellie eilish"></AlbumCard>
<AlbumCard imageUrl={photo} onClick={()=>setActiveTab(2)} title="sza"></AlbumCard>
<AlbumCard imageUrl={photo} onClick={()=>setActiveTab(2)} title="ed sheeran"></AlbumCard>
<AlbumCard imageUrl={photo} onClick={()=>setActiveTab(2)} title="Ariana Grande"></AlbumCard>



{/*songs.map((song,i) =>(
               <ArtistCard key={song.id} onClick={()=>setActiveTab(2)} imageUrl={song.pic} title={song.artist}></ArtistCard>
)) this is logic for backend*/} 
               
            </div>
         </div>}



         {activeTab === 2 &&
            <>
               <NewsComponent color={Colors.White} title="peggy gou" button="follow" imageUrl="/Images/NewsComponent/peggyGou.jpg" verified plays={`745,090 fans`}></NewsComponent>
               <Table></Table>
            </>
         }

      </main>

   )
}