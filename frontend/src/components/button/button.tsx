"use client";
import React, { useState } from "react";
import styles from "./button.module.scss";
import Image, { StaticImageData } from "next/image";
import plusIcon from "@/../public/icons/Button/plusIcon.svg";

interface Props {
  icon?: string | StaticImageData;
  onClick?: () => void | Promise<void>;
  width?: string | number; // button size
  height?: string | number;
  text: string;
  className?: string;
  iwidth?: number; // icon size
  iheight?: number;
}

export default function Button(props: Props) {
  const { onClick, icon, text, width, height, className, iwidth, iheight } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick || loading) return;
    try {
      setLoading(true);
      await onClick();
    } catch (err) {
      console.error("Button onClick error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className={`${styles.basicButtonStyle} ${loading ? styles.disabled : ""} ${className ?? ""}`}
      style={{ width, height }}
    >
      {icon && (
        <img
          src={typeof icon === "string" ? icon : (icon as StaticImageData).src}
          width={iwidth}
          height={iheight}
          className={styles.icon}
          alt="icon"
        />
      )
      }

      <span className={styles.label}>{text}</span>
    </button>
  );
}
