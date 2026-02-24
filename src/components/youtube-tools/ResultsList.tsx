import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";

interface ResultsListProps {
  results: string[];
  isLoading: boolean;
  onCopy: (text: string) => void;
  onCopyAll: () => void;
  onRegenerate?: () => void;
  format?: "list" | "tags" | "descriptions";
}

export const ResultsList = ({
  results,
  isLoading,
  onCopy,
  onCopyAll,
  onRegenerate,
  format = "list",
}: ResultsListProps) => {
  if (isLoading) {
    return (
      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Generated Results ({results.length})
        </h3>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button variant="outline" size="sm" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4 mr-1" /> Regenerate
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onCopyAll}>
            <Copy className="h-4 w-4 mr-1" /> Copy All
          </Button>
        </div>
      </div>

      {format === "tags" ? (
        <div className="flex flex-wrap gap-2">
          {results.map((tag, i) => (
            <button
              key={i}
              onClick={() => onCopy(tag)}
              className="px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border/50 rounded-full text-sm text-foreground transition-colors cursor-pointer"
              title="Click to copy"
            >
              {tag}
            </button>
          ))}
        </div>
      ) : format === "descriptions" ? (
        <div className="space-y-6">
          {results.map((desc, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5 relative group">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => onCopy(desc)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Description {i + 1}</p>
              <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {results.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-muted/20 hover:bg-muted/40 border border-border/30 rounded-lg transition-colors group"
            >
              <span className="text-foreground text-sm flex-1 mr-3">
                <span className="text-muted-foreground mr-2">{i + 1}.</span>
                {item}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(item)}
                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
