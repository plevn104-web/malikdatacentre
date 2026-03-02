import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorldMonitor = () => {
  const [iframeBlocked, setIframeBlocked] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {iframeBlocked ? (
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-display font-bold text-foreground">World Monitor</h1>
            <p className="text-muted-foreground">This content cannot be embedded due to security restrictions.</p>
            <Button asChild>
              <a href="https://worldmonitor.app" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Open World Monitor
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 pt-16 md:pt-20" style={{ height: "100vh" }}>
          <iframe
            src="https://worldmonitor.app"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="World Monitor"
            onError={() => setIframeBlocked(true)}
            onLoad={(e) => {
              try {
                const iframe = e.target as HTMLIFrameElement;
                // If we can't access contentWindow, it might still work
                // The real block would prevent loading entirely
                if (!iframe.contentDocument && !iframe.contentWindow) {
                  setIframeBlocked(true);
                }
              } catch {
                // Cross-origin access denied is expected if it loads fine
              }
            }}
          />
        </div>
      )}
      {iframeBlocked && <Footer />}
    </div>
  );
};

export default WorldMonitor;
