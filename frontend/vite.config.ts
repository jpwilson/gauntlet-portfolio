import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages: https://jpwilson.github.io/gauntlet-portfolio/
  base: '/gauntlet-portfolio/',
  css: {
    lightningcss: {
      // The 98.css package ships an invalid media query (`@media (not(hover))`)
      // that browsers already ignore; without this, Vite 8's lightningcss
      // minifier hard-errors on it. Recovery drops the rule — same runtime
      // behavior as browsers give it today.
      errorRecovery: true,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
