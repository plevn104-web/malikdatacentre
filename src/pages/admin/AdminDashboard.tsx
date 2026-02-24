import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/adminApi";
import { Users, UserCheck, Zap, DollarSign, Crown } from "lucide-react";

interface Stats {
  totalUsers: number;
  verifiedUsers: number;
  planCounts: Record<string, number>;
  toolRunsThisMonth: number;
  revenueThisMonth: number;
  revenueAllTime: number;
}

const StatCard = ({ label, value, icon: Icon, color = "primary" }: { label: string; value: string | number; icon: any; color?: string }) => (
  <div className="border border-border/50 rounded-xl p-5 bg-card">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className={`h-9 w-9 rounded-lg bg-${color}/10 flex items-center justify-center`}>
        <Icon className={`h-4 w-4 text-${color}`} />
      </div>
    </div>
    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi("dashboard_stats")
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Creator Studio Admin Panel">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout title="Creator Studio Admin Panel">
        <p className="text-muted-foreground">Failed to load dashboard data.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Creator Studio Admin Panel">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Registered Users" value={stats.totalUsers} icon={Users} />
        <StatCard label="Verified Users" value={stats.verifiedUsers} icon={UserCheck} />
        <StatCard label="Free Plan Users" value={stats.planCounts.Free || 0} icon={Users} />
        <StatCard label="Starter Users" value={stats.planCounts.Starter || 0} icon={Crown} />
        <StatCard label="Creator Pro Users" value={stats.planCounts["Creator Pro"] || 0} icon={Crown} />
        <StatCard label="Elite Users" value={stats.planCounts["Elite Creator"] || 0} icon={Crown} />
        <StatCard label="Tool Runs (This Month)" value={stats.toolRunsThisMonth} icon={Zap} />
        <StatCard label="Revenue This Month" value={`Rs ${stats.revenueThisMonth.toLocaleString()}`} icon={DollarSign} />
        <StatCard label="Revenue All Time" value={`Rs ${stats.revenueAllTime.toLocaleString()}`} icon={DollarSign} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
