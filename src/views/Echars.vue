<template>
	<div>
		<div ref="echartsContainer" style="width: 600px; height: 400px;" class="container"></div>

		<div class="container" style="width: 600px; height: 400px;" id="box2">
			<div id="echartsContainer2">
				<el-select v-model="shipId" placeholder="请选择船舶" @input="getShipTemperature(shipId)">
					<el-option v-for="(item) in shipArray" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</div>
			<div ref="echartsContainer2" style="width: 600px; height: 400px;"></div>
		</div>

		<div class="container" style="width: 600px; height: 400px;" id="box3">
			<div id="echartsContainer3">
				<el-select v-model="shipId" placeholder="请选择船舶" @input="getShipHumidity(shipId)">
					<el-option v-for="(item) in shipArray" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</div>
			<div ref="echartsContainer3" style="width: 600px; height: 400px;"></div>
		</div>

		<!--部门-->
		<div class="container" style="width: 600px; height: 400px;" id="box4">
			<div id="echartsContainer4">
				<el-select v-model="shipId" placeholder="请选择船舶" @input="getDeptCount(shipId)">
					<el-option v-for="(item) in shipArray" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</div>
			<div ref="echartsContainer4" style="width: 600px; height: 400px;"></div>
		</div>
	</div>


</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: "Echars",
		data() {
			return {
				shipWithUserCount: {
					names: [],
					counts: []
				},
				temperatures: [], //温度
				humiditys: [], //湿度
				times: [], //温度时间
				humidityTimes: [], //湿度时间
				shipId: 1, //船舶id
				shipArray: [], //所有船舶
				deptCount: [], //部门数量
				deptName: [] //部门名称
			}
		},
		created() {
			this.axios({
				url: "/ship/echars/getShipWithUserCount.do",
				method: "GET",
				params: {}
			}).then((result) => {
				this.shipWithUserCount = result.data.data;
				console.log(this.shipWithUserCount)

				var myChart = echarts.init(this.$refs.echartsContainer);
				myChart.setOption({
					title: {
						text: '船员数量'
					},
					tooltip: {},
					xAxis: {
						data: this.shipWithUserCount.names
					},
					yAxis: {},
					series: [{
						name: '人数',
						type: 'bar',
						data: this.shipWithUserCount.counts
					}]
				});
			})

			/* 获取所有船只信息 */
			this.axios({
				url: "/ship/ships/getAllShip.do",
				method: "GET",
				params: {}
			}).then((result) => {
				this.shipArray = result.data.data
			})

			/* 初始数据 */
			this.getShipTemperature(this.shipId);
			this.getShipHumidity(this.shipId);
			this.getDeptCount(this.shipId)

		},
		methods: {
			/* 获取温度变化 */
			getShipTemperature(shipId) {
				console.log("执行")
				/* 温度变化 */
				this.axios({
					url: "/ship/echars/getShipTemperatureById.do",
					method: "GET",
					params: {
						shipId: this.shipId
					}
				}).then((result) => {
					this.times = [];
					this.temperatures = [];
					/* 数据绑定 */
					let temperatureAndTimesArray = result.data.data;
					for (var i = 0; i < temperatureAndTimesArray.length; i++) {
						this.temperatures.push(temperatureAndTimesArray[i].temperature)
						this.times.push(temperatureAndTimesArray[i].time)
					}
					var myChart = echarts.init(this.$refs.echartsContainer2);
					myChart.setOption({
						title: {
							text: '温度变化'
						},
						xAxis: {
							type: 'category',
							data: this.times
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: this.temperatures,
							type: 'line',
							smooth: true
						}]
					});
				})
			},
			/* 获取湿度变化 */
			getShipHumidity(shipId) {
				console.log("执行")
				/* 温度变化 */
				this.axios({
					url: "/ship/echars/getShipHumidityById.do",
					method: "GET",
					params: {
						shipId: this.shipId
					}
				}).then((result) => {
					this.humidityTimes = [];
					this.humiditys = [];
					/* 数据绑定 */
					let humidityAndTimesArray = result.data.data;
					for (var i = 0; i < humidityAndTimesArray.length; i++) {
						this.humiditys.push(humidityAndTimesArray[i].humidity)
						this.humidityTimes.push(humidityAndTimesArray[i].time)
					}
					var myChart = echarts.init(this.$refs.echartsContainer3);
					myChart.setOption({
						title: {
							text: '湿度变化'
						},
						xAxis: {
							type: 'category',
							data: this.humidityTimes
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: this.humiditys,
							type: 'line',
							smooth: true
						}]
					});
				})
			},
			/* 获取部门数量 */
			getDeptCount(shipId) {
				console.log("获得部门执行")
				/* 获得数量 */
				this.axios({
					url: "/ship/echars/getCountsWithDepts.do",
					method: "GET",
					params: {
						shipId: this.shipId
					}
				}).then((result) => {
					this.deptName = [];
					this.deptCount = [];
					/* 数据绑定 */
					let deptArray = result.data.data;
					//数据用于实现线图
					Object.keys(deptArray).forEach(key => {
						this.deptName.push(key)
						this.deptCount.push(deptArray[key])
					});
					console.log(this.deptName);
					console.log(this.deptCount);

					// 创建一个新数组，用于ECharts的数据绑定，用于实现饼图
					let chartData = [];

					// 遍历deptArray对象，将键和值转换为ECharts需要的格式
					Object.keys(deptArray).forEach(key => {
						chartData.push({
							name: key,
							value: deptArray[key]
						});
					});

					var myChart = echarts.init(this.$refs.echartsContainer4);
					myChart.setOption({
						//线图的代码
						/*
						title: {
						  text: '部门人数'
						},
						xAxis: {
						  type: 'category',
						  data: this.deptName
						},
						yAxis: {
						  type: 'value'
						},
						series: [{
						  data: this.deptCount,
						  type: 'line',
						  smooth: true
						}]*/
						title: {
							text: '部门人数'
						},
						//饼图的代码
						tooltip: {
							trigger: 'item'
						},
						legend: {
							top: '5%',
							left: 'right'
						},
						series: [{
							name: this.shipArray[shipId - 1].name,
							type: 'pie',
							radius: ['40%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: true,
									fontSize: 40,
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: chartData
						}]
					});
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		float: left;
	}

	#box2 {
		position: relative;
		left: 0px;
		top: 0px;
	}

	#box3 {
		position: relative;
		left: 0px;
		top: 0px;
	}

	#box4 {
		position: relative;
		left: 0px;
		top: 0px;
	}

	#echartsContainer2 {
		position: absolute;
		left: 100px;
		top: -5px;
		/* 元素置顶 */
		z-index: 99999;
	}

	#echartsContainer3 {
		position: absolute;
		left: 100px;
		top: -5px;
		/* 元素置顶 */
		z-index: 99999;
	}

	#echartsContainer4 {
		position: absolute;
		left: 100px;
		top: -5px;
		/* 元素置顶 */
		z-index: 99999;
	}
</style>