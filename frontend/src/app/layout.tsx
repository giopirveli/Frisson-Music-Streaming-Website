export const metadata = {
  title: "Frisson",
  icons: {
    icon: "@/../icons/Sidebar/mainLogo.png", // put your favicon in public/
  },
};

import MeasureWidth from "../components/MeasureWidth/MeasureWidth";
import localFont from "next/font/local";
import "./globals.scss";
import RouteProgress from "@/components/RouteProgress/RouteProgress"; // ✅ progress bar კომპონენტი
import "nprogress/nprogress.css";

const manrope = localFont({
  src: [
    { path: "./fonts/manrope/Manrope-VariableFont.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/manrope/Manrope-VariableFont.woff", weight: "100 900", style: "normal" },
  ],
  variable: "--font-manrope",
});
const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/plusJakartaSans/PlusJakartaSans-Italic-VariableFont.woff",
      weight: "100 900",
      style: "italic",
    },
    {
      path: "./fonts/plusJakartaSans/PlusJakartaSans-Italic-VariableFont.woff2",
      weight: "100 900",
      style: "italic",
    },
    {
      path: "./fonts/plusJakartaSans/PlusJakartaSans-VariableFont.woff",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/plusJakartaSans/PlusJakartaSans-VariableFont.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-jakarta",
});
const sfProDisplay = localFont({
  src: [
    { path: "./fonts/sfprodisplayheavy/sfprodisplayheavy.woff2", weight: "900", style: "normal" },
    { path: "./fonts/sfprodisplayheavy/sfprodisplayheavy.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${plusJakartaSans.variable} ${sfProDisplay.variable}`}>
        <RouteProgress /> {/* ✅ progress bar */}
        <MeasureWidth />
        {children}
      </body>
    </html>
  );
}
