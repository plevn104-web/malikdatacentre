import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";
import { lazy, Suspense } from "react";

// Only eager-load the homepage for fast LCP
import Index from "./pages/Index";

// Lazy load ALL other pages
const Courses = lazy(() => import("./pages/Courses"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const YouTubeMonetization = lazy(() => import("./pages/YouTubeMonetization"));
const Founder = lazy(() => import("./pages/Founder"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const AIToolsServices = lazy(() => import("./pages/AIToolsServices"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const YouTubeGrowth = lazy(() => import("./pages/YouTubeGrowth"));
const AIToolsLibrary = lazy(() => import("./pages/AIToolsLibrary"));
const AIToolsHub = lazy(() => import("./pages/AIToolsHub"));
const AIBusinessIdeaGenerator = lazy(() => import("./pages/ai-tools/AIBusinessIdeaGenerator"));
const AIPricingStrategy = lazy(() => import("./pages/ai-tools/AIPricingStrategy"));
const AIMarketResearch = lazy(() => import("./pages/ai-tools/AIMarketResearch"));
const AIBusinessPlan = lazy(() => import("./pages/ai-tools/AIBusinessPlan"));
const AIInstagramCaption = lazy(() => import("./pages/ai-tools/AIInstagramCaption"));
const AILinkedInPost = lazy(() => import("./pages/ai-tools/AILinkedInPost"));
const AITwitterThread = lazy(() => import("./pages/ai-tools/AITwitterThread"));
const AIHashtagResearch = lazy(() => import("./pages/ai-tools/AIHashtagResearch"));
const AITextSummarizer = lazy(() => import("./pages/ai-tools/AITextSummarizer"));
const AIParaphrasing = lazy(() => import("./pages/ai-tools/AIParaphrasing"));
const AIPdfToNotes = lazy(() => import("./pages/ai-tools/AIPdfToNotes"));
const AIPlagiarismChecker = lazy(() => import("./pages/ai-tools/AIPlagiarismChecker"));
const AIBlogIntro = lazy(() => import("./pages/ai-tools/AIBlogIntro"));
const AIMetaDescription = lazy(() => import("./pages/ai-tools/AIMetaDescription"));
const AIFAQGenerator = lazy(() => import("./pages/ai-tools/AIFAQGenerator"));
const AIKeywordCluster = lazy(() => import("./pages/ai-tools/AIKeywordCluster"));
const AIProposalGenerator = lazy(() => import("./pages/ai-tools/AIProposalGenerator"));
const AIClientBriefAnalyzer = lazy(() => import("./pages/ai-tools/AIClientBriefAnalyzer"));
const AIContractTemplate = lazy(() => import("./pages/ai-tools/AIContractTemplate"));
const AILandingPageCopy = lazy(() => import("./pages/ai-tools/AILandingPageCopy"));
const AISalesFunnel = lazy(() => import("./pages/ai-tools/AISalesFunnel"));
const AIProductDescription = lazy(() => import("./pages/ai-tools/AIProductDescription"));
const AIChatbotBuilder = lazy(() => import("./pages/ai-tools/AIChatbotBuilder"));
const EverydayAIHub = lazy(() => import("./pages/EverydayAIHub"));
const AIHomeworkHelper = lazy(() => import("./pages/everyday-ai/AIHomeworkHelper"));
const AILetterWriter = lazy(() => import("./pages/everyday-ai/AILetterWriter"));
const AIWhatsAppImprover = lazy(() => import("./pages/everyday-ai/AIWhatsAppImprover"));
const AIStudyPlanner = lazy(() => import("./pages/everyday-ai/AIStudyPlanner"));
const AITravelPlanner = lazy(() => import("./pages/everyday-ai/AITravelPlanner"));
const AIDecisionHelper = lazy(() => import("./pages/everyday-ai/AIDecisionHelper"));
const AISideHustleFinder = lazy(() => import("./pages/everyday-ai/AISideHustleFinder"));
const DevToolsHub = lazy(() => import("./pages/DevToolsHub"));
const AICodeExplainer = lazy(() => import("./pages/dev-tools/AICodeExplainer"));
const AICodeDebugger = lazy(() => import("./pages/dev-tools/AICodeDebugger"));
const AICodeOptimizer = lazy(() => import("./pages/dev-tools/AICodeOptimizer"));
const AICodeConverter = lazy(() => import("./pages/dev-tools/AICodeConverter"));
const AIRegexGenerator = lazy(() => import("./pages/dev-tools/AIRegexGenerator"));
const AIApiDocGenerator = lazy(() => import("./pages/dev-tools/AIApiDocGenerator"));
const AISqlGenerator = lazy(() => import("./pages/dev-tools/AISqlGenerator"));
const AIGitCommitGenerator = lazy(() => import("./pages/dev-tools/AIGitCommitGenerator"));
const AIReadmeGenerator = lazy(() => import("./pages/dev-tools/AIReadmeGenerator"));
const AICodeComplexity = lazy(() => import("./pages/dev-tools/AICodeComplexity"));
const AIArchitectureSuggestion = lazy(() => import("./pages/dev-tools/AIArchitectureSuggestion"));
const JsonFormatter = lazy(() => import("./pages/dev-tools/JsonFormatter"));
const PasswordGenerator = lazy(() => import("./pages/dev-tools/PasswordGenerator"));
const Base64Tool = lazy(() => import("./pages/dev-tools/Base64Tool"));
const JwtDecoder = lazy(() => import("./pages/dev-tools/JwtDecoder"));
const HashGenerator = lazy(() => import("./pages/dev-tools/HashGenerator"));
const UrlEncoderDecoder = lazy(() => import("./pages/dev-tools/UrlEncoderDecoder"));
const ColorConverter = lazy(() => import("./pages/dev-tools/ColorConverter"));
const TimestampConverter = lazy(() => import("./pages/dev-tools/TimestampConverter"));
const UuidGenerator = lazy(() => import("./pages/dev-tools/UuidGenerator"));
const Veo3UltraPlan = lazy(() => import("./pages/Veo3UltraPlan"));
const MapNavigation = lazy(() => import("./pages/MapNavigation"));
const WorldMonitor = lazy(() => import("./pages/WorldMonitor"));
const FreeYouTubeTools = lazy(() => import("./pages/FreeYouTubeTools"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const SupportFAQ = lazy(() => import("./pages/SupportFAQ"));
const YouTubeGrowthGuide = lazy(() => import("./pages/YouTubeGrowthGuide"));
const YouTubeToolsHub = lazy(() => import("./pages/YouTubeToolsHub"));
const YouTubeTitleGenerator = lazy(() => import("./pages/YouTubeTitleGenerator"));
const YouTubeDescriptionGenerator = lazy(() => import("./pages/YouTubeDescriptionGenerator"));
const YouTubeTagGenerator = lazy(() => import("./pages/YouTubeTagGenerator"));
const YouTubeThumbnailHeadlineGenerator = lazy(() => import("./pages/YouTubeThumbnailHeadlineGenerator"));
const YouTubeHashtagGenerator = lazy(() => import("./pages/YouTubeHashtagGenerator"));
const YouTubeRevenueEstimator = lazy(() => import("./pages/YouTubeRevenueEstimator"));
const YouTubeWatchTimeCalculator = lazy(() => import("./pages/YouTubeWatchTimeCalculator"));
const YouTubeSEOScoreChecker = lazy(() => import("./pages/YouTubeSEOScoreChecker"));
const CreatorStudioHub = lazy(() => import("./pages/CreatorStudioHub"));
const CreatorKeywordExplorer = lazy(() => import("./pages/CreatorKeywordExplorer"));
const CreatorSEOAnalyzer = lazy(() => import("./pages/CreatorSEOAnalyzer"));
const CreatorTagOptimization = lazy(() => import("./pages/CreatorTagOptimization"));
const CreatorCompetitorBreakdown = lazy(() => import("./pages/CreatorCompetitorBreakdown"));
const CreatorMonetizationEstimator = lazy(() => import("./pages/CreatorMonetizationEstimator"));
const CreatorWatchTimeSimulator = lazy(() => import("./pages/CreatorWatchTimeSimulator"));
const CreatorCTRAssistant = lazy(() => import("./pages/CreatorCTRAssistant"));
const CreatorScriptBuilder = lazy(() => import("./pages/CreatorScriptBuilder"));
const CreatorContentRepurposing = lazy(() => import("./pages/CreatorContentRepurposing"));
const CreatorContentPlanner = lazy(() => import("./pages/CreatorContentPlanner"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSubscriptions = lazy(() => import("./pages/admin/AdminSubscriptions"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminEmails = lazy(() => import("./pages/admin/AdminEmails"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min cache
      gcTime: 10 * 60 * 1000,   // 10 min garbage collection
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const P = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const A = ({ children }: { children: React.ReactNode }) => (
  <AdminProtectedRoute>{children}</AdminProtectedRoute>
);

const Loader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/youtube-monetization" element={<YouTubeMonetization />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/ai-tools-services" element={<AIToolsServices />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/youtube-growth" element={<YouTubeGrowth />} />
              <Route path="/ai-tools-library" element={<AIToolsLibrary />} />
              <Route path="/ai-tools" element={<AIToolsHub />} />
              <Route path="/free-youtube-tools" element={<FreeYouTubeTools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/support" element={<SupportFAQ />} />
              <Route path="/youtube-growth-guide" element={<YouTubeGrowthGuide />} />
              <Route path="/world-monitor" element={<WorldMonitor />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/account" element={<Account />} />
              {/* Hub pages */}
              <Route path="/youtube-tools" element={<YouTubeToolsHub />} />
              <Route path="/creator-studio" element={<CreatorStudioHub />} />
              {/* Protected YouTube Tools */}
              <Route path="/youtube-tools/title-generator" element={<P><YouTubeTitleGenerator /></P>} />
              <Route path="/youtube-tools/description-generator" element={<P><YouTubeDescriptionGenerator /></P>} />
              <Route path="/youtube-tools/tag-generator" element={<P><YouTubeTagGenerator /></P>} />
              <Route path="/youtube-tools/thumbnail-headline-generator" element={<P><YouTubeThumbnailHeadlineGenerator /></P>} />
              <Route path="/youtube-tools/hashtag-generator" element={<P><YouTubeHashtagGenerator /></P>} />
              <Route path="/youtube-tools/revenue-estimator" element={<P><YouTubeRevenueEstimator /></P>} />
              <Route path="/youtube-tools/watch-time-calculator" element={<P><YouTubeWatchTimeCalculator /></P>} />
              <Route path="/youtube-tools/seo-score-checker" element={<P><YouTubeSEOScoreChecker /></P>} />
              {/* Protected Creator Studio Tools */}
              <Route path="/creator-studio/keyword-explorer" element={<P><CreatorKeywordExplorer /></P>} />
              <Route path="/creator-studio/seo-analyzer" element={<P><CreatorSEOAnalyzer /></P>} />
              <Route path="/creator-studio/tag-optimization" element={<P><CreatorTagOptimization /></P>} />
              <Route path="/creator-studio/competitor-breakdown" element={<P><CreatorCompetitorBreakdown /></P>} />
              <Route path="/creator-studio/monetization-estimator" element={<P><CreatorMonetizationEstimator /></P>} />
              <Route path="/creator-studio/watch-time-simulator" element={<P><CreatorWatchTimeSimulator /></P>} />
              <Route path="/creator-studio/ctr-assistant" element={<P><CreatorCTRAssistant /></P>} />
              <Route path="/creator-studio/script-builder" element={<P><CreatorScriptBuilder /></P>} />
              <Route path="/creator-studio/content-repurposing" element={<P><CreatorContentRepurposing /></P>} />
              <Route path="/creator-studio/content-planner" element={<P><CreatorContentPlanner /></P>} />
              {/* Protected AI Tools */}
              <Route path="/ai-tools/business-idea-generator" element={<P><AIBusinessIdeaGenerator /></P>} />
              <Route path="/ai-tools/pricing-strategy" element={<P><AIPricingStrategy /></P>} />
              <Route path="/ai-tools/market-research" element={<P><AIMarketResearch /></P>} />
              <Route path="/ai-tools/business-plan" element={<P><AIBusinessPlan /></P>} />
              <Route path="/ai-tools/instagram-caption" element={<P><AIInstagramCaption /></P>} />
              <Route path="/ai-tools/linkedin-post" element={<P><AILinkedInPost /></P>} />
              <Route path="/ai-tools/twitter-thread" element={<P><AITwitterThread /></P>} />
              <Route path="/ai-tools/hashtag-research" element={<P><AIHashtagResearch /></P>} />
              <Route path="/ai-tools/text-summarizer" element={<P><AITextSummarizer /></P>} />
              <Route path="/ai-tools/paraphrasing" element={<P><AIParaphrasing /></P>} />
              <Route path="/ai-tools/pdf-to-notes" element={<P><AIPdfToNotes /></P>} />
              <Route path="/ai-tools/plagiarism-checker" element={<P><AIPlagiarismChecker /></P>} />
              <Route path="/ai-tools/blog-intro" element={<P><AIBlogIntro /></P>} />
              <Route path="/ai-tools/meta-description" element={<P><AIMetaDescription /></P>} />
              <Route path="/ai-tools/faq-generator" element={<P><AIFAQGenerator /></P>} />
              <Route path="/ai-tools/keyword-cluster" element={<P><AIKeywordCluster /></P>} />
              <Route path="/ai-tools/proposal-generator" element={<P><AIProposalGenerator /></P>} />
              <Route path="/ai-tools/client-brief-analyzer" element={<P><AIClientBriefAnalyzer /></P>} />
              <Route path="/ai-tools/contract-template" element={<P><AIContractTemplate /></P>} />
              <Route path="/ai-tools/landing-page-copy" element={<P><AILandingPageCopy /></P>} />
              <Route path="/ai-tools/sales-funnel" element={<P><AISalesFunnel /></P>} />
              <Route path="/ai-tools/product-description" element={<P><AIProductDescription /></P>} />
              <Route path="/ai-tools/chatbot-builder" element={<P><AIChatbotBuilder /></P>} />
              {/* Everyday AI Tools */}
              <Route path="/everyday-ai" element={<EverydayAIHub />} />
              <Route path="/everyday-ai/homework-helper" element={<P><AIHomeworkHelper /></P>} />
              <Route path="/everyday-ai/letter-writer" element={<P><AILetterWriter /></P>} />
              <Route path="/everyday-ai/whatsapp-improver" element={<P><AIWhatsAppImprover /></P>} />
              <Route path="/everyday-ai/study-planner" element={<P><AIStudyPlanner /></P>} />
              <Route path="/everyday-ai/travel-planner" element={<P><AITravelPlanner /></P>} />
              <Route path="/everyday-ai/decision-helper" element={<P><AIDecisionHelper /></P>} />
              <Route path="/everyday-ai/side-hustle-finder" element={<P><AISideHustleFinder /></P>} />
              {/* Developer Tools */}
              <Route path="/dev-tools" element={<DevToolsHub />} />
              <Route path="/dev-tools/code-explainer" element={<P><AICodeExplainer /></P>} />
              <Route path="/dev-tools/code-debugger" element={<P><AICodeDebugger /></P>} />
              <Route path="/dev-tools/code-optimizer" element={<P><AICodeOptimizer /></P>} />
              <Route path="/dev-tools/code-converter" element={<P><AICodeConverter /></P>} />
              <Route path="/dev-tools/regex-generator" element={<P><AIRegexGenerator /></P>} />
              <Route path="/dev-tools/api-doc-generator" element={<P><AIApiDocGenerator /></P>} />
              <Route path="/dev-tools/sql-generator" element={<P><AISqlGenerator /></P>} />
              <Route path="/dev-tools/git-commit-generator" element={<P><AIGitCommitGenerator /></P>} />
              <Route path="/dev-tools/readme-generator" element={<P><AIReadmeGenerator /></P>} />
              <Route path="/dev-tools/code-complexity" element={<P><AICodeComplexity /></P>} />
              <Route path="/dev-tools/architecture-suggestion" element={<P><AIArchitectureSuggestion /></P>} />
              {/* Logic-based dev utilities (no auth required) */}
              <Route path="/dev-tools/json-formatter" element={<JsonFormatter />} />
              <Route path="/dev-tools/password-generator" element={<PasswordGenerator />} />
              <Route path="/dev-tools/base64" element={<Base64Tool />} />
              <Route path="/dev-tools/jwt-decoder" element={<JwtDecoder />} />
              <Route path="/dev-tools/hash-generator" element={<HashGenerator />} />
              <Route path="/dev-tools/url-encoder" element={<UrlEncoderDecoder />} />
              <Route path="/dev-tools/color-converter" element={<ColorConverter />} />
              <Route path="/dev-tools/timestamp-converter" element={<TimestampConverter />} />
              <Route path="/dev-tools/uuid-generator" element={<UuidGenerator />} />
              {/* AI Video Tools */}
              <Route path="/video-tools/veo3-ultra" element={<P><Veo3UltraPlan /></P>} />
              {/* Map & Navigation */}
              <Route path="/map" element={<MapNavigation />} />
              {/* Admin routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<A><AdminDashboard /></A>} />
              <Route path="/admin/users" element={<A><AdminUsers /></A>} />
              <Route path="/admin/analytics" element={<A><AdminAnalytics /></A>} />
              <Route path="/admin/subscriptions" element={<A><AdminSubscriptions /></A>} />
              <Route path="/admin/emails" element={<A><AdminEmails /></A>} />
              <Route path="/admin/settings" element={<A><AdminSettings /></A>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
