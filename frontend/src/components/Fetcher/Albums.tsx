"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import "../../styles/Defaults/defaultGrid.scss";

interface Album {
  id: number;
  title:string;
  artistName: string;
  coverUrl: string;
}

interface AlbumsProps {
  onClick?: () => void; // <- add this
}

const Albums: React.FC<AlbumsProps> = ({ onClick }) => {
  // <- use props here
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>("http://localhost:4000/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error loading albums:", error);
      });
  }, []);

  return (
    <div className="Grid">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          title={album.title}
          artistName={album.artistName}
          coverUrl={album.coverUrl}

          onClick={onClick} // <- pass the prop
        />
      ))}
    </div>
  );
};

export default Albums;
