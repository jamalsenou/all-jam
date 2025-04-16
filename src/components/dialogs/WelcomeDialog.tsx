import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface WelcomeDialogProps {
  isOpen: boolean;
  onSubmit: (displayName: string) => void;
}

export function WelcomeDialog({ isOpen, onSubmit }: WelcomeDialogProps) {
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError("Please enter your display name");
      return;
    }
    onSubmit(displayName.toLowerCase().trim());
  };

  return (
    <Dialog open={isOpen} >
      <DialogContent className="sm:max-w-[425px] bg-card text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel text-retro-purple">Welcome to ALL JAM!</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            To get started, we need your Spotify display name
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Your Spotify display name"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value.toLowerCase());
                setError("");
              }}
              className="bg-background/50 font-pixel"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <p className="text-sm text-muted-foreground">
              Hint: You can find this by hovering over your avatar in the top right of the Spotify app
            </p>
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="font-pixel bg-retro-purple hover:bg-retro-purple/80"
            >
              Let's Go! 🎵
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 