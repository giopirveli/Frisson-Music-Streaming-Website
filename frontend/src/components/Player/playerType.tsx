import React, { ReactNode } from "react";

export default interface PlayerProps {
  songTitle: string;
  artistName: string;
  imageUrl: string;
  audioSrc: string; // სიმღერის ფაილის ლინკი
  autoPlay?: boolean;
  onPlayPause?: (playing: boolean) => void;
  children?: ReactNode;
}
