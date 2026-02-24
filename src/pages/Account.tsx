import { useAuth } from "@/hooks/useAuth";
import { useToolUsage } from "@/hooks/useToolUsage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, Navigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Account = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { usage, limit, isProUser, loading: usageLoading } = useToolUsage();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const percentage = Math.min((usage / limit) * 100, 100);
  const remaining = Math.max(0, limit - usage);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="My Account" description="Manage your account, view usage, and upgrade your plan." canonical="/account" noindex />
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container px-4 max-w-lg mx-auto">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">My Account</h1>

          {/* Profile */}
          <div className="border border-border/50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {user.user_metadata?.full_name || "User"}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Plan Status */}
          <div className="border border-border/50 rounded-xl p-6 mb-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">Plan Status</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${isProUser ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"}`}>
                {isProUser ? "Pro Plan" : "Free Plan"}
              </span>
            </div>

            {!usageLoading && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-foreground">Tool runs this month</p>
                  <p className="text-sm text-muted-foreground">
                    {isProUser ? `${usage} (unlimited)` : `${usage}/${limit}`}
                  </p>
                </div>
                {!isProUser && (
                  <>
                    <Progress value={percentage} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">{remaining} runs remaining</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {!isProUser && (
              <Button className="w-full" asChild>
                <Link to="/pricing">Upgrade to Pro</Link>
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Log Out
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Account;
