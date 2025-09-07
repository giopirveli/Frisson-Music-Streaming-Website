"use client";
import React, { useState, forwardRef } from "react";
import styles from "./Input.module.scss";
import Image from "next/image";

type NativeProps = React.ComponentPropsWithoutRef<"input">;
type Props = Omit<NativeProps, "size"> & {
  rules?: boolean;
  hideBtn?: boolean;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    type = "text",
    placeholder,
    rules,
    hideBtn,
    error,
    id,
    name,
    onChange,
    onBlur,
    className,
    ...rest
  },
  ref
) {
  const inputId = id || name || undefined;

  // toggle (გამოთვლადი type — უკეთესი, ვიდრე type-ს state-ში შენახვა)
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword && hideBtn && show ? "text" : type;

  // RHF ჰენდლერები rest-იდან
  const {
    onChange: rhfOnChange,
    onBlur:   rhfOnBlur,
    ...restProps
  } = rest as React.InputHTMLAttributes<HTMLInputElement>;

  // ჯერ RHF, მერე შენი
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    rhfOnChange?.(e);
    onChange?.(e);
  };
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    rhfOnBlur?.(e);
    onBlur?.(e);
  };

  return (
    <div className={styles.inputConteiner}>
      <div className={`${styles.field} ${error ? styles.errorInput : ""}`}>
        <input
          id={inputId}
          name={name}
          ref={ref}
          type={effectiveType}
          placeholder={error ? error : placeholder}  // შენს არსებულ UX-ს ვტოვებ
          {...restProps}                             // ⬅️ ჯერ rest, რომ ჩვენი ჰენდლერები არ გადაიფაროს
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${className ?? ""}`.trim()} // ⬅️ className merge
          aria-invalid={!!error || undefined}
          // თუ ოდესმე შეცდომას ქვემოთ ტექსტად გამოიტან, დაამატე aria-describedby აქ
        />

        {hideBtn && isPassword && (
          <button
            type="button"
            className={styles.showHideBtn}
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"} // a11y
            aria-pressed={show}                                    // toggle state
          >
            <Image
              width={16}
              height={16}
              src={show ? "/Images/LoginRegister/hide.svg" : "/Images/LoginRegister/show.svg"}
              alt=""                 // დექორატიულია
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {rules && (
        <div className={styles.passwordRules}>
          <span>Password must contain: </span>
          <span>*8 or more characters </span>
          <span>*at least one capital letter </span>
          <span>*at least one number</span>
        </div>
      )}
      <div />
    </div>
  );
});

export default Input;
