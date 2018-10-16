<template>
	<div v-title data-title="我的约见" v-loading="loading">
		<top-nav :title="title" :link="link"></top-nav>
		<div class="initiating">
			<div class="initiating-t">
				<p class="initiating-t-title">{{LinkaAppointsDetailData.topic_name}}</p>
				<p class="initiating-t-time" v-if="LinkaAppointsDetailData.topic">
					<span class="margin-r" v-if="LinkaAppointsDetailData.topic.data.ser_type == '全国通话'"><clock class="initiating-t-time-clock" fillColor="#FFFFFF"/>{{LinkaAppointsDetailData.topic.data.ser_time}}分钟/次</span>
					<span class="margin-r" v-else><clock class="initiating-t-time-clock" fillColor="#FFFFFF"/>{{LinkaAppointsDetailData.topic.data.ser_time}}小时/次</span>
					<span class="margin-r"><package-up class="initiating-t-time-package" fillColor="#FFFFFF"/>{{LinkaAppointsDetailData.topic.data.price}}元/次</span>
					<span class="margin-r" v-if="LinkaAppointsDetailData.topic.data.ser_type == '全国通话'"><dns class="initiating-t-time-dns" fillColor="#FFFFFF"/>{{LinkaAppointsDetailData.topic.data.ser_type}}</span>
					<span class="margin-r" v-else><dns class="initiating-t-time-dns" fillColor="#FFFFFF"/>{{LinkaAppointsDetailData.topic.data.ser_type}}</span>
				</p>
				<div class="v-step-warp-horizontal style2">
					<div class="v-step-progress-bg">
						<div class="v-step-progress-value" style="background-color: #ffffff;width: 50%;"></div>
					</div>
					<ul class="v-step-list">
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color:transparent;border: none;"></div>
							<label class="v-step-item-label">发起预约</label>
						</li>
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color:transparent;border: none;"></div>
							<label class="v-step-item-label">等待确认</label>
						</li>
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color: #1DA4FF;"></div>
							<label class="v-step-item-label">学员付款</label>
						</li>
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color:transparent;border: none;"></div>
							<label class="v-step-item-label">确认见过</label>
						</li>
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color:transparent;border: none;"></div>
							<label class="v-step-item-label">服务评价</label>
						</li>
					</ul>
				</div>
				<div class="initiating-t-san">
					<svg xmlns="http://www.w3.org/2000/svg">
						<path d="M 7 0 L 14 8 L 0 8 Z"></path>
					</svg>
				</div>
			</div>
			<div class="initiating-pay" v-if="LinkaAppointsDetailData.topic">
				<div class="initiating-pay-t">
					<img :src="LinkaAppointsDetailData.topic.data.guest_avatar" style="width: 54px;border-radius: 50%;" />
					<p style="font-size: .3rem;margin-top: .2rem;">等待学员
						<font color="#1da4ff">确认并付款</font>
					</p>
				</div>
				<div class="initiating-pay-check" v-if="LinkaAppointsDetailData.ser_type == '线下约见'">
					<div class="initiating-pay-check-list" v-if="LinkaAppointsDetailData.appoint_cases" v-for="item,index in LinkaAppointsDetailData.appoint_cases" :key="index">
						<div class="initiating-pay-check-list-l">
							<span>{{index + 1}}</span>
						</div>
						<div class="initiating-pay-check-list-r">
							<p>
								<font color="#999999">时间：</font>{{item.appoint_time}}</p>
							<p style="margin-top: .2rem;">
								<font color="#999999">地点：</font>{{item.location}}</p>
						</div>
						<div class="clear"></div>
					</div>
					<p class="initiating-pay-check-p">如果学员觉得时间地点不合适？付费后将会通过电话/私信与你沟通</p>
				</div>
				<div class="initiating-pay-check" v-else>
					<div class="initiating-pay-check-list" v-if="LinkaAppointsDetailData.appoint_cases" v-for="item,index in LinkaAppointsDetailData.appoint_cases" :key="index">
						<div class="initiating-pay-check-list-l">
							<span>{{index + 1}}</span>
						</div>
						<div class="initiating-pay-check-list-r">
							<p>
								<font color="#999999">时间：</font>{{item.appoint_time}}</p>
						</div>
						<div class="clear"></div>
					</div>
					<p class="initiating-pay-check-p">如果学员觉得时间不合适？付费后将会通过电话/私信与你沟通</p>
				</div>
			</div>
			<div class="initiating-a">
				<p class="initiating-a-title">学员请教大咖的问题</p>
				<div class="initiating-a-content iblack">
					<p>老师你好，希望以下问题能获得您的指点：</p>
					<p class="initiating-a-content-list" v-for="item,index in LinkaAppointsDetailData.answers" :key="index">{{index+1}}、{{item}}</p>
				</div>
			</div>
			<div class="initiating-a">
				<p class="initiating-a-title">学员的自我介绍</p>
				<div class="initiating-a-content iblack">
					<p>{{LinkaAppointsDetailData.profile}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import clock from "vue-material-design-icons/clock" //时间图标
	import PackageUp from "vue-material-design-icons/package-up" //交易图标
	import dns from "vue-material-design-icons/dns" //dns图标
	import CheckCircle from "vue-material-design-icons/check-circle" //成功图标
	import pencil from "vue-material-design-icons/pencil" //修改图标
	import TopNav from '@/components/common/TopNav'
	export default {
		components: {
			clock,
			PackageUp,
			dns,
			CheckCircle,
			pencil,
			TopNav
		},
		created() {

		},
		data() {
			return {
				loading: false,
				addressList: [{
					time: '2018-04-04 14:00',
					address: '松山湖中科创新广场A座1108',
					check: false
				}, {
					time: '2018-04-04 14:00',
					address: '松山湖中科创新广场A座1108',
					check: false
				}],
				title: '约见详情',
				link: 'reservation'
			}
		},
		methods: {
			...mapActions([
				'getLinkaAppointsDetail'
			]),
			async getData() {
				if(this.LinkaAppointsDetailData.length == 0) {
					this.loading = true
				}
				await this.getLinkaAppointsDetail(this.$route.params.id)
				if(this.LinkaAppointsDetailData.status == '待确认') {
					this.$router.push({
						name: 'reservationWait',
						params: {
							id: this.$route.params.id
						}
					})
				}
				if(this.LinkaAppointsDetailData.status == '待付款') {
					this.$router.push({
						name: 'reservationPayWait',
						params: {
							id: this.$route.params.id
						}
					})
				}
				if(this.LinkaAppointsDetailData.status == '待见面') {
					this.$router.push({
						name: 'reservationSeen',
						params: {
							id: this.$route.params.id
						}
					})
				}
				if(this.LinkaAppointsDetailData.status == '待评价') {
					this.$router.push({
						name: 'reservationAssess',
						params: {
							id: this.$route.params.id
						}
					})
				}
				if(this.LinkaAppointsDetailData.status == '已取消') {
					this.$router.push({
						name: 'initiatingRemove',
						params: {
							id: this.$route.params.id
						}
					})
				}
				if(this.LinkaAppointsDetailData.status == '已拒绝') {
					this.$router.push({
						name: 'reservationRefuse',
						params: {
							id: this.$route.params.id
						}
					})
				}
				this.loading = false
			},
		},
		props: [],
		computed: {
			...mapState([
				'LinkaAppointsDetailData'
			]),
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.initiating-pay {
		margin: .2rem;
		background: #ffffff;
		border-radius: 4px;
		&-btn {
			margin-top: .3rem;
			color: #FFFFFF;
			height: .9rem;
			line-height: .9rem;
			text-align: center;
			background: #29b6f6;
			font-size: .28rem;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
		&-t {
			padding: .4rem 0;
			text-align: center;
			&-red {
				color: #ff545e;
				margin-left: .1rem;
			}
		}
		&-check {
			&-p {
				color: #9A9DB5;
				text-align: center;
				padding: .2rem 0;
				border-top: 1px solid #e3e3e3;
			}
			&-set {
				padding: .25rem;
				border-top: 1px solid #e3e3e3;
				text-align: center;
				font-size: .28rem;
				&-p {
					padding: .2rem 0;
					border-radius: 4px;
					color: #1DA4FF;
					border: 1px solid #1DA4FF;
				}
			}
			&-list {
				padding: .4rem;
				border-top: 1px solid #e3e3e3;
				&-l {
					float: left;
					width: 10%;
					& span {
						border: 1px solid #1DA4FF;
						border-radius: 50%;
						display: inline-block;
						margin-top: .03rem;
						padding: .04rem .12rem;
						color: #1DA4FF;
					}
				}
				&-r {
					float: left;
					width: 90%;
					font-size: .28rem;
				}
			}
		}
	}
	
	.initiating-a-revise {
		position: absolute;
		right: .2rem;
		top: .3rem;
		color: #9A9DB5;
		font-size: 12px;
	}
	
	.initiating-t-time-remove {
		color: #ffffff;
		border: 1px solid #87d4ff;
		border-radius: 40px;
		padding: .06rem .2rem;
		float: right;
		margin-top: -.1rem;
	}
	
	.initiating-btn {
		background-color: rgb(41, 182, 246);
		font-size: 14px;
		text-align: center;
		height: .9rem;
		line-height: .9rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		color: #ffffff;
	}
	
	.initiating-a {
		background: #ffffff;
		margin: .2rem;
		font-size: 14.0px;
		padding: 0 0 .6rem 0;
		border-radius: 4px;
		position: relative;
	}
	
	.initiating-a-title {
		font-size: 14.0px;
		font-weight: bold;
		padding: .3rem;
		border-bottom: 1px solid #E3E3E3;
	}
	
	.initiating-a-content {
		color: #b0b0b0;
		font-size: 14.0px;
		padding: .4rem .2rem .3rem .3rem;
	}
	
	.initiating-a-content-list {
		margin-top: .2rem;
	}
	
	.initiating-t {
		background-color: #2ba6ff;
		padding-bottom: .3rem;
		position: relative;
	}
	
	.initiating-t-title {
		color: #ffffff;
		font-size: 18.0px;
		padding: .3rem .28rem;
	}
	
	.initiating-t-time {
		color: #ffffff;
		padding: 0 .28rem;
	}
	
	.initiating-t-time .margin-r {
		margin-right: .15rem;
	}
	
	.v-step-warp-horizontal {
		position: relative;
		padding: 10px 0;
		z-index: 2;
	}
	
	.v-step-warp-horizontal.style2 .v-step-progress-bg {
		height: 2px;
		bottom: 35px;
	}
	
	.v-step-warp-horizontal .v-step-progress-bg {
		position: absolute;
		width: 100%;
		height: 4px;
		bottom: 22px;
		background-color: rgba(255, 255, 255, .6);
	}
	
	.v-step-warp-horizontal .v-step-progress-value {
		position: inherit;
		top: 0;
		left: 0;
		height: inherit;
	}
	
	.v-step-warp-horizontal .v-step-list {
		justify-content: space-around;
		text-align: center;
	}
	
	.v-step-list {
		position: relative;
		display: -webkit-flex;
		display: flex;
	}
	
	.v-step-warp-horizontal .v-step-item-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.v-step-item-label {
		font-size: 12px;
		color: #ffffff;
	}
	
	.v-step-warp-horizontal.style2 .v-step-item-number {
		width: 10px;
		height: 10px;
		line-height: 10px;
		border: 2px solid #ffffff;
	}
	
	.v-step-warp-horizontal .v-step-item-number {
		margin: 5px auto;
	}
	
	.v-step-item-number {
		width: 18px;
		height: 18px;
		line-height: 18px;
		font-size: 12px;
		border-radius: 50%;
		color: #666;
		background-color: #ddd;
	}
	
	.initiating-t-time-clock {
		vertical-align: middle;
		margin-right: .04rem;
	}
	
	.initiating-t-time-package {
		vertical-align: middle;
		margin-right: .04rem;
	}
	
	.initiating-t-time-dns {
		vertical-align: middle;
		margin-right: .04rem;
	}
	
	.initiating-a-revise .pencil-icon {
		vertical-align: middle;
	}
	
	.initiating-t-san {
		position: absolute;
		bottom: 0px;
		width: 14px;
		height: .2rem;
		fill: #EFF2F4;
		left: 48%;
	}
	
	.initiating-t-san svg {
		width: 14px;
		height: 8px;
	}
</style>
<style>
	.initiating-t-time-clock svg {
		width: 12px;
		height: 12px;
	}
	
	.initiating-t-time-package svg {
		width: 12px;
		height: 12px;
	}
	
	.initiating-t-time-dns svg {
		width: 12px;
		height: 12px;
	}
	
	.initiating-wait-check .check-circle-icon svg {
		width: 96px;
		height: 101px;
	}
	
	.initiating-a-revise .pencil-icon svg {
		width: 12px;
		height: 12px;
	}
</style>