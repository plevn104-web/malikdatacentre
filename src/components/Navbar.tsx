import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle, LogIn, LogOut, User, LayoutDashboard, GraduationCap, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { WalletDropdown } from "@/components/WalletDropdown";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "AI Tools" },
    { href: "#youtube", label: "YouTube Services" },
    { href: "/courses", label: "Courses", isRoute: true, icon: GraduationCap },
    { href: "/founder", label: "Founder", isRoute: true, icon: UserCircle },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MALIK DATA CENTRE" className="h-10 w-10 object-contain" />
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold gradient-text">MALIK DATA CENTRE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
              >
                <GraduationCap className="h-4 w-4" />
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                <WalletDropdown />
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )
          )}
          <Button variant="whatsapp" size="sm" asChild>
            <a href="https://wa.me/923489057646" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="container flex flex-col gap-4 px-4 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2"
                >
                  <GraduationCap className="h-5 w-5" />
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
            
            {/* Auth buttons for mobile */}
            {!loading && (
              user ? (
                <div className="flex flex-col gap-3 pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-primary">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="w-full gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Login / Signup
                  </Button>
                </Link>
              )
            )}
            
            <Button variant="whatsapp" className="w-full" asChild>
              <a href="https://wa.me/923489057646" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
