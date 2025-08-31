"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import Player from "@/components/Player/player";
import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import { ActiveTabProvider } from "@/components/Context/ActiveTabContext";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ActiveTabProvider>
      <Sidebar />
      <div className="page">
        <div className="container">
          <Header />
          {children}
        </div>
      </div>
      <Player />
    </ActiveTabProvider>
  );
}
