<template>
	<div class="login" v-loading.fullscreen.lock="fullscreenLoading">
		<div class="container">
			<div class="left">
				<div class="header_logo">
					<div class="_logo"><img src="../../public/resources/images/login_logo.png" /></div>
					<div class="_title">
						<h2>船舶管理系统</h2>
						<p>GDOU-CRM</p>
					</div>
				</div>
				<div class="big_logo"></div>
				<div class="foot_logo">
					<div class="foot_title">
						<h2>广东海洋大学</h2>
						<p>GDOU</p>
					</div>
				</div>
			</div>
			<div class="right">
				<el-form :hide-required-asterisk="true" class="form-items" :model="FormData" :rules="rules"
					ref="FormData">
					<el-form-item prop="username" class="input_lable">
						<h1>用户名</h1>
						<el-input v-model="FormData.username" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item prop="password" class="input_lable">
						<h1>密 码</h1>
						<el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
					</el-form-item>
					<!--邮箱验证码-->
					<el-form-item prop="email" class="input_lable">
						<h1>邮箱</h1>
						<el-input placeholder="请输入邮箱" v-model="FormData.email"></el-input>
					</el-form-item>
					<el-form-item class="input_lable" prop="code">
						<h1>验证码</h1>
						<div class="captchaBox">
							<el-input placeholder="请输入验证码" v-model="FormData.code"></el-input>
							<el-button type="primary" @click="getEmailCode()">获取验证码</el-button>
						</div>
					</el-form-item>
					<el-form-item class="btn_lable">
						<el-button type="primary" @click="login()"
							v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
						<el-button type="primary" @click="cleanInput()">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			FormData: {
				username: '',
				password: '',
				email: '',
				code: '',
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
				],
				code: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
				]
			},
			fullscreenLoading: false
		}
	},
	methods: {
		getEmailCode() {
			//通过正则表达式校验邮箱
			const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			if (reg.test(this.FormData.email)) {
				this.axios({
					url: "/ship/email/send.do",
					method: "POST",
					params: {
						username: this.FormData.username,
						email: this.FormData.email,
					}
				}).then((result) => {
					if (result.data.code == -1) {
						// alert(result.data.msg)
						this.$notify({
							title: "温馨提示",
							message: result.data.msg,
							type: "error",
							customClass: "center_log"
						})
					} else {
						// alert("请查看邮箱")
						this.$notify({
							title: "温馨提示",
							message: "请查看邮箱",
							type: "success"
						})
					}
				}).catch((result) => {
					// alert("请求失败");
					this.$notify({
						title: "温馨提示",
						message: "请求失败",
						type: "danger"
					})
				});
			} else {
				this.$notify({
					title: "温馨提示",
					message: '请输入正确的邮箱',
					type: "error",
				})
			}
		},
		cleanInput() {
			this.$refs.FormData.resetFields();
		},
		login() {
			this.$refs.FormData.validate(async (valid) => {
				if (valid) {
					this.axios({
						url: "/ship/account/login.do",
						method: "POST",
						//传参  /account/getLogin.do?username=...&pwd=...&captcha=...
						params: {
							username: this.FormData.username,
							pwd: this.FormData.password,
							captcha: this.FormData.code,
							email: this.FormData.email
						}
					}).then((result) => {
						console.log(result);
						//对后端返回的数据进行处理
						var res = result.data.code;
						if (res == 200) {
							//获取到后端返回给前端的数据
							var user = result.data.data;

							/* 子  -》  父 传值 */
							this.$emit("login-success", user);

						} else {
							var msg = result.data.msg;
							// alert("登录失败:"+msg);
							this.$notify({
								title: "温馨提示",
								message: msg,
								type: "danger"
							})
						}
					}).catch((result) => {
						// alert("请求失败");
						this.$notify({
							title: "温馨提示",
							message: "请求失败",
							type: "danger"
						})
					});
				}
			})

		}

	}
}
</script>
<style scoped>
.login {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background: url(../../public/resources/images/junjian_bg.png);
	background-size: 100% 100%;

	/* 居中 */
	display: flex;
	/* 主轴居中 */
	justify-content: center;
	/* 侧轴居中 */
	align-items: center;
}

.container {
	width: 1178px;
	height: 650px;
	/* 自动布局 */
	display: flex;
	flex-direction: row;
	transition: all 1s;
	box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
		0px 2px 6px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
}

.container_active {
	flex-direction: row-reverse;
}

.left {
	width: 32%;
	height: 100%;
	background: url(../../public/resources/images/login_left.png) no-repeat;
	display: flex;
	justify-content: center;
	position: relative;
}

.header_logo {
	display: flex;
}

._logo {
	padding: 20px 20px;
}

._title {
	padding-top: 20px;
	color: #fff;
}

._title p {
	color: rgb(230, 230, 230);
	text-indent: 2.5em;
}

.foot_logo {
	position: absolute;
	bottom: 2%;
	left: 0;
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	color: #fff;
}

.foot_logo p {
	color: rgb(230, 230, 230);
	text-indent: 3em;
}

.right {
	width: 800px;
	height: 100%;
	background-color: #fff;
}

.form-items {
	padding: 80px 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;


}

.form-items .captchaBox {
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.form-items .captchaBox>.el-input {
	width: 400px;
	margin-right: 60px;
}

.form-items .el-button {
	width: 195px;
	border-radius: 5px;
}

.btn_lable {
	display: flex;
	margin-top: 20px;
	justify-content: space-between;
}

.remember_forget {
	width: 100%;
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
}

.remember_forget .el-button {
	border: none;
	width: 80px;
	margin-left: 200px;
}

.remember_forget .el-button:hover {
	background-color: #fff;
}

@media (width <=1176px) {
	.left {
		display: none;
	}

	.right {
		margin: 0 auto;
		transition: all linear 1s;
	}
}
</style>