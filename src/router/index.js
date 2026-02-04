import {
	createRouter,
	createWebHistory
} from 'vue-router'
const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue')
	}
]
const router = createRouter({
	history: createWebHistory(),
	routes
})
export default router