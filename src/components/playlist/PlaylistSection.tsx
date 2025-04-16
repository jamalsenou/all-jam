import { useEffect, useState } from 'react';
import { Song } from '@/types';
import { SongCard } from './SongCard';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, setDoc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AIName } from '@/lib/utils';

const playlistId = "4b50pHeh4WqIedJBrJFmWx"

const playlistUrl = `https://open.spotify.com/playlist/4b50pHeh4WqIedJBrJFmWx?si=c4bb3875e8f04cf3&pt=02d76c492fb148d132746d0c0d91a445`

export const PlaylistSection = ({token}) => {

  const [playlist, setPlaylist] = useState<Song[]>();
  
  useEffect(() => {
    const fetchAllTracks = async () => {
      let allTracks = [];
      let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

      while (nextUrl) {
        try {
          const response = await fetch(nextUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (!response.ok) {
            console.error('Error fetching playlist tracks:', data);
            break;
          }

          const items = data.items;
          allTracks = [...allTracks, ...items];
          // Get unique users from the items
          const uniqueUsers = [...new Set(items.map(item => item.added_by.id))];
          
          const usersRef = collection(db, "users")
          const usersSnapshot = await getDocs(usersRef)
          const existingNicknames = usersSnapshot.docs.map(doc => doc.data().nickname)
          // Check and create missing users
          await Promise.all(uniqueUsers.map(async (userId) => {
            //Get user profile from Spotify   
            const userResponse = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (userResponse.ok) {
              const userProfile = await userResponse.json();
              userProfile.display_name = userProfile.display_name.toLowerCase();
              const userRef = doc(db, "users", userProfile.display_name);
              const userSnap = await getDoc(userRef);
              if (!userSnap.exists()) {
                // initialise user
                const nickname = await AIName(userProfile.display_name, existingNicknames);
                // Create new user document
                await setDoc(userRef, {
                  ...userProfile,
                  nickname,
                  badges: [],
                  points: 0
                }); 
              } else {
                await updateDoc(userRef, {
                  ...userProfile
                }); 
              }
            }
          }));

          // Save only new songs to Firestore
          const songPromises = items.map(async (item) => {
            const songRef = doc(db, "songs", item.track.id);
            const songSnap = await getDoc(songRef);
            if (!songSnap.exists()) {
              // Only create new song document if it doesn't exist
              const newSong = {
                added_by: item.added_by,
                added_at: item.added_at,
                ...item.track,
                reactions: [
                  { emoji: "🔥", count: 0, users: [] },
                  { emoji: "🤮", count: 0, users: [] }
                ]
              };
              return setDoc(songRef, newSong);
            }
            return Promise.resolve(); // Skip if song already exists
          });

          await Promise.all(songPromises);

          // Update nextUrl for pagination
          nextUrl = data.next;
        } catch (error) {
          console.error('Error fetching playlist tracks:', error);
          break;
        }
      }

      setPlaylist(allTracks);
    };

    if (token) {
      fetchAllTracks();
    }
  }, [token]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-retro-blue" />
          <h2 className="text-xl font-pixel text-white">Current Jam Playlist</h2>
        </div>
        
        <Button className="bg-retro-purple hover:bg-retro-purple/80 text-white" onClick={() => window.open(playlistUrl, '_blank')}>
            Join Jam
        </Button>
      </div>
      
      <div className="space-y-4">
        {playlist?.map((item) => (
          <SongCard key={item?.track.id} song={item} />
        ))}
      </div>
    </div>
  );
};
