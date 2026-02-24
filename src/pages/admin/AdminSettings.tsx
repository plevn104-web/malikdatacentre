import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [freeLimit, setFreeLimit] = useState("10");
  const [starterLimit, setStarterLimit] = useState("200");
  const [proLimit, setProLimit] = useState("600");
  const [supportEmail, setSupportEmail] = useState("support@malikdatacentre.store");
  const [adsEnabled, setAdsEnabled] = useState(true);

  const [tools, setTools] = useState([
    { name: "Title Generator", enabled: true },
    { name: "Description Generator", enabled: true },
    { name: "Tag Generator", enabled: true },
    { name: "Thumbnail Headline Generator", enabled: true },
    { name: "Hashtag Generator", enabled: true },
    { name: "Revenue Estimator", enabled: true },
    { name: "Watch Time Calculator", enabled: true },
    { name: "SEO Score Checker", enabled: true },
    { name: "Keyword Explorer", enabled: true },
    { name: "SEO Analyzer", enabled: true },
    { name: "Tag Optimization", enabled: true },
    { name: "Competitor Breakdown", enabled: true },
    { name: "Monetization Estimator", enabled: true },
    { name: "Watch Time Simulator", enabled: true },
    { name: "CTR Assistant", enabled: true },
    { name: "Script Builder", enabled: true },
    { name: "Content Repurposing", enabled: true },
    { name: "Content Planner", enabled: true },
  ]);

  const toggleTool = (index: number) => {
    setTools((prev) => prev.map((t, i) => (i === index ? { ...t, enabled: !t.enabled } : t)));
  };

  const handleSave = () => {
    // Placeholder — in production this would persist to a settings table
    toast({ title: "Settings saved", description: "Changes applied successfully." });
  };

  return (
    <AdminLayout title="System Settings">
      <div className="space-y-8 max-w-2xl">
        {/* Usage Limits */}
        <section className="border border-border/50 rounded-xl p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Usage Limits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Free Plan (runs/mo)</label>
              <Input type="number" value={freeLimit} onChange={(e) => setFreeLimit(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Starter (runs/mo)</label>
              <Input type="number" value={starterLimit} onChange={(e) => setStarterLimit(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Creator Pro (runs/mo)</label>
              <Input type="number" value={proLimit} onChange={(e) => setProLimit(e.target.value)} />
            </div>
          </div>
        </section>

        {/* Ads */}
        <section className="border border-border/50 rounded-xl p-6 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Ads Inside Tools</h2>
              <p className="text-sm text-muted-foreground">Show ads for free plan users</p>
            </div>
            <Switch checked={adsEnabled} onCheckedChange={setAdsEnabled} />
          </div>
        </section>

        {/* Support Email */}
        <section className="border border-border/50 rounded-xl p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Support Email</h2>
          <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
        </section>

        {/* Tool Toggle */}
        <section className="border border-border/50 rounded-xl p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Enable / Disable Tools</h2>
          <div className="space-y-3">
            {tools.map((tool, i) => (
              <div key={tool.name} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">{tool.name}</span>
                <Switch checked={tool.enabled} onCheckedChange={() => toggleTool(i)} />
              </div>
            ))}
          </div>
        </section>

        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Save className="h-4 w-4 mr-2" /> Save Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
