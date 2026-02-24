import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2, MailWarning } from "lucide-react";

const COOLDOWN_SECONDS = 60;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";
  const message = (location.state as any)?.message;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUnverifiedEmail(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Check if error is about unverified email
      if (error.message?.toLowerCase().includes("email not confirmed")) {
        setUnverifiedEmail(email);
        toast({ title: "Email not verified", description: "Please verify your email before logging in.", variant: "destructive" });
      } else {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      }
    } else if (data.user && !data.user.email_confirmed_at) {
      // Logged in but not verified
      setUnverifiedEmail(email);
      toast({ title: "Email not verified", description: "Please verify your email to access tools.", variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail || cooldown > 0) return;
    setResending(true);
    const { error } = await supabase.auth.resend({ type: "signup", email: unverifiedEmail });
    if (error) {
      toast({ title: "Failed to resend", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Verification email sent!", description: "Check your inbox and spam folder." });
      setCooldown(COOLDOWN_SECONDS);
    }
    setResending(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Welcome Back" description="Log in to your account to access YouTube tools and Creator Studio." canonical="/login" noindex />
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container px-4 max-w-md mx-auto">
          <h1 className="font-display text-3xl font-bold text-foreground text-center mb-4">Welcome Back</h1>
          {message && (
            <div className="mb-6 p-3 bg-muted/30 border border-border/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          )}

          {/* Unverified email banner */}
          {unverifiedEmail && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
              <div className="flex items-start gap-3">
                <MailWarning className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">Email not verified</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    A verification link was sent to <strong>{unverifiedEmail}</strong>. Check your inbox and spam folder.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleResendVerification}
                    disabled={resending || cooldown > 0}
                    className="text-xs"
                  >
                    {resending ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Logging in...</> : "Log In"}
            </Button>
          </form>
          <div className="flex justify-between mt-4 text-sm">
            <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;
