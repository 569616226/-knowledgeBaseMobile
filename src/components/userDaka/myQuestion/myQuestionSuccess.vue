<template>
	<div v-loading="loading">
			<div class="reservation-scroll2">
				<scroll ref="scroll" :data="success" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
					<router-link v-for="item,index in success" :key="index" :to="{name: 'questiondetail', params: {id: item.id}}">
						<div class="reservation-wlist">
							<p class="reservation-wlist-title">{{item.guest_name}}的问题</p>
							<span class="reservation-wlist-finish" v-if="item.status == '已回答'">{{item.status}}</span>
							<span class="reservation-wlist-close" v-if="item.status == '已关闭'">{{item.status}}</span>
							<p class="reservation-wlist-p">{{item.name}}</p>
							<div class="reservation-wlist-b">
								<p class="reservation-wlist-b-yuan"><b>{{item.price}}</b>元</p>
								<yd-rate class="yuanRate" v-model="item.star" size="16px" color="#d6d6d6" active-color="#ffd600" :readonly="readonly"></yd-rate>
								<div class="clear"></div>
							</div>
						</div>
					</router-link>
				</scroll>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import clock from "vue-material-design-icons/clock"
	import MapMarker from "vue-material-design-icons/map-marker"
	import message from "vue-material-design-icons/message"
	export default {
		components: {
			clock,
			MapMarker,
			message,
			Scroll
		},
		props: ['success'],
		data() {
			return {
				loading: false,
				pullUpLoad: {
					threshold: 10,
					txt: {
						more: '',
						noMore: '暂无更多数据'
					}
				},
				readonly: true
			}
		},
		methods: {
			...mapActions([
				'getLinkaHasQuestionAnswers'
			]),
			async onloadrefresh() {
				await this.getLinkaHasQuestionAnswers()
			}
		},
		mounted() {
			
		},
	}
</script>
<style lang="less" scoped>
	.reservation {
		&-scroll2 {
			position: relative;
			height: 93vh;
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