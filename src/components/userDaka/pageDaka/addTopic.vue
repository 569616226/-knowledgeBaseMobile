<template>
	<div v-title data-title="添加话题" v-loading="loading">
		<div class="addTopic">
			<div class="addTopic-name">
				<p>话题名称</p>
				<input type="text" v-model="topicList.name" placeholder="实例：如何出版一本属于自己的书？" />
			</div>
			<div class="addTopic-type">
				<p>服务类型</p>
				<div class="addTopic-type-row">
					<div v-for="item,index in typeList" :key="index" :class="topicList.type == item.value ? 'addTopic-type-row-flex active' : 'addTopic-type-row-flex'" @click="clickType(item)">
						<span>{{item.title}}</span>
					</div>
				</div>
			</div>
			<div class="addTopic-time">
				<p>服务时长</p>
				<div class="addTopic-time-row">
					<div v-for="item,index in ucList" :key="index" :class="topicList.time == item.value ? 'addTopic-time-row-flex active' : 'addTopic-time-row-flex'" @click="clickTime(item)">
						<span>{{item.time}}</span>
					</div>
				</div>
			</div>
			<div class="addTopic-price">
				<p>话题价格</p>
				<div class="addTopic-price-b">
					<input type="text" v-model="topicList.price" placeholder="请输入金额数字" />
					<span>元/次</span>
				</div>
			</div>
			<div class="addTopic-present" @click="clickPresent">
				<p class="addTopic-present-title">服务介绍</p>
				<div class="addTopic-present-b">
					<p class="addTopic-present-b-p1" v-html="topicList.present"></p>
				</div>
			</div>
			<div class="addTopic-present" @click="clickAnswer">
				<p class="addTopic-present-title">您想了解的学员信息</p>
				<div class="addTopic-present-b">
					<p>请问学员：</p>
					<div v-for="item,index in topicList.info" :key="index">{{item.title}}</div>
				</div>
			</div>
			<div style="height: 1.2rem;"></div>
			<div class="addTopic-btn" @click="clickTi">
				<span>提交</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		components: {

		},
		data() {
			return {
				loading: false,
				typeList: [{
					title: '线下约见',
					value: 0
				}, {
					title: '全国通话',
					value: 1
				}],
				ucList: [],
				underList: [{
					time: '1小时',
					value: 1
				}, {
					time: '1.5小时',
					value: 1.5
				}, {
					time: '2小时',
					value: 2
				}, {
					time: '3小时',
					value: 3
				}],
				callList: [{
					time: '15分钟',
					value: 15
				}, {
					time: '30分钟',
					value: 30
				}, {
					time: '45分钟',
					value: 45
				}, {
					time: '60分钟',
					value: 60
				}]
			}
		},
		computed: {
			...mapState([
				'topicList'
			])
		},
		methods: {
			clickType(item) {
				this.topicList.type = item.value
				if(item.title == '线下约见') {
					this.ucList = this.underList
				} else {
					this.ucList = this.callList
				}
			},
			clickTime(item) {
				this.topicList.time = item.value
			},
			Dialog(item) {
				this.$dialog.toast({
					mes: item,
					icon: 'error',
					timeout: 1000
				})
			},
			async clickTi() {
				if(this.topicList.name == '') {
					this.Dialog('请填写话题名称')
					return false
				}
				if(this.topicList.type == null) {
					this.Dialog('请选择服务类型')
					return false
				}
				if(this.topicList.time == null) {
					this.Dialog('请选择服务时间')
					return false
				}
				if(this.topicList.price == null) {
					this.Dialog('请填写话题价格')
					return false
				}
				if(this.topicList.present == '') {
					this.Dialog('请填写服务介绍')
					return false
				}
				if(this.topicList.info.length == 0) {
					this.Dialog('请填写信息')
					return false
				}
				this.loading = true
				if(this.$route.params.id) {
					this.topicList.id = this.$route.params.id
					await api.postTopicsid(this.topicList)
				} else {
					await api.postTopics(this.topicList)
				}
				this.$dialog.toast({
					mes: '提交成功',
					icon: 'success',
					timeout: 1000
				})
				this.topicList.name = ''
				this.topicList.type = null
				this.topicList.time = null
				this.topicList.price = null
				this.topicList.present = ''
				this.topicList.info = []
				this.loading = false
				this.$router.push({
					name: 'pageDaka'
				})
			},
			async getData() {
				this.loading = true
				const data = await api.getLinkaTopicDetail(this.$route.params.id)
				this.topicList.name = data.data.title
				if(data.data.ser_type == '线下约见') {
					this.topicList.type = 0
					this.ucList = this.underList
				} else {
					this.topicList.type = 1
					this.ucList = this.callList
				}
				this.topicList.time = data.data.ser_time
				this.topicList.price = data.data.price
				this.topicList.present = data.data.describe
				this.topicList.info = data.data.need_infos
				this.loading = false
			},
			clickPresent() {
				const id = this.$route.params.id
				if(id) {
					this.$router.push({
						name: 'editTopicPresent',
						id: id
					})
				}else{
					this.$router.push({
						name: 'topicPresent'
					})
				}
			},
			clickAnswer() {
				const id = this.$route.params.id
				if(id) {
					this.$router.push({
						name: 'editTopicAnwser',
						id: id
					})
				}else{
					this.$router.push({
						name: 'topicAnwser'
					})
				}
			}
		},
		mounted() {
			if(this.$route.params.id) {
				this.getData()
			}
			this.ucList = this.underList
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.addTopic {
		&-name {
			margin: 0 .2rem;
			& p {
				padding: .25rem 0;
				font-weight: bold;
				font-size: .28rem;
			}
			& input {
				color: #b0b0b0;
				background: white;
				box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
				border: none;
				border-radius: 4px;
				font-size: .28rem;
				padding: .3rem .2rem;
				width: 100%;
			}
		}
		&-present {
			margin: 0 .2rem;
			&-b {
				padding: .35rem .2rem .6rem .3rem;
				background: #fff;
				box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
				font-size: .28rem;
				line-height: 20px;
				color: #b0b0b0;
				border-radius: 4px;
				& p {
					margin-bottom: .15rem;
				}
				&-p1 {
					white-space: normal;
					word-break: break-all;
					text-overflow: ellipsis;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					display: -webkit-box;
				}
			}
			&-title {
				padding: .25rem 0;
				font-weight: bold;
				font-size: .28rem;
			}
		}
		&-price {
			margin: 0 .2rem;
			&-b {
				position: relative;
				& input {
					color: #b0b0b0;
					background: white;
					box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
					border: none;
					border-radius: 4px;
					font-size: .28rem;
					padding: .3rem .2rem;
					width: 100%;
				}
				& span {
					position: absolute;
					right: .2rem;
					top: .27rem;
					font-size: .3rem;
					color: #999999;
				}
			}
			& p {
				padding: .25rem 0;
				font-weight: bold;
				font-size: .28rem;
			}
		}
		&-type {
			margin: .2rem .2rem 0 .2rem;
			& p {
				padding: .25rem 0;
				font-weight: bold;
				font-size: .28rem;
			}
			&-row {
				display: flex;
				justify-content: space-between;
				text-align: center;
				& .active {
					color: #29B6F6;
					border: 1px solid #29b6f6;
				}
				&-flex {
					width: 48%;
					background: #ffffff;
					color: #999999;
					box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
					border-radius: 4px;
					font-size: .28rem;
					border: 1px solid transparent;
					height: .84rem;
					line-height: .84rem;
				}
			}
		}
		&-time {
			margin: .2rem .2rem 0 .2rem;
			& p {
				padding: .25rem 0;
				font-weight: bold;
				font-size: .28rem;
			}
			&-row {
				display: flex;
				justify-content: space-between;
				text-align: center;
				& .active {
					color: #29B6F6;
					border: 1px solid #29b6f6;
				}
				&-flex {
					width: 23%;
					background: #ffffff;
					color: #999999;
					box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
					border-radius: 4px;
					font-size: .28rem;
					border: 1px solid transparent;
					height: .84rem;
					line-height: .84rem;
				}
			}
		}
		&-btn {
			text-align: center;
			color: rgb(255, 255, 255);
			background-color: rgb(41, 182, 246);
			height: .9rem;
			line-height: .9rem;
			font-size: .28rem;
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
<style>

</style>