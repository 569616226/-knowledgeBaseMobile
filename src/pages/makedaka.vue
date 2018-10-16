<template>
	<div v-title data-title="约见大咖" v-loading="loading">
		<div class="make-daka">
			<div class="make-daka-t">
				<p class="make-daka-t-yuan"><span>{{LinkaTopicDetailData.price}}</span>元/次</p>
				<p class="make-daka-t-title">{{LinkaTopicDetailData.title}}</p>
				<p class="make-daka-t-name"><span style="color:#101010;">{{LinkaTopicDetailData.guest_name}}</span><span><font color="#d6d6d6">丨</font> {{LinkaTopicDetailData.guest_office}}</span></p>
				<p class="make-daka-t-time">
					<span style="margin-right: .15rem;" v-if="LinkaTopicDetailData.ser_type == '全国通话'"><clock class="make-daka-t-time-clock" fillColor="#9A9DB5"/>{{LinkaTopicDetailData.ser_time}}分钟/次</span>
					<span style="margin-right: .15rem;" v-else><clock class="make-daka-t-time-clock" fillColor="#9A9DB5"/>{{LinkaTopicDetailData.ser_time}}小时/次</span>
					<span><account class="make-daka-t-time-account" fillColor="#9A9DB5"/>{{LinkaTopicDetailData.appoint_appraises}}人评价</span>
					<span><map-marker class="make-daka-t-time-marker" fillColor="#9A9DB5"/>{{LinkaTopicDetailData.guest_city}} · {{LinkaTopicDetailData.guest_location}}</span>
				</p>
				<span class="make-daka-t-call" v-if="LinkaTopicDetailData.ser_type == '全国通话'">{{LinkaTopicDetailData.ser_type}}</span>
				<span class="make-daka-t-yue" v-else>{{LinkaTopicDetailData.ser_type}}</span>
			</div>
			<div class="make-daka-y">
				<p class="make-daka-y-title">预约流程</p>
				<yd-step theme="1" current="1" current-color="#2ba6ff">
					<yd-step-item>
						<span slot="bottom">学员约见</span>
					</yd-step-item>
					<yd-step-item>
						<span slot="bottom">大咖确认</span>
					</yd-step-item>
					<yd-step-item>
						<span slot="bottom">学员付款</span>
					</yd-step-item>
					<yd-step-item>
						<span slot="bottom">服务完成</span>
					</yd-step-item>
					<yd-step-item>
						<span slot="bottom">学员反馈</span>
					</yd-step-item>
				</yd-step>
			</div>
			<div class="make-daka-c" v-html="LinkaTopicDetailData.describe"></div>
			<div style="height: 1.1rem;"></div>
			<div class="wk-ask-wp" ref="wkaskwp">
				<div class="ask-tip-wp">
					<div class="ask-tip">
						<div class="check-box-wp" @click="checkedBox = !checkedBox"><span :class="checkedBox ? 'check-box check-box-checked' : 'check-box'"></span></div>
						<div class="wk-protocol clear"><span>我已经阅读并同意</span><span class="link" @click="protocol">《链答服务协议》</span></div>
					</div>
				</div>
				<span class="go-next-btn next-btn" :style="style" @click="next">下一步</span>
			</div>
		</div>
		<yd-popup v-model="show1" position="center" width="90%" height="80%">
			<agreement></agreement>
			<p style="text-align: center;background-color: rgb(41, 182, 246);">
				<yd-button @click.native="show1 = false" bgcolor="#29b6f6" color="#ffffff">关闭</yd-button>
			</p>
		</yd-popup>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import agreement from '../components/agreement/agreement' //服务协议
	import clock from "vue-material-design-icons/clock" //时间图标
	import account from "vue-material-design-icons/account-multiple" //人物图标
	import MapMarker from "vue-material-design-icons/map-marker" //地点图标
	export default {
		components: {
			clock,
			account,
			MapMarker,
			agreement
		},
		created() {

		},
		data() {
			return {
				btnHeight: null,
				loading: false,
				checkedBox: false,
				show1: false
			}
		},
		methods: {
			...mapActions([
				'getLinkaTopicDetail'
			]),
			protocol() {
				this.show1 = true
			},
			obj2style(style) {
				let str = []
				Object.keys(style).forEach(key => {
					str.push(`${key}:${style[key]}`)
				})
				return str.join(';')
			},
			next() {
				if(this.checkedBox == false) {
					this.$dialog.toast({
						mes: '请阅读并勾选《链答服务协议》',
						timeout: 1500
					})
					return false
				}
				this.$router.push({
					name: 'initiating',
					params: {
						id: this.$route.params.id
					}
				})
			},
			async getData() {
				if(this.LinkaTopicDetailData.length == 0){
					this.loading = true
				}
				await this.getLinkaTopicDetail(this.$route.params.id)
				this.loading = false
			},
		},
		props: [],
		computed: {
			...mapState([
				'LinkaTopicDetailData'
			]),
			style() {
				let height = this.btnHeight
				let style = {
					height
				}
				style['line-height'] = this.btnHeight
				return this.obj2style(style)
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.btnHeight = this.$refs.wkaskwp.offsetHeight + 'px'
			})
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.make-daka {
		background: #ffffff;
		&-t {
			padding: .4rem .25rem;
			position: relative;
			&-yuan {
				color: #2ba6ff;
				& span {
					font-size: 16.0px;
					font-weight: bold;
					margin-right: .1rem;
				}
			}
			&-title {
				font-size: 18.0px;
				margin: .23rem 0;
			}
			&-name {
				font-size: 13.0px;
				color: #b0b0b0;
			}
			&-time {
				color: #9A9DB5;
				margin: .25rem 0 0 0;
				&-clock,
				&-account,
				&-marker {
					vertical-align: middle;
					margin-right: .04rem;
				}
			}
			&-call {
				position: absolute;
				right: .2rem;
				top: 0;
				padding: .2rem;
				background-color: #ff9800;
				color: #ffffff;
			}
			&-yue {
				position: absolute;
				right: .2rem;
				top: 0;
				padding: .2rem;
				background-color: #ff543d;
				color: #ffffff;
			}
		}
		&-y {
			padding: .4rem 0;
			background-color: #F5F9FA;
			&-title {
				font-weight: bold;
				margin-left: .23rem;
				margin-bottom: .36rem;
			}
		}
		&-c {
			font-size: 14.0px;
			line-height: 24px;
			padding: .4rem .2rem;
			color: #555555;
		}
	}
	
	.go-next-btn {
		position: absolute;
		right: 0;
		bottom: 0;
		padding: 0 .7rem;
		font-size: 14.0px;
		background-color: #29b6f6;
		color: #ffffff;
	}
	
	.ask-header-price {
		color: #101010;
		font-size: 16.0px;
		padding: .25rem 0;
		text-align: center;
		background: #ffffff;
		margin-bottom: .1rem;
	}
	
	.ask-notice {
		height: .9rem;
		font-size: 12px;
		line-height: .9rem;
		background: #fff0ce;
		color: #f96;
		padding-left: .18rem;
		margin-top: .1rem;
	}
	
	.wk-ask-wp {
		padding: .2rem .3rem;
		background: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #f8f8f8;
	}
	
	.wk-ask-wp .ask-tip {
		line-height: .48rem;
		height: .48rem;
		font-size: 12px;
		position: relative;
		color: #606772;
		padding-left: .4rem;
	}
	
	.wk-ask-wp .ask-tip .check-box-wp {
		position: absolute;
		left: 0;
		top: 0;
		height: .48rem;
		width: .48rem;
	}
	
	.wk-ask-wp .ask-tip .check-box {
		width: .32rem;
		height: .32rem;
		border-radius: 50%;
		left: 0;
		top: .06rem;
		position: absolute;
		border: 1px solid #c8d1d7;
		background: #fff;
	}
	
	.wk-ask-wp .ask-tip .check-box-checked {
		border: 1px solid #32a0e6;
		background: #32a0e6;
	}
	
	.wk-ask-wp .ask-tip .check-box::before {
		content: ' ';
		width: .18rem;
		height: .12rem;
		border-left: 1px solid #fff;
		border-bottom: 1px solid #fff;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		display: block;
		position: absolute;
		left: .05rem;
		top: .05rem;
	}
	
	.wk-ask-wp .ask-tip .wk-protocol span {
		float: left;
	}
	
	.wk-ask-wp .ask-tip .wk-protocol .link {
		color: #32a0e6;
	}
</style>
<style>
	.make-daka-t-time-clock svg {
		width: 12px;
		height: 12px;
	}
	
	.make-daka-t-time-account svg {
		width: 12px;
		height: 12px;
	}
	
	.make-daka-t-time-marker svg {
		width: 12px;
		height: 12px;
	}
</style>