
import { Award } from 'lucide-react';

import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { allBadges } from '@/data/mockData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllBadges } from '@/lib/utils';

export const BadgesSection = ({user}) => {
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [allBadges, setAllBadges] = useState([])
  

  useEffect(() => {
  const loadBadges = async() => {
      setAllBadges(await getAllBadges())
    }
    loadBadges()
    if (user){
      setUserBadges(user.badges || []);
      
    }
  }, []);
  const [showAllBadges, setShowAllBadges] = useState(false);

  
  const displayBadges = showAllBadges ? allBadges : allBadges.slice(0, 6);
  
  return (
    <div className="rounded-xl border border-retro-purple/30 bg-card overflow-hidden">
      <div className="p-4 bg-retro-purple/20 border-b border-retro-purple/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-retro-blue" />
          <h2 className="text-lg font-pixel text-white">Achievements</h2>
        </div>
        
        <button 
          className="text-sm font-retro text-retro-purple hover:text-retro-blue transition-colors"
          onClick={() => setShowAllBadges(!showAllBadges)}
        >
          {showAllBadges ? 'Show Less' : 'View All'}
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {displayBadges.map((badge) => {
            const isEarned = userBadges?.includes(badge.id);

            
            return (
              <TooltipProvider key={badge.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className={`aspect-square flex flex-col items-center justify-center p-2 rounded-lg border ${
                        isEarned 
                          ? 'border-retro-purple bg-retro-purple/10 neon-border' 
                          : 'border-gray-700 bg-muted/20 opacity-50'
                      }`}
                    >
                      <span className="text-3xl mb-1">{badge.icon}</span>
                      <span className="text-xs font-retro text-center line-clamp-1">
                        {badge.name}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card border-retro-purple/30">
                    <div className="p-2">
                      <p className="font-retro text-white">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      {!isEarned && (
                        <p className="text-xs text-retro-purple mt-1">Not yet earned</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
        
        {showAllBadges && (
          <p className="text-xs text-center text-muted-foreground mt-4">
            Earn badges by contributing songs and getting reactions from your colleagues!
          </p>
        )}
      </div>
    </div>
  );
};
