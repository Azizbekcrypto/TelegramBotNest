import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 6-Modul 8-dars: sayt doim 5173-portda — Backend CORS aynan shu manzilga ruxsat beradi
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
