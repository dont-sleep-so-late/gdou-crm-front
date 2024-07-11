<template>
	<div id="app">
		<!--顶部菜单：添加、批量删除、搜索-->
		<el-row type="flex" justify="space-between">
			<el-col :span="4">
				<el-button type="primary" icon="el-icon-plus" size="small" @click="openAddWin">添加</el-button>
				<el-button type="danger" icon="el-icon-delete" size="small" @click="delMany">批量删除</el-button>
			</el-col>
			<el-col :span="20">
				<el-form :inline="true" size="small">
					<el-form-item>
						<el-input v-model="searchFormData.username" prefix-icon="el-icon-user"
							placeholder="请输入客户姓名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="searchFormData.tel" prefix-icon="el-icon-mobile-phone"
							placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item>
						<el-select placeholder="请选择部门" v-model="searchFormData.deptName">
							<el-option v-for="(item, index) in deptList" :label="item.name"
								:value="item.name"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-radio-group v-model="searchFormData.sex">
							<el-radio :label="1">男</el-radio>
							<el-radio :label="0">女</el-radio>
							<el-radio :label="2">未选</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="searchUsers">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<!--在顶部工具栏和表格之间添加间隙-->
		<div style="margin: 5px"></div>
		<!--数据表格展示-->
		<!--userList包含了数据库user表里面的全部数据-->
		<el-table :data="userList" border @select-all="selectAll" @select="selectOne">
			<!--type属性表示该值不是来至于数据库表的字段-->
			<el-table-column label="复选款" align="center" type="selection"></el-table-column>
			<el-table-column label="序号" align="center" type="index"></el-table-column>
			<!--prop属性表示该值来至于数据库表里面的字段-->
			<el-table-column label="主键" align="center" prop="id"></el-table-column>
			<el-table-column label="客户姓名" align="center" prop="username"></el-table-column>
			<el-table-column label="生日" align="center" prop="birthday"></el-table-column>
			<!--使用formatter来对表里面的数据进行格式化处理-->
			<el-table-column label="性别" align="center" prop="sex" :formatter="sexFmt"></el-table-column>
			<el-table-column label="电话" align="center" prop="tel"></el-table-column>
			<el-table-column label="薪资(元)" align="center" prop="sal" :formatter="salFmt"></el-table-column>
			<el-table-column label="职业" align="center" prop="profession" :formatter="professionFmt"></el-table-column>
			<el-table-column label="员工住址" align="center" prop="address"></el-table-column>
			<!--是想要获取到全部数据里面的remark这个字段里面的数据-->
			<!--不能使用userList.xxx.xx的方式，原因是该写法是后端代码的写法-->
			<!--前端需要使用scope来表示全部数据，通过scope.row来获取到当前那一行的值  通过scope.row.remark获取到当前行里面remark属性的值-->
			<el-table-column label="备注" align="center" prop="remark">
				<template slot-scope="scope">
					{{ scope.row.remark == null || scope.row.remark == '' ? '暂无信息' : scope.row.remark }}
				</template>
			</el-table-column>
			<el-table-column label="部门名称" align="center" prop="name"></el-table-column>
			<el-table-column label="部门地址" align="center" prop="loc"></el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<div>
						<el-button type="primary" icon="el-icon-edit" size="mini"
							@click="openEditWin(scope.row)">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini"
							@click="delOne(scope.row)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination :total="total" :current-page="pageNum" :page-size="pageSize" :page-sizes="pageSizes"
			@current-change="currentChange" @size-change="sizeChange" background
			layout="total,sizes,prev,pager,next,jumper">
		</el-pagination>

		<!--添加弹窗-->
		<el-dialog :visible.sync="addWinOpenStatus" title="添加客户信息" @close="addWinClose">
			<el-form :rules="formRules" :model="addUserFormData" ref="addWinRef">
				<el-form-item prop="username" label="姓名" label-width="60px">
					<el-input v-model="addUserFormData.username" prefix-icon="el-icon-user"
						placeholder="长度为2-10位简体中文"></el-input>
				</el-form-item>
				<el-form-item prop="birthday" label="生日" label-width="60px">
					<el-date-picker v-model="addUserFormData.birthday" value-format="yyyy-MM-dd"
						placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item prop="sex" label="性别" label-width="60px">
					<el-radio-group v-model="addUserFormData.sex">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop="tel" label="手机" label-width="60px">
					<el-input v-model="addUserFormData.tel" prefix-icon="el-icon-mobile-phone"
						placeholder="请输入手机号"></el-input>
				</el-form-item>

				<el-form-item prop="sal" label="薪资" label-width="60px">
					<el-input v-model="addUserFormData.sal" prefix-icon="el-icon-money" placeholder="请输入薪资"></el-input>
				</el-form-item>
				<el-form-item prop="profession" label="职业" label-width="60px">
					<el-select v-model="addUserFormData.profession" placeholder="请选择职业">
						<el-option label="船长" value="1"></el-option>
						<el-option label="水手" value="2"></el-option>
						<el-option label="服务人员" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="address" label="住址" label-width="60px">
					<el-input v-model="addUserFormData.address" prefix-icon="el-icon-location"
						placeholder="地址长度为10-200"></el-input>
				</el-form-item>
				<el-form-item prop="remark" label="备注" label-width="60px">
					<el-input v-model="addUserFormData.remark" prefix-icon="el-icon-more"
						placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-form-item prop="deptId" label="部门" label-width="60px">
					<el-select v-model="addUserFormData.deptId" placeholder="请选择部门">
						<!--:label表示客户下拉之后能看到数据-->
						<!--:value表示下拉之后客户选择了一个部门-->
						<el-option v-for="(item) in deptList" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" label-width="60px">
					<el-button type="primary" icon="el-icon-check" @click="addUserOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="addUserCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!--编辑弹窗-->
		<el-dialog :visible.sync="editWinOpenStatus" title="编辑客户信息" @close="editWinClose">
			<el-form :rules="formRules" :model="editUserFormData" ref="editWinRef">
				<el-form-item prop="username" label="姓名" label-width="60px">
					<el-input v-model="editUserFormData.username" prefix-icon="el-icon-user"
						placeholder="长度为2-10位简体中文"></el-input>
				</el-form-item>
				<el-form-item prop="birthday" label="生日" label-width="60px">
					<el-date-picker v-model="editUserFormData.birthday" value-format="yyyy-MM-dd"
						placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item prop="sex" label="性别" label-width="60px">
					<el-radio-group v-model="editUserFormData.sex">
						<el-radio label="1">男</el-radio>
						<el-radio label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop="tel" label="手机" label-width="60px">
					<el-input v-model="editUserFormData.tel" prefix-icon="el-icon-mobile-phone"
						placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="sal" label="薪资" label-width="60px">
					<el-input v-model="editUserFormData.sal" prefix-icon="el-icon-money" placeholder="请输入薪资"></el-input>
				</el-form-item>

				<el-form-item prop="profession" label="职业" label-width="60px">
					<el-select v-model="editUserFormData.profession" placeholder="请选择职业">
						<el-option label="船长" value="1"></el-option>
						<el-option label="水手" value="2"></el-option>
						<el-option label="服务人员" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="address" label="住址" label-width="60px">
					<el-input v-model="editUserFormData.address" prefix-icon="el-icon-location"
						placeholder="地址长度为10-200"></el-input>
				</el-form-item>
				<el-form-item prop="remark" label="备注" label-width="60px">
					<el-input v-model="editUserFormData.remark" prefix-icon="el-icon-more"
						placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-form-item prop="deptId" label="部门" label-width="60px">
					<el-select v-model="editUserFormData.deptId" placeholder="请选择部门">
						<el-option v-for="(item) in deptList" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" label-width="60px">
					<el-button type="primary" icon="el-icon-check" @click="editUserOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="editUserCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: "GetUsers",
	components: {},
	props: {},
	data() {
		return {
			//客户信息列表
			userList: [],
			//部门信息列表
			deptList: [],
			//页码
			pageNum: 1,
			//每一页显示的数据
			pageSize: 10,
			//总条数
			total: 0,
			//选择每页要显示的数据条数
			pageSizes: [5, 10, 15, 20, 30, 50],
			//点击客户管理之后，默认弹出框是关闭的
			addWinOpenStatus: false,
			//初始化添加客户信息模块的数据
			addUserFormData: {
				username: undefined,
				birthday: undefined,
				sex: undefined,
				tel: undefined,
				profession: undefined,
				sal: undefined,
				address: undefined,
				remark: undefined,
				deptId: undefined
			},
			//表单数据的校验
			formRules: {
				username: [{
					required: true,
					message: "客户姓名必须填写!",
					trigger: "blur"
				},
				{
					min: 2,
					max: 10,
					message: "客户姓名为2-10位的简体中文!",
					trigger: "blur"
				}
				],
				birthday: [{
					required: true,
					message: "生日必须填写!",
					trigger: "blur"
				}],
				sex: [{
					required: true,
					message: "性别必须填写!",
					trigger: "change"
				}],
				tel: [{
					required: true,
					message: "手机号必须填写!",
					trigger: "blur"
				},
				{
					min: 11,
					max: 11,
					message: "手机号格式错误!",
					trigger: "blur"
				}
				],
				profession: [{
					required: true,
					message: "职业必须填写!",
					trigger: "change"
				}],
				sal: [{
					required: true,
					message: "薪资必须填写!",
					trigger: "blur"
				}],
				address: [{
					required: true,
					message: "地址必须填写!",
					trigger: "blur"
				},
				{
					min: 6,
					max: 20,
					message: "地址长度为6-20位字符!",
					trigger: "blur"
				}
				],
				deptId: [{
					required: true,
					message: "部门必须填写!",
					trigger: "change"
				}]
			},
			//存放批量删除所需要的id数组
			delIdArray: [],
			//点击客户管理，修改的弹出框默认是关闭的
			editWinOpenStatus: false,
			//点击修改之后，弹出框的数据使用对象来封装
			editUserFormData: {
				id: undefined,
				username: undefined,
				birthday: undefined,
				sex: undefined,
				tel: undefined,
				profession: undefined,
				sal: undefined,
				address: undefined,
				remark: undefined,
				deptId: undefined
			},
			//搜索模块的数据
			searchFormData: {
				username: undefined,
				tel: undefined,
				deptName: undefined,
				sex: 2,
				pageNum: 1,
				pageSize: 10
			}

		}
	},
	//生命周期函数  created最先获取到data和methods里面的值的  mounted
	created() {
		//调用方法
		this.getUsersByPage();
		//查询所有部门记录
		this.getAllDepts();
	},
	watch: {
		$route() {
			this.pageNum = 1;
			this.pageSize = 10;
			this.getAccountsByPage();
		}
	},
	methods: {
		//方法调用方法
		getUsersByPage: function () {
			// axios({
			// 	url: "/ship/user/getUsersByPage.do",
			// 	method: "POST",
			// 	params: {
			// 		pageNum: this.pageNum,
			// 		pageSize: this.pageSize
			// 	}
			// }).then((result) => {
			// 	this.userList = result.data.data;
			// 	this.total = result.data.total;
			// })
			this.searchUsers();
		},
		//查询部门记录
		//在客户管理功能里面调用部门管理的接口
		getAllDepts: async function () {
			await axios({
				url: "/ship/dept/getAllDepts.do",
				method: "POST",
				params: {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
			}).then((result) => {
				this.deptList = result.data.data;
			})
		},
		//页码改变（点击页码之后，newPageNum就会产生新的值）
		currentChange: function (newPageNum) {
			// this.pageNum = newPageNum;
			this.searchFormData.pageNum = newPageNum;
			this.getUsersByPage();
		},
		//页码对应的数据的改变
		sizeChange: function (newPageSize) {
			this.searchFormData.pageSize = newPageSize
			this.getUsersByPage();
		},
		//性别的格式化
		sexFmt: function (row) {
			return row.sex == '1' ? '男' : '女'
		},
		//薪资的格式化
		salFmt: function (row) {
			return `￥${row.sal}`
		},
		//职业的格式化
		professionFmt: function (row) {
			var profession = "";
			switch (row.profession) {
				case "1":
					profession = "船长";
					break;
				case "2":
					profession = "水手";
					break;
				case "3":
					profession = "服务人员";
					break;
			}
			return profession;
		},
		//全选
		selectAll: function (params) {
			this.delIdArray = [];
			//item表示选中的那一条数据
			params.filter((item) => {
				this.delIdArray.push(item.id);
			});
		},
		//单选
		selectOne: function (params) {
			this.delIdArray = [];
			//item表示选中的那一条数据
			params.filter((item) => {
				this.delIdArray.push(item.id);
			});
		},
		//点击添加按钮之后，显示弹出框
		openAddWin: function () {
			this.addWinOpenStatus = !this.addWinOpenStatus;
		},
		//点击添加之后弹出框里面的关闭功能
		addWinClose: function () {
			this.$refs['addWinRef'].resetFields();
		},
		//点击添加之后弹出框里面的取消功能
		addUserCancel: function () {
			this.addWinOpenStatus = !this.addWinOpenStatus;
			this.$refs['addWinRef'].resetFields();
		},
		//点击添加之后弹出框里面的确定功能
		addUserOk: function () {
			//点击确定按钮之前，要先做数据的输入校验
			this.$refs['addWinRef'].validate(async (valid) => {
				//表单的数据格式都是正确的
				if (valid) {
					await axios({
						url: "/ship/user/addUsers.do",
						method: "POST",
						params: this.addUserFormData
					}).then((result) => {
						let code = result.data.code;
						if (code == 200) {
							//关闭弹出框
							this.addWinOpenStatus = false;
							//刷新数据
							this.getUsersByPage();
							//添加成功使用通知来显示
							this.$notify({
								title: "温馨提示",
								message: "成功的添加了一条记录!",
								type: "success"
							})
						} else {
							let msg = result.data.msg;
							this.$notify({
								title: "温馨提示",
								message: msg,
								type: "danger"
							})
						}
					});
				}
			});
		},
		//批量删除
		delMany: function () {
			//判断用户是否勾选了要删除的那些记录
			let len = this.delIdArray.length;
			if (len == 0) {
				this.$alert("请至少选中一条记录!", "温馨提示");
			} else {
				//勾选了记录之后，提示用户是否要确认删除,在then（）方法里面完成删除功能
				this.$confirm("你确定要删除这些记录吗?", "温馨提示").then(async () => {
					await axios({
						url: "/ship/user/cutManyUser.do",
						method: "POST",
						params: {
							id: this.delIdArray.join(",")
						}
					}).then((result) => {
						let code = result.data.code;
						if (code == 200) {
							//刷新数据
							this.getUsersByPage();
							//添加成功使用通知来显示
							this.$notify({
								title: "温馨提示",
								message: "成功的删除了一批记录!",
								type: "success"
							})
						} else {
							let msg = result.data.msg;
							this.$notify({
								title: "温馨提示",
								message: msg + ",删除失败!",
								type: "danger"
							})
						}
					}).catch(() => {
						console.log("取消")
					})
				})
			}
		},
		//单个删除
		delOne: function (row) {
			let id = row.id;
			this.$confirm("你确定要删除本条记录吗?", "温馨提示").then(async () => {
				await axios({
					url: "/ship/user/cutOneUser.do",
					method: "POST",
					params: {
						id: id
					}
				}).then((result) => {
					console.log(result);
					let code = result.data.code;
					if (code == 200) {
						//刷新数据
						this.getUsersByPage();
						//添加成功使用通知来显示
						this.$notify({
							title: "温馨提示",
							message: "成功删除一条记录。",
							type: "success"
						})
					} else {
						let msg = result.data.msg;
						this.$notify({
							title: "温馨提示",
							message: msg,
							type: "danger"
						})
					}
				}).catch(() => {

				})
			})
		},
		//修改
		//点击修改按钮之后，显示弹出框
		openEditWin: function (row) {
			this.editWinOpenStatus = !this.editWinOpenStatus;
			//做数据的回显
			//this.editUserFormData = row;
			//不想要原对象obj发生改变，让传入的第一个参数为空时，则元对象数据不会发生改变
			this.editUserFormData = Object.assign({}, row);
		},
		//弹出框里面关闭的功能
		editWinClose: function () {
			this.$refs['editWinRef'].resetFields();
		},
		//弹出框里面取消的功能
		editUserCancel: function () {
			this.editWinOpenStatus = !this.editWinOpenStatus;
			this.$refs['editWinRef'].resetFields();
		},
		//弹出框里面确定的功能
		editUserOk: function () {
			this.$refs['editWinRef'].validate(async (valid) => {
				//数据格式都正确
				if (valid) {
					await axios({
						url: "/ship/user/editUser.do",
						method: "POST",
						params: this.editUserFormData
					}).then((result) => {
						let code = result.data.code;
						if (code == 200) {
							this.editWinOpenStatus = false;
							//刷新数据
							this.getUsersByPage();
							//添加成功使用通知来显示
							this.$notify({
								title: "温馨提示",
								message: "成功的修改了一条记录!",
								type: "success"
							})
						} else {
							let msg = result.data.msg;
							this.$notify({
								title: "温馨提示",
								message: msg + ",修改失败!",
								type: "danger"
							})
						}
					})
				}
			});
		},
		//多条件搜索
		searchUsers: async function () {
			await axios({
				url: "/ship/user/getUsersBySearch.do",
				method: "POST",
				//params里面没有传递pageNum和pageSize
				params: this.searchFormData
			}).then((result) => {
				let code = result.data.code;
				if (code == 200) {
					this.userList = result.data.data;
					this.pageNum = 1;
					this.pageSize = 10;
					this.total = result.data.total;
				} else {
					let msg = result.data.msg;
					this.$notify({
						title: "温馨提示",
						message: msg,
						type: "danger"
					})
				}
			})
		}
	}
}
</script>
<style scoped></style>