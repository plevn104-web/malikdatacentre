import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, BookOpen } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { title: string; description: string; installation: string; usage: string; features: string[]; contributing: string; license: string; }

const AIReadmeGenerator = () => {
  const [description, setDescription] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("readme-generator");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI README Generator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  const fullReadme = result ? `# ${result.title}\n\n${result.description}\n\n## Features\n\n${result.features?.map(f => `- ${f}`).join("\n")}\n\n## Installation\n\n${result.installation}\n\n## Usage\n\n${result.usage}\n\n## Contributing\n\n${result.contributing}\n\n## License\n\n${result.license}` : "";

  return (
    <AIToolLayout title="AI README Generator" metaTitle="AI README Generator" metaDescription="Generate professional README.md files for your projects using AI." canonical="/dev-tools/readme-generator">
      <SEOHead title="AI README Generator" description="Generate README files with AI" canonical="/dev-tools/readme-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><BookOpen className="h-7 w-7 text-primary" /> AI README Generator</h1>
      <p className="text-muted-foreground mb-6">Describe your project and get a complete README.md.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Describe your project, its purpose, tech stack..." value={description} onChange={(e) => setDescription(e.target.value.slice(0, 2000))} rows={4} />
        <Button onClick={() => generate({ description })} disabled={isLoading || !description.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate README"}</Button>
      </div>
      {result && (
        <Card><CardContent className="pt-6"><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{fullReadme}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(fullReadme)}><Copy className="h-3 w-3 mr-1" /> Copy README</Button></CardContent></Card>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Professional README Files</h2><p className="text-muted-foreground">Generate structured, professional README.md files with installation steps, usage instructions, and more.</p></section>
    </AIToolLayout>
  );
};
export default AIReadmeGenerator;
