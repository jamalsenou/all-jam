import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Flame, Skull, Star } from "lucide-react";

export function PointsExplainerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-retro-purple hover:text-retro-purple/80"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel text-retro-purple">How Points Work 🎮</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Level up your jam score with these point mechanics
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            {/* Song Reactions */}
            <div className="bg-background/20 p-4 rounded-lg border border-retro-purple/30">
              <h3 className="font-pixel text-lg text-retro-blue mb-2">Song Reactions</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-sm">Get a 🔥: <span className="text-green-400">+2 points</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Skull className="h-5 w-5 text-red-500" />
                  <span className="text-sm">Get a 🤮: <span className="text-red-400">-2 points</span></span>
                </div>
              </div>
            </div>

            {/* Voting */}
            <div className="bg-background/20 p-4 rounded-lg border border-retro-purple/30">
              <h3 className="font-pixel text-lg text-retro-blue mb-2">Voting Points</h3>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">Vote on any song: <span className="text-green-400">+1 point</span></span>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-background/20 p-4 rounded-lg border border-retro-purple/30">
              <h3 className="font-pixel text-lg text-retro-blue mb-2">Game Rules</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• You can't vote on your own songs</li>
                <li>• Points are awarded instantly</li>
                <li>• Removing your vote reverses the points</li>
                <li>• Keep it fun and fair! 🎮</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 