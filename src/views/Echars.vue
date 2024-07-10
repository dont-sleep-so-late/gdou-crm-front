<template>
	<div>
		<div ref="echartsContainer" style="width: 600px; height: 400px;" class="container"></div>

		<div class="container" style="width: 600px; height: 400px;" id="box2">
			<div  id="echartsContainer2">
				<el-select v-model="shipId" placeholder="请选择船舶" @input="getShipTemperature(shipId)">
					<el-option v-for="(item) in shipArray" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</div>
			<div ref="echartsContainer2" style="width: 600px; height: 400px;"></div>
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
				times: [], //时间
				shipId: 1, //船舶id
				shipArray: [] //所有船舶
			}
		},
		created() {
			this.axios({
				url: "/app/echars/getShipWithUserCount.do",
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
				url: "/app/ship/getAllShip.do",
				method: "GET",
				params: {}
			}).then((result) => {
				this.shipArray = result.data.data
			})

			/* 初始数据 */
			this.getShipTemperature(this.shipId);

		},
		methods: {
			/* 获取温度变化 */
			getShipTemperature(shipId) {
				console.log("执行")
				/* 温度变化 */
				this.axios({
					url: "/app/echars/getShipTemperatureById.do",
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
			}
		}
	}
</script>

<style scoped>
	.container {
		float: left;
	}
	
	#box2{
		position: relative;
		left: 0px;
		top: 0px;
	}
	#echartsContainer2{
		position: absolute;
		left: 100px;
		top: -5px;
		/* 元素置顶 */
		z-index: 99999;
	}
</style>