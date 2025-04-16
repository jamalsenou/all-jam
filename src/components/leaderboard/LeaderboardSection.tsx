import { useState, useEffect } from 'react';
import { Trophy, Crown, Medal, User as UserIcon } from 'lucide-react';
import { getTopContributors, getAllBadges } from '@/lib/utils';

import { PixelDropdown } from './PixelDropdown'; // Adjust path as needed
import { db } from '@/lib/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

const timeOptions = [
  { value: 'week', label: 'Top This Week' },
  { value: 'month', label: 'Top This Month' },
  { value: 'year', label: 'Top This Year' },
  { value: 'all', label: 'All Time' },
];



export const LeaderboardSection = () => {
  const [topContributors, setTopContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [allBadges, setAllBadges] = useState([])

useEffect(() => {
  const load = async() => {
    setAllBadges(await getAllBadges())
  }
  load()
}, [])

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onSnapshot(collection(db, 'users'), async(snapshot) => {
        setTopContributors(await getTopContributors(snapshot));
    }, (error) => {
      console.error('Error listening to users:', error);
    });
    setIsLoading(false);  
    // Clean up listener on unmount
    return () => unsubscribe();

  }, []);

  return (
    <div className="rounded-xl border border-retro-purple/30 bg-card overflow-hidden relative">
      {/* Header */}
      <div className="p-4 bg-retro-purple/20 border-b border-retro-purple/30 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-pixel text-center text-white neon-text">
          HIGH SCORES
        </h2>
        {/* Time Filter Dropdown */}
      <div className="right-4 top-4 z-10">
        <PixelDropdown
          options={timeOptions}
          value={timeRange}
          onChange={(val) => setTimeRange(val as TimeRange)}
        />
      </div>
      </div>

      {/* Content */}
      <div className="p-4 relative crt-effect">
        <div className="absolute inset-0 pointer-events-none bg-retro-grid bg-[length:20px_20px] opacity-20"></div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-retro-purple border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-retro text-retro-blue animate-pulse">LOADING...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topContributors.slice(0, 10).map((user, index) => (
              <div 
                key={user.display_name} 
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  index < 3 
                    ? 'bg-gradient-to-r from-retro-purple/20 to-transparent border border-retro-purple/30' 
                    : 'border border-transparent hover:border-retro-purple/30'
                } transition-all`}
              >
                {/* Rank */}
                <div className="w-8 text-center font-pixel">
                  {index === 0 ? (
                    <Crown className="h-6 w-6 text-yellow-400 animate-flicker" />
                  ) : index === 1 ? (
                    <Trophy className="h-6 w-6 text-gray-300" />
                  ) : index === 2 ? (
                    <Medal className="h-6 w-6 text-amber-600" />
                  ) : (
                    <span className="text-muted-foreground">{index + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  {user?.images?.[0]?.url ? (
                    <img 
                      src={user.images[0].url} 
                      alt={user.display_name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-retro-purple/30 flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-retro-purple" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <p className="font-retro text-white">{user.nickname}</p>
                  <div className="flex gap-1 text-xs">
                    {user.badges.slice(0, 2).map((earnedBadge) => {
                      const badge = allBadges.find((badge) => badge.id === earnedBadge)
                      return(
                      <span key={badge?.id} title={badge?.name} className="text-lg">
                        {badge?.icon}
                      </span>
                    )}
                    )}
                  </div>
                </div>

                {/* Points */}
                <div className="font-pixel text-lg text-retro-blue">
                  {user.points || 0}
                </div>
              </div>
            ))}

            <div className="font-retro text-sm text-center text-muted-foreground mt-4 pt-2 border-t border-retro-purple/20">
              Scores update in real-time as songs receive reactions
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
