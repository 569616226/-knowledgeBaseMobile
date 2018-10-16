<template>
	<div v-title data-title="大咖详情" v-loading="loading">
		<div class="exp-index-wp">
			<div class="expert-info" id="expert-info">
				<div class="head-banner" v-if="MobileLinkasDetailData">
					<img v-if="MobileLinkasDetailData.cover" :src="MobileLinkasDetailData.cover" style="width: 100%;" />
					<img v-else src="../assets/cover.png" style="width: 100%;" />
					<div class="exp-dt-info">
						<p class="b-name">{{MobileLinkasDetailData.real_name}}</p>
						<p class="b-job">{{MobileLinkasDetailData.office}}</p>
					</div>
					<home-icon fillColor="#ffffff" class="detail-home" @click.native="home" />
				</div>
				<div class="expert-info-more">
					<p class="info-more-content">
						<heart class="dakadetail-heart" fillColor="rgb(154, 157, 181)" /><span><span id="exp-fav-num" class="info-blue">{{MobileLinkasDetailData.likes}}</span>人喜欢</span><b class="info-more-split"></b>
						<account class="dakadetail-heart" fillColor="rgb(154, 157, 181)" /><span>帮助过<span class="info-blue">{{MobileLinkasDetailData.helpers}}</span>人</span>
						<span class="info-more-position">{{MobileLinkasDetailData.city}}<span class="s">·</span>{{MobileLinkasDetailData.location}}</span>
					</p>
				</div>
				<div class="head-info">
					<div class="exp-brief">
						<p class="exp-brief-title">关于大咖</p>
						<p class="exp-brief-content" v-html="MobileLinkasDetailData.profile"></p>
						<router-link :to="{ name: 'dakapresent' ,params: {id: $route.params.id}}" class="exp-brief-more-btn">查看介绍</router-link>
					</div>
				</div>
			</div>
			<div v-if="MobileLinkasDetailData.appoint_appraises">
				<div class="comment-answer" v-if="MobileLinkasDetailData.appoint_appraises.length > 0">
					<div class="exp-com-title-comment">内容回顾</div>
					<div class="item-wp-comment">
						<div class="item">
							<div class="comment-user">
								<span class="avatar">
								<img :src="MobileLinkasDetailData.appoint_appraises[0].guest_avatar" />
							</span> {{MobileLinkasDetailData.appoint_appraises[0].guest_name}}
							</div>
							<div class="comment-text">
								{{MobileLinkasDetailData.appoint_appraises[0].content}}
							</div>
							<div class="comment-course">
								话题名称：{{MobileLinkasDetailData.appoint_appraises[0].topic_name}}
							</div>
						</div>
					</div>
					<router-link v-if="MobileLinkasDetailData.appoint_appraises.length > 1" :to="{ name: 'dakaassess' }" class="exp-com-btn-comment">查看{{MobileLinkasDetailData.appoint_appraises.length}}条评论</router-link>
				</div>
			</div>
			<yd-tab active-color="#29b6f6" class="comment-tab" v-if="MobileLinkasDetailData.answers">
				<yd-tab-panel :label="'问答' + '(' + MobileLinkasDetailData.answers.data.length + ')'">
					<wen-da :answer="MobileLinkasDetailData.answers.data"></wen-da>
				</yd-tab-panel>
				<yd-tab-panel :label="'话题' + '(' + MobileLinkasDetailData.topics.data.length + ')'">
					<hua-ti :topic="MobileLinkasDetailData.topics.data" :linkdeatil="LinkaProfileData"></hua-ti>
				</yd-tab-panel>
				<yd-tab-panel :label="'文章' + '(' + MobileLinkasDetailData.articles.data.length + ')'">
					<wen-zhang :articles="MobileLinkasDetailData.articles.data"></wen-zhang>
				</yd-tab-panel>
			</yd-tab>
		</div>
		<div class="footer-wp clear" v-if="MobileLinkasDetailData.real_id">
			<span class="f-btn collect-btn" @click="like" v-if="!MobileLinkasDetailData.is_like"><heart class="collect-heart" fillColor="rgb(154, 157, 181)" />喜欢</span>
			<span class="f-btn collect-btn liked" @click="like" v-else><heart class="collect-heart" fillColor="#ff5e68" />已喜欢</span>
			<span class="f-btn ask-btn" @click="quiz">向TA提问</span>
			<span class="f-btn visit-btn" @click="next">立即约见</span>
		</div>
		<yd-popup v-model="show2" position="bottom" height="60%">
			<div class="initiating-resh" v-if="MobileLinkasDetailData.topics">
				<div class="initiating-resh-b">
					<p class="initiating-resh-b-title">请选择话题</p>
					<div class="initiating-resh-b-list">
						<p v-for="item,index in MobileLinkasDetailData.topics.data" :key="index" :class="item.id == topicId ? 'resh' : ''" @click="check_resh(item)">{{item.title}}</p>
					</div>
					<div style="height: 1.1rem;"></div>
					<div class="initiating-resh-b-btn" @click="nextTopic">确定</div>
				</div>
			</div>
		</yd-popup>
		<yd-popup v-model="showData.dakaShow" position="center" width="90%">
			<div style="background: #FFFFFF;">
				<p class="dakadetail-bind-p1">绑定手机号</p>
				<yd-cell-group>
					<yd-cell-item>
						<yd-icon slot="icon" name="phone3" size=".45rem" color="#7d7d7d"></yd-icon>
						<input type="text" slot="right" placeholder="请输入11位手机号" v-model="mobile" maxlength="11">

						<!-- ↓↓关键代码是这里↓↓ -->
						<yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" init-str="获取验证码" reset-str="重新获取" type="warning"></yd-sendcode>
						<!-- ↑↑关键代码是这里↑↑ -->

					</yd-cell-item>
				</yd-cell-group>
				<yd-cell-item>
					<security slot="icon" fillColor="#7d7d7d" width="20" />
					<yd-input slot="right" v-model="code" placeholder="请输入4位验证码"></yd-input>
				</yd-cell-item>
				<yd-button size="large" bgcolor="#42b0ff" color="#ffffff" @click.native="sumbit">提交</yd-button>
			</div>
		</yd-popup>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import heart from "vue-material-design-icons/heart" //关注图标
	import account from "vue-material-design-icons/account-multiple" //帮助图标
	import WenDa from "../components/dakadetail/WenDa"
	import HuaTi from "../components/dakadetail/HuaTi"
	import WenZhang from "../components/dakadetail/WenZhang"
	import security from "vue-material-design-icons/security"
	import HomeIcon from "vue-material-design-icons/home"
	export default {
		components: {
			heart,
			account,
			WenDa,
			HuaTi,
			WenZhang,
			security,
			HomeIcon
		},
		data() {
			return {
				loading: false,
				data: [],
				show1: false,
				show2: false,
				topicId: null,
				start1: false,
				code: '',
				mobile: ''
			}
		},
		computed: {
			...mapState([
				'MobileLinkasDetailData',
				'LinkaProfileData',
				'showData'
			])
		},
		methods: {
			...mapActions([
				'getMobileLinkasDetail',
				'getLinkaProfile'
			]),
			home() {
				this.$router.push({
					name: 'index'
				})
			},
			async sendCode1() {
				let phone = this.mobile
				if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
					this.mobile = ''
				} else {
					this.$dialog.loading.open('发送中...');
					await api.getSmsCode(this.mobile)
					setTimeout(() => {
						this.start1 = true;
						this.$dialog.loading.close();
						this.$dialog.toast({
							mes: '已发送',
							icon: 'success',
							timeout: 1500
						});
					}, 1000);
				}
			},
			async sumbit() {
				if(this.mobile == '' || !(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.mobile))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
				} else if(this.code == '') {
					this.$dialog.toast({
						mes: '请填写验证码',
						icon: 'error',
						timeout: 1500
					});
				} else {
					// 提交绑定
					this.loading = true
					const data = await api.CheckSmsCode(this.mobile, this.code)
					if(data.status) {
						this.loading = false
						this.$dialog.toast({
							mes: '绑定成功',
							icon: 'success',
							timeout: 1500
						})
						this.showData.dakaShow = false
						this.show2 = true
					}
				}
			},
			async getData() {
				this.loading = true
				await this.getMobileLinkasDetail(this.$route.params.id)
				await this.getLinkaProfile()
				this.loading = false
			},
			async like() {
				const data = await api.postLikeLinka(this.MobileLinkasDetailData.real_id)
				await this.getMobileLinkasDetail(this.$route.params.id)
				if(this.MobileLinkasDetailData.is_like) {
					this.$dialog.toast({
						mes: '已喜欢大咖',
						icon: 'success',
						timeout: 1500
					})
				} else {
					this.$dialog.toast({
						mes: '已取消',
						icon: 'error',
						timeout: 1500
					})
				}
			},
			quiz() {
				if(this.MobileLinkasDetailData.real_name == this.LinkaProfileData.real_name){
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
						id: this.MobileLinkasDetailData.real_id
					}
				})
			},
			async next() {
				if(this.MobileLinkasDetailData.real_name == this.LinkaProfileData.real_name){
					this.$dialog.toast({
						mes: '无法约见自己',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				if(this.MobileLinkasDetailData.topics.data.length == 0) {
					this.$dialog.toast({
						mes: '该大咖暂时没有话题',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				if(this.LinkaProfileData.phone == null) {
					this.showData.dakaShow = true
					return false
				}
				this.show2 = true
			},
			check_resh(item) {
				this.topicId = item.id
			},
			nextTopic() {
				if(this.topicId == null) {
					this.$dialog.toast({
						mes: '请选择话题',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.$router.push({
					name: 'makedaka',
					params: {
						id: this.topicId
					}
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
<style lang="less" rel="stylesheet/less" scoped>
	.dakadetail-bind-p1 {
		padding: .3rem;
		font-size: .28rem;
		color: #424040;
	}
	
	.detail-home {
		position: absolute;
		top: .2rem;
		left: .2rem;
	}
	
	.initiating-resh {
		background: rgba(16, 16, 16, .6);
		z-index: 9;
		&-a {
			height: 100%;
			width: 100%;
		}
		&-b {
			background: #ffffff;
			text-align: center;
			z-index: 10;
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
			}
			&-btn {
				height: .9rem;
				line-height: .9rem;
				color: #ffffff;
				background-color: rgb(41, 182, 246);
				margin-top: .3rem;
				position: fixed;
				width: 100%;
				bottom: 0;
			}
		}
	}
	
	.liked {
		color: #ff5e68 !important;
	}
	
	.exp-index-wp {
		padding-bottom: 1.2rem;
	}
	
	.comment-tab {
		margin-top: .2rem;
	}
	
	.expert-info .head-banner {
		position: relative;
		color: #fff;
	}
	
	.expert-info .head-banner .exp-dt-info {
		position: absolute;
		bottom: .3rem;
		margin: 0 .2rem;
		font-size: .26rem;
		z-index: 10;
		max-width: 80%;
	}
	
	.expert-info .head-banner .exp-dt-info .b-name {
		font-size: .38rem;
		text-shadow: 0.5px 0.5px 0.5px #000000;
	}
	
	.expert-info .head-banner .exp-dt-info p {
		margin-top: .04rem;
		line-height: 1;
	}
	
	.expert-info .head-banner .exp-dt-info .b-job {
		font-weight: 300;
		font-size: .24rem;
		margin: .15rem 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-shadow: 0.5px 0.5px 0.5px #000000;
	}
	
	.expert-info .head-banner .b-score {
		position: absolute;
		right: .2rem;
		bottom: .3rem;
		z-index: 10;
	}
	
	.expert-info .head-banner .b-score span {
		font-size: .24rem;
	}
	
	.expert-info .head-banner .b-score .b-score-num {
		font-size: .48rem;
	}
	
	.expert-info .expert-info-more {
		height: .9rem;
		line-height: .9rem;
		background: #FFF;
		color: #9FA8B3;
	}
	
	.expert-info .expert-info-more .info-more-content {
		font-size: .24rem;
		margin: 0 .2rem;
	}
	
	.expert-info .expert-info-more .info-blue {
		color: #32A0E6;
		font-size: .25rem;
	}
	
	.expert-info .expert-info-more .info-more-split {
		display: inline-block;
		width: .02rem;
		height: .26rem;
		margin: 0 .15rem;
		background-color: #fff;
		position: relative;
		top: .04rem;
	}
	
	.expert-info .expert-info-more .info-more-position {
		float: right;
	}
	
	.expert-info .expert-info-more .s {
		margin: 0 .05rem;
		font-weight: bolder;
	}
	
	.expert-info .head-info {
		background-color: #fff;
		margin: .2rem 0 0;
		padding-top: .4rem;
		border-radius: .1rem;
		position: relative;
	}
	
	.expert-info .head-info .exp-brief {
		font-size: .3rem;
		color: #333;
		line-height: .4rem;
	}
	
	.expert-info .head-info .exp-brief .exp-brief-title {
		font-weight: 700;
		padding: 0 .3rem;
	}
	
	.expert-info .head-info .exp-brief .exp-brief-content {
		color: #555;
		padding: .4rem .3rem;
		border-bottom: 1px solid #F0F2F4;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 2.1rem;
	}
	
	.expert-info .head-info .exp-brief .exp-brief-more-btn {
		height: .9rem;
		margin: 0 2.7rem;
		line-height: .9rem;
		font-size: .28rem;
		padding: 0 .6rem 0 .3rem;
		display: block;
		color: #32a0e6;
		text-align: center;
		position: relative;
	}
	
	.expert-info .head-info .exp-brief .exp-brief-more-btn::after {
		content: '';
		position: absolute;
		border-top: 1px solid #32a0e6;
		border-right: 1px solid #32a0e6;
		width: .12rem;
		height: .12rem;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		right: .32rem;
		top: .37rem;
	}
	
	.comment-answer {
		margin: .2rem 0 0;
		padding-top: .4rem;
		background: #FFF;
	}
	
	.comment-answer .exp-com-title-comment {
		font-weight: 700;
		padding: 0 .3rem;
		background: #FFF;
	}
	
	.comment-answer .item-wp-comment {
		border-radius: .1rem;
		background: #fff;
		padding: .3rem;
		color: #333;
		border-bottom: 1px solid #F0F2F4;
	}
	
	.comment-answer .comment-user {
		height: .5rem;
		position: relative;
		padding-left: .7rem;
		font-size: .26rem;
		line-height: .5rem;
	}
	
	.comment-answer .comment-user .avatar {
		width: .5rem;
		height: .5rem;
		background-color: #f0f8ff;
		background-position: 50% 50%;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.comment-answer .comment-user .avatar img {
		width: 100%;
		border-radius: 50%;
	}
	
	.comment-answer .comment-text {
		font-size: .3rem;
		line-height: .4rem;
		padding: .15rem 0;
	}
	
	.comment-answer .comment-course {
		padding-top: .15rem;
		color: #919ca9;
		font-size: .26rem;
		line-height: 1;
	}
	
	.comment-answer .exp-com-btn-comment {
		height: .9rem;
		margin: 0 2.4rem;
		line-height: .9rem;
		font-size: .28rem;
		padding: 0 .6rem 0 .3rem;
		display: block;
		color: #32a0e6;
		text-align: center;
		position: relative;
	}
	
	.comment-answer .exp-com-btn-comment::after {
		content: '';
		position: absolute;
		border-top: 1px solid #32a0e6;
		border-right: 1px solid #32a0e6;
		width: .12rem;
		height: .12rem;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		right: .32rem;
		top: .37rem;
	}
	
	.footer-wp {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	
	.footer-wp .collect-btn {
		width: 20%;
		background: #fff;
		color: #9d9d9d;
		font-size: .2rem;
	}
	
	.footer-wp .f-btn {
		float: left;
		height: .96rem;
		text-align: center;
	}
	
	.footer-wp .ask-btn {
		width: 35%;
		background: #84c6f0;
		color: #fff;
		font-size: .34rem;
		line-height: .96rem;
	}
	
	.footer-wp .visit-btn {
		width: 45%;
		background: #32a0e6;
		color: #fff;
		font-size: .34rem;
		line-height: .96rem;
	}
</style>
<style>
	.dakadetail-heart svg {
		width: 14px;
		height: 14px;
	}
	
	.dakadetail-heart {
		vertical-align: middle;
		margin-right: .04rem;
		margin-top: .05rem;
		display: inline-block;
	}
	
	.collect-heart svg {
		width: 19px;
		height: 19px;
	}
	
	.collect-heart {
		margin-top: .1rem;
		display: block;
	}
	
	.yd-cell-item:not(:last-child):after {
		border-bottom: none;
	}
	
	.yd-cell:after {
		border-bottom: none;
	}
</style>