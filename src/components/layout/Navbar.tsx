import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const toolsDropdown = [
  { href: "/creator-studio", label: "Creator Studio" },
  { href: "/ai-tools-library", label: "AI Tools Library" },
  { href: "/everyday-ai", label: "Everyday AI Tools" },
  { href: "/dev-tools", label: "Developer Tools" },
  { href: "/video-tools/veo3-ultra", label: "VEO 3 Ultra Plan" },
  { href: "/free-youtube-tools", label: "Free Tools" },
  { href: "/youtube-tools", label: "YouTube Tools" },
];

const servicesDropdown = [
  { href: "/youtube-growth", label: "YouTube Growth" },
  { href: "/ai-tools-services", label: "AI Tools & Services" },
  { href: "/courses", label: "Courses" },
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        toolsRef.current && !toolsRef.current.contains(e.target as Node) &&
        servicesRef.current && !servicesRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isToolsActive = ["/creator-studio", "/ai-tools-library", "/everyday-ai", "/dev-tools", "/video-tools", "/free-youtube-tools", "/youtube-tools"].some(p => location.pathname.startsWith(p));
  const isServicesActive = ["/youtube-growth", "/ai-tools-services", "/courses"].some(p => location.pathname.startsWith(p));

  const toggleDropdown = (name: string) => setOpenDropdown(prev => prev === name ? null : name);
  const toggleMobile = (name: string) => setMobileOpen(prev => prev === name ? null : name);

  const DropdownMenu = ({ name, label, items, isActive, ref }: { name: string; label: string; items: typeof toolsDropdown; isActive: boolean; ref: React.RefObject<HTMLDivElement | null> }) => (
    <div className="relative" ref={ref}>
      <button
        onClick={() => toggleDropdown(name)}
        className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md flex items-center gap-1 ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === name ? "rotate-180" : ""}`} />
      </button>
      {openDropdown === name && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border/50 rounded-lg shadow-lg py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpenDropdown(null)}
              className={`block px-4 py-2 text-sm transition-colors hover:bg-muted/50 ${location.pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
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
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${location.pathname === "/" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            Home
          </Link>
          <DropdownMenu name="tools" label="Tools" items={toolsDropdown} isActive={isToolsActive} ref={toolsRef} />
          <DropdownMenu name="services" label="Services" items={servicesDropdown} isActive={isServicesActive} ref={servicesRef} />
          <Link
            to="/pricing"
            className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${location.pathname === "/pricing" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${location.pathname.startsWith("/blog") ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            Blog
          </Link>
          <Link
            to="/map"
            className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md flex items-center gap-1 ${location.pathname === "/map" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            <MapPin className="h-3.5 w-3.5" />
            Map
          </Link>
        </div>

        {/* Auth Buttons */}
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
          {isMobileMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
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
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>
                Home
              </Link>

              {/* Mobile Tools */}
              <div>
                <button onClick={() => toggleMobile("tools")} className={`text-lg font-medium transition-colors flex items-center gap-1 ${isToolsActive ? "text-primary" : "text-muted-foreground"}`}>
                  Tools <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === "tools" ? "rotate-180" : ""}`} />
                </button>
                {mobileOpen === "tools" && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {toolsDropdown.map((item) => (
                      <Link key={item.href} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-sm transition-colors ${location.pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"}`}>{item.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services */}
              <div>
                <button onClick={() => toggleMobile("services")} className={`text-lg font-medium transition-colors flex items-center gap-1 ${isServicesActive ? "text-primary" : "text-muted-foreground"}`}>
                  Services <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen === "services" ? "rotate-180" : ""}`} />
                </button>
                {mobileOpen === "services" && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {servicesDropdown.map((item) => (
                      <Link key={item.href} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-sm transition-colors ${location.pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"}`}>{item.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname === "/pricing" ? "text-primary" : "text-muted-foreground"}`}>
                Pricing
              </Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors ${location.pathname.startsWith("/blog") ? "text-primary" : "text-muted-foreground"}`}>
                Blog
              </Link>
              <Link to="/map" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium transition-colors flex items-center gap-1.5 ${location.pathname === "/map" ? "text-primary" : "text-muted-foreground"}`}>
                <MapPin className="h-4 w-4" /> Map & Navigation
              </Link>

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
