import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [
        'react-devtools',  // Excluir React DevTools
        'react-devtools-inline',
        'react-devtools-shared',
      ],
    }
  },
  optimizeDeps: {
    exclude: ['react-devtools', 'lru-cache'],
  },

})
