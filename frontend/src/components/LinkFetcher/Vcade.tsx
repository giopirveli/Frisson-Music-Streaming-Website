import React, { useEffect, useState } from "react";
import axios from "axios";

type Music = {
  id: number;
  title: string;
  image?: string;
  trackUrl?: string;
};

export default function MusicList() {
  const [music, setMusic] = useState<Music[]>([]);

  useEffect(() => {
    axios
      .get<Music[]>("http://localhost:4000/music") // обращаемся к NestJS API
      .then((res) => setMusic(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Music Library</h2>
      <ul>
        {music.map((track) => (
          <li key={track.id}>
            <h3>{track.title}</h3>
            {track.image && <img src={track.image} alt={track.title} width={150} />}
            {track.trackUrl && <audio controls src={track.trackUrl}></audio>}
          </li>
        ))}
      </ul>
    </div>
  );
} 