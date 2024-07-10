<template>
	<div id="app">
		<!-- 登录组件-->
		<Login v-show="!isLogin" @login-success="loginSuccess"></Login>
		<!-- 主体组件-->
		<Main v-show="isLogin" @log-out="logout" :imgUrl="imgUrl" :username="username"></Main>
	</div>
</template>

<script>
import Login from './components/Login.vue'
import Main from './components/Main.vue'

export default {
	components: {
		Login,
		Main
	},
	data() {
		return {
			username: undefined,
			imgUrl: "default.png",
			isRoot: false,
			isLogin: false
		}
	},
	created() {
		/* 从 浏览器 本地存储钟 获取 用户信息 */
		var user = window.localStorage.getItem("user");
		if (user) {
			//JSON.parse(user)将JSON字符串转成javascript对象
			var userObj = JSON.parse(user);
			var username = userObj.username;
			//获取图片地址
			var imgUrl = userObj.imgUrl;
			this.isRoot = user.role == 1;
			this.isLogin = true;
			this.imgUrl = imgUrl;
			this.username = username;
		}
	},
	methods: {
		loginSuccess(user) {
			let userJson = JSON.stringify(user);
			window.localStorage.setItem("user", userJson);
			this.username = user.username;
			this.imgUrl = user.imgUrl
			this.isLogin = true;
			this.isRoot = user.role == 1;
		},
		logout() {
			window.localStorage.removeItem("user");
			this.isLogin = false;
			window.location.href = "/index.html";//刷新
		}
	}
}
</script>

<style></style>