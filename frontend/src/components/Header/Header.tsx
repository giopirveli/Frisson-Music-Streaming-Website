import Searchbar from "../Searchbar/Searchbar";
import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header(){

   return(
   <header className={styles.header}>
      <div className={styles.searchbar}>
         <Image src="/icons/Header/magnifier.svg" width={24} height={24} alt="search icon" />
         
         <Searchbar placeholder={"artists, tracks, albums"} />
         
      </div>
      <Image src="/icons/Header/user.svg" className={styles.user} width={32} height={32} alt="user icon" />
   </header>
   )
}