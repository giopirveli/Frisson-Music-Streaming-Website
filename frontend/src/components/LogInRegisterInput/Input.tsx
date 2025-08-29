"use client"
import React, { useState } from "react";
import styles from "./Input.module.scss";
import Image from "next/image";
type Props = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  rules?: boolean;
  hideBtn?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({ type = "text", placeholder, onChange, hideBtn, rules,error }: Props) {

  const [inputType, setInputType] = useState(type)

  const showHideValue = () => {
    setInputType(inputType => (inputType === "password" ? "text" : "password"));
  }
  return (
    <div className={styles.inputConteiner}>
      <div className={styles.field}>
        <input
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          className={styles.input}
        />
        {hideBtn &&
          <button
            type="button"
            className={styles.showHideBtn}
            onClick={showHideValue}
          >
            <Image
              width={16}
              height={16}
              src={
                inputType === "password"
                  ? "/Images/LoginRegister/show.svg"
                  : "/Images/LoginRegister/hide.svg"
              }
              alt="ShowHideBtn"
            />
          </button>}
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
      {rules &&
        <div className={styles.passwordRules}>
          <span>Password must contain: </span>
          <span>*8 or more characters </span>
          <span>*at least one capital letter </span>
          <span>*at least one number</span>
        </div>
      }
      <div />
    </div>

  );
}



