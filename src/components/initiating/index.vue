<template>
	<div v-title data-title="发起预约" v-loading="loading">
		<div class="initiating">
			<div class="initiating-t">
				<p class="initiating-t-title">{{LinkaTopicDetailData.title}}</p>
				<p class="initiating-t-time">
					<span class="margin-r" v-if="LinkaTopicDetailData.ser_type == '全国通话'"><clock class="initiating-t-time-clock" fillColor="#FFFFFF"/>{{LinkaTopicDetailData.ser_time}}分钟/次</span>
					<span class="margin-r" v-else><clock class="initiating-t-time-clock" fillColor="#FFFFFF"/>{{LinkaTopicDetailData.ser_time}}小时/次</span>
					<span class="margin-r"><package-up class="initiating-t-time-package" fillColor="#FFFFFF"/>{{LinkaTopicDetailData.price}}元/次</span>
					<span class="margin-r" v-if="LinkaTopicDetailData.ser_type == '全国通话'"><dns class="initiating-t-time-dns" fillColor="#FFFFFF"/>{{LinkaTopicDetailData.ser_type}}</span>
					<span class="margin-r" v-else><dns class="initiating-t-time-dns" fillColor="#FFFFFF"/>{{LinkaTopicDetailData.ser_type}}</span>
				</p>
				<div class="v-step-warp-horizontal style2">
					<div class="v-step-progress-bg">
						<div class="v-step-progress-value" style="background-color: #ffffff;width: 10%;"></div>
					</div>
					<ul class="v-step-list">
						<li class="v-step-item" style="width: 20%;">
							<div class="v-step-item-number" style="background-color: #1DA4FF;"></div>
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
			<div class="initiating-a" @click="initiating_a">
				<p class="initiating-a-title">您请教大咖的问题</p>
				<div class="initiating-a-content">
					<p>老师你好，希望以下问题能获得您的指点：</p>
					<p class="initiating-a-content-list" v-for="item,index in initiating.answers" :key="index">{{index+1}}、{{item}}</p>
				</div>
			</div>
			<div class="initiating-a" @click="initiating_present">
				<p class="initiating-a-title">您的自我介绍</p>
				<div class="initiating-a-content">
					<p>{{initiating.profile}}</p>
				</div>
			</div>
			<div class="initiating-a">
				<p class="initiating-a-title">我的联系方式</p>
				<span class="initiating-a-revise" @click="edit" v-if="!show"><pencil fillColor="#9A9DB5" width="12"/>修改</span>
				<span class="initiating-a-revise" @click="finish" v-else>完成</span>
				<div class="initiating-a-content">
					<yd-flexbox>
						<div>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
						<yd-flexbox-item style="color: rgb(16, 16, 16);" v-if="!show">{{LinkaProfileData.real_name}}</yd-flexbox-item>
						<yd-flexbox-item style="color: rgb(16, 16, 16);" v-else>
							<yd-input v-model="LinkaProfileData.real_name" placeholder="请输入姓名" ref="input1"></yd-input>
						</yd-flexbox-item>
					</yd-flexbox>
					<yd-flexbox style="margin-top: .2rem;">
						<div>手机号：</div>
						<yd-flexbox-item style="color: rgb(16, 16, 16);" v-if="!show">{{LinkaProfileData.phone}}</yd-flexbox-item>
						<yd-flexbox-item style="color: rgb(16, 16, 16);" v-else>
							<yd-input v-model="LinkaProfileData.phone" placeholder="请输入姓名"></yd-input>
						</yd-flexbox-item>
					</yd-flexbox>
				</div>
			</div>
			<div style="height: 1.1rem;"></div>
			<div class="initiating-btn" @click="initiating_btn">
				<span>提交</span>
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
	import pencil from "vue-material-design-icons/pencil" //修改图标
	export default {
		components: {
			clock,
			PackageUp,
			dns,
			pencil
		},
		created() {

		},
		data() {
			return {
				loading: false,
				show: false
			}
		},
		methods: {
			...mapActions([
				'getLinkaTopicDetail',
				'getLinkaProfile'
			]),
			async finish() {
				if(!this.LinkaProfileData.real_name) {
					this.$dialog.toast({
						mes: '请填写姓名',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				if(!this.LinkaProfileData.phone) {
					this.$dialog.toast({
						mes: '请填写手机号',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				await api.putGuests(this.LinkaProfileData)
				this.show = false
				this.loading = false
			},
			edit() {
				this.show = true
				this.$nextTick(() => {
					this.$refs.input1.setFocus()
				})
			},
			initiating_a() {
				this.$parent.index = false
				this.$parent.anwser = true
				this.$parent.present = false
			},
			initiating_present() {
				this.$parent.index = false
				this.$parent.anwser = false
				this.$parent.present = true
			},
			async initiating_btn() {
				if(this.initiating.answers.length == 0) {
					this.$dialog.toast({
						mes: '请填写问题',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				if(this.initiating.profile == 0) {
					this.$dialog.toast({
						mes: '请填写介绍',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				if(!this.LinkaProfileData.real_name) {
					this.$dialog.toast({
						mes: '请填写姓名',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				if(!this.LinkaProfileData.phone) {
					this.$dialog.toast({
						mes: '请填写手机号',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				this.initiating.topic_id = this.LinkaTopicDetailData.real_id
				const data = await api.postAppoints(this.initiating)
				this.loading = false
				this.$dialog.toast({
					mes: '提交成功',
					icon: 'success',
					timeout: 1000
				})
				this.$router.push({
					name: 'userMake'
				})
			},
			async getData() {
				if(this.LinkaTopicDetailData.length == 0) {
					this.loading = true
				}
				await this.getLinkaTopicDetail(this.$route.params.id)
				await this.getLinkaProfile()
				this.loading = false
			},
		},
		props: ['index', 'anwser', 'present'],
		computed: {
			...mapState([
				'LinkaTopicDetailData',
				'initiating',
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
<style scoped>
	.initiating-a-revise {
		position: absolute;
		right: .2rem;
		top: .3rem;
		color: #9A9DB5;
		font-size: 12px;
	}
	
	.initiating-a-revise .pencil-icon {
		vertical-align: middle;
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
	
	.initiating-a-content p {
		white-space: normal;
		word-break: break-all;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		display: -webkit-box;
	}
	
	.initiating-a-content-list {
		margin-top: .2rem;
		white-space: normal;
		word-break: break-all;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		display: -webkit-box;
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
	
	.initiating-t-san {
		position: absolute;
		bottom: 0px;
		width: 14px;
		height: 11.5px;
		fill: #EFF2F4;
		left: .65rem;
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
</style>