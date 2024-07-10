<template>
	<div id="box">
		<div class="layui-layout-admin">
			<div class="layui-header">
				<!--平台名称-->
				<div class="layui-logo">后台管理平台</div>
				<!--左侧主菜单-->
				<ul class="layui-nav layui-layout-left">
					<li class="layui-nav-item"><a href="#">日志设置</a></li>
					<li class="layui-nav-item"><a href="#">系统设置</a></li>
					<li class="layui-nav-item"><a href="#">统计</a></li>
					<li class="layui-nav-item"><a href="#">帮助</a></li>
				</ul>
				<!--右侧主菜单-->
				<ul class="layui-nav layui-layout-right">
					<li class="layui-nav-item">
						<a href="javascript:;">
							<span id="username">{{username}}</span>
							<img id="headImg" style="width: 40px;height: 40px"
								:src="'/ship/download/downloadImg.do?imgUrl='+imgUrl">
						</a>
						<dl class="layui-nav-child">
							<dd><a href="#" @click="logout()">退出</a></dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="layui-side layui-bg-black">
				<ul class="layui-nav layui-nav-tree" lay-filter="menu">
					<li class="layui-nav-item">
						<a href="#">
							<i class="layui-icon layui-icon-camera"></i>账号管理
						</a>
						<dl class="layui-nav-child">
							<dd>
								<a href="javascript:void(0)" id="1" @click="getAccounts()">
									<i class="layui-icon layui-icon-user"></i>账号列表
								</a>
							</dd>
							<dd>
								<a href="javascript:void(0)" id="2" @click="editHeadImg()">
									<i class="layui-icon layui-icon-upload"></i>修改头像
								</a>
							</dd>
							<dd>
								<a href="javascript:void(0)" id="3" @click="editPwd()">
									<i class="layui-icon layui-icon-password"></i>修改密码
								</a>
							</dd>
						</dl>
					</li>
					<li class="layui-nav-item">
						<a href="javascript:void(0)" id="4" @click="getUsers()">
							<i class="layui-icon layui-icon-user"></i>职员管理
						</a>
					</li>
					<li class="layui-nav-item">
						<a href="javascript:void(0)" id="5" @click="getDepts()">
							<i class="layui-icon layui-icon-location"></i>部门管理
						</a>
					</li>
					<li class="layui-nav-item">
						<a href="javascript:void(0)" id="6" @click="getSearchs()">
							<i class="layui-icon layui-icon-theme"></i>搜索管理
						</a>
					</li>
					<li class="layui-nav-item">
						<a href="javascript:void(0)" id="7" @click="getShips()">
							<i class="layui-icon layui-icon-email"></i>船舶管理
						</a>
					</li>
					<li class="layui-nav-item">
						<a href="javascript:void(0)" id="8" @click="echars()">
							<i class="layui-icon layui-icon-email"></i>报表管理
						</a>
					</li>
				</ul>
			</div>

			<div id="box">
				<router-view></router-view>
			</div>
			<!-- <div class="layui-body">
		        <div class="layui-tab" lay-allowClose="true" lay-filter="zst">
		            <ul class="layui-tab-title">
		                <li class="layui-this">首页</li>
		            </ul>
		            <div class="layui-tab-content">
		                <div id="welcome" class="layui-tab-item layui-show"></div>
		            </div>
		        </div>
		    </div> -->
			<!-- <div class="layui-footer">
				<center>
					2022-9999&copy;版权所有|维权必究
				</center>
			</div> -->
		</div>
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
			logout() {
				this.axios({
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
	#box {
		padding-top: 50px;
		padding-left: 120px;
	}
</style>