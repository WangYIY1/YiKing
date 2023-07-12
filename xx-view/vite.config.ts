import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // 获取当前环境的配置
  const config = loadEnv(mode, './')
  return {
    plugins: [
      vue(),
    ],
    server: {
      port: 3073,
      // https: true,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*', // 允许所有域名的脚本访问该资源
      },
      proxy: {
        '/admin': {
          target: config.VITE_BASIC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin/, ''),
        },
      }

    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
