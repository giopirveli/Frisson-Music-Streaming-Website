import Image from "next/image";
import styles from "./authGlobal.module.scss";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main}>
      <Image
        src="/Images/LoginRegister/defaultBackGround.png"
        alt=""
        fill
        className={styles.imageBg}
      />
      {children}
    </div>
  );
}
