"use client";
import React, { useEffect, useState } from 'react';

interface Album {
  id: number;
  title: string;
  releaseDate: string;
  cover?: string;
  author?: {
    id: number;
    name: string;
  };
}

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/albums')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.error('❌ Ошибка при загрузке:', err))
  }, []);

  if (loading) return <p>Загрузка альбомов...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎵 Albums</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.title} ({album.releaseDate})
          </li>
        ))}
      </ul>
    </div>
  );
}