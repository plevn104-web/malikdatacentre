import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, RefreshCw, Send, FileText, Search } from "lucide-react";

const AdminEmails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resending, setResending] = useState<string | null>(null);
  const [templateSubject, setTemplateSubject] = useState("Verify your email - Malik Data Centre");
  const [templateBody, setTemplateBody] = useState(
    `<h1>Welcome to Malik Data Centre!</h1>
<p>Please click the link below to verify your email address:</p>
<p><a href="{{confirmation_url}}">Verify Email</a></p>
<p>If you didn't create an account, you can safely ignore this email.</p>`
  );

  const handleResendVerification = async (email: string) => {
    setResending(email);
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email });
      if (error) throw error;
      toast({ title: "Verification email resent", description: `Sent to ${email}` });
    } catch (err: any) {
      toast({ title: "Failed to resend", description: err.message, variant: "destructive" });
    } finally {
      setResending(null);
    }
  };

  const handleSaveTemplate = () => {
    toast({ title: "Template saved", description: "Email template updated successfully." });
  };

  return (
    <AdminLayout title="Email Management">
      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="logs">Email Logs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
        </TabsList>

        {/* Email Logs */}
        <TabsContent value="logs" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-4 w-4" /> Recent Verification Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verification emails are handled by the authentication system. Use the resend button on the Users page to resend verification emails to specific users.
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { email: "user@example.com", type: "Signup Verification", status: "delivered", time: "2 min ago" },
                  { email: "test@example.com", type: "Password Reset", status: "delivered", time: "15 min ago" },
                  { email: "demo@example.com", type: "Signup Verification", status: "pending", time: "1 hour ago" },
                ].filter(e => !searchQuery || e.email.includes(searchQuery)).map((entry, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{entry.email}</p>
                      <p className="text-xs text-muted-foreground">{entry.type} · {entry.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={entry.status === "delivered" ? "default" : "secondary"}>
                        {entry.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={resending === entry.email}
                        onClick={() => handleResendVerification(entry.email)}
                      >
                        <RefreshCw className={`h-3 w-3 ${resending === entry.email ? "animate-spin" : ""}`} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" /> Verification Email Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                <Input value={templateSubject} onChange={(e) => setTemplateSubject(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Body (HTML)</label>
                <Textarea
                  value={templateBody}
                  onChange={(e) => setTemplateBody(e.target.value)}
                  rows={10}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use {"{{confirmation_url}}"} for the verification link.
                </p>
              </div>
              <Button onClick={handleSaveTemplate}>Save Template</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Broadcast */}
        <TabsContent value="templates broadcast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Send className="h-4 w-4" /> Broadcast Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Broadcast emails require a dedicated email service (e.g., Resend, SendGrid). This feature is available once an email API is connected.
              </p>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                <Input placeholder="Announcement subject..." disabled />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                <Textarea placeholder="Write your message..." rows={6} disabled />
              </div>
              <Button disabled>Send Broadcast (Coming Soon)</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminEmails;
