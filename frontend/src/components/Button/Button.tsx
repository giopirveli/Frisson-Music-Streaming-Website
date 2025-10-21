"use client";
import React, { useState } from "react";
import styles from "./Button.module.scss";
import Image, { StaticImageData } from "next/image";

interface Props {
  icon?: string | StaticImageData;
  onClick?: () => void | Promise<void>;
  width?: string | number;
  type?: "submit" | "button" | "reset";
  height?: string | number;
  text: string;
  className?: string;
  iwidth?: number;
  iheight?: number;
}

export default function Button(props: Props) {
  const { onClick, icon, text, width, height, className, iwidth, iheight, type } = props;
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
      type={type}
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className={`${styles.basicButtonStyle} ${loading ? styles.disabled : ""} ${className ?? ""}`}
      style={{ width, height }}
    >
      {icon && (
        <div style={{ width: iwidth ?? 20, height: iheight ?? 20, position: "relative" }}>
          <Image
            src={typeof icon === "string" ? icon : (icon as StaticImageData)}
            alt="icon"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      <span className={styles.label}>{text}</span>
    </button>
  );
}
