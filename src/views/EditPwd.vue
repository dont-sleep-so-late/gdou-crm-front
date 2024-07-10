<template>
	<el-form :rules="formRules" :model="formData" ref="formDataRef">
		<el-form-item label="账号" label-width="60px">
			<el-input :disabled="true" prefix-icon="el-icon-user" v-model="formData.username"></el-input>
		</el-form-item>
		<el-form-item prop="pwd" label="密码" label-width="60px">
			<el-input placeholder="新密码为6位纯数字" prefix-icon="el-icon-more" v-model="formData.pwd"></el-input>
		</el-form-item>
		<el-form-item label="" label-width="60px">
			<el-button type="primary" icon="el-icon-check" @click="editPwdOk">确定</el-button>
			<el-button type="danger" icon="el-icon-close" @click="resetForm">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "EditPwd",
		data() {
			return {
				formData: {
					username: undefined,
					pwd: undefined
				},
				//数据校验
				formRules: {
					pwd: [{
							required: true,
							message: "密码必须填写!",
							trigger: "blur"
						},
						{
							min: 6,
							max: 6,
							message: "密码必须为6位数的数字或字母!",
							trigger: "blur"
						}
					]
				}
			}
		},
		created(){
			let userJson = window.localStorage.getItem("user");
			let user = JSON.parse(userJson);
			console.log(user.username)
			this.formData.username=user.username;
		},
		methods: {
			//取消
			resetForm: function() {
				this.$refs['formDataRef'].resetFields();
			},
			//确定
			editPwdOk: function() {
				this.$refs['formDataRef'].validate((valid) => {
					//数据格式正确
					if (valid) {
						axios({
							url: "/app/account/editAccountPwd.do",
							method: "POST",
							params: {
								newPwd:this.formData.pwd
							}
						}).then((result) => {
							let code = result.data.code;
							if (code == 200) {
								window.localStorage.removeItem("user");
								this.$confirm("修改密码成功", "温馨提示").then(() => {
									window.location.href = "/index.html";
								}).catch(() => {
									window.location.href = "/index.html";
								})
							} else {
								this.$notify({
									title: "温馨提示",
									message: result.data.msg,
									type: "danger"
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
</style>