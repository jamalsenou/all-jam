
export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  topGenres: string[];
  favoriteTracks: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  addedBy: string;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  banner: string;
}
