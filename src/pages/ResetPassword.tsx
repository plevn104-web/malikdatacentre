import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, AlertCircle } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    // Check hash for recovery type (Supabase appends #access_token=...&type=recovery)
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
      setChecking(false);
      return;
    }

    // Also listen for PASSWORD_RECOVERY event from auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
        setChecking(false);
      }
    });

    // Give Supabase a moment to process the token exchange
    const timeout = setTimeout(() => {
      setChecking(false);
    }, 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated successfully!", description: "Please log in with your new password." });
      await supabase.auth.signOut();
      navigate("/login");
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-background">
        <SEOHead title="Reset Password" description="Set a new password for your account." canonical="/reset-password" noindex />
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="container px-4 max-w-md mx-auto flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!isRecovery) {
    return (
      <main className="min-h-screen bg-background">
        <SEOHead title="Reset Password" description="Set a new password for your account." canonical="/reset-password" noindex />
        <Navbar />
        <section className="pt-24 pb-16">
          <div className="container px-4 max-w-md mx-auto text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="font-display text-3xl font-bold text-foreground">Invalid or Expired Link</h1>
            <p className="text-muted-foreground">This reset link is invalid or has expired. Please request a new one.</p>
            <Link to="/forgot-password">
              <Button className="mt-4">Request New Reset Link</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Reset Password" description="Set a new password for your account." canonical="/reset-password" noindex />
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container px-4 max-w-md mx-auto">
          <h1 className="font-display text-3xl font-bold text-foreground text-center mb-8">Set New Password</h1>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
              <Input type="password" placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Confirm New Password</label>
              <Input type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive mt-1">Passwords don't match</p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...</> : "Update Password"}
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ResetPassword;
