import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const purchases = [
  "Someone just purchased Sora AI Pro",
  "A client just bought ChatGPT Business",
  "New order for CapCut Pro",
  "Someone activated Heygen AI Unlimited",
  "A user just got Midjourney Pro",
  "Someone purchased Claude AI Pro",
  "New order for Runway ML Pro",
  "A client activated Leonardo AI",
];

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    const showNotification = () => {
      const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setCurrentPurchase(randomPurchase);
      setCurrentCity(randomCity);
      setIsVisible(true);

      // Hide after 4-6 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000 + Math.random() * 2000);
    };

    // Initial delay before first notification
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 5000);

    // Set up recurring notifications
    const interval = setInterval(() => {
      showNotification();
    }, 15000 + Math.random() * 25000); // 15-40 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 z-50 max-w-xs"
        >
          <div className="flex items-start gap-3 p-4 rounded-xl bg-card/95 border border-border shadow-lg backdrop-blur-sm">
            <span className="relative flex-shrink-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">
                {currentPurchase}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                from {currentCity} • Just now
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(PurchaseNotification);
