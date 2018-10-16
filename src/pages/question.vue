<template>
	<div v-title data-title="快速提问" v-loading="loading">
		<div class="page-slide-wp" id="page-slide-wp">
			<div class="page-slide-item ask-a-question" v-if="show">
				<div class="ask-header-price" ref="headerprice">
					<p>付费
						<font color="#29b6f6">{{SettingsPay}}元</font>向大咖提问</p>
				</div>
				<div class="wk-ask-wp">
					<textarea maxlength="300" ref="wkpadding" class="ask-content" id="ask-content" placeholder="描述提问的问题，不得少于10个字" :style="'height:'+styleHeight" v-model="answers.name"></textarea>
					<span class="char-count" ref="charcount"><span class="char-num">{{answers.name.length}}</span>/300</span>
				</div>
				<div class="ask-notice" ref="asknotice">每当问题被查看，您将获得一部分收入</div>
				<div class="wk-ask-wp" ref="wkaskwp">
					<div class="ask-tip-wp">
						<div class="ask-tip">
							<div class="check-box-wp" @click="checkedBox = !checkedBox"><span :class="checkedBox ? 'check-box check-box-checked' : 'check-box'"></span></div>
							<div class="wk-protocol clear"><span>我已经阅读并同意</span><span class="link" @click="protocol">《链答服务协议》</span></div>
						</div>
					</div>
					<span class="go-next-btn next-btn" :style="style" @click="success_btn" v-if="$route.params.id">提交</span>
					<span class="go-next-btn next-btn" :style="style" @click="next_btn" v-else>下一步</span>
				</div>
			</div>
			<select-daka v-else></select-daka>
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
	import api from '@/utils/api'
	import WechatJSSDK from 'wechat-jssdk/dist/client'
	import SelectDaka from '../components/question/selectdaka' //选择大咖
	import agreement from '../components/agreement/agreement' //服务协议
	export default {
		components: {
			SelectDaka,
			agreement
		},
		data() {
			return {
				winHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
				nextHeight: null,
				btnHeight: null,
				asktext: '',
				charnum: 0,
				show: true,
				checkedBox: false,
				loading: false,
				show1: false,
				SettingsPay: null
			}
		},
		computed: {
			...mapState([
				'answers'
			]),
			styleHeight() {
				return this.nextHeight
			},
			style() {
				let height = this.btnHeight
				let style = {
					height
				}
				style['line-height'] = this.btnHeight
				return this.obj2style(style)
			}
		},
		methods: {
			...mapActions([
				'getAnwsers'
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
			next_btn() {
				if(this.checkedBox == false) {
					this.$dialog.toast({
						mes: '请阅读并勾选《链答服务协议》',
						timeout: 1500
					})
					return false
				}
				if(this.answers.name.length >= 10) {
					this.show = false
				} else {
					this.$dialog.toast({
						mes: '您的字数不够10个字',
						timeout: 1000
					})
				}
			},
			async getData() {
				const Settings = await api.getSettings('system_answer_price_settings')
				this.SettingsPay = Settings.data.value[0]
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
			},
			async success_btn() {
				if(this.answers.name.length <= 10) {
					this.$dialog.toast({
						mes: '您的字数不够10个字',
						timeout: 1000
					})
					return false
				}
				if(this.checkedBox == false) {
					this.$dialog.toast({
						mes: '请阅读并勾选《链答服务协议》',
						timeout: 1500
					})
					return false
				}
				this.loading = true
				this.answers.linka_id = this.$route.params.id
				const chooseWXPay = await api.postAnswers(this.answers)
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
								that.answers.name = ''
								that.answers.linka_id = null
								that.$router.push({
									name: 'questionSuccess',
									params: {
										id: chooseWXPay.answer_id
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
							that.answers.name = ''
							that.answers.linka_id = null
							that.$router.push({
								name: 'userAsked'
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
			this.$nextTick(() => {
				this.nextHeight = this.winHeight - this.$refs.headerprice.offsetHeight - this.$refs.asknotice.offsetHeight - this.$refs.wkaskwp.offsetHeight - this.$refs.charcount.offsetHeight - (this.$refs.wkpadding.offsetTop - this.$refs.headerprice.offsetHeight) * 2 + 'px'
				this.btnHeight = this.$refs.wkaskwp.offsetHeight + 'px'
			})
			this.getData()
		},
		watch: {
			asktext(val) {
				this.charnum = val.length
			}
		}
	}
</script>
<style scoped>
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
	}
	
	.wk-ask-wp .ask-content {
		border: 0;
		outline: 0;
		display: block;
		width: 100%;
		height: 9rem;
		resize: none;
		font-size: .3rem;
		line-height: .4rem;
		word-break: break-all;
		padding: 0;
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
	
	.char-count {
		display: block;
		text-align: right;
		color: #b0b0b0;
	}
	
	.char-num {
		color: #696969;
	}
	
	.protocoldetail {
		overflow-y: auto;
		height: 80vh;
		padding: .2rem;
	}
	
	.protocoldetail h3 {
		text-align: center;
		font-size: .33rem;
		margin-bottom: .2rem;
	}
	
	.protocoldetail div {
		margin-top: .2rem;
	}
</style>
<style>
	.yd-popup-show {
		background-color: rgb(255, 255, 255);
		border-radius: 5px;
	}
</style>