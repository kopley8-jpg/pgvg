import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // форсим нужный порт
    strictPort: true, // если 3000 занят - выкинет ошибку, а не переключится на другой
  },
  plugins: [react()],
});
