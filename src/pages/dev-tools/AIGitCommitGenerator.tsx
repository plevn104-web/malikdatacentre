import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, GitCommit } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { conventional: string; short: string; detailed: string; }

const AIGitCommitGenerator = () => {
  const [description, setDescription] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("git-commit-generator");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Git Commit Message Generator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Git Commit Generator" metaTitle="AI Git Commit Message Generator" metaDescription="Generate conventional git commit messages from change descriptions using AI." canonical="/dev-tools/git-commit-generator">
      <SEOHead title="AI Git Commit Message Generator" description="Generate git commit messages with AI" canonical="/dev-tools/git-commit-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><GitCommit className="h-7 w-7 text-primary" /> AI Git Commit Message Generator</h1>
      <p className="text-muted-foreground mb-6">Describe your changes and get a proper commit message.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Describe what you changed..." value={description} onChange={(e) => setDescription(e.target.value.slice(0, 1000))} rows={3} />
        <Button onClick={() => generate({ description })} disabled={isLoading || !description.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate Commit Message"}</Button>
      </div>
      {result && (
        <div className="space-y-3">
          {[{ label: "Conventional", value: result.conventional }, { label: "Short", value: result.short }, { label: "Detailed", value: result.detailed }].map((m) => (
            <Card key={m.label}><CardContent className="pt-4 flex justify-between items-start"><div><span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{m.label}</span><pre className="text-sm font-mono mt-2 whitespace-pre-wrap text-muted-foreground">{m.value}</pre></div><Button variant="ghost" size="sm" onClick={() => copyToClipboard(m.value)}><Copy className="h-3 w-3" /></Button></CardContent></Card>
          ))}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Better Commit Messages</h2><p className="text-muted-foreground">Follow conventional commit standards automatically with AI-generated messages.</p></section>
    </AIToolLayout>
  );
};
export default AIGitCommitGenerator;
