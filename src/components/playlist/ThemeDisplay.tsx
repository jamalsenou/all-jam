//TODO: write a scheduled firestore function that runs weekly and generates a theme for the next week using open ai, writes the result to firestore and read the current week theme from there
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeDisplay = () => {
  const [topSong, setTopSong] = useState(null);
  const [weeklyTheme, setWeeklyTheme] = useState(null)

  const getCurrentTheme = async() => {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' format
    const themesRef = collection(db, 'themes')
    const snapshot = await getDocs(themesRef)
    const weeklyThemes = snapshot.docs.map(doc => doc.data())
    return weeklyThemes.find(theme => 
      today >= theme.startDate && today <= theme.endDate
    );
  };
  
  const formattedStartDate = new Date(weeklyTheme?.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  
  const formattedEndDate = new Date(weeklyTheme?.endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  useEffect(() => {
    const fetchTopSong = async () => {
      setWeeklyTheme(await getCurrentTheme())
      try {
        const snapshot = await getDocs(collection(db, "songs"));
        let maxFireCount = -1;
        let hotSong = null;

        snapshot.docs.forEach(doc => {
          const song = doc.data();
          const reactions = song.reactions || [];
          // Find the fire emoji reaction
          const fireReaction = reactions.find(r => r.emoji === "🔥");
          const fireCount = fireReaction?.count || 0;

          if (fireCount > maxFireCount) {
            maxFireCount = fireCount;
            hotSong = song;
          }
        });

        setTopSong(hotSong);
      } catch (error) {
        console.error('Error fetching top song:', error);
      }
    };

    fetchTopSong();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-retro-purple/30 bg-card">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${weeklyTheme?.banner})` }}
      />
      
      <div className="relative z-10 p-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-retro-blue" />
          <p className="text-sm font-retro text-muted-foreground">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-pixel text-white neon-text mb-1">
          {weeklyTheme?.name}
        </h2>
        
        <div className="mb-3 px-3 py-1 bg-retro-purple/20 rounded-full">
          <p className="text-sm font-retro text-white">Weekly Selection</p>
        </div>
        
        <p className="text-base font-retro text-center max-w-2xl text-muted-foreground">
          {weeklyTheme?.description}
        </p>
        
        <div className="mt-5 px-4 py-2 bg-gradient-to-r from-retro-purple/20 to-retro-pink/20 rounded-lg border border-retro-purple/30">
          <p className="text-sm font-retro text-white">
            <span className="text-retro-blue">Top Song:</span> {topSong?.name} by {topSong?.artists[0].name}
          </p>
        </div>
      </div>
    </div>
  );
};
