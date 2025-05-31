import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [react(),
    createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        title: 'Market with Dr Truth',
        description: 'World Class Marketing is an online marketing agency that becomes your marketing department on-demand."',
        keywords: 'online marketing agency, marketing agency on-demand, outsourced marketing team, digital marketing services, virtual marketing department'
      }
    }
  })],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true, // Ensures routes fallback to index.html
    watch: {
      usePolling: true, // Enable polling to prevent 'too many open files' error
      interval: 1000, // Adjust as needed (higher values reduce system load)
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional, ensures all chunks are handled correctly
      },
    },
  },
});
