new Vue({
  el: "#app",
  //初始化数据
  data: {
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
      sex: undefined,
      pageNum: undefined,
      pageSize: undefined,
    },
  },
  //生命周期函数  created最先获取到data和methods里面的值的  mounted
  created() {
    //调用方法
    this.getUsersByPage();
    //查询所有部门记录
    this.getAllDepts();
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
        url: "/dept/getDeptsByPage.do",
        method: "POST",
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((result) => {
        this.deptList = result.data.data;
      });
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
      return row.sex == "1" ? "男" : "女";
    },
    //薪资的格式化
    salFmt: function (row) {
      return `￥${row.sal}`;
    },
    //职业的格式化
    professionFmt: function (row) {
      var profession = "";
      switch (row.profession) {
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
    //多条件搜索
    searchUsers: async function () {
      await axios({
        url: "/user/getUsersBySearch.do",
        method: "POST",
        //params里面没有传递pageNum和pageSize
        params: this.searchFormData,
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
            message: msg + ",删除失败!",
            type: "danger",
          });
        }
      });
    },
  },
});
