<template>
	<div v-title data-title="我的预约" v-loading="loading">
		<div class="reservation">
			<yd-tab active-color="rgb(41, 182, 246)">
				<yd-tab-panel :label="'待完成'+'('+LinkaAppointNoComplatesData.data.length+')'">
					<div class="reservation-scroll2">
						<scroll ref="scroll" :data="LinkaAppointNoComplatesData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
							<div class="reservation-wlist" v-for="item,index in LinkaAppointNoComplatesData.data" :key="index" @click="next(item)">
								<p class="reservation-wlist-title">{{item.ser_type}}</p>
								<span class="reservation-wlist-state">{{item.status}}</span>
								<p class="reservation-wlist-icon">
									<clock fillColor="#ADADAD" width="14" height="14" />{{item.case_time}}</p>
								<p class="reservation-wlist-icon">
									<map-marker fillColor="#ADADAD" width="14" height="14" />{{item.case_location}}</p>
								<p class="reservation-wlist-icon">
									<message fillColor="#ADADAD" width="14" height="14" />{{item.topic_name}}</p>
							</div>
						</scroll>
					</div>
				</yd-tab-panel>
				<yd-tab-panel :label="'已完成'+'('+LinkaAppointComplatesData.data.length+')'">
					<reservation :reservation="LinkaAppointComplatesData.data"></reservation>
				</yd-tab-panel>
			</yd-tab>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import reservation from '@/components/userDaka/reservation/reservation'
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
			reservation,
			BottomNav
		},
		computed: {
			...mapState([
				'LinkaAppointNoComplatesData',
				'LinkaAppointComplatesData'
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
				'getLinkaAppointNoComplates',
				'getLinkaAppointComplates'
			]),
			async getData() {
				if(this.LinkaAppointNoComplatesData.data.length == 0) {
					this.loading = true
				}
				this.LinkaAppointNoComplatesData.page = 1
				this.LinkaAppointComplatesData.page = 1
				await this.getLinkaAppointNoComplates(true)
				await this.getLinkaAppointComplates(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getLinkaAppointNoComplates()
			},
			next(item) {
				if(item.status == '待确认') {
					this.$router.push({
						name: 'reservationWait',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '待付款') {
					this.$router.push({
						name: 'reservationPayWait',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '待见面') {
					this.$router.push({
						name: 'reservationSeen',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '待评价') {
					this.$router.push({
						name: 'reservationAssess',
						params: {
							id: item.id
						}
					})
				}
			}
		},
		mounted() {
			this.getData()
		}
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