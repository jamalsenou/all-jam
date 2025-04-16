import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();


const BADGES = {
    COMBO_MASTER: 'b1',
    TREND_SETTER: 'b2',
    HIGH_SCORE: 'b3',
    GENRE_EXPLORER: 'b4',
    WEEKLY_WINNER: 'b5',
    SONG_STREAK: 'b6',
    NOSTALGIA_TRIP: 'b7',
    JAM_CHAMPION: 'b8'
};

export const onSongCreated = onDocumentCreated({
    document: 'songs/{songId}',
    region: "europe-west3",
  }, async (event) => {
    const snap = event.data;
    if (!snap) return;
  
    const song = snap.data();
    const userId = song.added_by?.id;
    const genre = song.genre?.toLowerCase();
    const year = song.release_year;
    const currentDate = new Date();
  
    if (!userId || !genre || !year) return;
  
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return;
  
    const userData = userDoc.data();
    const currentBadges: string[] = userData?.badges || [];
    const newBadges = new Set(currentBadges);
  
    // Get user's streak information
    const streakData = userData?.streak || { 
      lastSongDate: null, 
      currentStreak: 0 
    };
  
    // Check if the user has a streak going
    if (streakData.lastSongDate) {
      const lastSongDate = streakData.lastSongDate.toDate();
      const dayDifference = getDayDifference(lastSongDate, currentDate);
      
      // If they added a song yesterday, increment streak
      if (dayDifference === 1) {
        streakData.currentStreak += 1;
      } 
      // If they added a song today already, don't change streak
      else if (dayDifference === 0) {
        // No change to streak
      } 
      // If they missed a day or more, reset streak
      else {
        streakData.currentStreak = 1;
      }
    } else {
      // First song ever, start streak at 1
      streakData.currentStreak = 1;
    }
  
    // Update the last song date to today
    streakData.lastSongDate = currentDate;
  
    // Add badge if streak reaches 5 days
    if (streakData.currentStreak >= 5) {
      newBadges.add(BADGES.SONG_STREAK);
    }
  
    // Genre Explorer: 10 different genres
    const userSongsSnap = await db
      .collection('songs')
      .where('added_by.id', '==', userId)
      .get();
  
    const genres = new Set<string>();
    userSongsSnap.forEach((doc) => {
      const g = doc.data().genre?.toLowerCase();
      if (g) genres.add(g);
    });
  
    if (genres.size >= 10) {
      newBadges.add(BADGES.GENRE_EXPLORER);
    }
  
    // Trendsetter: first to add a song from this genre
    const genreSongsSnap = await db
      .collection('songs')
      .where('genre', '==', song.genre)
      .orderBy('created_at')
      .limit(1)
      .get();
  
    if (!genreSongsSnap.empty && genreSongsSnap.docs[0].id === snap.id) {
      newBadges.add(BADGES.TREND_SETTER);
    }
  
    // Nostalgia Trip: 5 songs from 80s/90s
    const nostalgicSongs = userSongsSnap.docs.filter((doc) => {
      const y = doc.data().release_year;
      return y >= 1980 && y < 2000;
    });
  
    if (nostalgicSongs.length >= 5) {
      newBadges.add(BADGES.NOSTALGIA_TRIP);
    }
  
    // Update user document with badges and streak information
    const hasNewBadges = newBadges.size !== currentBadges.length;
    
    if (hasNewBadges || streakData.currentStreak > (userData?.streak?.currentStreak ?? 0)) {
      await userRef.update({
        badges: Array.from(newBadges),
        streak: streakData
      });
    }
  });
  
  // Helper function to calculate difference in days between two dates
  function getDayDifference(date1: Date, date2: Date) {
    // Convert both dates to their date-only representation (no time)
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    // Calculate the difference in milliseconds and convert to days
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }
 


export const onReactionsUpdated = onDocumentUpdated(
    {
        document: 'songs/{songId}',
        region: "europe-west3",
      }, async (event) => {
  const before = event.data?.before?.data();
  const after = event.data?.after?.data();

  if (!before || !after) return;

  const userId = after.added_by?.id;
  if (!userId || !Array.isArray(after.reactions)) return;

  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return;

  const currentBadges: string[] = userDoc?.data()?.badges || [];
  const newBadges = new Set(currentBadges);

  
  // 🔥 Combo Master: 3 songs with 10+ reactions
  const userSongsSnap = await db
  .collection('songs')
  .where('added_by.id', '==', userId)
  .get();
  let qualifyingSongs = 0;
  userSongsSnap.forEach(doc => {
    const reactions = doc.data().reactions || [];
    const total = reactions.reduce((sum: number, r: { count?: number }) => sum + (r.count || 0), 0);
    if (total >= 10) qualifyingSongs++;
  });

  if (qualifyingSongs >= 3) {
    newBadges.add(BADGES.COMBO_MASTER);
  }

  // 🥇 Weekly Winner — stub for future weekly theme integration
  // This would require weekly theme context and leaderboard comparison
  // if (isWeeklyWinner(userId, currentWeekId)) newBadges.add(BADGES.WEEKLY_WINNER);

  // Update user if badges changed
  if (newBadges.size !== currentBadges.length) {
    await userRef.update({
      badges: Array.from(newBadges),
    });
  }
});

import { onSchedule } from 'firebase-functions/v2/scheduler';

export const assignWeeklyBadges = onSchedule(
  { schedule: 'every friday 14:00', timeZone: 'UTC', 'region': 'europe-west3' },
  async () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay() + 1);
    startOfWeek.setUTCHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 4); // Friday
    endOfWeek.setUTCHours(23, 59, 59, 999);

    const songsSnap = await db
      .collection('songs')
      .where('created_at', '>=', Timestamp.fromDate(startOfWeek))
      .where('created_at', '<=', Timestamp.fromDate(endOfWeek))
      .get();

    let topSong: FirebaseFirestore.DocumentSnapshot = songsSnap.docs[0]
    let topScore = -1;
    const userScores: Record<string, number> = {};

    songsSnap.forEach(doc => {
      const song = doc.data();
      const reactions = song.reactions || [];
      const score = reactions.reduce((sum: number, r: { count?: number }) => sum + (r.count || 0), 0);
      const userId = song.added_by?.id;

      if (score > topScore) {
        topScore = score;
        topSong = doc;
      }

      if (userId) {
        userScores[userId] = (userScores[userId] || 0) + score;
      }
    });

    if (topSong) {
        const topSongData = topSong.data();
        const topUserId = topSongData?.added_by?.id;
        const topSongId = topSong.ref;
    
        // Award badges
        await grantBadge(topUserId, BADGES.WEEKLY_WINNER);
        const [topScorerId] = Object.entries(userScores).sort((a, b) => b[1] - a[1])[0];
        await grantBadge(topScorerId, BADGES.HIGH_SCORE);
    
        // Record the weekly winner
        const weekId = startOfWeek.toISOString().slice(0, 10); // e.g. '2025-04-07'
        await db.collection('weeklyWinners').doc(weekId).set({
          weekId,
          topUserId,
          topSongId,
          topScore,
          timestamp: Timestamp.now(),
        });
    
        // Check for 3 total wins (Jam Champion)
        const winsSnap = await db
        .collection('weeklyWinners')
        .where('topUserId', '==', topUserId)
        .get();
    
        if (winsSnap.size >= 3) {
        await grantBadge(topUserId, BADGES.JAM_CHAMPION);
        }
    }
  }
);

// Grant badge if not already present
async function grantBadge(userId: string, badgeId: string) {
  const userRef = db.collection('users').doc(userId);
  const userSnap = await userRef.get();
  if (!userSnap.exists) return;

  const user = userSnap.data();
  const badges = user?.badges || [];
  if (!badges.includes(badgeId)) {
    await userRef.update({ badges: [...badges, badgeId] });
  }
}

export { getSpotifyToken } from './playlist';


