<template>
	<div>
		<el-form>
			<el-form-item>
				<!--
		            auto-upload="false"不在选取文件之后，立即自动进行上传
		            show-file-list="false"不显示上传的图片列表
		            on-change="onChange控制每个功能对应自己的上传文件，同时文件上传为手动上传（使用该方法控制文件上传的大小以及格式）
		            on-success="onSuccess"使用按钮提交文件，成功后要执行对应的onSuccess方法（使用该方法接收后端的返回）
					
					:before-upload="beforeUpload"
		        -->
				<el-upload id="headImg" name="headImg" action="/ship/upload/uploadFile.do"
					accept=".jpg,.JPG,.JPEG,.png,.PNG,.gif,.GIF" :auto-upload="false" :show-file-list="false"
					:on-change="onChange" :on-success="onSuccess" ref="uploadImgRef">
					<!--指定文件上传的区域-->
					<div style="width: 200px;height: 200px" class="el-upload-dragger">
						<!--图片的预览-->
						<img v-if="imgUrl" :src="imgUrl" style="width: 200px;height: 200px">
						<!--最先展示的内容-->
						<div v-else>
							<!--云-->
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖拽到此处或<em>点击文件上传</em></div>
							<div class="el-upload__tip">文件大小不能超过1M</div>
						</div>
					</div>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-upload" @click="uploadHeadImg">上传图像</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "",
		data() {
			return {
				imgUrl: undefined
			}
		},
		watch: {
			$route() {
				this.imgUrl = undefined;
			}
		},
		methods: {
			onChange: function(file) {
				/*1024byte * 1024byte = 1M*/
				/*file.size是计算文件的大小*/
				let flag = file.size / 1024 / 1024 > 1;
				if (flag) {
					this.$alert("文件上传大小最大为1M");
					return false;
				}
				//URL.createObjectURL可以获取当前文件的url地址
				//raw这是一种格式，该格式是未经过处理，也未经过压缩的格式
				this.imgUrl = URL.createObjectURL(file.raw);
			},
			onSuccess: function(result) {
				let code = result.code;
				if (code == 200) {
					//显示通知
					this.$notify({
						title: "温馨提示",
						message: "上传成功",
						type: "success"
					})
					//刷新头像
					this.imgUrl = result.data;
					var user = window.localStorage.getItem("user");
					let userObj = JSON.parse(user);
					userObj.imgUrl = this.imgUrl;
					window.localStorage.setItem("user", JSON.stringify(userObj));
					//头像的下载
					parent.document.getElementById("headImg").src =
						"/ship/download/downloadImg.do?imgUrl=" + this.imgUrl;

				} else {
					this.$notify({
						title: "温馨提示",
						message: result.msg + ",上传失败",
						type: "danger"
					})
				}
			},
			uploadHeadImg: function() {
				this.$refs['uploadImgRef'].submit();
			}
		}
	}
</script>

<style scoped>
</style>