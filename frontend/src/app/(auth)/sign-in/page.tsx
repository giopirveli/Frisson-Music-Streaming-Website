"use client";

import Image from "next/image";
import styles from "./signIn.module.scss";
import Input from "@/components/LogInRegisterInput/Input";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Yup სქემა (Email + ძლიერი პაროლი) + rememberMe (არავალდ)
const schema = yup.object({
  email: yup.string().required("ელფოსტა სავალდებულოა").email("ელფოსტის ფორმატი არასწორია"),
  // ეს წესი უნდა შეამოწმოს მომხმარებელი არსებობს თუ არა
  password: yup.string().required("პაროლი არასწორია"),
  // ეს წესი უნდა შეამოწმოს მომხმარებელი არსებობს თუ არა
  rememberMe: yup.boolean().optional().default(false),
});

type FormData = yup.InferType<typeof schema>;

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // isSubmitting შესაძლოა არ იყოს საჭირო build-ში
    setError,
    resetField,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // ❌ ის ნაწილი თუ signIn ფუნქცია არ არის იმპორტირებული
      // await signIn(data.email, data.password, { remember: data.rememberMe });
      // redirect...
    } catch {
      setError("password", { message: "არასწორი ელფოსტა ან პაროლი" });
      resetField("password", { keepError: true });
    }
  };

  const onInvalid = () => {
    // თუ რამე არასწორია, პაროლის value მაინც იშლება
    resetField("password", { keepError: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logoSizeControl}>
          <Link href="/">
            <Image src="/icons/Sidebar/mainLogo.png" fill alt="Frisson logo" />
          </Link>
        </div>
        <div className={styles.leftMainContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <div className={styles.titleFirtsPart}>
                <span className={styles.titleSecondSize}>Where</span>
                <span className={styles.titleFirstSize}>HARMONY</span>
              </div>
              <div className={styles.titleSecondPart}>
                <span className={styles.titleFirstSize}>MEETS</span>
                <span className={styles.titleSecondSize}>MELODY</span>
              </div>
            </h1>
            <span className={styles.subtitle}>The Future Of Music Streaming</span>
          </div>

          {/* ✅ RHF + Yup */}
          <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              type="password"
              placeholder="Password"
              hideBtn
              autoComplete="current-password"
              {...register("password")}
              error={errors.password?.message}
            />

            {/* ✅ Checkbox + "Forgot your password?" */}
            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" {...register("rememberMe")} />
                Remember me
              </label>

              <Link href="/forgot-password" className={styles.forgot}>
                Forgot your password?
              </Link>
            </div>

            <Button
              text="Sign in"
              type="submit"
              // disabled={isSubmitting}
              // ❌ disabled-ს გამორთეთ თუ build-ს უშლის
            />
            <span className={styles.switchPage}>
              Don’t have an account?
              <Link href="/sign-up"> Sign up</Link>
            </span>
          </form>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightImgSizesControl}>
          <Image
            src="/Images/LoginRegister/upscalemedia-transformed.png"
            alt="Statue with bubblegum and headphones"
            fill
            priority
            className={styles.rightImg}
          />
        </div>
      </div>
    </div>
  );
}
