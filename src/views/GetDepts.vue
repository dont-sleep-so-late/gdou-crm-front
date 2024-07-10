<template>
	<div id="app">
	    <!--顶部工具栏：添加  只有超级管理员可以查看-->
	    <el-row>
	        <el-col :span="4">
	            <el-button type="success" icon="el-icon-plus" round size="small"
	                       @click="openAddDeptWin">添加</el-button>
	        </el-col>
	    </el-row>
	    <!--工具栏与数据表格之间间隙-->
	    <div style="margin: 10px"></div>
	    <!--数据表格-->
	    <el-table :data="deptDataArray" border>
	        <el-table-column label="序号" width="200" align="center" type="index"></el-table-column>
	        <el-table-column label="主键" width="200" align="center" prop="id"></el-table-column>
	        <el-table-column label="部门名称" width="200" align="center" prop="name"></el-table-column>
	        <el-table-column label="部门地址" width="500" align="left" prop="loc"></el-table-column>
	    </el-table>
	    <!--分页-->
	    <el-pagination
	            @current-change="currentChange"
	            @size-change="sizeChange"
	            :current-page="pageNum"
	            :total="total"
	            :page-size="pageSize"
	            :page-sizes="pageSizes"
	            background
	            layout="total,sizes,prev,pager,next,jumper"></el-pagination>
	    <!--添加部门窗口-->
	    <el-dialog title="添加部门" :visible.sync="addDeptWinOpenStatus"  @close="addDeptWinClose">
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
	                <el-button type="danger" icon="el-icon-close" @click="resetAddDeptWin">取消</el-button>
	            </el-form-item>
	        </el-form>
	    </el-dialog>
	</div>
</template>

<script>
	export default{
		name:"GetDepts",
		data(){
			return{
				//部门列表数据
				deptDataArray:[],
				//页码
				pageNum:1,
				//每页显示数据的条数
				pageSize:10,
				//选择每页显示的数据条数
				pageSizes:[1,2,5,10,20],
				//总条数
				total:0,
				//点击部门管理，默认没有弹出框
				addDeptWinOpenStatus:false,
				//点击添加按钮之后，在弹出框里面做输入校验
				//输入校验需要做两次：前端一次，后端一次
				addDeptFormRules:{
				    name:[
				        //定义必填
				        //trigger表示触发器  blur失焦
				        {required:true,message:"部门名称必须填写!",trigger:"blur"},
				        //定义所填写的范围
				        {min:1,max:20,message:"长度为1-20位之间!",trigger:"blur"}
				    ],
				    loc:[
				        {required:true,message:"部门地址必须填写!",trigger:"blur"},
				        {min:6,max:30,message:"长度为6-30位之间!",trigger:"blur"}
				    ]
				},
				addDeptFormData:{
				    name:undefined,
				    loc:undefined
				}
			}
		},
		//生命周期函数
		created:function(){
		    this.getDeptsByPage();
		},
		watch:{
			$route(){
				this.pageNum=1;
				this.pageSize=10;
				this.getDeptsByPage();
			}
		},
		methods:{
		    getDeptsByPage:function(){
		        axios({
		            url:"/app/dept/getDeptsByPage.do",
		            method:"POST",
		            params:{
		                pageNum:this.pageNum,
		                pageSize:this.pageSize
		            }
		        }).then((result)=>{
		            this.deptDataArray = result.data.data;
		            this.total = result.data.total;
		        })
		    },
		    //页码改变
		    currentChange:function(newPageNum){
		        this.pageNum = newPageNum;
		        this.getDeptsByPage();
		    },
		    //页码对应的数据的改变
		    sizeChange:function(newPageSize){
		        this.pageSize = newPageSize;
		        this.getDeptsByPage();
		    },
		    //点击添加按钮之后弹出框里面的关闭功能
		    addDeptWinClose:function(){
		        this.$refs['addDeptWinRef'].resetFields();
		    },
		    //点击添加按钮之后弹出框里面的取消功能
		    resetAddDeptWin:function(){
		        this.$refs['addDeptWinRef'].resetFields();
		    },
		    //点击添加按钮，出现弹出框
		    openAddDeptWin:function(){
		        this.addDeptWinOpenStatus = !this.addDeptWinOpenStatus;
		    },
		    //点击添加按钮之后弹出框里面的确定功能
		    //方法的多种方式: ()=>{}、function aaa(){}、aaa:function(){}、aaa(){}
		    addDeptOk:function(){
		        //点击确定按钮之前，要先确保输入的数据格式都是正确的（要进行数据校验）
		        //valid表示数据校验的结果
		        this.$refs['addDeptWinRef'].validate((valid)=>{
		            //数据格式都正确
		            if(valid){
		                axios({
		                    url:"/app/dept/addDepts.do",
		                    method:"POST",
		                    /*params:{
		                        name:this.addDeptFormData.name,
		                        loc:this.addDeptFormData.loc
		                    }*/
		                    params:this.addDeptFormData
		                }).then((result)=>{
		                    let code = result.data.code;
		                    if(code == 200){
		                        //关闭弹出框
		                        this.addDeptWinOpenStatus = false;
		                        //刷新列表数据
		                        this.getDeptsByPage();
		                        //显示成功通知
		                        this.$notify({
		                            title:"温馨提示",
		                            message:"添加成功!",
		                            type:"success"
		                        });
		                    } else {
		                        //添加失败的通知
		                        this.$notify({
		                            title:"温馨提示",
		                            message:result.data.msg + ",添加失败!",
		                            type:"danger"
		                        });
		                    }
		                });
		            }
		        });
		    }
		}
	}
</script>

<style scoped>
</style>