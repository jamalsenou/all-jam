# 🎵 ALL JAM

ALL JAM is a collaborative music platform that brings together Spotify users to create and curate playlists while engaging in a fun, retro-styled points system. Share songs, react to others' picks, and climb the leaderboard in this unique music-sharing experience.

## ✨ Features

### 🎮 Retro Gaming-Inspired Interface
- Pixel fonts and retro color schemes
- Animated UI elements
- Responsive design for all devices

### 🎵 Music Integration
- Seamless Spotify playlist integration
- Real-time song additions and updates
- Embedded Spotify player
- Weekly themed playlists

### 🏆 Points & Rewards System
- Earn points through various actions:
  - Get a 🔥 reaction (+2 points)
  - Vote on others' songs (+1 point)
  - Submit feature requests (+1 point)
  - Receive a 🤮 reaction (-2 points)
- Real-time leaderboard updates
- Achievement badges system

### 👤 User Profiles
- AI-generated retro nicknames
- Personal stats tracking
- Badge collection display
- Profile customization

### 🔔 Real-Time Notifications
- New song additions
- Reaction notifications
- Badge achievements
- Weekly theme updates

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Functions, Auth)
- **AI Integration**: Vertex AI for nickname generation
- **Authentication**: Firebase Email Link Authentication
- **API**: Spotify Web API
- **Security**: Firebase App Check, reCAPTCHA v3

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/all-jam.git
cd all-jam
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your environment variables:
- `FIREBASE_CONFIG`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `RECAPTCHA_SITE_KEY`

4. Start the development server
```bash
npm run dev
```

## 🔐 Security

- Firebase App Check integration
- Email link authentication
- Firestore security rules
- Rate limiting on API endpoints
- Protected routes and data access

## 🎮 Points System

Users can earn points through various interactions:
- Adding songs to the playlist
- Receiving positive reactions
- Voting on other users' songs
- Contributing feature requests
- Weekly theme participation

## 🏆 Badges

Special achievements unlock unique badges:
- 🔥 Combo Master: Get 10+ reactions on 3 different songs
- 👑 Weekly Winner: Top contributor of the week
- More badges to be unlocked!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Spotify Web API
- Firebase team
- shadcn/ui components
- All our contributors and users

---

Built with ❤️ and 🎵 by All Jam
