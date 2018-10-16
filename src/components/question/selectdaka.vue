<template>
	<div v-loading="loading">
		<div class="type-choose-wrap" v-if="daka_show">
			<div class="header-wrap">
				<div class="header-wrap-inner">
					<div class="types-header" ref="header">
						<div class="type-item" v-for="stc in MobileChildrenNavs" :class="{'selected': currentType == stc.id}" @click="selectType(stc.id)">{{stc.name}}</div>
					</div>
				</div>
				<!--<div class="pull-down">
					<magnify-icon fillColor="#3AAEFF" @click.native="showTogger(false)" />
				</div>-->
			</div>
		</div>
		<!--<div class="type-choose-wrap" v-if="!daka_show">
			<yd-flexbox class="search_box">
				<div @click="showTogger(true)">
					<ArrowLeftIcon class="backspace_search" fillColor="#444444" />
				</div>
				<yd-flexbox-item>
					<yd-search placeholder="搜索大咖姓名" v-model="value2" ref="daka_search">
					</yd-search>
				</yd-flexbox-item>
			</yd-flexbox>
		</div>-->
		<section class="wenka-list-wp">
			<scroll ref="scroll" :data="NavsLinkaData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<ul class="wenka-list">
					<li v-for="item,index in NavsLinkaData.data" :key="index" :class="answers.linka_id == item.real_id ? 'on-mark' : ''" @click="daka_check(item)">
						<span class="ava">
						<img :src="item.avatar" />
					</span>
						<span class="name">{{item.real_name}}</span>
						<span class="title">{{item.office}}</span>
						<div class="usr-tags">
							<account-multiple-icon class="seach-account-multiple" fillColor="#9A9DB5" />
							<span class="wenka-list-help">帮助了{{item.helps}}人</span>
							<message-processing-icon class="seach-message-processing" fillColor="#9A9DB5" />
							<span class="wenka-list-help">{{item.appraises}}人评价</span>
						</div>
						<span class="mark"></span>
					</li>
				</ul>
			</scroll>
			<div class="loading" style="display: none;">加载中...</div>
			<div class="wenka-ask-btn ask-btn" @click="askbtn">{{SettingsPay}}元，向TA提问</div>
		</section>
	</div>
</template>

<script>
	import { scrollLeft } from '@/utils'
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import WechatJSSDK from 'wechat-jssdk/dist/client'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import MagnifyIcon from "vue-material-design-icons/magnify" //搜索图标
	import AccountMultipleIcon from "vue-material-design-icons/account-multiple" //人员图标
	import MessageProcessingIcon from "vue-material-design-icons/message-processing" //聊天图标
	import ArrowLeftIcon from "vue-material-design-icons/arrow-left" //返回图标
	export default {
		components: {
			MagnifyIcon,
			AccountMultipleIcon,
			MessageProcessingIcon,
			ArrowLeftIcon,
			Scroll
		},
		computed: {
			...mapState([
				'MobileChildrenNavs',
				'NavsLinkaData',
				'answers',
				'LinkaProfileData',
			])
		},
		data() {
			return {
				loading: false,
				currentType: 0,
				daka_show: true,
				wechatObjData: '',
				pullUpLoad: {
					threshold: 10,
					txt: {
						more: '',
						noMore: '暂无更多数据'
					}
				},
				SettingsPay: null
			}
		},
		methods: {
			...mapActions([
				'getMobileChildrenNavs',
				'getNavsLinka',
				'getLinkaProfile'
			]),
			async getData() {
				if(this.MobileChildrenNavs.length == 0) {
					this.loading = true
				}
				const Settings = await api.getSettings('system_answer_price_settings')
				this.SettingsPay = Settings.data.value[0]
				await this.getMobileChildrenNavs()
				this.currentType = this.MobileChildrenNavs[0].id
				this.NavsLinkaData.id = this.MobileChildrenNavs[0].id
				this.NavsLinkaData.page = 1
				await this.getNavsLinka(true)
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
			async onloadrefresh() {
				await this.getNavsLinka()
			},
			async selectType(type) {
				this.currentType = type
				this.$nextTick(() => {
					var domHeader = this.$refs.header
					var itemSelected = domHeader.querySelector('.type-item.selected')
					var itemWidth = itemSelected.offsetWidth
					var itemLeft = itemSelected.offsetLeft
					var destOffset = itemLeft - (window.innerWidth - itemWidth) / 2
					if(destOffset < 0) {
						destOffset = 0
					}
					scrollLeft(domHeader, destOffset)
				})
				this.loading = true
				this.NavsLinkaData.id = type
				this.NavsLinkaData.data = []
				this.NavsLinkaData.page = 1
				await this.getNavsLinka(true)
				this.loading = false
				// TODO 在这里将type传播出去, 可使用Vuex/$emit-$on/事件总线的方式
			},
			showTogger(bl) {
				this.daka_show = bl
			},
			daka_check(item) {
				this.answers.linka_id = item.real_id
				this.answers.real_name = item.real_name
			},
			async askbtn() {
				if(this.answers.real_name == this.LinkaProfileData.real_name){
					this.$dialog.toast({
						mes: '无法提问自己',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
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
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.backspace_search {
		margin-left: .2rem;
		color: #444444;
	}
	
	.search_box {
		border-bottom: 1px solid #d1d1d1;
		background: #ffffff;
	}
	
	.wenka-list-help {
		vertical-align: super;
		color: #9A9DB5;
		margin-left: 0.02rem;
	}
	
	.seach-account-multiple {
		vertical-align: sub;
	}
	
	.seach-message-processing {
		vertical-align: sub;
		margin-left: .1rem;
	}
	
	::-webkit-scrollbar {
		display: none;
	}
	
	.type-choose-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 45px;
		z-index: 11;
	}
	
	.header-wrap {
		position: relative;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.types-header,
	.panel-header {
		height: 45px;
		display: flex;
		flex-wrap: nowrap;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.panel-header {
		background-color: #63c470;
		justify-content: space-between;
	}
	
	.header-wrap-inner {
		background-color: #FFFFFF;
		/*padding-right: 45px;*/
	}
	
	.pull-down {
		position: absolute;
		top: 0;
		right: 0;
		height: 45px;
		width: 45px;
		text-align: center;
	}
	
	.pull-down .magnify-icon {
		margin-top: .19rem;
		display: inline-block;
	}
	
	.type-item {
		flex-shrink: 0;
		height: 45px;
		margin: 0 34px;
		line-height: 45px;
		color: #101010;
		font-size: 15px;
	}
	
	.type-item.selected {
		border-bottom: 2.7px solid #42b0ff;
		color: #42b0ff;
	}
	
	.types-list {
		background-color: #fff;
		font-size: 14px;
		color: #333333;
		display: flex;
		flex-wrap: wrap;
	}
	
	.list-item {
		height: 45px;
		line-height: 45px;
		text-align: center;
		flex-shrink: 0;
		width: 25%;
		border-bottom: 1px solid #eeeeee;
		border-right: 1px solid #eeeeee;
	}
	
	.types-list>.list-item:nth-child(4n) {
		border-right: none;
	}
	
	.list-item.selected {
		font-weight: bold;
		color: #63c470;
		border-bottom: 2px solid #63c470;
	}
	
	.wenka-list-wp ul {
		background-color: #fff;
	}
	
	.wenka-list-wp li {
		height: 1.84rem;
		padding: .36rem .75rem 0 1.3rem;
		position: relative;
		border-bottom: 1px solid #e1e6e9;
	}
	
	.wenka-list-wp .ava img {
		width: 45px;
		height: 45px;
		position: absolute;
		top: .4rem;
		left: .3rem;
		background-position: 50% 50%;
		background-size: cover;
		border-radius: 50%;
	}
	
	.wenka-list-wp li .name {
		padding: .05rem 0 .1rem;
		display: block;
		font-size: 16px;
		line-height: 100%;
		color: #333;
	}
	
	.wenka-list-wp li .title {
		font-size: 13px;
		line-height: .44rem;
		display: block;
		color: #b0b0b0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.wenka-list-wp .on-mark .mark {
		border: 1px solid #32a0e6;
		background: #32a0e6;
	}
	
	.wenka-list-wp li .mark {
		border: 1px solid #bdc3c7;
		width: .36rem;
		height: .36rem;
		position: absolute;
		top: .78rem;
		right: .3rem;
		border-radius: 50%;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
	}
	
	.wenka-list-wp .on-mark .mark:before {
		position: absolute;
		content: ' ';
		width: .2rem;
		height: .12rem;
		border-left: .03rem solid #fff;
		border-bottom: .03rem solid #fff;
		left: .091rem;
		top: .081rem;
	}
	
	.wenka-list-wp .ask-btn {
		background: #32a0e6;
		color: #fff;
		height: .96rem;
		line-height: .96rem;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		font-size: 14px;
	}
	
	.wenka-list-wp {
		margin-top: 1rem;
		position: relative;
		height: 82vh;
		& .list-wrapper {
			background: none;
		}
	}
</style>
<style>
	.yd-search-input {
		background-color: #ffffff;
	}
	
	.yd-search-input:after,
	.yd-search-input:before {
		border: none;
	}
	
	.yd-search-input>.search-input {
		border: 1px solid #e3e3e3;
		border-radius: 30px;
	}
	
	.yd-input>input {
		outline: none;
		-webkit-appearance: none;
	}
	
	.search_hos_icon svg {
		width: 18px;
		height: 20px;
	}
	
	.icon_x_right svg {
		width: 18px;
		height: 20px;
	}
</style>