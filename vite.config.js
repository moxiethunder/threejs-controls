import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: './',
  server:
  {
      host: true, // Open to local network and display URL
      open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
  },
  build:
  {
      outDir: '../dist', // Output in the dist/ folder
      emptyOutDir: true, // Empty the folder first
      sourcemap: true // Add sourcemap
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
      '@styles': resolve(__dirname, 'src/assets/styles/'),
      '@scripts': resolve(__dirname, 'src/assets/scripts/'),
    }
  }
})