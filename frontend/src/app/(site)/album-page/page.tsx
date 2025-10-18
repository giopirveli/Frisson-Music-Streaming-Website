"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

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
            <p style={{ marginTop: "8px" }}>
              <strong>{album.title}</strong>
              <br />
              {album.artistName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
