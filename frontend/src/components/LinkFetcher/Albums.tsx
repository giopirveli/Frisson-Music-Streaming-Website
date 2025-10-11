import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Album type so TypeScript knows the shape of data
interface Album {
  id: number;
  title: string;
  cover: string;
  releaseDate: string;
  author?: {
    id: number;
    name: string;
  };
}


const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>(`http://localhost:4000/author/`)
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error loading albums:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px",color:"white" }}>
      <h1>🎵 Albums</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {albums.map((album) => (
          <div
            key={album.id}
            style={{
              backgroundColor: "#1e1e1e",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={album.cover}
              alt={album.title}
              width="150"
              style={{ borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{album.title}</h3>
            <p>{album.releaseDate}</p>
            <p style={{ color: "#aaa" }}>by {album.author?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
