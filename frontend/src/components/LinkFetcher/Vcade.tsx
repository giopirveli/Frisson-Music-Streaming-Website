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


const a = [{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
},{
  "id":2,
  "title":"asdadsasd"
}
]

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get<Album[]>(`http://localhost:4000/albums/1`)
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error loading albums:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
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
