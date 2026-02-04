<template>
	<div class="star-login-container">
		<!-- 星宿背景 -->
		<div class="constellation-bg">
			<div class="galaxy-bg"></div>
			<div class="stars-layer stars-layer-1"></div>
			<div class="stars-layer stars-layer-2"></div>
			<div class="stars-layer stars-layer-3"></div>
			<div class="constellation cassiopeia"></div>
		</div>
		<div class="container" :class="{ 'right-panel-active': isSignUp }">
			<!-- 注册表单 -->
			<div class="form-container sign-up-container">
				<form @submit.prevent="onSignUp">
					<h1>创建账号</h1>
					<span class="personal-info">
						苔花如米小，也学牡丹开。</span>
					<input type="text" placeholder="账号" v-model="registerForm.account" />
					<input type="password" placeholder="密码" v-model="registerForm.password" />
					<input type="password" placeholder="确认密码" v-model="registerForm.repassword" />
					<button type="submit">注 册</button>
				</form>
			</div>

			<!-- 登录表单 -->
			<div class="form-container sign-in-container">
				<form @submit.prevent="onSignIn">
					<h1>后台管理系统</h1>
					<span class="forget-password" @click="forgetPassword">忘记密码</span>
					<input type="text" placeholder="账号" v-model="loginForm.account" />
					<input type="password" placeholder="密码" v-model="loginForm.password" />
					<button type="submit">登 录</button>
				</form>
			</div>

			<!-- 右侧覆盖层 -->
			<div class="overlay-container">
				<div class="overlay">
					<!-- 左侧欢迎内容 -->
					<div class="overlay-panel overlay-left">
						<h1>欢迎回来！</h1>
						<p>大鹏一日同风起，扶摇直上九万里。</p>
						<button class="ghost" @click="toggleForm('signIn')">登 录</button>
					</div>

					<!-- 右侧欢迎内容 -->
					<div class="overlay-panel overlay-right">
						<h1>你好，朋友！</h1>
						<p>及时当勉励，岁月不待人。</p>
						<button class="ghost" @click="toggleForm('signUp')">注 册</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Forget ref="forgetP"></Forget>
</template>

<script lang="ts" setup>
	import Forget from "./forgetPassword.vue";
	import { reactive, ref } from "vue";
	import { useRouter } from "vue-router";
	import { ElMessage } from "element-plus";

	const router = useRouter();
	interface formData {
		account : number | null;
		password : string;
		repassword ?: string;
	}
	const loginForm : formData = reactive({
		account: 123456,
		password: "z123456",
	});
	const registerForm : formData = reactive({
		account: null,
		password: "",
		repassword: "",
	});

	const isSignUp = ref(false);
	const toggleForm = (action) => {
		isSignUp.value = action === "signUp";
	};

	const onSignIn = async (event) => {
		event.preventDefault();
		if (loginForm.account == "" || loginForm.password == "") {
			ElMessage.error("账号或密码不能为空");
			return;
		}
		const res = {
			message: "登录成功",
			token: "mock-token-123456",
			data: {
				id: 1,
				name: "测试用户",
				department: "测试部门",
				email: "test@example.com"
			}
		};
		if (res.message == "登录成功") {
			ElMessage.success("登录成功");
			sessionStorage.setItem("id", res.data.id);
			sessionStorage.setItem("department", res.data.department);
			localStorage.setItem("token", res.token);
			localStorage.setItem("name", res.data.name);
		} else {
			ElMessage.error("登录失败");
		}
	};

	const onSignUp = async (event) => {
		event.preventDefault();
		if (
			registerForm.account == "" ||
			registerForm.password == "" ||
			registerForm.repassword == ""
		) {
			ElMessage.error("账号或密码或确认密码不能为空");
			return;
		}
		if (registerForm.password == registerForm.repassword) {
			const res = { status: 0, message: "注册成功" };
			if (res.status == 0) {
				ElMessage.success("注册成功！");
				isSignUp.value = false;
			} else {
				ElMessage.error("注册失败，请检查数据是否正确");
			}
		} else {
			ElMessage.warning("请检查两次输入的密码是否一致");
		}
	};

	const forgetP = ref();
	const forgetPassword = () => {
		forgetP.value?.open();
	};
</script>

<style scoped lang="scss">
	.star-login-container {
		width: 100vw;
		height: 100vh;
		position: relative; 
		overflow: hidden;
	}

	// 星宿背景
	.constellation-bg {
		width: 100%;
		height: 100%;
		background: #050818;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;

		.galaxy-bg {
			position: absolute;
			width: 100%;
			height: 100%;
			background: radial-gradient(ellipse at center, rgba(20, 30, 80, 0.4) 0%, rgba(5, 8, 24, 0) 70%);
			z-index: 1;
		}

		// 多层星星
		.stars-layer {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-repeat: repeat;
			animation: starTwinkle infinite ease-in-out;
		}

		// 第一层：大星星，数量少，亮度高，闪烁慢
		.stars-layer-1 {
			background-size: 800px 600px;
			background-image: 
				radial-gradient(3px 3px at 10px 20px, rgba(255,255,255,0.9), transparent),
				radial-gradient(4px 4px at 80px 150px, rgba(240,240,255,0.8), transparent),
				radial-gradient(2.5px 2.5px at 200px 80px, rgba(220,220,255,0.95), transparent),
				radial-gradient(5px 5px at 350px 220px, rgba(255,255,255,1), transparent),
				radial-gradient(3.5px 3.5px at 500px 300px, rgba(230,230,255,0.85), transparent),
				radial-gradient(2px 2px at 650px 120px, rgba(245,245,255,0.9), transparent),
				radial-gradient(4.5px 4.5px at 720px 400px, rgba(250,250,255,0.8), transparent),
				radial-gradient(3px 3px at 150px 450px, rgba(255,240,255,0.95), transparent),
				radial-gradient(2.8px 2.8px at 420px 180px, rgba(210,210,255,0.88), transparent),
				radial-gradient(3.2px 3.2px at 800px 280px, rgba(225,225,255,0.92), transparent),
				radial-gradient(4px 4px at 280px 350px, rgba(240,240,255,0.82), transparent),
				radial-gradient(2px 2px at 950px 100px, rgba(255,255,255,0.98), transparent),
				radial-gradient(5px 5px at 1100px 420px, rgba(235,235,255,0.8), transparent),
				radial-gradient(3.8px 3.8px at 1250px 200px, rgba(248,248,255,0.9), transparent);
			animation-duration: 7s;
		}

		// 第二层：中星星，数量中等，亮度中等，闪烁中速
		.stars-layer-2 {
			background-size: 600px 500px;
			background-image: 
				radial-gradient(2px 2px at 30px 70px, rgba(255,255,255,0.7), transparent),
				radial-gradient(2.5px 2.5px at 120px 220px, rgba(240,240,255,0.65), transparent),
				radial-gradient(1.8px 1.8px at 250px 150px, rgba(220,220,255,0.75), transparent),
				radial-gradient(2.2px 2.2px at 380px 300px, rgba(255,255,255,0.8), transparent),
				radial-gradient(1.5px 1.5px at 520px 100px, rgba(230,230,255,0.7), transparent),
				radial-gradient(2.8px 2.8px at 680px 280px, rgba(245,245,255,0.68), transparent),
				radial-gradient(2px 2px at 780px 180px, rgba(250,250,255,0.72), transparent),
				radial-gradient(2.4px 2.4px at 180px 350px, rgba(255,240,255,0.78), transparent),
				radial-gradient(1.9px 1.9px at 450px 250px, rgba(210,210,255,0.65), transparent),
				radial-gradient(2.6px 2.6px at 850px 320px, rgba(225,225,255,0.76), transparent),
				radial-gradient(2.1px 2.1px at 320px 400px, rgba(240,240,255,0.69), transparent),
				radial-gradient(1.7px 1.7px at 980px 220px, rgba(255,255,255,0.74), transparent),
				radial-gradient(2.3px 2.3px at 1150px 150px, rgba(235,235,255,0.71), transparent),
				radial-gradient(2.7px 2.7px at 1280px 300px, rgba(248,248,255,0.67), transparent),
				radial-gradient(1.6px 1.6px at 480px 420px, rgba(220,220,255,0.73), transparent),
				radial-gradient(2.2px 2.2px at 620px 40px, rgba(250,250,255,0.77), transparent);
			animation-duration: 5s;
			animation-delay: 1.2s;
		}

		// 第三层：小星星，数量多，亮度低，闪烁快
		.stars-layer-3 {
			background-size: 400px 300px;
			background-image: 
				radial-gradient(1px 1px at 15px 40px, rgba(255,255,255,0.4), transparent),
				radial-gradient(1.2px 1.2px at 70px 90px, rgba(240,240,255,0.35), transparent),
				radial-gradient(0.8px 0.8px at 130px 160px, rgba(220,220,255,0.45), transparent),
				radial-gradient(1.1px 1.1px at 190px 50px, rgba(255,255,255,0.38), transparent),
				radial-gradient(0.9px 0.9px at 250px 200px, rgba(230,230,255,0.42), transparent),
				radial-gradient(1.3px 1.3px at 310px 120px, rgba(245,245,255,0.32), transparent),
				radial-gradient(1px 1px at 370px 250px, rgba(250,250,255,0.4), transparent),
				radial-gradient(1.2px 1.2px at 430px 80px, rgba(255,240,255,0.36), transparent),
				radial-gradient(0.7px 0.7px at 490px 180px, rgba(210,210,255,0.44), transparent),
				radial-gradient(1.1px 1.1px at 550px 290px, rgba(225,225,255,0.39), transparent),
				radial-gradient(0.8px 0.8px at 610px 150px, rgba(240,240,255,0.34), transparent),
				radial-gradient(1.2px 1.2px at 670px 320px, rgba(255,255,255,0.41), transparent),
				radial-gradient(0.9px 0.9px at 730px 70px, rgba(235,235,255,0.37), transparent),
				radial-gradient(1px 1px at 790px 220px, rgba(248,248,255,0.33), transparent),
				radial-gradient(1.1px 1.1px at 850px 350px, rgba(220,220,255,0.43), transparent),
				radial-gradient(0.8px 0.8px at 910px 110px, rgba(250,250,255,0.38), transparent),
				radial-gradient(1.2px 1.2px at 970px 270px, rgba(255,255,255,0.35), transparent),
				radial-gradient(0.9px 0.9px at 1030px 40px, rgba(230,230,255,0.4), transparent),
				radial-gradient(1px 1px at 1090px 190px, rgba(245,245,255,0.36), transparent),
				radial-gradient(1.1px 1.1px at 1150px 300px, rgba(210,210,255,0.42), transparent),
				radial-gradient(0.8px 0.8px at 1210px 80px, rgba(225,225,255,0.39), transparent),
				radial-gradient(1.2px 1.2px at 1270px 210px, rgba(240,240,255,0.34), transparent);
			animation-duration: 3s;
			animation-delay: 2.5s;
		}

		.cassiopeia {
			bottom: 3%;
			left: 5%;
			width: 500px;
			height: 550px;
			background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="550"><path d="M100,200 L150,150 L200,200 L250,150 L300,200" stroke="rgba(180, 120, 255, 1)" stroke-width="3" fill="none"/></svg>');
			animation: cassiopeiaFlicker 7s infinite ease-in-out;
			z-index: 3;

			&::before {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				background-repeat: no-repeat;
				background-position: center;
				opacity: 1;
				background-image:
					radial-gradient(12px 12px at 100px 200px, rgba(180, 120, 255, 1), transparent),
					radial-gradient(15px 15px at 150px 150px, rgba(200, 150, 255, 1), transparent),
					radial-gradient(11px 11px at 200px 200px, rgba(170, 100, 255, 1), transparent),
					radial-gradient(15px 15px at 250px 150px, rgba(200, 150, 255, 1), transparent),
					radial-gradient(12px 12px at 300px 200px, rgba(180, 120, 255, 1), transparent);
			}
		}
	}

	// 星星闪烁动画（亮度随机变化，实现亮暗不均）
	@keyframes starTwinkle {
		0% { opacity: 0.2; }
		20% { opacity: 0.8; }
		40% { opacity: 0.4; }
		60% { opacity: 1; }
		80% { opacity: 0.6; }
		100% { opacity: 0.2; }
	}

	// 仙后座闪烁动画
	@keyframes cassiopeiaFlicker {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.08); }
	}

	// 核心：卡片绝对居中
	.container {
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 768px;
		max-width: 90%; 
		min-height: 480px;
		opacity: 0.9;
		z-index: 10; 
		overflow: hidden;

		// 注册状态切换动画
		&.right-panel-active {
			.sign-in-container { transform: translateX(100%); }
			.overlay-container { transform: translateX(-100%); }
			.sign-up-container { transform: translateX(100%); opacity: 1; z-index: 5; }
			.overlay { transform: translateX(50%); }
			.overlay-left { transform: translateX(0); }
			.overlay-right { transform: translateX(20%); }
		}
	}

	// 表单容器
	.form-container {
		position: absolute;
		top: 0;
		height: 100%;
		transition: all 0.6s ease-in-out;

		& form {
			background: rgba(45, 52, 54, 1);
			display: flex;
			flex-direction: column;
			padding: 0 50px;
			height: 100%;
			justify-content: center;
			align-items: center;
			text-align: center;
			color: beige;
		}

		input {
			width: 240px;
			text-align: center;
			background: transparent;
			border: none;
			border-bottom: 1px solid #fff;
			font-size: 16px;
			padding: 10px 0;
			margin: 8px 0;
			outline: none;
			color: #fff;
		}
	}

	// 按钮样式
	button {
		border-radius: 20px;
		border: 1px solid #a670f1;
		background: #a670f1;
		color: #fff;
		font-size: 12px;
		font-weight: bold;
		padding: 12px 45px;
		letter-spacing: 1px;
		cursor: pointer;
		transition: transform 80ms ease-in;

		&:active { transform: scale(0.95); }
		&.ghost { background: transparent; }
	}

	// 覆盖层容器
	.overlay-container {
		position: absolute;
		top: 0;
		left: 50%;
		width: 50%;
		height: 100%;
		overflow: hidden;
		transition: transform 0.6s ease-in-out;
		z-index: 100;

		.overlay {
			background: rgba(45, 52, 54, 0.7);
			color: #fff;
			position: absolute;
			left: -100%;
			height: 100%;
			width: 200%;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;

			.overlay-panel {
				position: absolute;
				top: 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 0 10px;
				height: 100%;
				width: 50%;
				text-align: center;
				transform: translateX(0);
				transition: transform 0.6s ease-in-out;

				h1 { font-weight: bold; margin: 0; color: beige; }
				p { font-size: 14px; line-height: 20px; margin: 20px 0 30px; }
			}

			.overlay-right { right: 0; }
		}
	}

	// 表单容器定位
	.sign-in-container { left: 0; width: 50%; z-index: 2; }
	.sign-up-container { left: 0; width: 50%; z-index: 1; opacity: 0; }

	// 其他样式
	.personal-info {
		font-size: 12px;
		color: #fff;
		margin-bottom: 20px;
		line-height: 1.5;
	}
	.forget-password {
		font-size: 12px;
		color: #fff;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 10px;
		&:hover { color: #ad92c1; }
	}
</style>