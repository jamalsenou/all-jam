import { useState } from 'react';
import { Music, Award, Menu, X, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { SongNotificationDialog } from "@/components/notifications/SongNotificationDialog";
import { FeatureRequestDialog } from "@/components/dialogs/FeatureRequestDialog";
import { PointsExplainerDialog } from "@/components/dialogs/PointsExplainerDialog";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear(); // Clear any stored user data
      toast.success("Signed out successfully");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Failed to sign out");
    }
  };

  // TODO: add a dialog for notifications that contains a notification for each new song added.
  return (
    <header className="sticky top-0 z-50 w-full border-b border-retro-purple/30 bg-card/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center">
        
        <div className="flex flex-1 items-center justify-between space-x-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-retro-purple" />
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-pixel text-white leading-tight">
                <span className="text-retro-purple animate-neon-pulse">ALL JAM</span>
              </h1>
              <span className="text-xs font-retro text-muted-foreground leading-none"></span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-retro-purple"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <SongNotificationDialog />
            <FeatureRequestDialog />
            <PointsExplainerDialog />
            <Button
              variant="ghost"
              size="sm"
              className="font-retro text-white hover:text-retro-purple hover:bg-background/20"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-card border-b border-retro-purple/30 py-4 md:hidden">
              <div className="flex flex-col gap-4 px-4">
                  <SongNotificationDialog />
                <Button variant="ghost" className="flex gap-2 justify-start text-muted-foreground hover:text-retro-pink">
                  <Award className="h-5 w-5" />
                  <span className="font-retro">Achievements</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add to Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-retro-purple/30">
          <div className="container py-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full font-pixel text-white hover:text-retro-purple hover:bg-background/20"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
