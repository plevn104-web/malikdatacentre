import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [resending, setResending] = useState(false);

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

  // Check email verification
  const isVerified = user.email_confirmed_at != null;

  if (!isVerified) {
    const handleResend = async () => {
      setResending(true);
      const { error } = await supabase.auth.resend({ type: "signup", email: user.email! });
      if (error) {
        toast({ title: "Failed to resend", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Verification email sent!", description: "Please check your inbox." });
      }
      setResending(false);
    };

    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="container px-4 max-w-md mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MailCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">Verify Your Email</h1>
            <p className="text-muted-foreground mb-6">
              Please verify your email to access Creator Studio tools. Check your inbox for a verification link.
            </p>
            <div className="space-y-3">
              <Button onClick={handleResend} disabled={resending} variant="outline" className="w-full">
                {resending ? "Sending..." : "Resend Verification Email"}
              </Button>
              <Button asChild className="w-full">
                <Link to="/">Go to Homepage</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return <>{children}</>;
};
