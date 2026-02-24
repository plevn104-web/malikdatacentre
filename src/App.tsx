import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import YouTubeMonetization from "./pages/YouTubeMonetization";
import Founder from "./pages/Founder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import AIToolsServices from "./pages/AIToolsServices";
import Disclaimer from "./pages/Disclaimer";
import YouTubeGrowth from "./pages/YouTubeGrowth";
import AIToolsLibrary from "./pages/AIToolsLibrary";
import FreeYouTubeTools from "./pages/FreeYouTubeTools";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import SuccessStories from "./pages/SuccessStories";
import SupportFAQ from "./pages/SupportFAQ";
import YouTubeGrowthGuide from "./pages/YouTubeGrowthGuide";
import YouTubeToolsHub from "./pages/YouTubeToolsHub";
import YouTubeTitleGenerator from "./pages/YouTubeTitleGenerator";
import YouTubeDescriptionGenerator from "./pages/YouTubeDescriptionGenerator";
import YouTubeTagGenerator from "./pages/YouTubeTagGenerator";
import YouTubeThumbnailHeadlineGenerator from "./pages/YouTubeThumbnailHeadlineGenerator";
import YouTubeHashtagGenerator from "./pages/YouTubeHashtagGenerator";
import YouTubeRevenueEstimator from "./pages/YouTubeRevenueEstimator";
import YouTubeWatchTimeCalculator from "./pages/YouTubeWatchTimeCalculator";
import YouTubeSEOScoreChecker from "./pages/YouTubeSEOScoreChecker";
import CreatorStudioHub from "./pages/CreatorStudioHub";
import CreatorKeywordExplorer from "./pages/CreatorKeywordExplorer";
import CreatorSEOAnalyzer from "./pages/CreatorSEOAnalyzer";
import CreatorTagOptimization from "./pages/CreatorTagOptimization";
import CreatorCompetitorBreakdown from "./pages/CreatorCompetitorBreakdown";
import CreatorMonetizationEstimator from "./pages/CreatorMonetizationEstimator";
import CreatorWatchTimeSimulator from "./pages/CreatorWatchTimeSimulator";
import CreatorCTRAssistant from "./pages/CreatorCTRAssistant";
import CreatorScriptBuilder from "./pages/CreatorScriptBuilder";
import CreatorContentRepurposing from "./pages/CreatorContentRepurposing";
import CreatorContentPlanner from "./pages/CreatorContentPlanner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

// Admin pages (lazy loaded)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSubscriptions = lazy(() => import("./pages/admin/AdminSubscriptions"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

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
              {/* Hub pages - public preview */}
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
