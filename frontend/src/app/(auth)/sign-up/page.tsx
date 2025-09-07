"use client";

import Image from "next/image";
import styles from "./signUp.module.scss";
import Input from "@/components/LogInRegisterInput/Input";
import Link from "next/link";
import Button from "@/components/Button/button";
import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Yup სქემა (Sign-up)
const schema = yup
  .object({
    email: yup
      .string()
      .required("ელფოსტა სავალდებულოა")
      .email("ელფოსტის ფორმატი არასწორია"),
    password: yup
      .string()
      .required("პაროლი სავალდებულოა")
      .min(8, "მინ. 8 სიმბოლო")
      .matches(/[A-Z]/, "მინ. 1 დიდი ასო")
      .matches(/\d/, "მინ. 1 ციფრი"),
    confirmPassword: yup
      .string()
      .required("გაიმეორე პაროლი")
      .oneOf([yup.ref("password")], "პაროლები არ ემთხვევა"),
  })
  .required();

type SignUpForm = yup.InferType<typeof schema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",         // blur-ისასაც ამოწმებს
    shouldFocusError: false,   // ❌ არ გადაიყვანოს ფოკუსი პირველ ერორზე
  });

  // ✅ Submit (აქ ჩაანაცვლებ რეალურ API-თ)
  const onSubmit = async (data: SignUpForm) => {
    console.log("Sign up:", data);
    // await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) })
    // წარმატებისას -> router.push("/sign-in")
  };

  // ✅ Submit-ერრორი — ვალიზე საველე გაწმინდვა, ფოკუსის გარეშე
  const onInvalid = (errs: FieldErrors<SignUpForm>) => {
    if (errs.email) {
      resetField("email", { keepError: true });
      return;
    }
    if (errs.password) {
      resetField("password", { keepError: true });
      resetField("confirmPassword", { keepError: true });
      return;
    }
    if (errs.confirmPassword) {
      resetField("confirmPassword", { keepError: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>

        <div className={styles.logoSizeControl}>
          <Image src="/icons/Sidebar/mainLogo.png"  fill alt="Frisson logo" />
        </div>

        <div className={styles.leftMainContent}>
          <div className={styles.header}>
          <h1 className={styles.title}>
            <div className={styles.titleFirtsPart}>
              <span className={styles.titleSecondSize}>Where</span>
              <span className={styles.titleFirstStyle}>HARMONY</span>
            </div>
            <div className={styles.titleSecondPart}>
              <span className={styles.titleFirstStyle}>MEETS</span>
              <span className={styles.titleSecondSize}>MELODY</span>
            </div>
          </h1>
          <span className={styles.subtitle}>The Future Of Music Streaming</span>
        </div>

        {/* ✅ რეგისტრაციის ფორმა */}
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
            rules
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            hideBtn
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button text="Sign up" type="submit" />

          <span className={styles.switchPage}>
            Already have an account?
            <Link href="/sign-in"> Sign in</Link>
          </span>
        </form>
        </div>
      </div>

      <div className={styles.right}>
        <Image
          src="/Images/LoginRegister/upscalemedia-transformed.png"
          alt="Statue with bubblegum and headphones"
          fill
          priority
          className={styles.rightImg}
        />
      </div>
    </div>
  );
}
