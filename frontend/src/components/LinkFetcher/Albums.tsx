import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the authors type so TypeScript knows the shape of data
interface Authors {
  id: number;
  title: string;
  cover: string;
  releaseDate: string;
  author?: {
    id: number;
    name: string;
  };
}


const authors: React.FC = () => {
  const [authors, setAuthors] = useState<Authors[]>([]);

  useEffect(() => {
    axios
      .get<Authors[]>(`http://localhost:4000/authors/`)
      .then((response) => {
        console.log("📦 Received from backend:", response.data);
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error loading authors:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px",color:"white" }}>
      <h1>🎵 authors</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {authors.map((authors) => (
          <div
            key={authors.id}
            style={{
              backgroundColor: "#1e1e1e",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={authors.cover}
              alt={authors.title}
              width="150"
              style={{ borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{authors.title}</h3>
            <p>{authors.releaseDate}</p>
            <p style={{ color: "#aaa" }}>by {authors.author?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default authors;
