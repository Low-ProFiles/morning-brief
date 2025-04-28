import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'


export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    proxy: {
      // '/api/naver' 로 들어오는 요청을 Naver Data Lab API로 전달
      '/api/naver': {
        target: 'https://openapi.naver.com/v1/datalab',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/naver/, ''),
      },
      '/api/deepl': {
        target: 'https://api-free.deepl.com',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api\/deepl/, '/v2'),
      },
    },
  },
})
