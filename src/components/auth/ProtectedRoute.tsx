import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MailCheck, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect, useCallback } from "react";

const COOLDOWN_SECONDS = 60;

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [checking, setChecking] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (!user?.email || cooldown > 0) return;
    setResending(true);
    const { error } = await supabase.auth.resend({ type: "signup", email: user.email });
    if (error) {
      if (error.message?.includes("rate") || error.message?.includes("limit")) {
        toast({ title: "Too many requests", description: "Please wait before trying again.", variant: "destructive" });
      } else {
        toast({ title: "Failed to resend", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Verification email sent!", description: "Please check your inbox and spam folder." });
      setCooldown(COOLDOWN_SECONDS);
    }
    setResending(false);
  }, [user?.email, cooldown]);

  // Refresh session to pick up verified status
  const handleCheckStatus = useCallback(async () => {
    setChecking(true);
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      toast({ title: "Could not refresh session", description: error.message, variant: "destructive" });
    } else if (data.user?.email_confirmed_at) {
      toast({ title: "Email verified! 🎉", description: "You can now access all tools." });
      // The auth state change will re-render and show children
    } else {
      toast({ title: "Not verified yet", description: "Please click the link in your verification email first." });
    }
    setChecking(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname, message: "Please log in to use this tool." }} replace />;
  }

  const isVerified = user.email_confirmed_at != null;

  if (!isVerified) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="container px-4 max-w-md mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MailCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">Verify Your Email</h1>
            <p className="text-muted-foreground mb-2">
              Please verify your email to access Creator Studio tools.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Check your inbox (and spam folder) for a verification link sent to <strong className="text-foreground">{user.email}</strong>.
            </p>
            <div className="space-y-3">
              <Button onClick={handleResend} disabled={resending || cooldown > 0} variant="outline" className="w-full">
                {resending ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
              </Button>
              <Button onClick={handleCheckStatus} disabled={checking} variant="default" className="w-full">
                <RefreshCw className={`h-4 w-4 mr-2 ${checking ? "animate-spin" : ""}`} />
                {checking ? "Checking..." : "I've Verified — Check Status"}
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link to="/">Go to Homepage</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              Verification links expire after 24 hours. Use the resend button if your link has expired.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return <>{children}</>;
};
