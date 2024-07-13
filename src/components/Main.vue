<template>
	<div id="box">
		<el-container>

			<el-container>
				<el-header>
					<!--平台名称-->
					<div>
						<h2>船舶后台管理平台</h2>
					</div>
					<!--右侧主菜单-->
					<el-dropdown>
						<a href="javascript:;">
							<span class="username">用户： {{ username }}</span>
							<img id="headImg" style="width: 40px;height: 40px"
								:src="'/ship/download/downloadImg.do?imgUrl=' + imgUrl">
						</a>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-header>
				<el-container>
					<el-aside width="200px">
						<el-menu default-active="1" class="el-menu-vertical-demo">
							<el-submenu index="1">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>账号管理</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="getAccounts" @click="getAccounts()" id="1">账号列表</el-menu-item>
									<el-menu-item index="editHeadImg" @click="editHeadImg()" id="2">修改头像</el-menu-item>
									<el-menu-item index="editPwd" @click="editPwd()" id="3">修改密码</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-menu-item index="getUsers" id="4" @click="getUsers()">
								<i class="el-icon-menu"></i>
								<span slot="title">职员管理</span>
							</el-menu-item>
							<el-menu-item index="getDepts" id="5" @click="getDepts()">
								<i class="el-icon-document"></i>
								<span slot="title">部门管理</span>
							</el-menu-item>
							<el-menu-item index="getSearchs" id="6" @click="getSearchs()">
								<i class="el-icon-search"></i>
								<span slot="title">搜索管理</span>
							</el-menu-item>
							<el-menu-item index="getShips" id="7" @click="getShips()">
								<i class="el-icon-setting"></i>
								<span slot="title">船舶管理</span>
							</el-menu-item>
							<el-menu-item index="echars" id="8" @click="echars()">
								<i class="el-icon-pie-chart"></i>
								<span slot="title">报表管理</span>
							</el-menu-item>
						</el-menu>
					</el-aside>
					<el-main>
						<div id="box">
							<router-view></router-view>
						</div>
					</el-main>
				</el-container>

			</el-container>
		</el-container>

	</div>
</template>

<script>
export default {
	name: "",
	props: ["imgUrl", "username"],
	data() {
		return {
			// imgUrl:imgUrl,
			// username:username
		}
	},
	/* created(){
		let userJson = window.localStorage.getItem("user");
		  let user = JSON.parse(userJson);
		this.imgUrl=user.imgUrl
		this.username=user.username
	}, */
	methods: {
		async logout() {
			await this.axios({
				url: "/ship/account/logout.do",
				method: "POST",
				params: {}
			}).then((resp) => {
				this.$emit("log-out")
			})
		},
		getAccounts() {
			/* 路由 */
			this.$router.push({
				path: "/getAccounts",
				query: {
					rand: Math.random()
				}
			})
		},
		editHeadImg() {
			this.$router.push({
				path: "/editHeadImg",
				query: {
					rand: Math.random()
				}
			})
		},
		editPwd() {
			this.$router.push({
				path: "/editPwd",
				query: {
					rand: Math.random()
				}
			})
		},
		getUsers() {
			this.$router.push({
				path: "/getUsers",
				query: {
					rand: Math.random()
				}
			})
		},
		getSearchs() {
			this.$router.push({
				path: "/getSearchs",
				query: {
					rand: Math.random()
				}
			})
		},
		getDepts() {
			this.$router.push({
				path: "/getDepts",
				query: {
					rand: Math.random()
				}
			})
		},
		getShips() {
			this.$router.push({
				path: "/getShips",
				query: {
					rand: Math.random()
				}
			})
		},
		echars() {
			this.$router.push({
				path: "/echars",
				query: {
					rand: Math.random()
				}
			})
		}
	}
}
</script>

<style scoped>
.el-header {
	background-color: #0080ff;
	color: #ffffff;
	line-height: 60px;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
}

.username {
	color: #fff;
}

.el-icon-arrow-down {
	font-size: 12px;
}
</style>