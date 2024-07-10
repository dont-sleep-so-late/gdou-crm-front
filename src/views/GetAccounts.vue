<template>
	<div id="app">
		<!--顶部工具栏：添加  只有超级管理员可以查看-->
		<el-row v-show="isRoot">
			<el-col :span="4">
				<el-button type="success" icon="el-icon-plus" round size="small"
					@click="openAddAccountWin">添加</el-button>
			</el-col>
		</el-row>
		<!--工具栏与数据表格之间间隙-->
		<div style="margin: 10px"></div>
		<!--数据表格-->
		<el-table :data="accountDataArray" border>
			<el-table-column label="序号" align="center" type="index"></el-table-column>
			<el-table-column label="主键" align="center" prop="id"></el-table-column>
			<el-table-column label="账号" align="center" prop="username"></el-table-column>
			<el-table-column label="头像" align="center" prop="imgUrl">
				<template slot-scope="scope">
					<el-popover placement="right" title="查看大图" trigger="click">
						<!--cursor:pointer"表示是一只手的形状-->
						<!--.concat(scope.row.imgUrl)等同于 + scope.row.imgUrl-->
						<el-image slot="reference"
							:src="'/ship/download/downloadImg.do?imgUrl='.concat(scope.row.imgUrl)"
							style="width: 50px;height: 50px;cursor:pointer"></el-image>
						<el-image :src="'/ship/download/downloadImg.do?imgUrl='.concat(scope.row.imgUrl)"
							style="width: 250px;height: 250px"></el-image>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
			<el-table-column label="修改时间" align="center" prop="updateTime" :formatter="updateTimeFmt"></el-table-column>
			<el-table-column label="状态" align="center" prop="status" :formatter="statusFmt"></el-table-column>
			<el-table-column label="操作" width="350" align="center" v-if="isRoot">
				<template slot-scope="scope">
					<el-form :inline="true" size="small">
						<el-form-item>
							<!--disabled="scope.row.role==1?true:false"那么disabled的值输出来的就是scope.row.role==1?true:false-->
							<!--:disabled="scope.row.role==1?true:false"当role的值为1时，disabled的值是禁用（:disabled = true）-->
							<el-button :disabled="scope.row.role==1?true:false" type="danger" icon="el-icon-delete"
								@click="delOneAccount(scope.row)">删除</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="danger" icon="el-icon-refresh" @click="resetAccountPwd(scope.row)">
								重置密码</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch :active-value="1" :inactive-value="0" :disabled="scope.row.role==1?true:false"
								@change="switchChange(scope.row)" v-model="scope.row.status" active-text="启用"
								inactive-text="禁用"></el-switch>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination @current-change="currentChange" @size-change="sizeChange" :current-page="pageNum" :total="total"
			:page-size="pageSize" :page-sizes="pageSizes" background
			layout="total,sizes,prev,pager,next,jumper"></el-pagination>
		<!--添加账号窗口-->
		<el-dialog title="添加账号" :visible.sync="addAccountWinOpenStatus" @close="addAccountWinClose">
			<el-form ref="addAccountWinRef" :model="addAccountFormData" :rules="addAccountFormRules">
				<el-form-item prop="username">
					<el-input v-model="addAccountFormData.username" prefix-icon="el-icon-user"
						placeholder="请输入账号名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-check" @click="addAccountOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="resetAddAccountWin">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "GetAccounts",
		data() {
			return {
				//账号列表数据
				accountDataArray: [],
				//页码
				pageNum: 1,
				//每页显示的条数
				pageSize: 10,
				//总条数
				total: 0,
				//选择每页显示的数据条数
				pageSizes: [1, 2, 5, 10],
				//账号的使用状态
				status: true,
				//点击账号列表，默认弹出框为关闭状态
				addAccountWinOpenStatus: false,
				//数据校验
				addAccountFormRules: {
					username: [{
							required: true,
							message: "账号必须填写!",
							trigger: "blur"
						},
						{
							min: 4,
							max: 20,
							message: "长度为4-20位字符!",
							trigger: "blur"
						}
					]
				},
				addAccountFormData: {
					username: undefined
				},
				//判断是否是超级管理员
				isRoot: false
			}
		},
		created: function() {
			var user = window.localStorage.getItem("user");
			let userObj = JSON.parse(user);
			//超级管理员
			this.isRoot = userObj.role == 1;
			this.getAccountsByPage();
		},
		watch: {
			$route() {
				this.pageNum = 1;
				this.pageSize = 10;
				this.getAccountsByPage();
			}
		},
		methods: {
			getAccountsByPage: function() {
				axios({
					url: "/ship/account/getAccountsByPage.do",
					method: "POST",
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then((result) => {
					this.accountDataArray = result.data.data;
					this.total = result.data.total;
				})
			},
			//修改的时间进行格式化
			updateTimeFmt: function(row) {
				return row.updateTime == null || row.updateTime == "" ? "暂无时间" : row.updateTime;
			},
			//状态格式化
			statusFmt: function(row) {
				return row.status == 1 ? "启用" : "禁用";
			},
			//页码改变（点击页码之后，newPageNum就会产生新的值）
			currentChange: function(newPageNum) {
				this.pageNum = newPageNum;
				this.getAccountsByPage();
			},
			//页码对应的数据的改变
			sizeChange: function(newPageSize) {
				this.pageSize = newPageSize;
				this.getAccountsByPage();
			},
			//启用和禁用
			switchChange: function(row) {
				axios({
					url: "/ship/account/editAccountStatus.do",
					method: "POST",
					params: {
						status: row.status,
						id: row.id
					}
				}).then((result) => {
					let code = result.data.code;
					if (code == 200) {
						this.$notify({
							title: "温馨提示",
							message: "修改成功",
							type: "success"
						})
					} else {
						let msg = result.data.msg;
						this.$notify({
							title: "温馨提示",
							message: msg + ",修改失败",
							type: "danger"
						})
					}
					//数据刷新
					this.getAccountsByPage();
				})
			},
			//点击添加按钮之后，打开弹出框
			openAddAccountWin: function() {
				this.addAccountWinOpenStatus = !this.addAccountWinOpenStatus;
			},
			//弹出框里面的关闭功能
			addAccountWinClose: function() {
				this.$refs['addAccountWinRef'].resetFields();
			},
			//弹出框里面的取消功能
			resetAddAccountWin: function() {
				this.$refs['addAccountWinRef'].resetFields();
			},
			//弹出框里面的确定功能
			addAccountOk: function() {
				this.$refs['addAccountWinRef'].validate((valid) => {
					//数据格式正确
					if (valid) {
						axios({
							url: "/ship/account/addAccount.do",
							method: "POST",
							params: this.addAccountFormData
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								//关闭弹出框
								this.addAccountWinOpenStatus = false;
								//数据刷新
								this.getAccountsByPage();
								this.$notify({
									title: "温馨提示",
									message: "添加成功",
									type: "success"
								})
							} else {
								let msg = result.data.msg;
								this.$notify({
									title: "温馨提示",
									message: msg + ",添加失败",
									type: "danger"
								})
							}
						})
					}
				})
			},
			//删除
			delOneAccount: function(row) {
				//获取被删除数据的id
				let id = row.id;
				this.$confirm("你确定要删除本条记录吗?", "温馨提示").then(() => {
					axios({
						url: "/ship/account/cutOneAccount.do",
						method: "POST",
						params: {
							id: id
						}
					}).then((result) => {
						let code = result.data.code;
						if (code == 200) {
							//数据刷新
							this.getAccountsByPage();
							this.$notify({
								title: "温馨提示",
								message: "成功的删除了一个账号",
								type: "success"
							})
						} else {
							let msg = result.data.msg;
							this.$notify({
								title: "温馨提示",
								message: msg + ",删除账号失败",
								type: "danger"
							})
						}
					})
				}).catch(() => {
					console.log("取消")
				})
			},
			//重置密码
			resetAccountPwd: function(row) {
				this.$confirm("你确定要重置当前这条记录吗?", "温馨提示").then(() => {
					axios({
						url: "/ship/account/editResetAccountPwd.do",
						method: "POST",
						params: {
							id: row.id
						}
					}).then((result) => {
						let code = result.data.code;
						if (code == 200) {
							this.$notify({
								title: "温馨提示",
								message: "重置密码成功",
								type: "success"
							})
							//如果重置的是超级管理员自己的密码，则需要退出进行重新登录
							if (row.role == 1) {
								window.localStorage.removeItem("user");
								window.location.href = "/index.html"; //刷新
							}
						} else {
							let msg = result.data.msg;
							this.$notify({
								title: "温馨提示",
								message: msg,
								type: "danger"
							})
						}
					})
				}).catch(() => {
					console.log("取消")
				})
			}
		}
	}
</script>

<style scoped>

</style>