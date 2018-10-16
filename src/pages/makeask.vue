<template>
	<div class="container" v-title data-title="约·问" v-loading="loading">
		<scroll ref="scroll" :data="TopicArticleAnswersData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
			<div class="index-wonderful" v-for="item,index in TopicArticleAnswersData.data" :key="index">
				<router-link :to="{name: 'questiondetail', params: { id: item.id }}" v-if="item.object == 'Answer'">
					<div class="index-wonderful-content">
						<div class="index-wonderful-content-head">
							<div class="index-wonderful-content-head-l width10">
								<img :src="item.answer_avatar" />
							</div>
							<div class="index-wonderful-content-head-l width85 margin-left-2x">
								<p class="index-wonderful-content-head-l-p1">
									<span class="index-wonderful-content-head-l-p1-span1">
										{{item.answer_name}}
									</span>
									<span class="index-wonderful-content-head-l-p1-span2">
										 <font color="#d6d6d6">丨</font>
										{{item.answer_office}}
									</span>
									<p class="index-wonderful-content-head-l-p1-span2">
										发表的回答
									</p>
								</p>
							</div>
							<div class="clear"></div>
						</div>
						<div class="index-wonderful-content-text">
							<p>{{item.name}}</p>
						</div>
						<div class="index-wonderful-content-down">
							<eye-icon fillColor="#D6D6D6"></eye-icon>
							<span class="index-wonderful-content-down-eye">{{item.readers}}</span>
							<span class="index-wonderful-content-down-rate">
								<yd-rate v-model="item.star" size="14px" color="#d6d6d6" active-color="#ffd600" :readonly="true"></yd-rate>
							</span>
							<span class="blue-money" v-if="!item.is_reader"><strong style="font-size: 16px;">1</strong>元</span>
							<span class="red-check" v-else>已查看</span>
						</div>
					</div>
				</router-link>
				<router-link :to="{name: 'dakadetail', params: { id: item.guest_id }}" v-if="item.object == 'Topic'">
					<div class="index-wonderful-content">
						<div class="index-wonderful-content-head">
							<div class="index-wonderful-content-head-l width10">
								<img :src="item.guest_avatar" />
							</div>
							<div class="index-wonderful-content-head-l width85 margin-left-2x">
								<p class="index-wonderful-content-head-l-p1">
									<span class="index-wonderful-content-head-l-p1-span1">
										{{item.guest_name}}
									</span>
									<span class="index-wonderful-content-head-l-p1-span2">
										<font color="#d6d6d6">丨</font>
										{{item.guest_office}}
									</span>
									<p class="index-wonderful-content-head-l-p1-span2">
										接受了学员{{item.appoint_guest_name}}的话题预约
									</p>
								</p>
							</div>
							<div class="clear"></div>
						</div>
						<div class="index-wonderful-content-text2">
							<div class="index-wonderful-content-text-make">
								<span class="index-wonderful-content-text-make-call" v-if="item.ser_type == '全国通话'">全国通话</span>
								<span class="index-wonderful-content-text-make-yue" v-else>线下约见</span>
								<p class="index-wonderful-content-text-make-yuan">
									<b>{{item.price}}</b>元/次
								</p>
								<p class="index-wonderful-content-text-make-title">
									{{item.title}}
								</p>
								<p class="index-wonderful-content-text-make-content" v-html="item.describe"></p>
								<p class="index-wonderful-content-text-make-time" v-if="item.ser_type == '全国通话'">
									<clock fillColor="#9A9DB5" />{{item.ser_time}}分钟/次
								</p>
								<p class="index-wonderful-content-text-make-time" v-else>
									<clock fillColor="#9A9DB5" />{{item.ser_time}}小时/次
								</p>
							</div>
						</div>
					</div>
				</router-link>
				<router-link :to="{name: 'essay', params: { id: item.id }}" v-if="item.object == 'Article'">
					<div class="index-wonderful-content">
						<div class="index-wonderful-content-head">
							<div class="index-wonderful-content-head-l width10">
								<img :src="item.guest_avatar" />
							</div>
							<div class="index-wonderful-content-head-l width85 margin-left-2x">
								<p class="index-wonderful-content-head-l-p1">
									<span class="index-wonderful-content-head-l-p1-span1">
										{{item.guest_name}}
									</span>
									<span class="index-wonderful-content-head-l-p1-span2">
										<font color="#d6d6d6">丨</font>
										{{item.guest_office}}
									</span>
									<p class="index-wonderful-content-head-l-p1-span2">
										发表了文章
									</p>
								</p>
							</div>
							<div class="clear"></div>
						</div>
						<div class="index-wonderful-content-text">
							<img :src="item.cover" class="index-wonderful-content-text-img" />
							<p class="index-wonderful-content-text-essay">{{item.title}}</p>
						</div>
					</div>
				</router-link>
			</div>
			<div style="height: 1.1rem;"></div>
		</scroll>
		<bottom-nav :makeask="makeask"></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import BottomNav from '../components/common/BottomNav' //底部导航
	import EyeIcon from "vue-material-design-icons/eye"
	import clock from "vue-material-design-icons/clock"
	export default {
		name: 'index',
		components: {
			BottomNav,
			EyeIcon,
			clock,
			Scroll
		},
		data() {
			return {
				makeask: true,
				rate: 4,
				loading: false,
				pullUpLoad: {
					threshold: 10,
					txt: {
						more: '',
						noMore: '暂无更多数据'
					}
				}
			}
		},
		computed: {
			...mapState([
				'TopicArticleAnswersData'
			])
		},
		methods: {
			...mapActions([
				'getTopicArticleAnswers'
			]),
			async getData() {
				if(this.TopicArticleAnswersData.data.length == 0) {
					this.loading = true
				}
				this.TopicArticleAnswersData.page = 1
				await this.getTopicArticleAnswers(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getTopicArticleAnswers()
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.blue-money {
		float: right;
		color: #2ba6ff;
	}
	
	.red-check {
		float: right;
		color: #ff4a55;
	}
	
	.container {
		position: relative;
		height: 100vh;
		& .list-wrapper {
			background: none;
		}
	}
	
	.index-wonderful {
		&-content {
			padding: .2rem;
			border-bottom: 1px solid #ededed;
			margin-top: .2rem;
			background: #FFFFFF;
		}
		&-content-head {
			margin-top: .3rem;
			&-l {
				float: left;
				& img {
					width: 33px;
					border-radius: 50%;
				}
				&-p1-span3 {
					color: #9a9db5;
					background-color: #f5f5f5;
					border-radius: 18px;
				}
				&-p1-span1 {
					font-size: 13.0px;
				}
				&-p1-span2 {
					font-size: .24rem;
					color: #b0b0b0;
					margin-top: .1rem;
				}
			}
		}
		&-content-text2 {
			font-size: .32rem;
			margin: .1rem 0;
		}
		&-content-text {
			font-size: .32rem;
			margin: .1rem 0;
			white-space: normal;
			word-break: break-all;
			text-overflow: ellipsis;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			display: -webkit-box;
			&-img {
				width: 100%;
			}
			&-essay {
				color: #888888;
				font-size: .24rem;
			}
			&-make {
				background-color: #F6F8FA;
				padding: .3rem .2rem;
				position: relative;
				font-size: .24rem;
				&-call {
					position: absolute;
					right: .2rem;
					top: 0;
					padding: .2rem;
					color: #ffffff;
					background: #ff9800;
				}
				&-yue {
					position: absolute;
					right: .2rem;
					top: 0;
					padding: .2rem;
					color: #ffffff;
					background: #ff543d;
				}
				&-yuan {
					font-size: .33rem;
					color: #2ba6ff;
					& b {
						margin-right: .1rem;
					}
				}
				&-title {
					font-size: .33rem;
					padding: .3rem 0;
				}
				&-content {
					color: #888888;
					overflow: hidden;
    				height: .3rem;
				}
				&-time {
					color: #9A9DB5;
					padding-top: .2rem;
					& .clock-icon {
						vertical-align: middle;
						margin-right: .05rem;
					}
				}
			}
		}
		&-content-down {
			&-eye {
				color: #bfc4c7;
				vertical-align: super;
			}
			&-rate {
				display: inline-block;
				margin-left: .2rem;
				vertical-align: super;
			}
		}
	}
</style>
<style>
	.index-wonderful-content-text-make-time .clock-icon svg {
		width: 12px;
		height: 12px;
	}
</style>