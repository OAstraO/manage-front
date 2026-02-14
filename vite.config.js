// 第一步：必须引入 defineConfig（你原来的代码缺失这行！）
import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
	resolve
} from 'path'

// 路径别名辅助函数
const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()], // 去掉后面多余的 }
	server: {
		port: 7777, // 默认启动时的端口号
		open: true, // 自动打开默认浏览器
		cors: true, // 允许跨域
		// 代理配置，解决接口跨域
		proxy: {
			// 匹配所有以 /api 开头的请求
			'/api': {
				target: 'http://127.0.0.1:3007', // 后端服务的地址和端口
				changeOrigin: true, // 开启跨域代理（关键）
				rewrite: (path) => path.replace(/^\/api/, '/api') // 路径重写，保持 /api 前缀
			}
		}
	},

	resolve: {
		alias: {
			'@': pathResolve('./src') // 设置 `@` 指向 `src` 目录
		}
	}
})