var user = window.localStorage.getItem("user");
let userObj = JSON.parse(user);
let uName = userObj.username;

new Vue({
    el:"#app",
    data:{
        formData:{
            username:uName,
            pwd:undefined
        },
        //数据校验
        formRules:{
            pwd:[
                {required:true,message:"密码必须填写!",trigger:"blur"},
                {min:6,max:6,message:"密码必须为6位数的纯数字!",trigger:"blur"}
            ]
        }
    },
    methods:{
        //取消
        resetForm:function(){
            this.$refs['formDataRef'].resetFields();
        },
        //确定
        editPwdOk:function(){
            this.$refs['formDataRef'].validate((valid)=>{
                //数据格式正确
                if(valid){
                    axios({
                        url:"/account/editAccountPwd.do",
                        method:"POST",
                        params:this.formData
                    }).then((result)=>{
                        let code = result.data.code;
                        if(code == 200){
                            window.localStorage.removeItem("user");
                            this.$confirm("修改密码成功","温馨提示").then(()=>{
                                window.location.href = "/forward/toLogin.do";
                            }).catch(()=>{
                                window.location.href = "/forward/toLogin.do";
                            })
                        } else {
                            this.$notify({
                                title:"温馨提示",
                                message:result.data.msg + ",修改密码失败",
                                type:"danger"
                            })
                        }
                    })
                }
            })
        }
    }
})