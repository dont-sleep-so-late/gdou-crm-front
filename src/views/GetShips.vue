<template>
	<div id="app">
		<!--顶部菜单：添加、批量删除、搜索-->
		<el-row type="flex" justify="space-between">
			<el-col :span="4">
				<el-button type="success" icon="el-icon-plus" size="small" @click="openAddWin">添加</el-button>
				<el-button type="danger" icon="el-icon-delete" size="small" @click="delMany">批量删除</el-button>
			</el-col>

			<el-col :span="20">
				<el-form :inline="true" size="small">
					<el-form-item>
						<el-input v-model="searchFormData.num" prefix-icon="el-icon-user" placeholder="船舶编号"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="searchFormData.name" prefix-icon="el-icon-mobile-more"
							placeholder="船舶名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-select placeholder="请选择状态" v-model="searchFormData.status">
							<el-option label="请选择状态" value=""></el-option>
							<el-option v-for="(item,index) in statusList" :label="stafmt(item)"
								:value="item"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-input v-model="searchFormData.belong" prefix-icon="el-icon-mobile-more"
							placeholder="所属单位"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="getShipsBySearch()">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<div style="margin: 5px"></div>
		<el-table :data="shipList" border @select-all="selectAll" @select="selectOne">
			<!--type属性表示该值不是来至于数据库表的字段-->
			<el-table-column label="复选款" align="center" type="selection"></el-table-column>
			<el-table-column label="序号" align="center" type="index"></el-table-column>
			<!--prop属性表示该值来至于数据库表里面的字段-->
			<el-table-column label="主键" align="center" prop="id"></el-table-column>
			<el-table-column label="编号" align="center" prop="num"></el-table-column>
			<el-table-column label="名称" align="center" prop="name"></el-table-column>
			<!--使用formatter来对表里面的数据进行格式化处理-->
			<el-table-column label="状态" align="center" prop="status" :formatter="staShow"></el-table-column>
			<el-table-column label="所属单位" align="center" prop="belong"></el-table-column>
			<el-table-column label="操作" width="300" align="center">
				<template slot-scope="scope">
					<div>
						<el-button type="success" icon="el-icon-user" size="mini"
							@click="openUsersWin(scope.row.id)">船员信息</el-button>
						<el-button type="success" icon="el-icon-edit" size="mini"
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
			<el-form :rules="formRules" :model="addShipFormData" ref="addWinRef">
				<el-form-item prop="num" label="编号" label-width="60px">
					<el-input v-model="addShipFormData.num" prefix-icon="el-icon-user"
						placeholder="长度为2-10位简体中文"></el-input>
				</el-form-item>
				<el-form-item prop="name" label="名称" label-width="60px">
					<el-input v-model="addShipFormData.name" prefix-icon="el-icon-mobile-more"
						placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item prop="status" label="状态" label-width="60px">
					
					<el-select placeholder="请选择状态" v-model="addShipFormData.status">
						<el-option v-for="(item,index) in statusList" :label="stafmt(item)" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="belong" label="所属单位" label-width="60px">
					<el-input v-model="addShipFormData.belong" prefix-icon="el-icon-mobile-more"
						placeholder="请输入所属单位"></el-input>
				</el-form-item>
				<el-form-item label="" label-width="60px">
					<el-button type="primary" icon="el-icon-check" @click="addShipOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="addShipCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!--编辑弹窗-->
		<el-dialog :visible.sync="editWinOpenStatus" title="编辑客户信息" @close="editWinClose">
			<el-form :rules="formRules" :model="editShipFormData" ref="editWinRef">
				<el-form-item prop="num" label="编号" label-width="60px">
					<el-input v-model="editShipFormData.num" prefix-icon="el-icon-user"
						placeholder="长度为2-10位简体中文"></el-input>
				</el-form-item>
				<el-form-item prop="name" label="名称" label-width="60px">
					<el-input v-model="editShipFormData.name" prefix-icon="el-icon-mobile-more"
						placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item prop="status" label="状态" label-width="60px">
					<el-select placeholder="请选择状态" v-model="editShipFormData.status">
						<el-option v-for="(item,index) in statusList" :label="stafmt(item)" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="belong" label="所属单位" label-width="60px">
					<el-input v-model="editShipFormData.belong" prefix-icon="el-icon-more"
						placeholder="请输入所属单位"></el-input>
				</el-form-item>
				<el-form-item label="" label-width="60px">
					<el-button type="primary" icon="el-icon-check" @click="editUserOk">确定</el-button>
					<el-button type="danger" icon="el-icon-close" @click="editUserCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 船员信息 -->
		<el-dialog :visible.sync="userWinOpenStatus" title="船员信息" @close="userWinClose">
			<el-table :data="userList" border>
				<el-table-column label="序号" align="center" type="index"></el-table-column>
				<!--prop属性表示该值来至于数据库表里面的字段-->
				<el-table-column label="id" align="center" prop="id"></el-table-column>
				<el-table-column label="姓名" align="center" prop="username"></el-table-column>
				<el-table-column label="手机号码" align="center" prop="tel"></el-table-column>
				<el-table-column label="地址" align="center" prop="address"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "",
		data() {
			return {
				//船舶信息列表
				shipList: [],
				statusList: [
					'0', '1', '2', '3'
				],
				/* 船员信息 */
				userList: [],
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
				//初始化添加船舶信息模块的数据
				addShipFormData: {
					num: undefined,
					name: undefined,
					status: undefined,
					belong: undefined
				},
				//表单数据的校验
				formRules: {
					num: [{
							required: true,
							message: "船舶编号必须填写!",
							trigger: "blur"
						},
						{
							min: 2,
							max: 10,
							message: "船舶编号为2-10位的简体中文!",
							trigger: "blur"
						}
					],
					name: [{
							required: true,
							message: "船舶名称必须填写!",
							trigger: "blur"
						},
						{
							min: 2,
							max: 10,
							message: "船舶名称为2-10位的简体中文!",
							trigger: "blur"
						}
					],
					status: [{
						required: true,
						message: "状态必须填写!",
						trigger: "blur"
					}],
					belong: [{
						required: true,
						message: "所属单位必须填写!",
						trigger: "blur"
					}],
				},
				//存放批量删除所需要的id数组
				delIdArray: [],
				//点击客户管理，修改的弹出框默认是关闭的
				editWinOpenStatus: false,
				/* 船员信息弹窗 */
				userWinOpenStatus: false,
				editShipFormData: {
					id:undefined,
					num: undefined,
					name: undefined,
					status: undefined,
					belong: undefined
				},
				searchFormData: {
					num: undefined,
					name: undefined,
					status: undefined,
					belong: undefined,
					pageNum: 1,
					pageSize: 10
				}
			}
		},
		//生命周期函数  created最先获取到data和methods里面的值的  mounted
		created() {
			//调用方法
			this.getShipsBySearch();
		},
		watch: {
			$route() {
				this.pageNum = 1;
				this.pageSize = 10;
				this.getShipsBySearch();
			}
		},
		methods: {
			stafmt(status) {
				let staStr = '';
				switch (status) {
					case '0':
						staStr = "报废";
						break;
					case '1':
						staStr = "运行";
						break;
					case '2':
						staStr = "停泊";
						break;
					case '3':
						staStr = "维修";
						break;
				}
				return staStr;
			},
			staShow(row) {
				let staStr = '';
				switch (row.status) {
					case '0':
						staStr = "报废";
						break;
					case '1':
						staStr = "运行";
						break;
					case '2':
						staStr = "停泊";
						break;
					case '3':
						staStr = "维修";
						break;
				}
				return staStr;
			},
			//方法调用方法
			getShipsBySearch: function() {
				this.axios({
					url: "/app/ship/getShipsBySearch.do",
					method: "POST",
					params: {
						num: this.searchFormData.num,
						name: this.searchFormData.name,
						status: this.searchFormData.status,
						belong: this.searchFormData.belong,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
				}).then((result) => {
					this.shipList = result.data.data;
					this.total = result.data.total;
				})
			},
			//页码改变（点击页码之后，newPageNum就会产生新的值）
			currentChange: function(newPageNum) {
				this.pageNum = newPageNum;
				this.getShipsBySearch();
			},
			//页码对应的数据的改变
			sizeChange: function(newPageSize) {
				this.pageSize = newPageSize;
				this.getShipsBySearch();
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
			//点击添加按钮之后，显示弹出框
			openAddWin: function() {
				this.addWinOpenStatus = !this.addWinOpenStatus;
			},
			//点击添加之后弹出框里面的关闭功能
			addWinClose: function() {
				this.$refs['addWinRef'].resetFields();
			},
			//点击添加之后弹出框里面的取消功能
			addShipCancel: function() {
				this.$refs['addWinRef'].resetFields();
				this.addWinOpenStatus=false;
			},
			//点击添加之后弹出框里面的确定功能
			addShipOk: function() {
				//点击确定按钮之前，要先做数据的输入校验
				this.$refs['addWinRef'].validate((valid) => {
					//表单的数据格式都是正确的
					if (valid) {
						axios({
							url: "/app/ship/addShip.do",
							method: "POST",
							params: this.addShipFormData
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								//关闭弹出框
								this.addWinOpenStatus = false;
								//刷新数据
								this.getShipsBySearch();
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
			delMany: function() {
				//判断用户是否勾选了要删除的那些记录
				let len = this.delIdArray.length;
				if (len == 0) {
					this.$alert("请至少选中一条记录!", "温馨提示");
				} else {
					//勾选了记录之后，提示用户是否要确认删除,在then（）方法里面完成删除功能
					this.$confirm("你确定要删除这些记录吗?", "温馨提示").then(() => {
						axios({
							url: "/app/ship/cutMany.do",
							method: "POST",
							params: {
								/* 1，2，3，4，5，6    delete   in (1,2,3,4)*/
								ids: this.delIdArray.join(",")
							}
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								//刷新数据
								this.getShipsBySearch();
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
						url: "/app/ship/cutOne.do",
						method: "POST",
						params: {
							id: id
						}
					}).then((result) => {
						console.log(result);
						let code = result.data.code;
						if (code == 200) {
							//刷新数据
							this.getShipsBySearch();
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
			//修改
			//点击修改按钮之后，显示弹出框
			openEditWin: function(row) {
				this.editWinOpenStatus = !this.editWinOpenStatus;
				//做数据的回显
				//this.editShipFormData = row;
				//不想要原对象obj发生改变，让传入的第一个参数为空时，则元对象数据不会发生改变
				this.editShipFormData = Object.assign({}, row);
			},
			/* 船员信息 */
			openUsersWin: function(id) {
				this.axios({
					url: "/app/ship/getShipUserList.do",
					method: "GET",
					params: {
						id: id
					}
				}).then((result) => {
					this.userList = result.data.data
				})
				this.userWinOpenStatus = !this.userWinOpenStatus;
			},
			//弹出框里面关闭的功能
			editWinClose: function() {
				this.$refs['editWinRef'].resetFields();
			},
			userWinClose: function() {

			},
			//弹出框里面取消的功能
			editUserCancel: function() {
				this.$refs['editWinRef'].resetFields();
			},
			//弹出框里面确定的功能
			editUserOk: function() {
				this.$refs['editWinRef'].validate((valid) => {
					//数据格式都正确
					if (valid) {
						this.axios({
							url: "/app/ship/editShip.do",
							method: "POST",
							params: this.editShipFormData
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								this.editWinOpenStatus = false;
								//刷新数据
								this.getShipsBySearch();
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
			}
		}
	}
</script>

<style scoped>
</style>