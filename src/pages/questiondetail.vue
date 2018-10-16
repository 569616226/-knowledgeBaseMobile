<template>
	<div v-title data-title="问题详情" v-loading="loading">
		<div class="wrapper question-wrapper ">

			<div class="wgt-ask">
				<p class="browse-title">{{data.name}}</p>
				<div class="browse-detail" v-if="data.readers">
					<label class="browse-count">{{data.readers.length}}人查看：</label>
					<div class="browse-persons">
						<a class="browse-persons-box hide" style="display: inline-block;" v-for="item,index in data.readers" :key="index"><img class="browse-persons-item" :src="item"></a>
					</div>
				</div>
			</div>
			<div class="wgt-answer">
				<div class="placeholder"></div>
				<div class="answer-expert-detail">
					<a @click="nextDaka" class="expert-detail-avatar">
						<img class="expert-avatar" :src="data.linka_avatar" width="25" height="25">
					</a>
					<a @click="nextDaka" class="expert-detail">
						<p class="answer-detail-vh mr-10">{{data.linka_name}}</p>
						<p class="expert-detail-position">{{data.linka_office}}</p>
					</a>
					<span class="appointment-btn" @click="quiz(data.linka_id)">提问</span>
					<div class="clear"></div>
				</div>
				<div class="answer" v-if="data.status">
					<div v-if="data.status == '待付款'">
						<div class="to-answer">
							<img src="../assets/nothing.png" />
							<p class="to-answer-time">
								问题等待支付，支付完成后请耐心等候大咖回答
							</p>
							<div class="to-answer-btn" @click="pay">
								<span>去支付</span>
							</div>
							<div style="height: 1.1rem;"></div>
						</div>
					</div>
					<div v-else>
						<div v-if="data.status != '已关闭'">
							<div v-if="data.is_see_content">
								<p class="check-answer" v-if="data.content">
									{{data.content}}
								</p>
								<div class="to-answer" v-else>
									<img src="../assets/nothing.png" />
									<p class="to-answer-title">
										大咖疯狂码字中
									</p>
									<p class="to-answer-time">
										剩余{{data.display_time}}问题失效
									</p>
								</div>
							</div>
							<a class="check-question" href="javascript:void(0)" v-else>
								<div class="detail-btn" @click="payQue">{{SettingsPay}}元 查看回答</div>
							</a>
						</div>
						<div class="to-answer" v-else>
							<img src="../assets/nothing.png" />
							<p class="to-answer-title">
								问题已失效
							</p>
							<p class="to-answer-time">
								您的退款费用将返回至原账户
							</p>
						</div>
					</div>
					<div class="evaluation" v-if="data.is_guest && data.star > 0">
						<div class="user-evalution">
							<span>用户评价：</span>
							<div class="star-level">
								<yd-rate v-model="data.star" size="14px" color="#d6d6d6" active-color="#ffd600" :readonly="true"></yd-rate>
							</div>
						</div>
					</div>
					<div class="evaluation_que" v-if="data.is_guest && data.star == 0 && data.content != null">
						<div class="evaluation">
							<div class="user-evalution">
								<span>用户评价：</span>
								<div class="star-level">
									<yd-rate v-model="data.star" size="14px" color="#d6d6d6" active-color="#ffd600" :readonly="true"></yd-rate>
								</div>
							</div>
						</div>
						<span class="evaluation_que_btn" @click="show1 = true">去评价</span>
					</div>
					<div class="placeholder"></div>
				</div>
			</div>

		</div>
		<yd-popup v-model="show1" position="center" width="90%">
			<div style="background-color:#fff;border-radius: 5px;text-align: center;padding-bottom: .4rem;position: relative;">
				<close-icon fillColor="rgb(168, 168, 168)" style="position: absolute;right: .2rem;top: .2rem;" @click.native="show1 = false"></close-icon>
				<p style="font-size: .36rem;padding-top: .7rem;font-weight: bold;">
					回答评价
				</p>
				<p style="color: rgb(85, 85, 85);padding: .2rem 0 .8rem 0;">
					给大咖的回答打个分
				</p>
				<div style="display: inline-block;">
					<yd-rate v-model="postData.rate" size="34px" color="#d6d6d6" active-color="#ffd600"></yd-rate>
				</div>
				<span class="btn_success" @click="refer">提交</span>
			</div>
		</yd-popup>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import WechatJSSDK from 'wechat-jssdk/dist/client'
	import BottomNav from '../components/common/BottomNav' //底部导航
	import CloseIcon from "vue-material-design-icons/close"
	export default {
		components: {
			BottomNav,
			CloseIcon
		},
		data() {
			return {
				postData: {
					rate: 0,
					id: this.$route.params.id
				},
				loading: false,
				data: [],
				SettingsPay: null,
				show1: false
			}
		},
		computed: {
			...mapState([
				'LinkaProfileData'
			])
		},
		methods: {
			...mapActions([
				'getLinkaProfile'
			]),
			nextDaka() {
				this.$router.push({
					name: 'dakadetail',
					params: {
						id: this.data.linka_hash_id
					}
				})
			},
			quiz(id) {
				if(this.data.linka_name == this.LinkaProfileData.real_name){
					this.$dialog.toast({
						mes: '无法提问自己',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.$router.push({
					name: 'questionDaka',
					params: {
						id: id
					}
				})
			},
			async getData() {
				this.loading = true
				const Settings = await api.getSettings('system_answer_price_settings')
				this.SettingsPay = Settings.data.value[1]
				const data = await api.getGuestAnswersDetail(this.$route.params.id)
				this.data = data.data
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
				await this.getLinkaProfile()
				this.loading = false
			},
			async refer() {
				if(this.postData.rate == 0) {
					this.$dialog.toast({
						mes: '请先评价',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				await api.postAnswersId(this.postData)
				await this.getData()
				this.show1 = false
				this.loading = false
			},
			async payQue() {
				this.loading = true
				const chooseWXPay = await api.getAnswerOrder(this.$route.params.id)
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
								that.$router.push({
									name: 'questionSuccessYuan',
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
			},
			async pay() {
				this.loading = true
				const chooseWXPay = await api.getPayNotPayOrder(this.$route.params.id)
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
								that.$router.push({
									name: 'questionSuccess',
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
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style scoped>
	.evaluation_que {
		position: relative;
	}
	
	.btn_success {
		display: block;
		color: #ffffff;
		background: rgb(41, 182, 246);
		width: 80%;
		margin: 0 auto;
		margin-top: .3rem;
		padding: .2rem;
		border-radius: 4px;
		font-size: .28rem;
	}
	
	.evaluation_que_btn {
		display: block;
		color: #fff;
		padding: .1rem .35rem;
		text-align: center;
		font-size: .28rem;
		position: absolute;
		right: .2rem;
		top: .13rem;
		border-radius: 4px;
		background-color: rgb(41, 182, 246);
	}
	
	.question-wrapper {
		background-color: #fff;
	}
	
	.wgt-ask {
		width: 100%;
		background: #fff;
		font-size: 18px;
		line-height: 22px;
		color: #333;
		padding: 18px 0 20px;
	}
	
	.wgt-ask .browse-title {
		margin: 0 15px;
		font-size: 18px;
		font-weight: bold;
		line-height: 26px;
		white-space: normal;
		word-break: break-all;
	}
	
	.wgt-ask .browse-detail {
		margin: 12px 15px 0;
	}
	
	.wgt-ask .browse-count {
		display: inline-block;
		vertical-align: middle;
		font-size: 13px;
		color: #9d9d9d;
	}
	
	.wgt-ask .browse-persons {
		display: inline-block;
		vertical-align: middle;
	}
	
	.wgt-ask .browse-persons-box {
		display: inline-block;
		vertical-align: middle;
		width: 25px;
		height: 25px;
		margin-right: .1rem;
	}
	
	.wgt-ask .browse-persons-box .browse-persons-item {
		width: 25px;
		height: 25px;
		margin-right: 10px;
		border-radius: 50%;
	}
	
	.wgt-answer .placeholder {
		width: 100%;
		height: 10px;
		background: #eef2f5;
	}
	
	.wgt-answer .answer-expert-detail {
		font-size: 14px;
		color: #666;
		padding: 20px 15px;
		border-bottom: 1px solid #e1e6e9;
	}
	
	.wgt-answer .answer-expert-detail .expert-detail-avatar {
		float: left;
		display: inline-block;
		vertical-align: middle;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		margin-right: 10px;
		border: 0;
		overflow: hidden;
		margin-top: 3px;
	}
	
	.wgt-answer .answer-expert-detail .expert-detail-avatar .expert-avatar {
		width: 35px;
		height: 35px;
	}
	
	.wgt-answer .answer-expert-detail .expert-detail {
		float: left;
		display: inline-block;
		font-size: 13px;
	}
	
	.wgt-answer .answer-expert-detail .expert-detail .answer-detail-vh {
		vertical-align: middle;
		color: #333;
	}
	
	.wgt-answer .answer-expert-detail .expert-detail .expert-detail-position {
		max-width: 60%;
		text-overflow: ellipsis;
		position: absolute;
		-webkit-line-clamp: 1;
		overflow: hidden;
		white-space: nowrap;
		vertical-align: middle;
		color: #919ca9;
		margin-top: 3px;
	}
	
	.wgt-answer .answer-expert-detail .appointment-btn {
		float: right;
		display: inline-block;
		width: 55px;
		height: 29px;
		line-height: 29px;
		text-align: center;
		border: 1px solid #32a0e6;
		border-radius: 4px;
		color: #32a0e6;
		font-size: 13px;
		font-weight: 700;
		margin-top: 3px;
	}
	
	.wgt-answer .answer .check-question,
	.wgt-answer .answer .login {
		display: block;
		width: 100%;
		height: 5.4rem;
		background: url(../assets/answer.png) no-repeat;
		background-size: 95% 91%;
		background-position: center;
		position: relative;
		margin: 6px 0;
	}
	
	.wgt-answer .answer .check-answer {
		font-size: 16.0px;
		color: #555555;
		line-height: 30px;
		margin: 15px;
	}
	
	.wgt-answer .answer .to-answer {
		text-align: center;
	}
	
	.wgt-answer .answer .to-answer .to-answer-title {
		font-size: 18.0px;
		line-height: 26px;
	}
	
	.wgt-answer .answer img {
		width: 70%;
	}
	
	.to-answer-btn {
		width: 50%;
		margin: 0 auto;
		padding: .3rem 0;
		background-color: #1DA4FF;
		color: #ffffff;
		border-radius: 30px;
		font-size: .28rem;
	}
	
	.wgt-answer .answer .to-answer-time {
		color: #999999;
		margin: 6px 0 50px 0;
	}
	
	.wgt-answer .answer .check-question .detail-btn,
	.wgt-answer .answer .login .detail-btn {
		font-size: 17px;
		width: 157px;
		height: 46px;
		background: #32a0e6;
		color: #fff;
		line-height: 46px;
		text-align: center;
		border-radius: 25px;
		position: absolute;
		left: 50%;
		margin-left: -79px;
		top: 50%;
		margin-top: -23px;
	}
	
	.wgt-answer .answer .evaluation {
		height: 45px;
		padding: 0 15px;
		background: #f6f8fa;
		border-top: 1px solid #e1e6e9;
	}
	
	.wgt-answer .answer .evaluation .user-evalution {
		float: left;
	}
	
	.wgt-answer .answer .evaluation .user-evalution span {
		float: left;
		font-size: 13px;
		color: #929ca8;
		line-height: 45px;
	}
	
	.wgt-answer .answer .evaluation .user-evalution .star-level {
		float: left;
		margin-left: 5px;
	}
</style>