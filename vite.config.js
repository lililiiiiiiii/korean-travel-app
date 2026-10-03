import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/korean-travel-app/', // ⚠️ 注意：前后必须都有斜杠 /
})
