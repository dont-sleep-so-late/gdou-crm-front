var user = window.localStorage.getItem("user");
let userObj = JSON.parse(user);
//超级管理员
var role = userObj.role == 1;

new Vue({
    el:"#app",
    data:{
        //账号列表数据
        accountDataArray:[],
        //页码
        pageNum:1,
        //每页显示的条数
        pageSize:10,
        //总条数
        total:0,
        //选择每页显示的数据条数
        pageSizes:[1,2,5,10],
        //账号的使用状态
        status:true,
        //点击账号列表，默认弹出框为关闭状态
        addAccountWinOpenStatus:false,
        //数据校验
        addAccountFormRules:{
            username:[
                {required:true,message:"账号必须填写!",trigger:"blur"},
                {min:4,max:20,message:"长度为4-20位字符!",trigger:"blur"}
            ]
        },
        addAccountFormData:{
            username:undefined
        },
        //判断是否是超级管理员
        isRoot:role
    },
    created:function(){
        this.getAccountsByPage();
    },
    methods:{
        getAccountsByPage:function(){
            axios({
                url:"/account/getAccountsByPage.do",
                method:"POST",
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then((result)=>{
                this.accountDataArray = result.data.data;
                this.total = result.data.total;
            })
        },
        //修改的时间进行格式化
        updateTimeFmt:function(row){
            return row.updateTime == null || row.updateTime == ""?"暂无时间":row.updateTime;
        },
        //状态格式化
        statusFmt:function(row){
            return row.status == 1?"启用":"禁用";
        },
        //页码改变（点击页码之后，newPageNum就会产生新的值）
        currentChange:function(newPageNum){
            this.pageNum = newPageNum;
            this.getAccountsByPage();
        },
        //页码对应的数据的改变
        sizeChange:function(newPageSize){
            this.pageSize = newPageSize;
            this.getAccountsByPage();
        },
        //启用和禁用
        switchChange:function(row){
            axios({
                url:"/account/editAccountsStatus.do",
                method:"POST",
                params:{
                    status:row.status,
                    id:row.id
                }
            }).then((result)=>{
                let code = result.data.code;
                if(code == 200){
                    this.$notify({
                        title:"温馨提示",
                        message:"修改成功",
                        type:"success"
                    })
                } else {
                    let msg = result.data.msg;
                    this.$notify({
                        title:"温馨提示",
                        message:msg + ",修改失败",
                        type:"danger"
                    })
                }
                //数据刷新
                this.getAccountsByPage();
            })
        },
        //点击添加按钮之后，打开弹出框
        openAddAccountWin:function(){
            this.addAccountWinOpenStatus = !this.addAccountWinOpenStatus;
        },
        //弹出框里面的关闭功能
        addAccountWinClose:function(){
            this.$refs['addAccountWinRef'].resetFields();
        },
        //弹出框里面的取消功能
        resetAddAccountWin:function(){
            this.$refs['addAccountWinRef'].resetFields();
        },
        //弹出框里面的确定功能
        addAccountOk:function(){
            this.$refs['addAccountWinRef'].validate((valid)=>{
                //数据格式正确
                if(valid){
                    axios({
                        url:"/account/addAccount.do",
                        method:"POST",
                        params:this.addAccountFormData
                    }).then((result)=>{
                        let code = result.data.code;
                        if(code == 200){
                            //关闭弹出框
                            this.addAccountWinOpenStatus = false;
                            //数据刷新
                            this.getAccountsByPage();
                            this.$notify({
                                title:"温馨提示",
                                message:"添加成功",
                                type:"success"
                            })
                        } else {
                            let msg = result.data.msg;
                            this.$notify({
                                title:"温馨提示",
                                message:msg + ",添加失败",
                                type:"danger"
                            })
                        }
                    })
                }
            })
        },
        //删除
        delOneAccount:function(row){
            //获取被删除数据的id
            let id = row.id;
            this.$confirm("你确定要删除本条记录吗?","温馨提示").then(()=>{
                axios({
                    url:"/account/cutOneAccount.do",
                    method:"POST",
                    params:{
                        id:id
                    }
                }).then((result)=>{
                    let code = result.data.code;
                    if(code == 200){
                        //数据刷新
                        this.getAccountsByPage();
                        this.$notify({
                            title:"温馨提示",
                            message:"成功的删除了一个账号",
                            type:"success"
                        })
                    } else {
                        let msg = result.data.msg;
                        this.$notify({
                            title:"温馨提示",
                            message:msg + ",删除账号失败",
                            type:"danger"
                        })
                    }
                })
            })
        },
        //重置密码
        resetAccountPwd:function(row){
            this.$confirm("你确定要重置当前这条记录吗?","温馨提示").then(()=>{
                axios({
                    url:"/account/editResetAccountPwd.do",
                    method:"POST",
                    params:{
                        id:row.id
                    }
                }).then((result)=>{
                    let code = result.data.code;
                    if(code == 200){
                        this.$notify({
                            title:"温馨提示",
                            message:"重置密码成功",
                            type:"success"
                        })
                        //如果重置的是超级管理员自己的密码，则需要退出进行重新登录
                        if(row.role == 1){
                            window.localStorage.removeItem("user");
                            location.href = "/forward/toLogin.do";
                        }
                    } else {
                        let msg = result.data.msg;
                        this.$notify({
                            title:"温馨提示",
                            message:msg + ",重置密码失败",
                            type:"danger"
                        })
                    }
                })
            })
        }
    }
})