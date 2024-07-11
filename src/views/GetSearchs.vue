<template>
	<div id="app">
		<!--顶部菜单：添加、批量删除、搜索-->
		<el-row type="flex" justify="space-between">
			<el-col :span="24">
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
							<el-option label="取消" value=""></el-option>
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
		<el-table :data="userList" border>
			<!--type属性表示该值不是来至于数据库表的字段-->
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
		</el-table>
		<!--分页-->
		<el-pagination :total="total" :current-page="pageNum" :page-size="pageSize" :page-sizes="pageSizes"
			@current-change="currentChange" @size-change="sizeChange" background
			layout="total,sizes,prev,pager,next,jumper">
		</el-pagination>
	</div>

</template>
<script>
export default {
	name: "GetSearchs",
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
			this.searchFormData.username = undefined;
			this.searchFormData.tel = undefined;
			this.searchFormData.deptName = undefined;
			this.searchFormData.sex = undefined;
			this.getUsersByPage();
		}
	},
	methods: {
		//方法调用方法
		getUsersByPage: function () {
			this.searchUsers();
		},
		//查询部门记录
		//在客户管理功能里面调用部门管理的接口
		getAllDepts: async function () {
			await axios({
				url: "/ship/dept/getAllDepts.do",
				method: "POST",
				params: {
					// pageNum: this.pageNum,
					// pageSize: this.pageSize
				}
			}).then((result) => {
				this.deptList = result.data.data;
			})
		},
		//页码改变（点击页码之后，newPageNum就会产生新的值）
		currentChange: function (newPageNum) {
			this.searchFormData.pageNum = newPageNum;
			this.getUsersByPage();
		},
		//页码对应的数据的改变
		sizeChange: function (newPageSize) {
			this.searchFormData.pageSize = newPageSize;
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
		//多条件搜索
		searchUsers: function () {
			axios({
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