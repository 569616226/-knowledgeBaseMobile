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
					<span class="initiating-t-time-remove" @click="removeShow = true">取消预约</span>
				</p>
				<div class="v-step-warp-horizontal style2">
					<div class="v-step-progress-bg">
						<div class="v-step-progress-value" style="background-color: #ffffff;width: 70%;"></div>
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
							<div class="v-step-item-number" style="background-color:transparent;border: none;"></div>
							<label class="v-step-item-label">学员付款</label>
						</li>
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color: #1DA4FF;"></div>
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
					<p style="font-size: .3rem;margin-top: .2rem;">学员的
						<font color="#1da4ff">预约已成功</font>，请按时到达指定</p>
				</div>
				<div class="initiating-pay-check" v-if="LinkaAppointsDetailData.ser_type == '线下约见'">
					<div class="initiating-pay-check-list" v-for="item,index in LinkaAppointsDetailData.appoint_cases" :key="index" v-if="item.id == LinkaAppointsDetailData.case_id">
						<div class="initiating-pay-check-list-r">
							<p>
								<font color="#999999">
									<clock class="initiating-t-time-clock" fillColor="#999999" />时间：</font>{{item.appoint_time}}</p>
							<p style="margin-top: .2rem;">
								<font color="#999999">
									<map-marker class="initiating-t-time-clock" fillColor="#999999" />地点：</font>{{item.location}}</p>
						</div>
						<div class="clear"></div>
					</div>
					<p class="initiating-pay-check-p">如果学员觉得时间地点不合适？付费后将会通过电话/私信与你沟通</p>
				</div>
				<div class="initiating-pay-check" v-else>
					<div class="initiating-pay-check-list" v-for="item,index in LinkaAppointsDetailData.appoint_cases" :key="index" v-if="item.id == LinkaAppointsDetailData.case_id">
						<div class="initiating-pay-check-list-r">
							<p>
								<font color="#999999">
									<clock class="initiating-t-time-clock" fillColor="#999999" />时间：</font>{{item.appoint_time}}</p>
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
			<div class="initiating-a">
				<p class="initiating-a-title">学员的联系方式</p>
				<div class="initiating-a-content">
					<yd-flexbox>
						<div>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
						<yd-flexbox-item style="color: rgb(16, 16, 16);">{{LinkaAppointsDetailData.guest_name}}</yd-flexbox-item>
					</yd-flexbox>
					<yd-flexbox style="margin-top: .2rem;">
						<div>手机号：</div>
						<yd-flexbox-item style="color: rgb(16, 16, 16);">{{LinkaAppointsDetailData.guest_phone}}</yd-flexbox-item>
					</yd-flexbox>
				</div>
			</div>
			<div style="height: 1.1rem;"></div>
			<div class="initiating-pay-flex">
				<div class="initiating-pay-flex-l" @click="seed_daka">
					发私信
				</div>
				<div class="initiating-pay-flex-r" @click="link_student">
					联系学员
				</div>
				<div class="initiating-pay-flex-z" @click="checkSeen">
					确认见过
				</div>
			</div>
			<transition name="fade">
				<div class="initiating-resh" v-if="removeShow">
					<div class="initiating-resh-a" @click="removeShow = false"></div>
					<div class="initiating-resh-b" v-if="!payShow">
						<yd-step current="1" current-color="rgb(24, 181, 249)" class="initiating-resh-b-step1">
							<yd-step-item>
								<span slot="bottom">选择取消原因</span>
							</yd-step-item>
							<yd-step-item>
								<span slot="bottom">支付违约金</span>
							</yd-step-item>
						</yd-step>
						<div class="initiating-resh-b-list">
							<p v-for="item,index in reshList" :key="index" :class="item.resh ? 'resh' : ''" @click="check_resh(item)">{{item.title}}</p>
						</div>
						<div class="initiating-resh-b-btn" @click="payNext">下一步</div>
					</div>
					<div class="initiating-resh-b" v-if="payShow">
						<yd-step current="2" current-color="rgb(24, 181, 249)" class="initiating-resh-b-step2">
							<yd-step-item>
								<span slot="bottom">选择取消原因</span>
							</yd-step-item>
							<yd-step-item>
								<span slot="bottom">支付违约金</span>
							</yd-step-item>
						</yd-step>
						<div class="initiating-resh-b-chevron" @click="payShow = false">
							<chevron fillColor="rgb(194, 194, 194)" />
						</div>
						<div class="initiating-resh-b-list">
							<div class="initiating-resh-b-list-p">由于本次取消预约是由您单方面提出取消，作为赔偿，您支付预约金额的{{SettingsRatio}}%作为违约金赔偿给用户</div>
							<div class="initiating-resh-b-list-j">取消违约金</div>
							<div class="initiating-resh-b-list-pay">¥<span>{{SettingsPay}}</span></div>
						</div>
						<div class="initiating-resh-b-btn" @click="pay">我已考虑清楚，去支付</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import WechatJSSDK from 'wechat-jssdk/dist/client'
	import clock from "vue-material-design-icons/clock" //时间图标
	import PackageUp from "vue-material-design-icons/package-up" //交易图标
	import dns from "vue-material-design-icons/dns" //dns图标
	import CheckCircle from "vue-material-design-icons/check-circle" //成功图标
	import pencil from "vue-material-design-icons/pencil" //修改图标
	import MapMarker from "vue-material-design-icons/map-marker" //地点图标
	import chevron from "vue-material-design-icons/chevron-left" //左箭头图标
	import TopNav from '@/components/common/TopNav'
	export default {
		components: {
			clock,
			PackageUp,
			dns,
			CheckCircle,
			pencil,
			MapMarker,
			chevron,
			TopNav
		},
		created() {

		},
		data() {
			return {
				loading: false,
				reshList: [{
					title: '最近时间安排有变，希望下次有机会再约',
					resh: false
				}, {
					title: '与学员无法沟通，希望取消本次预约',
					resh: false
				}, {
					title: '待定',
					resh: false
				}],
				removeShow: false,
				payShow: false,
				postCancel: {
					id: this.$route.params.id,
					status: 0,
					cancel_res: ''
				},
				postSuccess: {
					id: this.$route.params.id,
					status: 4
				},
				SettingsPay: null,
				SettingsRatio: null,
				title: '约见详情',
				link: 'reservation'
			}
		},
		methods: {
			...mapActions([
				'getLinkaAppointsDetail',
				'getLinkaProfile'
			]),
			seed_daka() {
				this.$router.push({
					name: 'privatecontent',
					params: {
						id: this.LinkaAppointsDetailData.guest_id
					}
				})
			},
			async getData() {
				if(this.LinkaAppointsDetailData.length == 0) {
					this.loading = true
				}
				const Settings = await api.getSettings('system_order_settings')
				const signature = await api.getSignature()
				const config = {
					appId: signature.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
					timestamp: signature.timestamp, // 必填，生成签名的时间戳
					nonceStr: signature.nonceStr, // 必填，生成签名的随机串
					signature: signature.signature, // 必填，签名，见附录1
					jsApiList: ['chooseWXPay']
				}
				const wechatObj = await new WechatJSSDK(config)
				this.wechatObjData = wechatObj
				await this.getLinkaAppointsDetail(this.$route.params.id)
				await this.getLinkaProfile()
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
				this.SettingsPay = Settings.data.value[1] * this.LinkaAppointsDetailData.topic.data.price / 100
				this.SettingsRatio = Settings.data.value[1]
				if(this.SettingsPay < 0.01){
					this.SettingsPay = 0.01
				}
				this.loading = false
			},
			check_resh(item) {
				if(item.resh) {
					item.resh = !item.resh
				} else {
					this.reshList.forEach(e => {
						e.resh = false
					})
					item.resh = !item.resh
					this.postCancel.cancel_res = item.title
				}
			},
			payNext() {
				let e = 0
				this.reshList.forEach(s => {
					if(s.resh) {
						e = 1
					}
				})
				if(e == 1) {
					this.payShow = true
				} else {
					this.$dialog.toast({
						mes: '请先选择原因',
						timeout: 1000
					});
				}
			},
			link_student() {
				const phone = this.LinkaAppointsDetailData.guest_phone
				window.location.href = "tel:" + phone
			},
			checkSeen() {
				this.$dialog.confirm({
					title: '确认',
					mes: '真的与学员见过了吗？',
					opts: [{
							txt: '否',
							color: 'rgb(136, 136, 136)',
							callback: () => {

							}
						},
						{
							txt: '是',
							color: 'rgb(3, 155, 229)',
							callback: () => {
								this.nextAppraises()
							}
						}
					]
				})
			},
			async nextAppraises() {
				this.loading = true
				await api.postAppointsChangeStatus(this.postSuccess)
				this.loading = false
				this.$router.push({
					name: 'reservationAssess',
					params: {
						id: this.$route.params.id
					}
				})
			},
			async pay() {
				this.loading = true
				const chooseWXPay = await api.postAppointsChangeStatus(this.postCancel)
				this.loading = false

				//处理验证失败的信息
				this.wechatObjData.wx.error(function(res) {
					console.log('error', res);
				});

				//处理验证成功的信息
				let that = this
				this.wechatObjData.wx.ready(function() {
					that.wechatObjData.wx.chooseWXPay({
						timestamp: chooseWXPay.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: chooseWXPay.nonceStr, // 支付签名随机串，不长于 32 位
						package: chooseWXPay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						signType: chooseWXPay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: chooseWXPay.paySign, // 支付签名
						success: function(res) {
							// 支付成功的回调函数
							if(res.errMsg == "chooseWXPay:ok") {
								console.log()
								that.$router.push({
									name: 'initiatingRemove',
									params: {
										id: that.$route.params.id
									}
								})
							} else {
								alert(JSON.stringify(res));
							}
						},
						cancel: function(res) {
							that.$dialog.notify({
								mes: '取消支付',
								timeout: 2000,
								callback: () => {
									console.log('我走咯！');
								}
							})
						},
						fail: function(res) {
							alert(JSON.stringify(res));
						}
					})
				})
			}
		},
		props: [],
		computed: {
			...mapState([
				'LinkaAppointsDetailData',
				'LinkaProfileData'
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
			&-list {
				padding: .4rem;
				border-top: 1px solid #e3e3e3;
				& .on-mark span {
					border: 1px solid #32a0e6;
					background: #32a0e6;
				}
				& .on-mark span:before {
					content: ' ';
					width: .2rem;
					height: .12rem;
					border-left: .03rem solid #fff;
					border-bottom: .03rem solid #fff;
					margin-left: .08rem;
					margin-top: .08rem;
				}
				&-r {
					font-size: .28rem;
				}
			}
		}
		&-flex {
			display: flex;
			position: fixed;
			bottom: 0;
			width: 100%;
			&-l {
				width: 25%;
				text-align: center;
				height: .9rem;
				line-height: .9rem;
				color: rgb(153, 153, 153);
				background-color: rgb(255, 255, 255);
			}
			&-r {
				width: 35%;
				text-align: center;
				height: .9rem;
				line-height: .9rem;
				color: rgb(255, 255, 255);
				background-color: rgb(135, 213, 237);
			}
			&-z {
				width: 40%;
				text-align: center;
				height: .9rem;
				line-height: .9rem;
				background: rgb(41, 182, 246);
				color: #ffffff;
			}
		}
	}
	
	.initiating-resh {
		position: fixed;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: rgba(16, 16, 16, .6);
		z-index: 9;
		&-a {
			height: 100%;
			width: 100%;
		}
		&-b {
			background: #ffffff;
			position: absolute;
			width: 100%;
			bottom: 0;
			text-align: center;
			z-index: 10;
			&-chevron {
				position: absolute;
				left: .2rem;
				top: .2rem;
			}
			&-step1 {
				padding: .5rem 0 1.4rem 0;
			}
			&-step2 {
				padding: .5rem 0 .4rem 0;
			}
			&-title {
				color: rgb(176, 176, 176);
				padding: .3rem 0;
			}
			&-list {
				padding: 0 .3rem;
				& p {
					border: 1px solid rgb(227, 227, 227);
					font-size: 14px;
					padding: .2rem 0;
					border-radius: 30px;
					margin-bottom: .25rem;
				}
				& .resh {
					color: #ffffff;
					background-color: #29b6f6;
				}
				&-p {
					color: rgb(153, 153, 153);
				}
				&-j {
					color: rgb(85, 85, 85);
					font-size: .28rem;
					padding: .4rem 0;
				}
				&-pay {
					font-size: .6rem;
					padding-bottom: .5rem;
					& span {
						font-size: 1rem;
					}
				}
			}
			&-btn {
				height: .9rem;
				line-height: .9rem;
				color: #ffffff;
				background-color: rgb(41, 182, 246);
				margin-top: .3rem;
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
		left: 68%;
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