import { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const CGIBackgroundComponent = ({ variant = "hero" }: { variant?: "hero" | "section" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip heavy canvas animation on mobile
    if (shouldReduceMotion || isMobile) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Reduced particle count for better performance
    const particleCount = variant === "hero" ? 40 : 20;
    const colors = ["rgba(0, 212, 255, ", "rgba(139, 92, 246, ", "rgba(236, 72, 153, "];
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime - (deltaTime % frameInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles (reduced connection distance)
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw particle (simplified - no glow for performance)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.opacity})`;
        ctx.fill();

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction (desktop only)
        const mdx = particle.x - mouseRef.current.x;
        const mdy = particle.y - mouseRef.current.y;
        const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mouseDistance < 80) {
          particle.x += mdx * 0.015;
          particle.y += mdy * 0.015;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, shouldReduceMotion, isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1e] to-[#030712]" />
      
      {/* Animated gradient orbs - simplified on mobile */}
      {!isMobile ? (
        <>
          <motion.div
            className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute -right-32 top-1/4 h-[600px] w-[600px] rounded-full opacity-25"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, -80, 0],
              y: [0, 100, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          <motion.div
            className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, -80, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </>
      ) : (
        // Static gradient orbs for mobile - no animation, just CSS
        <>
          <div 
            className="absolute -left-16 -top-16 h-[300px] w-[300px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)",
            }}
          />
          <div 
            className="absolute -right-16 top-1/4 h-[350px] w-[350px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Particle canvas - desktop only */}
      {!isMobile && !shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ opacity: 0.7 }}
        />
      )}

      {/* Holographic grid lines - simplified on mobile */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] md:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '120px 120px' : '80px 80px',
        }}
      />

      {/* Animated scan lines - desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.03) 50%, transparent 100%)",
            backgroundSize: "100% 8px",
          }}
          animate={{
            backgroundPositionY: ["0px", "8px"],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Light beam effects - desktop only */}
      {variant === "hero" && !isMobile && (
        <>
          <motion.div
            className="absolute left-1/4 top-0 h-full w-[2px] opacity-20"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.8) 50%, transparent 100%)",
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/3 top-0 h-full w-[1px] opacity-15"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%)",
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
              scaleY: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(3, 7, 18, 0.4) 100%)",
        }}
      />
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export const CGIBackground = memo(CGIBackgroundComponent);
