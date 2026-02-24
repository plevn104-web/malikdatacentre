import { useToolUsage } from "@/hooks/useToolUsage";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const UsageBar = () => {
  const { usage, limit, canUse, remaining, plan, isUnlimited, loading } = useToolUsage();

  if (loading) return null;

  if (isUnlimited) {
    return (
      <div className="mb-6 p-4 border border-primary/30 bg-primary/5 rounded-lg">
        <p className="text-sm text-primary font-medium">⚡ {plan.name} Plan — Unlimited tool runs</p>
      </div>
    );
  }

  const percentage = Math.min((usage / (limit as number)) * 100, 100);

  return (
    <div className="mb-6 p-4 border border-border/50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-foreground font-medium">
          {plan.name} Plan — {usage}/{limit} runs used
        </p>
        <span className="text-xs text-muted-foreground">{remaining} remaining</span>
      </div>
      <Progress value={percentage} className="h-2" />
      {!canUse && (
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-foreground mb-2">
            You've reached your monthly {plan.name} limit. Upgrade for more runs.
          </p>
          <Button size="sm" asChild>
            <Link to="/pricing">Upgrade Plan</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
