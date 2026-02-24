import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/adminApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const PLANS = ["Free", "Starter", "Creator Pro", "Elite Creator"];

const AdminSubscriptions = () => {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    adminApi("subscriptions")
      .then((data) => setSubs(data.subscriptions || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? subs : subs.filter((s) => s.status === filter);

  const handleOverride = async (userId: string, planName: string) => {
    try {
      await adminApi("update_user_plan", { userId, planName });
      toast({ title: "Plan overridden" });
      // Refresh
      const data = await adminApi("subscriptions");
      setSubs(data.subscriptions || []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Subscription Management">
      <div className="flex gap-3 mb-6">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Expired/Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Plan</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Start</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Expires</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Override</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No subscriptions found</td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{s.user_name || "—"}</p>
                        <p className="text-xs text-muted-foreground">{s.user_email}</p>
                      </td>
                      <td className="px-4 py-3 text-foreground">{s.plan_name}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === "active" ? "bg-green-500/10 text-green-500" : "bg-muted/50 text-muted-foreground"}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(s.starts_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(s.expires_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <Select onValueChange={(v) => handleOverride(s.user_id, v)}>
                          <SelectTrigger className="h-8 text-xs w-32 ml-auto">
                            <SelectValue placeholder="Change plan" />
                          </SelectTrigger>
                          <SelectContent>
                            {PLANS.map((p) => (
                              <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSubscriptions;
