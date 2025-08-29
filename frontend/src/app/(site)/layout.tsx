import Sidebar from "@/components/Sidebar/Sidebar";
import Player from "@/components/Player/player";
import Header from "@/components/Header/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="page">
        <div className="container">
          <Header/>
          {children}
        </div>
      </div>
      <Player />
    </>
  );
}
