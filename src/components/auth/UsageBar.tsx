import { useToolUsage } from "@/hooks/useToolUsage";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const UsageBar = () => {
  const { usage, limit, canUse, remaining, isProUser, loading } = useToolUsage();

  if (loading) return null;

  if (isProUser) {
    return (
      <div className="mb-6 p-4 border border-primary/30 bg-primary/5 rounded-lg">
        <p className="text-sm text-primary font-medium">⚡ Pro Plan — Unlimited tool runs</p>
      </div>
    );
  }

  const percentage = Math.min((usage / limit) * 100, 100);

  return (
    <div className="mb-6 p-4 border border-border/50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-foreground font-medium">
          You have used {usage}/{limit} runs this month
        </p>
        <span className="text-xs text-muted-foreground">{remaining} remaining</span>
      </div>
      <Progress value={percentage} className="h-2" />
      {!canUse && (
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-foreground mb-2">
            You reached your monthly free limit. Upgrade to Pro for unlimited access.
          </p>
          <Button size="sm" asChild>
            <Link to="/pricing">Upgrade to Pro</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
