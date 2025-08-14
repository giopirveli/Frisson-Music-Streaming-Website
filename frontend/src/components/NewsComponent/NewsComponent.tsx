import styles from "./NewsComponent.module.scss";
import Button from "../button/button";
interface NewsComponentProps {
  imageUrl: string;
  title: string;
  plays: number;
}

export default function NewsComponent({ imageUrl, title, plays }: NewsComponentProps) {
  return (
    <div className={styles.card} style={{ backgroundImage: `url(${imageUrl})` }} >
      <div className={styles.content}>
        <div className={styles.textBox}>
          <h2 className={styles.title}>{title}</h2>
        <p className={styles.plays}>{plays.toLocaleString()} Plays</p>
        </div>
        <Button text="Listen Now" width={153} height={44}/>
      </div>
    </div>
  );
}
