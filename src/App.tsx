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
              <Route path="/free-youtube-tools" element={<FreeYouTubeTools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/support" element={<SupportFAQ />} />
              <Route path="/youtube-growth-guide" element={<YouTubeGrowthGuide />} />
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
