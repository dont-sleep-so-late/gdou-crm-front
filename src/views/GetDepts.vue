<template>
	<div id="app">
		<!--顶部工具栏：添加  只有超级管理员可以查看-->
		<el-row>
			<el-col :span="4">
				<el-button type="success" icon="el-icon-plus" round size="small" @click="openAddDeptWin">添加</el-button>
				<el-button type="danger" icon="el-icon-delete" size="small" @click="delMany">批量删除</el-button>
			</el-col>
			<el-col :span="20">
				<el-form :inline="true" size="small">
					<el-form-item>
						<el-input v-model="searchFormData.name" prefix-icon="el-icon-user"
							placeholder="部门名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="searchFormData.loc" prefix-icon="el-icon-mobile-more"
							placeholder="部门地址"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="getDeptsBySearch()">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<!--工具栏与数据表格之间间隙-->
		<div style="margin: 10px"></div>
		<!--数据表格-->
		<el-table :data="deptDataArray" @select-all="selectAll" @select="selectOne" border>
			<!--type属性表示该值不是来至于数据库表的字段-->
			<el-table-column label="复选款" align="center" type="selection"></el-table-column>
			<el-table-column label="序号" width="200" align="center" type="index"></el-table-column>
			<el-table-column label="主键" width="200" align="center" prop="id"></el-table-column>
			<el-table-column label="部门名称" width="200" align="center" prop="name"></el-table-column>
			<el-table-column label="部门地址" width="500" align="left" prop="loc"></el-table-column>
			<el-table-column label="操作" width="300" align="center">
				<template slot-scope="scope">
					<div>
						<el-button type="success" icon="el-icon-edit" size="mini"
							@click="openEditWin(scope.row)">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini"
							@click="delOne(scope.row)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-pagination @current-change="currentChange" @size-change="sizeChange" :current-page="pageNum" :total="total"
			:page-size="pageSize" :page-sizes="pageSizes" background
			layout="total,sizes,prev,pager,next,jumper"></el-pagination>
		<!--添加部门窗口-->
		<el-dialog title="添加部门" :visible.sync="addDeptWinOpenStatus" @close="addDeptWinClose">
			<!--ref表示控件-->
			<el-form ref="addDeptWinRef" :model="addDeptFormData" :rules="addDeptFormRules">
				<el-form-item prop="name">
					<el-input v-model="addDeptFormData.name" prefix-icon="el-icon-location"
						placeholder="请输入部门名称"></el-input>
				</el-form-item>
				<el-form-item prop="loc">
					<el-input v-model="addDeptFormData.loc" prefix-icon="el-icon-location"
						placeholder="请输入部门地址"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-check" @click="addDeptOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="resetAddDeptWin">清除</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!--编辑弹窗-->
		<el-dialog :visible.sync="editWinOpenStatus" title="编辑部门信息" @close="editWinClose">
			<el-form :rules="formRules" :model="editDeptFormData" ref="editDeptWinRef">
				<el-form-item prop="name" label="名称" label-width="60px">
					<el-input v-model="editDeptFormData.name" prefix-icon="el-icon-mobile-more"
						placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item prop="loc" label="部门所在地址" label-width="60px">
					<el-input v-model="editDeptFormData.loc" prefix-icon="el-icon-more"
						placeholder="请输入部门所在地址"></el-input>
				</el-form-item>
				<el-form-item label="" label-width="60px">
					<el-button type="primary" icon="el-icon-check" @click="editDeptOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="editDeptCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "GetDepts",
		data() {
			return {
				//部门列表数据
				deptDataArray: [],
				//页码
				pageNum: 1,
				//每页显示数据的条数
				pageSize: 10,
				//选择每页显示的数据条数
				pageSizes: [1, 2, 5, 10, 20],
				//总条数
				total: 0,
				//点击部门管理，修改的弹出框默认是关闭的
				editWinOpenStatus: false,
				//点击部门管理，默认没有弹出框
				addDeptWinOpenStatus: false,
				//点击添加按钮之后，在弹出框里面做输入校验
				//输入校验需要做两次：前端一次，后端一次
				addDeptFormRules: {
					name: [
						//定义必填
						//trigger表示触发器  blur失焦
						{
							required: true,
							message: "部门名称必须填写!",
							trigger: "blur"
						},
						//定义所填写的范围
						{
							min: 1,
							max: 20,
							message: "长度为1-20位之间!",
							trigger: "blur"
						}
					],
					loc: [{
							required: true,
							message: "部门地址必须填写!",
							trigger: "blur"
						},
						{
							min: 6,
							max: 30,
							message: "长度为6-30位之间!",
							trigger: "blur"
						}
					]
				},
				addDeptFormData: {
					name: undefined,
					loc: undefined
				},
				editDeptFormData: {
					id: undefined,
					name: undefined,
					loc: undefined
				},
				//存放批量删除所需要的id数组
				delIdArray: [],
				searchFormData: {
					name: undefined,
					loc: undefined,
					pageNum: 1,
					pageSize: 10
				}
			}
		},
		//生命周期函数
		created: function() {
			// this.getDeptsByPage();
			this.getDeptsBySearch();
		},
		watch: {
			$route() {
				this.pageNum = 1;
				this.pageSize = 10;
				// this.getDeptsByPage();
				this.getDeptsBySearch();
			}
		},
		methods: {
			getDeptsByPage: function() {
				axios({
					url: "/ship/dept/getDeptsByPage.do",
					method: "POST",
					params: {
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then((result) => {
					this.deptDataArray = result.data.data;
					this.total = result.data.total;
				})
			},
			//页码改变
			currentChange: function(newPageNum) {
				this.pageNum = newPageNum;
				// this.getDeptsByPage();
				this.getDeptsBySearch();
			},
			//页码对应的数据的改变
			sizeChange: function(newPageSize) {
				this.pageSize = newPageSize;
				// this.getDeptsByPage();
				this.getDeptsBySearch();
			},
			//点击添加按钮之后弹出框里面的关闭功能
			addDeptWinClose: function() {
				this.$refs['addDeptWinRef'].resetFields();
			},
			//点击添加按钮之后弹出框里面的取消功能
			resetAddDeptWin: function() {
				this.$refs['addDeptWinRef'].resetFields();
			},
			//点击添加按钮，出现弹出框
			openAddDeptWin: function() {
				this.addDeptWinOpenStatus = !this.addDeptWinOpenStatus;
			},
			//点击添加按钮之后弹出框里面的确定功能
			//方法的多种方式: ()=>{}、function aaa(){}、aaa:function(){}、aaa(){}
			addDeptOk: function() {
				//点击确定按钮之前，要先确保输入的数据格式都是正确的（要进行数据校验）
				//valid表示数据校验的结果
				this.$refs['addDeptWinRef'].validate((valid) => {
					//数据格式都正确
					if (valid) {
						axios({
							url: "/ship/dept/addDepts.do",
							method: "POST",
							/*params:{
							    name:this.addDeptFormData.name,
							    loc:this.addDeptFormData.loc
							}*/
							params: this.addDeptFormData
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								//关闭弹出框
								this.addDeptWinOpenStatus = false;
								//刷新列表数据
								// this.getDeptsByPage();
								this.getDeptsBySearch();
								//显示成功通知
								this.$notify({
									title: "温馨提示",
									message: "添加成功!",
									type: "success"
								});
							} else {
								//添加失败的通知
								this.$notify({
									title: "温馨提示",
									message: result.data.msg + ",添加失败!",
									type: "danger"
								});
							}
						});
					}
				});
			},
			//修改
			//点击修改按钮之后，显示弹出框
			openEditWin: function(row) {
				this.editWinOpenStatus = !this.editWinOpenStatus;
				//做数据的回显
				//this.editShipFormData = row;
				//不想要原对象obj发生改变，让传入的第一个参数为空时，则元对象数据不会发生改变
				this.editDeptFormData = Object.assign({}, row);
			},
			//弹出框里面关闭的功能
			editWinClose: function() {
				this.$refs['editDeptWinRef'].resetFields();
			},
			//弹出框里面取消的功能
			editDeptCancel: function() {
				this.$refs['editDeptWinRef'].resetFields();
			},
			//弹出框里面确定的功能
			editDeptOk: function() {
				this.$refs['editDeptWinRef'].validate((valid) => {
					//数据格式都正确
					if (valid) {
						this.axios({
							url: "/ship/dept/editDept.do",
							method: "POST",
							params: this.editDeptFormData
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								this.editWinOpenStatus = false;
								//刷新数据
								// this.getDeptsByPage();
								this.getDeptsBySearch();
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
									message: msg,
									type: "danger"
								})
							}
						})
					}
				});
			},
			//全选
			selectAll: function(params) {
				this.delIdArray = [];
				//item表示选中的那一条数据
				params.filter((item) => {
					this.delIdArray.push(item.id);
				});
			},
			//单选
			selectOne: function(params) {
				this.delIdArray = [];
				//item表示选中的那一条数据
				params.filter((item) => {
					this.delIdArray.push(item.id);
				});
			},
			//批量删除
			delMany: function() {
				//判断用户是否勾选了要删除的那些记录
				let len = this.delIdArray.length;
				if (len == 0) {
					this.$alert("请至少选中一条记录!", "温馨提示");
				} else {
					//勾选了记录之后，提示用户是否要确认删除,在then（）方法里面完成删除功能
					this.$confirm("你确定要删除这些记录吗?", "温馨提示").then(() => {
						axios({
							url: "/ship/dept/cutManyDept.do",
							method: "POST",
							params: {
								/* 1，2，3，4，5，6    delete   in (1,2,3,4)*/
								deptIds: this.delIdArray.join(",")
							}
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								//刷新数据
								// this.getDeptsByPage();
								this.getDeptsBySearch();
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
									message: msg,
									type: "danger"
								})
							}
						})
					}).catch(() => {
						console.log("取消")
					})
				}
			},
			//单个删除
			delOne: function(row) {
				let id = row.id;
				this.$confirm("你确定要删除本条记录吗?", "温馨提示").then(() => {
					axios({
						url: "/ship/dept/cutOneDept.do",
						method: "POST",
						params: {
							deptId: id
						}
					}).then((result) => {
						console.log(result);
						let code = result.data.code;
						if (code == 200) {
							//刷新数据
							// this.getDeptsByPage();
							this.getDeptsBySearch();
							//添加成功使用通知来显示
							this.$notify({
								title: "温馨提示",
								message: "成功的删除了一条记录!",
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
					})
				}).catch(() => {

				})
			},
			//方法调用方法
			getDeptsBySearch: function() {
				this.axios({
					url: "/ship/dept/getDeptsBySearch.do",
					method: "POST",
					params: {
						name: this.searchFormData.name,
						loc: this.searchFormData.loc,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then((result) => {
					this.deptDataArray = result.data.data;
					this.total = result.data.total;
				})
			},
		}
	}
</script>

<style scoped>
</style>