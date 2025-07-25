"use client"
import React, { useState } from "react";
import Style from "./button.module.scss";
import Props from "./buttonType";

export default function Button(props: Props) {
  const { onClick, icon, text, width, height } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!onClick) return;

    try {
      const result = onClick();
      if (result && typeof result.then === "function") {
        setLoading(true);
        result.then(() => setLoading(false)).catch((err) => console.error("Async შეცდომა:", err));
      }
    } catch (err) {
      console.error("Sync შეცდომა:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${Style.basicButtonStyle} ${loading ? Style.disabled : ""}`}
      style={{ width, height }}
    >
      <img src={icon} alt="" />
      <span>{text}</span>
    </button>
  );
}
