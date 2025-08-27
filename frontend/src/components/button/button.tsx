"use client";
import React, { useState } from "react";
import Style from "./button.module.scss";

interface Props {
  icon?: string;                                
  onClick?: () => void | Promise<void>;
  width?: string | number;
  height?: string | number;
  text: string;
  className?: string;
}

export default function Button(props: Props) {
  const { onClick, icon, text, width, height, className } = props;
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
      className={`${Style.basicButtonStyle} ${loading ? Style.disabled : ""} ${className ?? ""}`}
      style={{ width, height }}
    >
      {icon && <img src={icon} alt="" className={Style.icon} />}
      <span className={Style.label}>{text}</span>
    </button>
  );
}
