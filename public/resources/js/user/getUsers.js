new Vue({
    el:"#app",
    //初始化数据
    data:{
        //客户信息列表
        userList:[],
        //部门信息列表
        deptList:[],
        //页码
        pageNum:1,
        //每一页显示的数据
        pageSize:10,
        //总条数
        total:0,
        //选择每页要显示的数据条数
        pageSizes:[5,10,15,20,30,50],
        //点击客户管理之后，默认弹出框是关闭的
        addWinOpenStatus:false,
        //初始化添加客户信息模块的数据
        addUserFormData:{
            username:undefined,
            birthday:undefined,
            sex:undefined,
            tel:undefined,
            profession:undefined,
            sal:undefined,
            address:undefined,
            remark:undefined,
            deptId:undefined
        },
        //表单数据的校验
        formRules:{
            username:[
                {required:true,message:"客户姓名必须填写!",trigger:"blur"},
                {min:2,max:10,message:"客户姓名为2-10位的简体中文!",trigger:"blur"}
            ],
            birthday:[
                {required:true,message:"生日必须填写!",trigger:"blur"}
            ],
            sex:[
                {required:true,message:"性别必须填写!",trigger:"change"}
            ],
            tel:[
                {required:true,message:"手机号必须填写!",trigger:"blur"},
                {min:11,max:11,message:"手机号格式错误!",trigger:"blur"}
            ],
            profession:[
                {required:true,message:"职业必须填写!",trigger:"change"}
            ],
            sal:[
                {required:true,message:"薪资必须填写!",trigger:"blur"}
            ],
            address:[
                {required:true,message:"地址必须填写!",trigger:"blur"},
                {min:6,max:20,message:"地址长度为6-20位字符!",trigger:"blur"}
            ],
            deptId:[
                {required:true,message:"部门必须填写!",trigger:"change"}
            ]
        },
        //存放批量删除所需要的id数组
        delIdArray:[],
        //点击客户管理，修改的弹出框默认是关闭的
        editWinOpenStatus:false,
        //点击修改之后，弹出框的数据使用对象来封装
        editUserFormData:{
            id:undefined,
            username:undefined,
            birthday:undefined,
            sex:undefined,
            tel:undefined,
            profession:undefined,
            sal:undefined,
            address:undefined,
            remark:undefined,
            deptId:undefined
        }
    },
    //生命周期函数  created最先获取到data和methods里面的值的  mounted
    created(){
        //调用方法
        this.getUsersByPage();
        //查询所有部门记录
        this.getAllDepts();
    },
    methods:{
        //方法调用方法
        getUsersByPage:function(){
            axios({
                url:"/user/getUsersByPage.do",
                method:"POST",
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then((result)=>{
                this.userList = result.data.data;
                this.total = result.data.total;
            })
        },
        //查询部门记录
        //在客户管理功能里面调用部门管理的接口
        getAllDepts:function(){
            axios({
                url:"/dept/getDeptsByPage.do",
                method:"POST",
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then((result)=>{
                this.deptList = result.data.data;
            })
        },
        //页码改变（点击页码之后，newPageNum就会产生新的值）
        currentChange:function(newPageNum){
            this.pageNum = newPageNum;
            this.getUsersByPage();
        },
        //页码对应的数据的改变
        sizeChange:function(newPageSize){
            this.pageSize = newPageSize;
            this.getUsersByPage();
        },
        //性别的格式化
        sexFmt:function(row){
            return row.sex == '1'?'男':'女'
        },
        //薪资的格式化
        salFmt:function(row){
            return `￥${row.sal}`
        },
        //职业的格式化
        professionFmt:function(row){
            var profession = "";
            switch(row.profession){
                case "1":
                    profession = "攻城狮";
                    break;
                case "2":
                    profession = "程序猿";
                    break;
                case "3":
                    profession = "码龙";
                    break;
            }
            return profession;
        },
        //全选
        selectAll:function(params){
            this.delIdArray = [];
            //item表示选中的那一条数据
            params.filter((item)=>{
                this.delIdArray.push(item.id);
            });
        },
        //单选
        selectOne:function(params){
            this.delIdArray = [];
            //item表示选中的那一条数据
            params.filter((item)=>{
                this.delIdArray.push(item.id);
            });
        },
        //点击添加按钮之后，显示弹出框
        openAddWin:function(){
            this.addWinOpenStatus = !this.addWinOpenStatus;
        },
        //点击添加之后弹出框里面的关闭功能
        addWinClose:function(){
            this.$refs['addWinRef'].resetFields();
        },
        //点击添加之后弹出框里面的取消功能
        addUserCancel:function(){
            this.$refs['addWinRef'].resetFields();
        },
        //点击添加之后弹出框里面的确定功能
        addUserOk:function(){
            //点击确定按钮之前，要先做数据的输入校验
            this.$refs['addWinRef'].validate((valid)=>{
                //表单的数据格式都是正确的
                if(valid){
                    axios({
                        url:"/user/addUsers.do",
                        method:"POST",
                        params:this.addUserFormData
                    }).then((result)=>{
                        let code = result.data.code;
                        if(code == 200){
                            //关闭弹出框
                            this.addWinOpenStatus = false;
                            //刷新数据
                            this.getUsersByPage();
                            //添加成功使用通知来显示
                            this.$notify({
                                title:"温馨提示",
                                message:"成功的添加了一条记录!",
                                type:"success"
                            })
                        } else {
                            let msg = result.data.msg;
                            this.$notify({
                                title:"温馨提示",
                                message:msg + ",添加失败!",
                                type:"danger"
                            })
                        }
                    });
                }
            });
        },
        //批量删除
        delMany:function(){
            //判断用户是否勾选了要删除的那些记录
            let len = this.delIdArray.length;
            if(len == 0){
                this.$alert("请至少选中一条记录!","温馨提示");
            } else {
                //勾选了记录之后，提示用户是否要确认删除,在then（）方法里面完成删除功能
                this.$confirm("你确定要删除这些记录吗?","温馨提示").then(()=>{
                    axios({
                        url:"/user/cutManyUser.do",
                        method:"POST",
                        params:{
                            id:this.delIdArray.join(",")
                        }
                    }).then((result)=>{
                        let code = result.data.code;
                        if(code == 200){
                            //刷新数据
                            this.getUsersByPage();
                            //添加成功使用通知来显示
                            this.$notify({
                                title:"温馨提示",
                                message:"成功的删除了一批记录!",
                                type:"success"
                            })
                        } else {
                            let msg = result.data.msg;
                            this.$notify({
                                title:"温馨提示",
                                message:msg + ",删除失败!",
                                type:"danger"
                            })
                        }
                    })
                })
            }
        },
        //单个删除
        delOne:function(row){
            let id = row.id;
            this.$confirm("你确定要删除本条记录吗?","温馨提示").then(()=>{
                axios({
                    url:"/user/cutOneUser.do",
                    method:"POST",
                    params:{
                        id:id
                    }
                }).then((result)=>{
                    console.log(result);
                    let code = result.data.code;
                    if(code == 200){
                        //刷新数据
                        this.getUsersByPage();
                        //添加成功使用通知来显示
                        this.$notify({
                            title:"温馨提示",
                            message:"成功的删除了一条记录!",
                            type:"success"
                        })
                    } else {
                        let msg = result.data.msg;
                        this.$notify({
                            title:"温馨提示",
                            message:msg + ",删除失败!",
                            type:"danger"
                        })
                    }
                })
            })
        },
        //修改
        //点击修改按钮之后，显示弹出框
        openEditWin:function(row){
            this.editWinOpenStatus = !this.editWinOpenStatus;
            //做数据的回显
            //this.editUserFormData = row;
            //不想要原对象obj发生改变，让传入的第一个参数为空时，则元对象数据不会发生改变
            this.editUserFormData = Object.assign({},row);
        },
        //弹出框里面关闭的功能
        editWinClose:function(){
            this.$refs['editWinRef'].resetFields();
        },
        //弹出框里面取消的功能
        editUserCancel:function(){
            this.$refs['editWinRef'].resetFields();
        },
        //弹出框里面确定的功能
        editUserOk:function(){
            this.$refs['editWinRef'].validate((valid)=>{
                //数据格式都正确
                if(valid){
                    axios({
                        url:"/user/editUser.do",
                        method:"POST",
                        params:this.editUserFormData
                    }).then((result)=>{
                        let code = result.data.code;
                        if(code == 200){
                            this.editWinOpenStatus = false;
                                //刷新数据
                            this.getUsersByPage();
                            //添加成功使用通知来显示
                            this.$notify({
                                title:"温馨提示",
                                message:"成功的修改了一条记录!",
                                type:"success"
                            })
                        } else {
                            let msg = result.data.msg;
                            this.$notify({
                                title:"温馨提示",
                                message:msg + ",修改失败!",
                                type:"danger"
                            })
                        }
                    })
                }
            });
        }
    }
})