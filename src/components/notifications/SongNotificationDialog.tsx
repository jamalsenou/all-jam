import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";

interface SongNotification {
  id: string;
  name: string;
  artists: { name: string }[];
  added_at: string;
  added_by: {
    id: string;
    nickname?: string;
    display_name?: string;
  };
}

export function SongNotificationDialog() {
  const [notifications, setNotifications] = useState<SongNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'users'));
          const userData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(userData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
    fetchUsers();
    // Query last 10 songs, ordered by added_at
    const q = query(
      collection(db, "songs"),
      orderBy("added_at", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newSongs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SongNotification[];
      
      setNotifications(newSongs);
      // Update unread count when dialog is closed
      if (!isOpen) {
        setUnreadCount(prev => prev + snapshot.docChanges().filter(change => change.type === 'added').length);
      }
    });

    return () => unsubscribe();
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setUnreadCount(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-retro-purple text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="font-retro">Notifications</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card text-white">
        <DialogHeader>
          <DialogTitle className="font-pixel text-xl">Recent Additions 🎵</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-retro-purple/30 bg-card/50"
            >
              <div className="flex-grow">
                <h4 className="font-retro text-sm text-white">{notification.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {notification.artists[0].name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Added by {users.find(user => user.id == notification.added_by.id)?.nickname} •{" "}
                  {formatDistanceToNow(new Date(notification.added_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 