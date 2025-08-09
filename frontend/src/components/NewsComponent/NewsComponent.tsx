import styles from "./NewsComponent.module.scss";
import NewsComponentPhoto from "./NewsComponentPhoto.png";

interface NewsComponentProps {
  imageUrl: string;
  title: string;
  plays: number;
}

export default function NewsComponent({ imageUrl, title, plays }: NewsComponentProps) {
  return (
    <div className={styles.card} data-image={NewsComponentPhoto}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.plays}>{plays.toLocaleString()} Plays</p>
      </div>
    </div>
  );
}
