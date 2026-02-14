<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="180px">
				<div class="logo-container">
					<h1 class="logo-text">通用后台管理系统</h1>
				</div>
				<el-menu class="sidebar-menu" @open="handleOpen" @close="handleClose" router background-color="#304156"
					text-color="#bfcbd9" active-text-color="#409EFF">
					<el-menu-item index="home">
						<el-icon>
							<HomeFilled />
						</el-icon>
						<span>首页</span>
					</el-menu-item>
					<el-menu-item index="overview">
						<el-icon>
							<Tickets />
						</el-icon>
						<span>系统概览</span>
					</el-menu-item>

					<el-sub-menu index="user-management">
						<template #title>
							<el-icon>
								<User />
							</el-icon>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="admin-management">管理员管理</el-menu-item>
							<el-menu-item index="product-admin">产品管理员</el-menu-item>
							<el-menu-item index="user-admin">用户管理员</el-menu-item>
							<el-menu-item index="permission-admin">权限管理员</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>

					<el-sub-menu index="employee-management">
						<template #title>
							<el-icon>
								<UserFilled />
							</el-icon>
							<span>员工管理</span>
						</template>
						<el-menu-item index="user-list">用户列表</el-menu-item>
					</el-sub-menu>

					<el-sub-menu index="product-management">
						<template #title>
							<el-icon>
								<TakeawayBox />
							</el-icon>
							<span>产品管理</span>
						</template>
						<el-menu-item index="product-list">产品列表</el-menu-item>
					</el-sub-menu>

					<el-menu-item index="sales">
						<el-icon>
							<Sell />
						</el-icon>
						<span>销售管理</span>
					</el-menu-item>

					<el-menu-item index="contract">
						<el-icon>
							<Document />
						</el-icon>
						<span>合同管理</span>
					</el-menu-item>

					<el-sub-menu index="log-management">
						<template #title>
							<el-icon>
								<Collection />
							</el-icon>
							<span>日志管理</span>
						</template>
						<el-menu-item index="operation-log">操作日志</el-menu-item>
						<el-menu-item index="login-log">登录日志</el-menu-item>
					</el-sub-menu>

					<el-menu-item index="system-setting">
						<el-icon>
							<Setting />
						</el-icon>
						<span>系统设置</span>
					</el-menu-item>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header class="main-header">
					<span class="header-left-content">尊敬的 xx 欢迎您登录本系统</span>
					<!-- 头部右侧 -->
					<div class="header-right-content">
						<!-- 信封 -->
						<el-icon>
							<Message />
						</el-icon>
						<!-- 头像 -->
						<el-avatar :size="24" :src="circleUrl" />
						<!-- 设置 -->
						<el-dropdown>
							<span class="el-dropdown-link">
								设置
							</span>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>设置账号</el-dropdown-item>
									<el-dropdown-item>更改头像</el-dropdown-item>
									<el-dropdown-item>退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</el-header>

				<el-main class="main-content">
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, toRefs } from 'vue'

	const state = reactive({
		circleUrl:
			'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
	})

	const { circleUrl } = toRefs(state)

	const handleOpen = () => { }
	const handleClose = () => { }
</script>

<style scoped lang="scss">
	.common-layout {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;

		.el-container {
			height: 100%;
			width: 100%;
		}

		// 滚动条隐藏的通用样式
		.hide-scrollbar {
			scrollbar-width: none;
			-ms-overflow-style: none;

			&::-webkit-scrollbar {
				display: none !important;
				width: 0 !important;
				height: 0 !important;
			}
		}

		// 应用到所有需要隐藏滚动条的元素
		.el-aside,
		.sidebar-menu,
		.main-content,
		:deep(html),
		:deep(body) {
			@extend .hide-scrollbar;
		}
	}

	// 侧边栏：保留滚动功能，隐藏滚动条
	.el-aside {
		background-color: #304156;
		height: 100vh;
		overflow-y: auto;
		flex-shrink: 0;
	}

	// logo 容器
	.logo-container {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2b2f3a;
		border-bottom: 1px solid #1f1f1f;

		.logo-text {
			color: white;
			font-size: 16px;
			font-weight: 600;
			margin: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 0 10px;
		}
	}

	// 侧边栏菜单
	.sidebar-menu {
		border-right: none;
		height: calc(100vh - 60px);
		overflow-y: auto;
	}

	// 菜单交互样式
	:deep(.el-sub-menu__title) {
		&:hover {
			background-color: #263445 !important;
		}
	}

	:deep(.el-menu-item) {
		&:hover {
			background-color: #263445 !important;
		}

		&.is-active {
			background-color: #409eff !important;
			color: white !important;
		}
	}

	// 头部
	.main-header {
		height: 60px;
		padding: 0 20px;
		background-color: white;
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		justify-content: space-between;
	}
	//头部右侧 
	.header-right-content {
		width: 120px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


	// 主内容区：保留滚动功能，隐藏滚动条
	.main-content {
		background-color: #f5f7fa;
		padding: 20px;
		height: calc(100vh - 60px);
		overflow-y: auto;
		width: 100%;
		padding-right: 30px; // 给滚动条留出空间，避免内容被遮挡
	}

	// 全局盒模型统一
	:deep(*) {
		box-sizing: border-box !important;
	}
</style>