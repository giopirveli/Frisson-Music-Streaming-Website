"use client";

import NewsComponent from "@/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import SongListTable from "@/components/SongListTable/SongListTable";
import { useEffect, useMemo, useCallback } from "react";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import photo from "../../../assets/images/table/albumphoto.png";
import { useActiveTab } from "@/components/Context/ActiveTabContext";
import "@/../styles/defaults/defaultGrid.scss";
import AlbumFetch from "@/components/Fetcher/Albums";

interface Album {
  id: number;
  title: string;
  artistName: string;
  coverUrl: string; 
}

export default function AlbumPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data } = await axios.get<Album[]>(
          "http://localhost:4000/albums" 
        );
        setAlbums(data);
      } catch (err: any) {
        console.error(err);
        setError("Ошибка при загрузке альбомов");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) return <p>Загрузка альбомов...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎵 Список альбомов</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {albums.map((album) => (
          <div key={album.id} style={{ width: "150px", textAlign: "center" }}>
            <img
              src={album.coverUrl}
              alt={album.title}
              style={{ width: "150px", height: "150px", borderRadius: "8px", objectFit: "cover" }}
            />
          ))}


          <AlbumFetch />





          
        </div>
      )}

      {activeTab === 2 && (
        <>
          <NewsComponent
            plays={"Released 07/12/2023"}
            title="Seek For Marktoop"
            imageUrl="/Images/NewsComponent/banner.jpg"
          />
          <div>
            <SongListTable />

          </div>
        ))}
      </div>
    </div>
  );
}
