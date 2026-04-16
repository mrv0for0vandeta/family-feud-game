import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    rollupOptions: {
      // Externalize socket.io-client - it will be loaded at runtime
      external: ['socket.io-client'],
      output: {
        manualChunks: undefined,
        // Provide global variable name for external modules
        globals: {
          'socket.io-client': 'io'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['socket.io-client']
  }
})
