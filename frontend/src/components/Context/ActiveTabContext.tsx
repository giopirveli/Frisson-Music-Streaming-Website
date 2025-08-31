"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ActiveTabContextType {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(undefined);

export function ActiveTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

export function useActiveTab() {
  const context = useContext(ActiveTabContext);
  if (!context) throw new Error("useActiveTab must be used within ActiveTabProvider");
  return context;
}
