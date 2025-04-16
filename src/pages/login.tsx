import { useState } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: `${window.location.origin}/`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      
      toast.success("Magic link sent!", {
        description: "Check your email for the login link",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send login link", {
        description: "Please try again",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl border border-retro-purple/30">
        <div className="text-center">
          <h2 className="text-3xl font-pixel text-foreground">Welcome!</h2>
          <p className="mt-2 text-muted-foreground">Enter your email to continue</p>
        </div>

        <form onSubmit={handleEmailLink} className="mt-8 space-y-6">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-pixel bg-background/50"
            required
          />
          
          <Button
            type="submit"
            className="w-full font-pixel py-6 bg-card hover:bg-card/80 border border-retro-purple/50"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
      </div>
    </div>
  );
} 