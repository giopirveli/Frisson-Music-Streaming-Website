"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import "../../styles/Defaults/defaultGrid.scss";

interface Album {
  id: number;
  name: string;
  artistUrl: string;
}

interface AlbumsProps {
  onClick?: () => void; // <- add this
}

const Albums: React.FC<AlbumsProps> = ({ onClick }) => {
  // <- use props here
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>("https://frisson-music-app.s3.eu-north-1.amazonaws.com/Artist/artists.json")
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
          title={album.name}
          imageUrl={album.artistUrl}
          onClick={onClick} // <- pass the prop
        />
      ))}
    </div>
  );
};

export default Albums;
