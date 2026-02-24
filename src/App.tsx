import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          <Route path="/youtube-tools" element={<YouTubeToolsHub />} />
          <Route path="/youtube-tools/title-generator" element={<YouTubeTitleGenerator />} />
          <Route path="/youtube-tools/description-generator" element={<YouTubeDescriptionGenerator />} />
          <Route path="/youtube-tools/tag-generator" element={<YouTubeTagGenerator />} />
          <Route path="/youtube-tools/thumbnail-headline-generator" element={<YouTubeThumbnailHeadlineGenerator />} />
          <Route path="/youtube-tools/hashtag-generator" element={<YouTubeHashtagGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
