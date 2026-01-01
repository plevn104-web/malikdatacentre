import { memo } from "react";

/**
 * Lightweight background component - static gradients only
 * No canvas, no animation, maximum performance
 */
const CGIBackgroundComponent = ({ variant = "hero" }: { variant?: "hero" | "section" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - simple CSS only */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0f1e] to-background" />
      
      {/* Static gradient orbs - pure CSS, no animation */}
      <div 
        className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(200 100% 50% / 0.3) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute -right-20 top-1/4 h-[350px] w-[350px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, hsl(270 70% 60% / 0.25) 0%, transparent 70%)",
        }}
      />
      {variant === "hero" && (
        <div 
          className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(200 100% 50% / 0.2) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Subtle grid - very light */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(200 100% 50% / 0.4) 1px, transparent 1px),
            linear-gradient(90deg, hsl(200 100% 50% / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette - subtle depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(220 20% 4% / 0.5) 100%)",
        }}
      />
    </div>
  );
};

export const CGIBackground = memo(CGIBackgroundComponent);
