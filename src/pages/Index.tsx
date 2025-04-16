import { Header } from "@/components/layout/Header";
import { ThemeDisplay } from "@/components/playlist/ThemeDisplay";
import { PlaylistSection } from "@/components/playlist/PlaylistSection";
import { LeaderboardSection } from "@/components/leaderboard/LeaderboardSection";
import { BadgesSection } from "@/components/achievements/BadgesSection";
import { useEffect, useState } from "react";
import { Music, Headphones, Disc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc, setDoc, getDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AIName } from "@/lib/utils";
import { WelcomeDialog } from "@/components/dialogs/WelcomeDialog";
import { ProfileCard } from "@/components/profile/ProfileCard";

export const Index = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [user, setUser] = useState<DocumentData | undefined>()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
      getAccessToken();
      if (user?.email) {
        // Check if user exists in Firestore
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where("email", "==", user.email));
        const snapshot = await getDocs(q)
        if (!snapshot.empty){
          const unsubscribe = onSnapshot(q, async(snapshot) => {
              setUser(snapshot.docs[0].data());
          }, (error) => {
            console.error('Error listening to users:', error);
          });
          // Clean up listener on unmount
          return () => unsubscribe();
        } else {
          // Show welcome dialog for new users
          setShowWelcomeDialog(true);
        }

      }
    });

    // Check if the user came from an email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            // Clean up URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
          })
          .catch((error) => {
            console.error('Error signing in with email link:', error);
            toast.error("Login failed", {
              description: "Please try again",
            });
          });
      }
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const getUserName = async (displayName?: string) => {
    try {
      const auth = getAuth();
      const userEmail = auth.currentUser?.email;
      if (!userEmail) return;

      const usersCollection = collection(db, 'users');
      const snapshot = await getDoc(doc(usersCollection, displayName));
      
      const newUserData = {
        display_name: displayName,
        email: userEmail,
        badges: [],
        images: [],
        points: 0,
        created_at: new Date()
      };
      let nickname
      if (!snapshot.exists()) {
        // Create new user
        const usersSnapshot = await getDocs(usersCollection)
        const existingNicknames = usersSnapshot.docs.map(doc => doc.data().nickname)
        nickname = await AIName(displayName, existingNicknames);
        const docRef = doc(usersCollection, displayName)
        await setDoc(docRef, {...newUserData, nickname});
        
       
      } else {
        // Update existing user
        nickname = snapshot.data().nickname
        await updateDoc(snapshot.ref, {
          ...newUserData,
          // Preserve existing badges and points if they exist
          badges: snapshot.data().badges || [],
          points: snapshot.data().points || 0,
          updated_at: new Date()
        });
        
      }
      toast.success("Profile created!", {
        description: `Welcome, ${nickname}! 🎵`
      });
    } catch (error) {
      console.error('Error managing user profile:', error);
      toast.error("Failed to manage profile");
    }
  };

  // Main function to get user profile data
  const getAccessToken = async () => {
    // Case 1: We have an access token but need to check if it's valid
    const app = getApp()
    const functions = getFunctions(app, "europe-west3");
    const getSpotifyToken = httpsCallable(functions, 'getSpotifyToken');
    const res = await getSpotifyToken()
    const accessToken = res.data.access_token
    setAccessToken(accessToken)
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Animation delay
      navigate('/login');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsConnecting(false);
    }
  };

  const handleWelcomeSubmit = (displayName: string) => {
    getUserName(displayName);
    setShowWelcomeDialog(false);
  };

  if (!isAuthenticated) {
    if (loading) {
      return <div>Loading...</div>; // Or your loading component
    }
    
    return (
      <>
        <div className="min-h-screen bg-retro-dark text-white flex flex-col items-center justify-center px-4 overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-retro-grid bg-[size:50px_50px] opacity-20" />
            <div className="absolute bottom-0 w-full h-[2px] bg-retro-purple/50 animate-scan" />
          </div>

          {/* Moving Stars */}
          <div className="fixed inset-0 -z-5">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 bg-white rounded-full animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative text-center space-y-6 max-w-2xl mx-auto">
            {/* Animated Logo */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-retro-purple/20 blur-xl rounded-full animate-pulse" />
              <div className="relative">
                <Disc className={`h-24 w-24 text-retro-purple transition-transform duration-200 ${
                  isConnecting ? 'animate-spin' : 'animate-float'
                }`} />
                <Music className="h-12 w-12 text-retro-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
            </div>
            
            {/* Title with Pixel Movement */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-pixel text-white relative">
                {['A', 'L', 'L'].map((letter, i) => (
                  <span
                    key={i}
                    className="text-retro-purple animate-neon-pulse inline-block"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {letter}
                  </span>
                ))}
                {' '}
                <span className="text-retro-blue animate-neon-pulse-delayed">JAM</span>
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-retro-purple to-transparent animate-scan" />
            </div>
            
            <p className="font-retro text-muted-foreground text-lg">
              Where good vibes meet great tunes 🎵
            </p>
            
            {/* Animated Button */}
            <div className="relative mt-12 group perspective">
              <div className="absolute -inset-1 bg-gradient-to-r from-retro-purple via-retro-blue to-retro-purple rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
              <Button
                size="lg"
                className={`relative px-8 py-6 bg-card hover:bg-card/80 border border-retro-purple/50 font-pixel text-xl transform transition-all duration-300 ${
                  isConnecting 
                    ? 'animate-pulse pointer-events-none scale-95' 
                    : 'hover:scale-105 hover:rotate-1'
                }`}
                onClick={handleConnect}
                disabled={isConnecting}
              >
                <Headphones className={`mr-2 h-6 w-6 ${isConnecting ? 'animate-bounce' : 'animate-float'}`} />
                {isConnecting ? "Connecting..." : "New Game"}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8 font-retro animate-float">
              Join the jam and share your favorite tracks 🎧
            </p>
          </div>

          {/* Pixel "scanlines" effect */}
          <div className="fixed inset-0 pointer-events-none bg-scanline opacity-5" />
        </div>
        
      </>
    );
  }

  return (
    <div className="min-h-screen bg-retro-dark text-white flex flex-col">
      <Header />
      <WelcomeDialog 
          isOpen={showWelcomeDialog} 
          onSubmit={handleWelcomeSubmit} 
        />
      {/*<Button onClick={() => localStorage.removeItem('access_token')}>reset</Button>*/}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Theme Display */}
            <ThemeDisplay />
            
            <iframe 
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/4b50pHeh4WqIedJBrJFmWx?utm_source=generator&theme=0" 
              width="100%" 
              height="152" 
              frameBorder="0" 
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
            
            {/* Playlist Section */}
            <div className="rounded-xl border border-retro-purple/30 bg-card overflow-hidden">
              <PlaylistSection token={accessToken}/>
            </div>
          </div>
          
          {/* Sidebar - Right Column (1/3 width on large screens) */}
          <div className="space-y-6">
            {/* Profile Card */}
            <ProfileCard user={user}/>

            {/* Leaderboard Section */}
            <LeaderboardSection />
            
            {/* Badges Section */}
            <BadgesSection user={user}/>
          </div>
        </div>
      </main>
      
      <footer className="bg-card/80 backdrop-blur-lg border-t border-retro-purple/30 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-retro text-muted-foreground">
            © 2025 Jam | A Music Experience
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
