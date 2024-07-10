new Vue({
    el:"#app",
    data:{
        imgUrl:undefined
    },
    methods:{
        onChange:function(file){
            /*1024byte * 1024byte = 1M*/
            /*file.size是计算文件的大小*/
            let flag = file.size/1024/1024 > 1;
            if(flag){
                this.$alert("文件上传大小最大为1M");
                return false;
            }
            //URL.createObjectURL可以获取当前文件的url地址
            //raw这是一种格式，该格式是未经过处理，也未经过压缩的格式
            this.imgUrl = URL.createObjectURL(file.raw);
        },
        onSuccess:function(result){
            let code = result.code;
            if(code == 200){
                //显示通知
                this.$notify({
                    title:"温馨提示",
                    message:"上传成功",
                    type:"success"
                })
                //刷新头像
                this.imgUrl = result.data;
                var user = window.localStorage.getItem("user");
                let userObj = JSON.parse(user);
                userObj.imgUrl = this.imgUrl;
                window.localStorage.setItem("user",JSON.stringify(userObj));
                //头像的下载
                parent.document.getElementById("headImg").src =
                    "/download/downloadImg.do?imgUrl=" + this.imgUrl;

            } else {
                this.$notify({
                    title:"温馨提示",
                    message:result.msg + ",上传失败",
                    type:"danger"
                })
            }
        },
        uploadHeadImg:function(){
            this.$refs['uploadImgRef'].submit();
        }
    }
})