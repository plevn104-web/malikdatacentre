import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Forgot Password" description="Reset your password to regain access to your account." canonical="/forgot-password" noindex />
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container px-4 max-w-md mx-auto">
          <h1 className="font-display text-3xl font-bold text-foreground text-center mb-8">Forgot Password</h1>
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-primary mx-auto" />
              <p className="text-foreground font-medium">Reset link sent!</p>
              <p className="text-sm text-muted-foreground">Check your email for a password reset link. It may take a few minutes.</p>
              <Link to="/login" className="text-primary hover:underline text-sm">Back to Log In</Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</> : "Send Reset Link"}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground text-center mt-4">
                <Link to="/login" className="text-primary hover:underline">Back to Log In</Link>
              </p>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ForgotPassword;
