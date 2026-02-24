import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code, Bug, Zap, ArrowRightLeft, FileSearch, FileText, Database,
  GitCommit, BookOpen, BarChart3, Layers, Braces, KeyRound, Binary,
  ShieldCheck, Hash, Link as LinkIcon, Palette, Clock, Fingerprint,
} from "lucide-react";

const aiTools = [
  { icon: Code, title: "AI Code Explainer", desc: "Line-by-line code explanations", href: "/dev-tools/code-explainer" },
  { icon: Bug, title: "AI Code Debugger", desc: "Find and fix errors instantly", href: "/dev-tools/code-debugger" },
  { icon: Zap, title: "AI Code Optimizer", desc: "Performance improvements", href: "/dev-tools/code-optimizer" },
  { icon: ArrowRightLeft, title: "AI Code Converter", desc: "Translate between languages", href: "/dev-tools/code-converter" },
  { icon: FileSearch, title: "AI Regex Generator", desc: "Create patterns from descriptions", href: "/dev-tools/regex-generator" },
  { icon: FileText, title: "AI API Doc Generator", desc: "Auto-generate documentation", href: "/dev-tools/api-doc-generator" },
  { icon: Database, title: "AI SQL Generator", desc: "Natural language to SQL", href: "/dev-tools/sql-generator" },
  { icon: GitCommit, title: "AI Git Commit Generator", desc: "Conventional commit messages", href: "/dev-tools/git-commit-generator" },
  { icon: BookOpen, title: "AI README Generator", desc: "Professional README files", href: "/dev-tools/readme-generator" },
  { icon: BarChart3, title: "Code Complexity Analyzer", desc: "Complexity scoring & refactoring", href: "/dev-tools/code-complexity" },
  { icon: Layers, title: "AI Architecture Tool", desc: "Tech stack & architecture advice", href: "/dev-tools/architecture-suggestion" },
];

const utilityTools = [
  { icon: Braces, title: "JSON Formatter", desc: "Format, validate & minify JSON", href: "/dev-tools/json-formatter" },
  { icon: KeyRound, title: "Password Generator", desc: "Cryptographically secure passwords", href: "/dev-tools/password-generator" },
  { icon: Binary, title: "Base64 Encoder/Decoder", desc: "Encode and decode Base64", href: "/dev-tools/base64" },
  { icon: ShieldCheck, title: "JWT Decoder", desc: "Decode JSON Web Tokens", href: "/dev-tools/jwt-decoder" },
  { icon: Hash, title: "Hash Generator", desc: "SHA-256, SHA-1, SHA-512", href: "/dev-tools/hash-generator" },
  { icon: LinkIcon, title: "URL Encoder/Decoder", desc: "Encode URL components", href: "/dev-tools/url-encoder" },
  { icon: Palette, title: "Color Converter", desc: "HEX ↔ RGB ↔ HSL", href: "/dev-tools/color-converter" },
  { icon: Clock, title: "Timestamp Converter", desc: "Unix ↔ Human readable dates", href: "/dev-tools/timestamp-converter" },
  { icon: Fingerprint, title: "UUID Generator", desc: "Random v4 UUIDs", href: "/dev-tools/uuid-generator" },
];

const ToolCard = ({ tool, badge }: { tool: typeof aiTools[0]; badge?: string }) => (
  <Link to={tool.href}>
    <Card className="h-full hover:border-primary/50 transition-colors group">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <tool.icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
          {badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
        </div>
        <h3 className="font-semibold text-foreground mb-1">{tool.title}</h3>
        <p className="text-sm text-muted-foreground">{tool.desc}</p>
      </CardContent>
    </Card>
  </Link>
);

const DevToolsHub = () => (
  <main className="min-h-screen bg-background">
    <SEOHead title="Developer Tools" description="AI-powered developer tools and free utilities — code explainer, debugger, JSON formatter, hash generator, and more." canonical="/dev-tools" />
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground text-center mb-3">Developer Tools</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">AI-powered coding tools and free utilities for developers.</p>

        <h2 className="text-2xl font-bold text-foreground mb-4">AI-Powered Tools</h2>
        <p className="text-sm text-muted-foreground mb-6">These tools use AI and count toward your monthly usage limit.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {aiTools.map((t) => <ToolCard key={t.href} tool={t} badge="AI" />)}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">Free Utility Tools</h2>
        <p className="text-sm text-muted-foreground mb-6">These tools run locally in your browser — unlimited, no login required.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {utilityTools.map((t) => <ToolCard key={t.href} tool={t} badge="Free" />)}
        </div>
      </div>
    </div>
    <Footer />
  </main>
);

export default DevToolsHub;
