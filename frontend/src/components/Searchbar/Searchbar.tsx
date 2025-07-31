// Searchbar.tsx
import styles from "./Searchbar.module.scss";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; /* we need to replace void using the function name */
  placeholder?: string;
  iconName?: string; // example: "search.svg"
};





export default function Searchbar({
  value,
  onChange,
  placeholder = "Search...",
  iconName,
}: Props) {
  return (
    <div className={styles.wrapper}>
      {iconName && (
        <img
          src={`/${iconName}`}
          alt="icon"
          className={styles.icon}
          draggable={false}
        />
      )}
      <input
        type="text"
        className={styles.searchbar}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
