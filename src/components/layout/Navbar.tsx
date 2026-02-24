import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ChevronDown, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const WHATSAPP_URL = "https://wa.me/923489057646";

const youtubeToolsDropdown = [
  { href: "/youtube-tools/title-generator", label: "Title Generator" },
  { href: "/youtube-tools/description-generator", label: "Description Generator" },
  { href: "/youtube-tools/tag-generator", label: "Tag Generator" },
  { href: "/youtube-tools/thumbnail-headline-generator", label: "Thumbnail Headline Generator" },
  { href: "/youtube-tools/hashtag-generator", label: "Hashtag Generator" },
  { href: "/youtube-tools/revenue-estimator", label: "Revenue Estimator" },
  { href: "/youtube-tools/watch-time-calculator", label: "Watch Time Calculator" },
  { href: "/youtube-tools/seo-score-checker", label: "SEO Score Checker" },
];

const creatorStudioDropdown = [
  { href: "/creator-studio/keyword-explorer", label: "Keyword Explorer" },
  { href: "/creator-studio/seo-analyzer", label: "SEO Score Analyzer" },
  { href: "/creator-studio/tag-optimization", label: "Tag Optimization" },
  { href: "/creator-studio/competitor-breakdown", label: "Competitor Breakdown" },
  { href: "/creator-studio/monetization-estimator", label: "Monetization Estimator" },
  { href: "/creator-studio/watch-time-simulator", label: "Watch Time Simulator" },
  { href: "/creator-studio/ctr-assistant", label: "CTR Assistant" },
  { href: "/creator-studio/script-builder", label: "AI Script Builder" },
  { href: "/creator-studio/content-repurposing", label: "Content Repurposing" },
  { href: "/creator-studio/content-planner", label: "30-Day Planner" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ai-tools-services", label: "AI Tools & Services" },
  { href: "/ai-tools-library", label: "AI Tools Library" },
  { href: "/youtube-growth", label: "YouTube Growth" },
  { href: "/free-youtube-tools", label: "Free Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/courses", label: "Courses" },
  { href: "/support", label: "Support" },
  { href: "/youtube-growth-guide", label: "Free Guide" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isYTDropdownOpen, setIsYTDropdownOpen] = useState(false);
  const [isCSDropdownOpen, setIsCSDropdownOpen] = useState(false);
  const [isMobileYTOpen, setIsMobileYTOpen] = useState(false);
  const [isMobileCSOpen, setIsMobileCSOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const csDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsYTDropdownOpen(false);
      }
      if (csDropdownRef.current && !csDropdownRef.current.contains(e.target as Node)) {
        setIsCSDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">M</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold text-foreground">Malik Data Centre</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-xs font-medium transition-colors hover:text-primary px-2 py-1 rounded-md ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* YouTube Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsYTDropdownOpen(!isYTDropdownOpen)}
              className={`text-xs font-medium transition-colors hover:text-primary px-2 py-1 rounded-md flex items-center gap-0.5 ${
                location.pathname.startsWith("/youtube-tools")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              YouTube Tools
              <ChevronDown className={`h-3 w-3 transition-transform ${isYTDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isYTDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border/50 rounded-lg shadow-lg py-1 z-50">
                <Link
                  to="/youtube-tools"
                  onClick={() => setIsYTDropdownOpen(false)}
                  className="block px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors"
                >
                  All YouTube Tools
                </Link>
                <div className="border-t border-border/30 my-1" />
                {youtubeToolsDropdown.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsYTDropdownOpen(false)}
                    className={`block px-4 py-2 text-xs transition-colors hover:bg-muted/50 ${
                      location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Creator Studio Dropdown */}
          <div className="relative" ref={csDropdownRef}>
            <button
              onClick={() => setIsCSDropdownOpen(!isCSDropdownOpen)}
              className={`text-xs font-medium transition-colors hover:text-primary px-2 py-1 rounded-md flex items-center gap-0.5 ${
                location.pathname.startsWith("/creator-studio")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              Creator Studio
              <ChevronDown className={`h-3 w-3 transition-transform ${isCSDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isCSDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-background border border-border/50 rounded-lg shadow-lg py-1 z-50">
                <Link to="/creator-studio" onClick={() => setIsCSDropdownOpen(false)} className="block px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors">All Creator Tools</Link>
                <div className="border-t border-border/30 my-1" />
                {creatorStudioDropdown.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setIsCSDropdownOpen(false)} className={`block px-4 py-2 text-xs transition-colors hover:bg-muted/50 ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"}`}>{item.label}</Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA + Auth Buttons */}
        <div className="hidden items-center gap-2 xl:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/account"><User className="h-4 w-4 mr-1" /> My Account</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1" /> Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 xl:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile YouTube Tools */}
              <div>
                <button
                  onClick={() => setIsMobileYTOpen(!isMobileYTOpen)}
                  className={`text-lg font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith("/youtube-tools") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  YouTube Tools
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileYTOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileYTOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <Link to="/youtube-tools" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-foreground">
                      All YouTube Tools
                    </Link>
                    {youtubeToolsDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-sm transition-colors ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Mobile Creator Studio */}
              <div>
                <button
                  onClick={() => setIsMobileCSOpen(!isMobileCSOpen)}
                  className={`text-lg font-medium transition-colors flex items-center gap-1 ${location.pathname.startsWith("/creator-studio") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Creator Studio
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMobileCSOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileCSOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <Link to="/creator-studio" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-foreground">All Creator Tools</Link>
                    {creatorStudioDropdown.map((item) => (
                      <Link key={item.href} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-sm transition-colors ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"}`}>{item.label}</Link>
                    ))}
                  </div>
                )}
              </div>
              
              {user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}><User className="h-4 w-4 mr-2" /> My Account</Link>
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-2" /> Log Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Button className="w-full" asChild>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
