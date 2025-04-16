import { useEffect, useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';



// TODO: add a genAI interesting fact about the song or the artist.
export const SongCard = ({ song }) => {
  const [reactions, setReactions] = useState([{ emoji: "🔥", count: "?", users: [] },
    { emoji: "🤮", count: "?", users: [] }]);
  const [showingPoints, setShowingPoints] = useState<{[key: string]: boolean}>({});


  const [addedByUser, setAddedByUser] = useState(null);
  const [user, setUser] = useState(null);
  
  const handleSelfVote = (emojiIndex) => {
    const upvoteMessages = [
      "As a wise man once said: 'The world doesn't care what you think' 🤷‍♂️",
      "Voting for your own song? That's like laughing at your own jokes 😅",
      "Nice try! But self-promotion isn't very retro 🕹️",
      "Your mom might think you're cool, but that doesn't count here 😎",
      "Error 418: I'm a teapot, and even I won't let you do that ☕",
      "You can't high-five yourself. Well, you can, but it's weird 🖐️🖐️",
      "Self-love is great, but not in the leaderboard 🏆🚫",
      "That's not how democracy works, chief 🗳️❌",
      "This isn’t LinkedIn — save the self-endorsements 🙅‍♂️",
      "The algorithm sees all. And it’s disappointed. 🤖",
      "Retro rule #1: no voting for your own 8-bit jam 🎮",
      "Self-vote detected. Confidence level: unhinged 💅",
      "Caught you clapping for yourself — bold move 🫡",
      "Voting for yourself? That’s some main character energy 🎭",
      "This isn’t Reddit, no upvotes for your own post here 💔",
      "Even in the '80s, self-votes were lame 🧨",
      "That move would've cost you a life in 8-bit land 💀",
      "Leaderboard access denied. Insert social validation to continue ⏹️",
      "This isn't the stock market — self-investing doesn't guarantee returns 📉",
      "Trying to pump your own stock? SEC says no 🚫📈",
      "Self-vote detected. Market confidence remains... low 📊",
      "Your self-vote has been marked as insider trading 🕵️‍♂️💼",
      "This playlist isn't a Ponzi scheme — you need actual contributors 🏦",
      "Your self-vote lacks stakeholder alignment. Revisit the roadmap 🗺️",
      "You can’t add yourself to the hall of fame, rockstar 🎸",
      "This isn’t a solo — let the crowd sing along first 🎤",
      "This isn’t SoundCloud circa 2010. The streets demand credibility 🔥",
      "Nice self-vote. Did you also write your own fan mail? 💌",
      "You just tried to encore your own opener. Bold move, DJ 🧃",
      "You can't climb the charts with just one stream — your own 🚫📈"
    ];
    const downvoteMessages = [
      "You cooked the beat and then threw it in the trash yourself 🍳🗑️",
      "You just shorted your own stock. Bold portfolio strategy 📉",
      "Investor sentiment is at an all-time low — and you started the sell-off 📊",
      "The beat dropped. Then you dropped it again. In shame 🥁😭",
  
    ]
    const messages = [upvoteMessages, downvoteMessages][emojiIndex]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    toast.warning(randomMessage);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = auth.currentUser.email
        const usersCollection = collection(db, 'users')
        const q2 = query(usersCollection, where("id", "==", song.added_by.id))
        const songSnapshot = await getDocs(q2)
        const songDisplayName = songSnapshot.docs[0].data().display_name
        const usersDoc = await getDocs(usersCollection);
        const users = usersDoc.docs.map(doc => doc.data())
        const addedByUser = users.find(user => user.display_name === songDisplayName)
        setAddedByUser(addedByUser)
        const q = query(usersCollection, where("email", "==", userEmail))
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0]
          setUser({...userDoc.data(), id: userDoc.ref.id});
        }
        const songDoc = await getDoc(doc(db, 'songs', song.track.id));
        
        if (!songDoc.data().reactions) {
          const initialReactions = [{ emoji: "🔥", count: 0, users: [] },
          { emoji: "🤮", count: 0, users: [] }]
          await setDoc(doc(db, 'songs', song.track.id), {reactions: initialReactions}, {merge: true});
          setReactions(initialReactions)
        } else {
          setReactions(songDoc.data().reactions)
        }
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };
    fetchData();
  }, []);
  
  const handleReaction = async(emojiIndex: number) => {
    const newReactions = [...reactions];
    const reaction = newReactions[emojiIndex];
    const userId = user.id;
    
    if (reaction.users.includes(userId)) {
      // Remove reaction - reverse the point change
      reaction.users = reaction.users.filter(id => id !== userId);
      const pointChange = emojiIndex === 0 ? -2 : 2;
      reaction.count += pointChange/2
      
      //
      const userDocRef = doc(db, 'users', addedByUser.display_name);
      const snapshot = await getDoc(userDocRef);
      const currentPoints = snapshot.data().points;
            
      // Reverse the points: add 1 if it was a negative reaction, subtract 1 if it was positive
      
      await updateDoc(userDocRef, {
        points: currentPoints + pointChange
      });

      // reverse half the points for voting
      const thisDocRef = doc(db, 'users', user.display_name);
      const thisSnapshot = await getDoc(thisDocRef);
      const thisCurrentPoints = thisSnapshot.data().points;
      await updateDoc(thisDocRef, {
        points: thisCurrentPoints + (pointChange/2)
      });

      
      toast.info("Reaction removed");
    } else {
      // Add reaction
      
      const userCollectionRef = collection(db, 'users');
      const q = query(userCollectionRef, where("id", "==", song.added_by.id))
      const snapshot = await getDocs(q)
      const songDisplayName = snapshot.docs[0].data().display_name
      if (songDisplayName !== user.id) {
        reaction.users.push(userId);
        const pointChange = emojiIndex === 0 ? 2 : -2;
        reaction.count += pointChange/2;
        const pointKey = `${song.id}-${emojiIndex}-${Date.now()}`;
        setShowingPoints(prev => ({ ...prev, [pointKey]: true }));
        
        const userDocRef = doc(db, 'users', addedByUser.display_name);
        const snapshot = await getDoc(userDocRef);
        const currentPoints = snapshot.data().points;
        
        // Add/subtract points based on reaction type
        
        const newPoints = currentPoints + pointChange;
        
        await updateDoc(userDocRef, {
          points: newPoints
        });
        // get half the points for voting
        const thisDocRef = doc(db, 'users', user.display_name);
        const thisSnapshot = await getDoc(thisDocRef);
        const thisCurrentPoints = thisSnapshot.data().points;
        await updateDoc(thisDocRef, {
          points: thisCurrentPoints + (pointChange/2)
        });

        toast.success(`${pointChange > 0 ? '+2' : '-2'} point!`);
        
        setTimeout(() => {
          setShowingPoints(prev => ({ ...prev, [pointKey]: false }));
        }, 2000);
      } else {
        handleSelfVote(emojiIndex);
      }
    }
    
    // Update reactions in Firestore
    
    setReactions(newReactions);
    // 🔥 Update Firestore
  try {
    const songDocRef = doc(db, 'songs', song.track.id);
    await updateDoc(songDocRef, {
      reactions: newReactions,
    });
  } catch (error) {
    console.error('Failed to update reactions in Firestore:', error);
    toast.error('Failed to save reaction');
  }
  };
  
  const isActiveReaction = (users: string[]) => users?.includes(user?.id);

  return (
    <div className="relative flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-card border border-retro-purple/30 hover:border-retro-purple/70 transition-all">
      {/* Album Art */}
      <div className="w-full md:w-24 h-24 flex-shrink-0">
        <img 
          src={song.track.album.images[0].url} 
          alt={`${song.name} by ${song.track.artists[0].name}`}
          className="w-full h-full object-cover rounded-md pixel-borders"
        />
      </div>
      
      {/* Song Info */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-retro text-white">{song.track.name}</h3>
          <p className="text-sm text-muted-foreground">{song.track.artists[0].name}</p>
        </div>
        <div className="flex items-center text-xs text-muted-foreground gap-2 mt-2">
          <UserIcon className="h-3 w-3" />
          <span>Added by {addedByUser?.nickname}</span>
        </div>
      </div>
      
      {/* Reactions */}
        {/*TODO: make this a toggle button with the two emojis 🔥 and 🤮 then look up the counts for each song from the song object*/}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2 md:mt-0">
        {reactions?.map((reaction, idx) => (
          <div key={`${song.id}-${reaction.emoji}`} className="relative">
            <Button
              variant={isActiveReaction(reaction.users) ? "default" : "outline"}
              size="sm"
              className={`relative font-normal ${
                isActiveReaction(reaction.users) 
                  ? 'bg-retro-purple text-white' 
                  : 'hover:bg-retro-purple/20 hover:text-white'
              }`}
              onClick={() => handleReaction(idx)}
            >
              <span className="mr-1">{reaction.emoji}</span>
              <span>{reaction.count}</span>
            </Button>
            
            {Object.entries(showingPoints).map(([key, showing]) => {
              if (key.startsWith(`${song.id}-${idx}`) && showing) {
                return (
                  <div 
                    key={key} 
                    className="absolute -top-8 left-2 text-retro-blue font-pixel animate-score-increase"
                  >
                    {reaction.count > 0 ? '+1' : '-1'}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
