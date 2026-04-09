import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 2041,
    // allowedHosts: ['fetus.bardak.io']
  },
  plugins: [
    tsconfigPaths(),
    react()
  ],
  optimizeDeps: {
    force: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: true
  }
});
