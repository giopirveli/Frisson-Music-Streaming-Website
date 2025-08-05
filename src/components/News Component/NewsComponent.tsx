import styles from "../News Component/NewsComponent.module.scss";
import { NewsComponentProps } from "../News Component/NewsComponentProps";
import NewsComponentPhoto from "../News Component/NewsComponentPhoto.png";

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
