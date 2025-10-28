"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import SongListTable from "@/components/SongListTable/SongListTable";
import Albums from "@/components/Fetcher/Albums";
import "../../../styles/Defaults/defaultGrid.scss";
import "../../../styles/Defaults/default.scss";
import { useActiveTab } from "@/components/Context/ActiveTabContext";

export default function AlbumPage() {
  const { activeTab, setActiveTab } = useActiveTab();

  return (
    <div style={{ padding: "20px" }}>
      {activeTab === 1 && <Albums onClick={() => setActiveTab(2)} />}

      {activeTab === 2 && (
        <div className={`cflex ocdatormeti`}>
          <NewsComponent
            plays="Released 07/12/2023"
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <SongListTable />
        </div>
      )}
    </div>
  );
}
