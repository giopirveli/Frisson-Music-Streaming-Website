"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import { useState } from "react";
import {Colors} from "../../../../styles/colors.enum";
import styles from "./page.module.scss";
import Table from "@/components/Table/Table";


export default function ArtistPage(){

const [activeTab,setActiveTab] = useState(2);

   return(
   <main className={styles.main}>
      {/* <NewsComponent color={Colors.White} title="peggy gou" button="follow" imageUrl="/Images/NewsComponent/peggyGou.jpg" verified plays={`745,090 fans`}></NewsComponent> */}
      {activeTab ===1 && <></>}              {/* onClick={()=>setActiveTab(2)} */}
      

      
      {activeTab === 2 && <Table></Table>
}
   
   </main>

   )
}