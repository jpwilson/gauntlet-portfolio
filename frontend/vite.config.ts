import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages: https://jpwilson.github.io/gauntlet-portfolio/
  base: '/gauntlet-portfolio/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
