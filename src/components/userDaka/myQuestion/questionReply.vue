<template>
	<div v-title data-title="问题详情" v-loading="loading">
		<div class="wrapper question-wrapper ">

			<div class="wgt-ask">
				<p class="browse-title">{{data.name}}</p>
			</div>
			<div class="wgt-answer">
				<div class="placeholder"></div>
				<div class="answer-expert-detail">
					<a href="javascript:void(0)" class="expert-detail-avatar">
						<img class="expert-avatar" :src="data.linka_avatar" width="25" height="25">
					</a>
					<a href="javascript:void(0)" class="expert-detail">
						<p class="answer-detail-vh mr-10">{{data.linka_name}}</p>
						<p class="expert-detail-position">{{data.linka_office}}</p>
					</a>
					<div class="clear"></div>
				</div>
				<div class="answer">
					<div class="to-answer">
						<img src="../../../assets/nothing.png" />
						<p class="to-answer-time">
							剩余{{data.display_time}}问题失效
						</p>
						<div class="to-answer-btn" @click="next">
							<span>回答问题</span>
						</div>
					</div>
					<div class="placeholder"></div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import api from '@/utils/api'
	export default {
		components: {

		},
		data() {
			return {
				loading: false,
				data: []
			}
		},
		methods: {
			async getData() {
				this.loading = true
				const data = await api.getGuestAnswersDetail(this.$route.params.id)
				this.data = data.data
				if(this.data.status == '已回答' || this.data.status == '已关闭') {
					this.$router.push({
						name: 'questiondetail',
						params: {
							id: this.$route.params.id
						}
					})
				}
				this.loading = false
			},
			next() {
				this.$router.push({
					name: 'questionWrite',
					params: {
						id: this.$route.params.id
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
<style scoped>
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
		background: url(../../../assets/answer.png) no-repeat;
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
		padding-bottom: .6rem;
	}
	
	.wgt-answer .answer .to-answer .to-answer-title {
		font-size: 18.0px;
		line-height: 26px;
	}
	
	.wgt-answer .answer img {
		width: 100%;
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
		margin: 6px 0 35px 0;
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