import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/adminApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AdminAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi("analytics")
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Tool Usage Analytics">
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout title="Tool Usage Analytics">
        <p className="text-muted-foreground">Failed to load analytics.</p>
      </AdminLayout>
    );
  }

  const toolData = Object.entries(data.toolCounts || {})
    .map(([name, count]) => ({ name: name.replace(/-/g, " "), count }))
    .sort((a: any, b: any) => b.count - a.count);

  const dailyData = Object.entries(data.dailyCounts || {})
    .map(([date, count]) => ({ date: date.substring(5), count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const monthlyData = Object.entries(data.monthlyCounts || {})
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const mostUsed = toolData[0];
  const leastUsed = toolData[toolData.length - 1];

  return (
    <AdminLayout title="Tool Usage Analytics">
      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-border/50 rounded-xl p-5 bg-card">
          <p className="text-sm text-muted-foreground mb-1">Most Used Tool</p>
          <p className="font-display text-lg font-bold text-foreground capitalize">{mostUsed?.name || "—"}</p>
          <p className="text-xs text-muted-foreground">{(mostUsed?.count as number) || 0} runs this month</p>
        </div>
        <div className="border border-border/50 rounded-xl p-5 bg-card">
          <p className="text-sm text-muted-foreground mb-1">Least Used Tool</p>
          <p className="font-display text-lg font-bold text-foreground capitalize">{leastUsed?.name || "—"}</p>
          <p className="text-xs text-muted-foreground">{(leastUsed?.count as number) || 0} runs this month</p>
        </div>
      </div>

      {/* Tool usage chart */}
      <div className="border border-border/50 rounded-xl p-5 bg-card mb-8">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Usage by Tool (This Month)</h2>
        {toolData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={toolData} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
              <XAxis type="number" stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="hsl(220, 10%, 55%)" fontSize={11} width={100} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220, 20%, 6%)", border: "1px solid hsl(220, 15%, 15%)", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="count" fill="hsl(200, 100%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm py-8 text-center">No usage data this month</p>
        )}
      </div>

      {/* Daily chart */}
      <div className="border border-border/50 rounded-xl p-5 bg-card mb-8">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Daily Usage (This Month)</h2>
        {dailyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
              <XAxis dataKey="date" stroke="hsl(220, 10%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220, 20%, 6%)", border: "1px solid hsl(220, 15%, 15%)", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="count" fill="hsl(270, 70%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm py-8 text-center">No daily data</p>
        )}
      </div>

      {/* Monthly chart */}
      <div className="border border-border/50 rounded-xl p-5 bg-card">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Monthly Usage (Last 6 Months)</h2>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(220, 10%, 55%)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220, 20%, 6%)", border: "1px solid hsl(220, 15%, 15%)", borderRadius: "8px", color: "#fff" }} />
              <Bar dataKey="count" fill="hsl(180, 100%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm py-8 text-center">No monthly data</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
