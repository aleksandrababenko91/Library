import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Замените на ваш базовый URL, если необходимо
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});