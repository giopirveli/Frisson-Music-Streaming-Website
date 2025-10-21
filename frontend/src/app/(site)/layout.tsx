"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import Player from "@/components/Player/player";
import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import { ActiveTabProvider } from "@/components/Context/ActiveTabContext";
import type { Track } from "@/components/Player/playerType";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const data: Track[] = [
    {
      title: "deira",
      artistName: "unknown",
      imageUrl: "/Images/Player/test1.jpg",
      audioSrc: "/songs/deira.mp3",
      isfavorite: false,
    },
    {
      title: "marceline",
      artistName: "unknown",
      imageUrl: "/Images/Player/test2.jpg",
      audioSrc: "/songs/marceline.mp3",
      isfavorite: false,
    },
    {
      title: "minecraft",
      artistName: "C418",
      imageUrl: "/Images/Player/test3.jpg",
      audioSrc: "/songs/minecraft.mp3",
      isfavorite: false,
    },
    {
      title: "test",
      artistName: "VOA",
      imageUrl: "/Images/Player/test4.png",
      audioSrc: "/songs/test.mp3",
      isfavorite: false,
    },
  ];
  return (
    <ActiveTabProvider>
      <Sidebar />
      <div className="page">
        <div className="container">
          <Header />
          {children}
        </div>
      </div>
      <Player playlist={data} initialIndex={0} />;
    </ActiveTabProvider>
  );
}
