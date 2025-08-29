import Image from "next/image";
import styles from "./signIn.module.scss";
import Input from "@/components/LogInRegisterInput/Input"
import SubmitBtn from "@/components/SubmitBtn/SubmitBtn";
import Link from "next/link";


export default function SignInPage() {
  return (
    <div className={styles.container}>

      <div className={styles.left}>

        <div className={styles.logo}>M</div>

        <div className={styles.header}>
          <h1 className={styles.title}>
            <div className={styles.titleFirtsPart}>
              <span>Where</span>
              <span>HARMONY</span>
            </div>
            <div className={styles.titleSecondPart}>
              <span>MEETS</span>
              <span className={styles.gradient}>MELODY</span>
            </div>
          </h1>
          <span className={styles.subtitle}>The Future Of Music Streaming</span>
        </div>


        <form className={styles.form}>
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" hideBtn />

          <SubmitBtn value="sign in" />

          <span className={styles.switchPage}>
            Already have an account? <Link href="/sign-up"> Sign up</Link>
          </span>
        </form>
      </div>

      <div className={styles.right}>
        <Image
          src="/Images/LoginRegister/upscalemedia-transformed.png"
          alt="Statue with bubblegum and headphones"
          width={1200}
          height={1200}
          priority
        />
      </div>
    </div>
  );
}
