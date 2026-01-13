import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

const LiveVisitorsIndicator = () => {
  const [visitorCount, setVisitorCount] = useState(523);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate realistic fluctuation between 340-670
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const newCount = prev + change;
        return Math.max(340, Math.min(670, newCount));
      });
    }, 3000 + Math.random() * 2000); // Update every 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm"
    >
      <span className="relative flex items-center justify-center">
        <Eye className="h-4 w-4 text-primary" />
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
      </span>
      <span className="text-sm text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.span
            key={visitorCount}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="inline-block font-semibold text-foreground"
          >
            {visitorCount}+
          </motion.span>
        </AnimatePresence>
        {" "}People are viewing this site right now
      </span>
    </motion.div>
  );
};

export default memo(LiveVisitorsIndicator);
