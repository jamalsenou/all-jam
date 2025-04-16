
import { User, Song, Theme, Badge } from '../types';

export const currentUser: User = {
  id: "u1",
  name: "DJ Pixel",
  avatar: "https://i.pravatar.cc/150?img=12",
  points: 420,
  topGenres: ["Synthwave", "Retrowave", "Electronic"],
  favoriteTracks: ["Blinding Lights", "Take on Me", "Midnight City"],
  badges: [
    {
      id: "b1",
      name: "Combo Master",
      icon: "🔥",
      description: "Added 3 songs that received 10+ reactions"
    },
    {
      id: "b2",
      name: "Trendsetter",
      icon: "🌟",
      description: "First to add a song from a new genre"
    }
  ]
};
export const users: User[] = [
  {
    id: "u2",
    name: "Melody Maven",
    avatar: "https://i.pravatar.cc/150?img=5",
    points: 680,
    topGenres: ["Indie", "Alternative", "Pop"],
    favoriteTracks: ["Dreams", "Raspberry Beret", "Good Vibrations"],
    badges: [
      {
        id: "b3",
        name: "High Score",
        icon: "🏆",
        description: "Topped the leaderboard for a week"
      }
    ]
  },
  {
    id: "u3",
    name: "Beat Byter",
    avatar: "https://i.pravatar.cc/150?img=3",
    points: 540,
    topGenres: ["Hip-Hop", "R&B", "Jazz"],
    favoriteTracks: ["Ms. Jackson", "Alright", "DNA"],
    badges: [
      {
        id: "b4",
        name: "Genre Explorer",
        icon: "🧭",
        description: "Added songs from 10 different genres"
      }
    ]
  },
  {
    id: "u4",
    name: "Synth Master",
    avatar: "https://i.pravatar.cc/150?img=7",
    points: 510,
    topGenres: ["Synthwave", "Vaporwave", "Electronic"],
    favoriteTracks: ["Resonance", "Nightcall", "Sunset"],
    badges: [
      {
        id: "b5",
        name: "Weekly Winner",
        icon: "🥇",
        description: "Had the top song of the week"
      }
    ]
  },
  {
    id: "u5",
    name: "Retro Rider",
    avatar: "https://i.pravatar.cc/150?img=9",
    points: 495,
    topGenres: ["80s Rock", "New Wave", "Post-Punk"],
    favoriteTracks: ["Blue Monday", "Love Will Tear Us Apart", "Just Like Heaven"],
    badges: [
      {
        id: "b6",
        name: "Song Streak",
        icon: "⚡",
        description: "Added a song every day for 7 days"
      }
    ]
  },
  {
    id: "u6",
    name: "Arcade Ace",
    avatar: "https://i.pravatar.cc/150?img=11",
    points: 460,
    topGenres: ["Chiptune", "Video Game OST", "EDM"],
    favoriteTracks: ["Megalovania", "One-Winged Angel", "Sweden"],
    badges: [
      {
        id: "b7",
        name: "Reaction King",
        icon: "👑",
        description: "Received every type of reaction"
      }
    ]
  }
];

export const jamPlaylist: Song[] = [
  {
    id: "s1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    addedBy: "u1",
    reactions: [
      { emoji: "🔥", count: 8, users: ["u2", "u3", "u4", "u5", "u6", "u2", "u4"] },
      { emoji: "🤮", count: 5, users: ["u3", "u4", "u5", "u6", "u2"] },
    ]
  },
  {
    id: "s2",
    title: "Take on Me",
    artist: "a-ha",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273e7329198a51edbe2933a076a",
    addedBy: "u2",
    reactions: [
      { emoji: "🔥", count: 7, users: ["u1", "u3", "u4", "u5", "u6", "u2", "u3"] },
      { emoji: "🤮", count: 9, users: ["u3", "u4", "u5", "u6", "u2", "u4", "u5", "u6"] },
    ]
  },
  {
    id: "s3",
    title: "Stayin' Alive",
    artist: "Bee Gees",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273450415a73aaa409ff7cfc861",
    addedBy: "u4",
    reactions: [
      { emoji: "🔥", count: 4, users: ["u2", "u6", "u5"] },
      { emoji: "🤮", count: 10, users: [ "u2", "u3", "u4", "u5", "u6", "u1", "u2", "u3", "u4"] },
    ]
  },
  {
    id: "s4",
    title: "Blue Monday",
    artist: "New Order",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2735b8ee78a52d7203bf1ed85fc",
    addedBy: "u5",
    reactions: [
      { emoji: "🔥", count: 6, users: ["u2", "u3", "u4", "u6", "u3"] },
      { emoji: "🤮", count: 8, users: ["u1", "u2", "u4", "u5", "u6", "u1", "u3", "u4"] },
    ]
  },
  {
    id: "s5",
    title: "Midnight City",
    artist: "M83",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2739093171c14a48a27efe8ea67",
    addedBy: "u3",
    reactions: [
      { emoji: "🔥", count: 9, users: ["u2", "u4", "u5", "u6", "u2", "u3", "u4"] },
      { emoji: "🤮", count: 4, users: ["u1", "u4", "u5", "u6"] },

    ]
  },
  {
    id: "s6",
    title: "Tron Legacy (End Titles)",
    artist: "Daft Punk",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273df46712ee3c3adcf40d10376",
    addedBy: "u6",
    reactions: [
      { emoji: "🔥", count: 7, users: [ "u2", "u3", "u4", "u5", "u2"] },
      { emoji: "🤮", count: 6, users: ["u1", "u3", "u4", "u5", "u6", "u2"] },
    ]
  }
];

export const weeklyThemes: Theme[] = [
  {
    id: 'week-1',
    name: 'Throwback Jams',
    description: 'Songs that transport you back in time. Anything pre-2010 goes!',
    startDate: '2025-04-07',
    endDate: '2025-04-11',
    banner: '/banners/throwback.jpg',
  },
  {
    id: 'week-2',
    name: 'Feel-Good Vibes',
    description: 'Tunes that make you smile, dance, or sing along — pure serotonin.',
    startDate: '2025-04-14',
    endDate: '2025-04-18',
    banner: '/banners/feelgood.jpg',
  },
  {
    id: 'week-3',
    name: 'Epic Movie Soundtracks',
    description: 'Songs from your favorite films or scores that gave you goosebumps.',
    startDate: '2025-04-21',
    endDate: '2025-04-25',
    banner: '/banners/soundtracks.jpg',
  },
  {
    id: 'week-4',
    name: 'Lazy Sunday (on a Weekday)',
    description: 'Chill, cozy, lo-fi or acoustic tracks for slow days and deep breaths.',
    startDate: '2025-04-28',
    endDate: '2025-05-02',
    banner: '/banners/lazysunday.jpg',
  },
  {
    id: 'week-5',
    name: 'Dancefloor Fillers',
    description: 'Songs that belong in the club. High energy. Zero shame.',
    startDate: '2025-05-05',
    endDate: '2025-05-09',
    banner: '/banners/dancefloor.jpg',
  },
  {
    id: 'week-6',
    name: 'Indie Gems',
    description: 'Underrated or lesser-known songs that deserve the spotlight.',
    startDate: '2025-05-12',
    endDate: '2025-05-16',
    banner: '/banners/indie.jpg',
  },
  {
    id: 'week-7',
    name: 'Covers Better Than the Original',
    description: 'Bold takes, but we’re here for it. Drop those superior covers!',
    startDate: '2025-05-19',
    endDate: '2025-05-23',
    banner: '/banners/covers.jpg',
  },
  {
    id: 'week-8',
    name: 'Global Grooves',
    description: 'Music in any language, from anywhere. Let’s travel sonically.',
    startDate: '2025-05-26',
    endDate: '2025-05-30',
    banner: '/banners/global.jpg',
  },
  {
    id: 'week-9',
    name: 'Rainy Day Melodies',
    description: 'Melancholy, dreamy, or just plain rainy-weather vibes.',
    startDate: '2025-06-02',
    endDate: '2025-06-06',
    banner: '/banners/rainy.jpg',
  },
  {
    id: 'week-10',
    name: 'Songs That Slap',
    description: 'No rules, no theme — just bangers. Make your case.',
    startDate: '2025-06-09',
    endDate: '2025-06-13',
    banner: '/banners/slaps.jpg',
  },
  {
    id: 'week-11',
    name: 'Road Trip Anthems',
    description: 'Music for wide roads, rolled-down windows, and loud singing.',
    startDate: '2025-06-16',
    endDate: '2025-06-20',
    banner: '/banners/roadtrip.jpg',
  },
  {
    id: 'week-12',
    name: 'Your Teen Years',
    description: 'Songs you loved (or secretly still do) from your teenage days.',
    startDate: '2025-06-23',
    endDate: '2025-06-27',
    banner: '/banners/teenage.jpg',
  },
];

export const allBadges: Badge[] = [
  {
    id: "b1",
    name: "Combo Master",
    icon: "🔥",
    description: "Added 3 songs that received 10+ reactions"
  },
  {
    id: "b2",
    name: "Trendsetter",
    icon: "🌟",
    description: "First to add a song from a new genre"
  },
  {
    id: "b3",
    name: "High Score",
    icon: "🏆",
    description: "Had the top song of the week"
  },
  {
    id: "b4",
    name: "Genre Explorer",
    icon: "🧭",
    description: "Added songs from 10 different genres"
  },
  {
    id: "b5",
    name: "Weekly Winner",
    icon: "🥇",
    description: "Topped the leaderboard for a week"
  },
  {
    id: "b6",
    name: "Song Streak",
    icon: "⚡",
    description: "Added a song every day for 7 days"
  },
  {
    id: "b7",
    name: "Nostalgia Trip",
    icon: "🕹️",
    description: "Added 5 songs from the 80s or 90s"
  },
  {
    id: "b8",
    name: "Jam Champion",
    icon: "🏅",
    description: "Won 3 weekly themes"
  }
];
