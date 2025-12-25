import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Check if mobile device
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    
    // Check if low-end device (rough heuristic based on hardware concurrency)
    const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    setShouldReduceMotion(prefersReducedMotion || isMobile || isLowEndDevice);

    const handleResize = () => {
      const isMobileNow = window.innerWidth < MOBILE_BREAKPOINT;
      setShouldReduceMotion(prefersReducedMotion || isMobileNow || isLowEndDevice);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return shouldReduceMotion;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
