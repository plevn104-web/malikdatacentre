import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting for smaller bundles
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tabs", "@radix-ui/react-tooltip"],
          charts: ["recharts"],
          motion: ["framer-motion"],
        },
      },
    },
    // Smaller chunk size warnings
    chunkSizeWarningLimit: 500,
    // Minification
    minify: "esbuild",
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps only in dev
    sourcemap: mode === "development",
  },
}));
