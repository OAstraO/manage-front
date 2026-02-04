// 第一步：必须引入 defineConfig（你原来的代码缺失这行！）
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 路径别名辅助函数
const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // 去掉后面多余的 }
  server: {
    port: 7777, // 默认启动时的端口号
    open: true, // 自动打开默认浏览器
    cors: true, // 允许跨域
  },
  resolve: {
    alias: {
      '@': pathResolve('./src') // 设置 `@` 指向 `src` 目录
    }
  }
})