<template>
	<div v-title data-title="我的问题" v-loading="loading">
		<div class="reservation">
			<yd-tab active-color="rgb(41, 182, 246)">
				<yd-tab-panel :label="'待完成'+'('+LinkaAnswersData.data.length+')'">
					<div class="reservation-scroll2">
						<scroll ref="scroll" :data="LinkaAnswersData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
							<router-link v-for="item,index in LinkaAnswersData.data" :key="index" :to="{name: 'questionReply', params: {id: item.id}}">
								<div class="reservation-wlist">
									<p class="reservation-wlist-title">{{item.guest_name}}的问题</p>
									<span class="reservation-wlist-state" v-if="item.status == '待回答'">{{item.status}}</span>
									<span class="reservation-wlist-orange" v-if="item.status == '待付款'">{{item.status}}</span>
									<p class="reservation-wlist-p">{{item.name}}</p>
									<div class="reservation-wlist-b">
										<p class="reservation-wlist-b-yuan"><b>{{item.price}}</b>元</p>
										<div class="clear"></div>
									</div>
								</div>
							</router-link>
						</scroll>
					</div>
				</yd-tab-panel>
				<yd-tab-panel :label="'已完成'+'('+LinkaHasQuestionAnswers.data.length+')'">
					<success :success="LinkaHasQuestionAnswers.data"></success>
				</yd-tab-panel>
			</yd-tab>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import Success from '@/components/userDaka/myQuestion/myQuestionSuccess.vue'
	import clock from "vue-material-design-icons/clock"
	import MapMarker from "vue-material-design-icons/map-marker"
	import message from "vue-material-design-icons/message"
	import BottomNav from '../../components/common/BottomNav' //底部导航
	export default {
		components: {
			clock,
			MapMarker,
			message,
			Scroll,
			Success,
			BottomNav
		},
		computed: {
			...mapState([
				'LinkaAnswersData',
				'LinkaHasQuestionAnswers'
			])
		},
		data() {
			return {
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
		methods: {
			...mapActions([
				'getLinkaAnswers',
				'getLinkaHasQuestionAnswers'
			]),
			async getData() {
				if(this.LinkaAnswersData.data.length == 0 && this.LinkaHasQuestionAnswers.data.length == 0) {
					this.loading = true
				}
				this.LinkaAnswersData.page = 1
				this.LinkaHasQuestionAnswers.page = 1
				await this.getLinkaAnswers(true)
				await this.getLinkaHasQuestionAnswers(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getLinkaAnswers()
			}
		},
		mounted() {
			this.getData()
		},
	}
</script>
<style lang="less" scoped>
	.reservation {
		&-scroll2 {
			position: relative;
			height: 85vh;
			& .list-wrapper {
				background: none;
			}
		}
		&-w {
			padding: .3rem .2rem .1rem .2rem;
			color: #ff9800;
		}
		&-y {
			padding: .3rem .2rem .1rem .2rem;
			color: #999999;
		}
		&-wlist {
			box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
			background: white;
			margin: .2rem;
			padding: .4rem .2rem;
			border-radius: 4px;
			position: relative;
			&-p {
				line-height: 19px;
				color: #555555;
				margin-top: .25rem;
				font-size: .3rem;
				white-space: normal;
    			word-break: break-all;
			}
			&-b {
				&-yuan {
					color: #2ba6ff;
					margin-top: .25rem;
					float: left;
				}
				& .yuanRate {
					float: right;
					margin-top: .2rem;
				}
			}
			&-title {
				font-weight: bold;
				font-size: .31rem;
			}
			&-state {
				position: absolute;
				right: .2rem;
				top: .4rem;
				color: #3FBF4C;
				border-radius: 30px;
				border: 1px solid #3fbf4c;
				padding: .05rem .2rem;
			}
			&-orange {
				position: absolute;
				right: .2rem;
				top: .4rem;
				color: #FFA500;
				border-radius: 30px;
				border: 1px solid #FFA500;
				padding: .05rem .2rem;
			}
			&-finish {
				position: absolute;
				right: .2rem;
				top: .4rem;
				color: #42B0FF;
				border-radius: 30px;
				border: 1px solid #42B0FF;
				padding: .05rem .2rem;
			}
			&-close {
				position: absolute;
				right: .2rem;
				top: .4rem;
				color: #b0b0b0;
				border-radius: 30px;
				border: 1px solid #b0b0b0;
				padding: .05rem .2rem;
			}
			&-icon {
				margin-top: .2rem;
				color: #ADADAD;
				& .clock-icon,
				& .map-marker-icon,
				& .message-icon {
					margin-right: .1rem;
					vertical-align: sub;
				}
			}
		}
	}
</style>
<style>

</style>