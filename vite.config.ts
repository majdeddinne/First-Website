import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Required for Spotify OAuth in development
    port: 5175, // Explicit port declaration (optional)
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});