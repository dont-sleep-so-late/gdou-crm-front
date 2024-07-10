new Vue({
    el:"#app",
    data:{
        option:undefined
    },
    created:function (){
        this.getCharts();
    },
    methods:{
        getCharts:function(){
            axios({
                url:"/workChart/queryTranByChart.do",
                method:"POST",
                params:{}
            }).then((data)=>{
                var tranArr = [];
                for(var i = 0;i < data.length;i++){
                    tranArr.push(data.item.name);
                }
                var myChart = echarts.init(document.getElementById("main"));
                //准备数据 和 配置项
                option = {
                    //标题
                    title:{
                        text:'funnel'
                    },
                    //鼠标放到报表上的某一块图像上，提示该内容
                    tooltip:{
                        /*
                        * trigger有三个值
                        *   axis坐标轴触发，主要用在柱状图，折线图等图表中使用
                        *   item主要用在饼图，漏斗图等图表中使用
                        *   none什么都不触发
                        * */
                        trigger:"item",
                        /*
                        *提示框里面的内容的数据显示的格式，支持字符串模式和回调函数两种形式
                        * 模板变量有{a}，{b}，{c}，分别表示系列名，数据名，数据值
                        * */
                        formatter:"{a} <br/> {b} : {c}"
                    },
                    //echarts的工具箱
                    toolbox:{
                        //feature是toolbox的配置项
                        feature:{
                            //打开数据视图
                            dataView:{
                                readOnly:false
                            },
                            //还原原始图表
                            restore:{},
                            //保存数据视图图片
                            saveAsImage:{}
                        }
                    },
                    //图例，每个图表最多仅有一个图例
                    legend:{
                        data:tranArr
                    },
                    //驱动图表生成的数据内容的数组，数组中每一项为一个系列（series）的选项以及数据
                    series:[
                        {
                            name:"Expected",
                            //漏斗图
                            type:"funnel",
                            left:"10%",
                            width:"80%",
                            //设置需要展示的label的样式
                            label:{
                                formatter:"{b} Expected"
                            },
                            //设置标签指示线的样式
                            labelLine:{
                                show:false
                                /*show:true,
                                lineStyle:{
                                    color:"red"
                                }*/
                            },
                            //透明效果(0-1)
                            itemStyle:{
                                opacity:0.7
                            },
                            //强调样式
                            emphasis:{
                                label:{
                                    //内容居中显示
                                    position:'inside',
                                    formatter:'{b} Expected : {c}'
                                }
                            },
                            //封装数据
                            data:[
                                {name:'01资质审查',value:1},
                                {name:'04确定决策者',value:1},
                                {name:'07成交',value:3},
                                {name:'08丢失的线索',value:3},
                                {name:'09因竞争丢失关闭',value:5}
                            ]
                        }
                    ]
                };
                //渲染视图
                myChart.setOption(option);
            })
        }
    }
})