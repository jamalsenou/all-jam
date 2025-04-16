import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";

export function FeatureRequestDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const featureRequestsRef = collection(db, "featureRequests");
      await addDoc(featureRequestsRef, {
        title: title.trim(),
        description: description.trim(),
        status: "pending", // pending, approved, rejected, completed
        votes: 0,
        voters: [],
        created_at: serverTimestamp(),
      });

      toast.success("Feature request submitted! 💡");
      setTitle("");
      setDescription("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting feature request:", error);
      toast.error("Failed to submit feature request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative font-retro text-retro-white hover:text-retro-purple/80"
        >
          <Lightbulb className="h-5 w-5 mr-2" />
          Feature Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel text-retro-purple">Got an Idea? 💡</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your feature request and help make ALL JAM even better!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Feature title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background/50 font-pixel"
              maxLength={50}
            />
            <Textarea
              placeholder="Describe your feature idea..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background/50 font-pixel min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {500 - description.length} characters remaining
            </p>
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="font-pixel bg-retro-purple hover:bg-retro-purple/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request 🚀"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 