import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base:'https://yohan86.github.io/slnews/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
