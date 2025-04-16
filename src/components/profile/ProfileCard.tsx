
import { Music, Headphones, Award, UserIcon } from 'lucide-react';

export const ProfileCard = ({user}) => {
  
  return (
    <div className="rounded-xl border border-retro-purple/30 bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-retro-purple/30 to-retro-blue/30 h-24 relative">
        <div className="absolute -bottom-12 left-4 h-24 w-24 rounded-xl overflow-hidden border-4 border-card">
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
      </div>
      
      <div className="pt-14 pb-4 px-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-retro text-white">{user?.nickname}</h3>
            <p className="text-sm text-retro-purple">
              <span className="font-pixel">{user?.points || 0}</span> points
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Top Genres */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4 text-retro-blue" />
              <span className="text-sm font-retro text-muted-foreground">Top Genres</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {/*user.topGenres.map((genre, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-retro-purple/20 border border-retro-purple/30 rounded-full text-xs"
                >
                  {genre}
                </span>
              ))*/}
            </div>
          </div>
          
          {/* Favorite Tracks */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Headphones className="h-4 w-4 text-retro-pink" />
              <span className="text-sm font-retro text-muted-foreground">Favorite Tracks</span>
            </div>
            <div className="space-y-1">
              {/*user.favoriteTracks.map((track, index) => (
                <div key={index} className="text-sm text-white font-retro">{track}</div>
              ))*/}
            </div>
          </div>
          
          {/* Badges */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-retro-orange" />
              <span className="text-sm font-retro text-muted-foreground">Badges Earned</span>
            </div>
            <div className="flex gap-2">
              {/*user.badges.map((badge) => (
                <span 
                  key={badge}
                  className="text-2xl"
                  title={badge}
                >
                  {badge.icon}
                </span>
              ))*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
