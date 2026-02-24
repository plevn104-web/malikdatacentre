import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface ContractResult { title: string; sections: { heading: string; content: string }[] }

const AIContractTemplate = () => {
  const [serviceType, setServiceType] = useState("");
  const [scope, setScope] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<ContractResult>("contract-template");

  return (
    <AIToolLayout title="Contract Template" metaTitle="AI Contract Template Generator" metaDescription="Generate professional freelance contract templates with AI. Includes scope, payment terms, and IP rights." canonical="/ai-tools/contract-template">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Contract Template Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate professional contract templates with all essential clauses.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Service type (e.g., Web Development, Design)" value={serviceType} onChange={(e) => setServiceType(e.target.value)} maxLength={100} />
        <Input placeholder="Scope of work" value={scope} onChange={(e) => setScope(e.target.value)} maxLength={300} />
        <Button onClick={() => serviceType.trim() && generate({ serviceType: serviceType.trim(), scope: scope.trim() || "as discussed" })} disabled={isLoading || !serviceType.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Contract"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground text-center">{result.title}</h2>
          {result.sections?.map((s, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">{s.heading}</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{s.content}</p></div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(`${result.title}\n\n${result.sections?.map(s => `## ${s.heading}\n${s.content}`).join("\n\n")}`)}><Copy className="h-3 w-3 mr-1" /> Copy Contract</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIContractTemplate;
