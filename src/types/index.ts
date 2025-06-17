export interface Track {
  id: string;
  name: string;
  bpm: number;
  genre: string[];
  preview: string;
  imageUrl: string;
  description: string;
  tags: string[];
  audioUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  purchasedTracks: string[];
}