<template>
	<div v-loading="loading">
		<div class="reservation">
			<div class="reservation-scroll2">
				<scroll ref="scroll" :data="reservation" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
					<div class="reservation-wlist" v-for="item,index in reservation" :key="index" @click="next(item)">
						<p class="reservation-wlist-title">线下约见</p>
						<span class="reservation-wlist-finish" v-if="item.status == '已完成'">{{item.status}}</span>
						<span class="reservation-wlist-close" v-if="item.status == '已关闭'">{{item.status}}</span>
						<span class="reservation-wlist-close" v-if="item.status == '已拒绝'">{{item.status}}</span>
						<span class="reservation-wlist-close" v-if="item.status == '已取消'">{{item.status}}</span>
						<p class="reservation-wlist-icon">
							<clock fillColor="#ADADAD" width="14" height="14" />{{item.case_time}}</p>
						<p class="reservation-wlist-icon">
							<map-marker fillColor="#ADADAD" width="14" height="14" />{{item.case_location}}</p>
						<p class="reservation-wlist-icon">
							<message fillColor="#ADADAD" width="14" height="14" />{{item.topic_name}}</p>
					</div>
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
		computed: {
			
		},
		props: ['reservation'],
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
				'getLinkaAppointComplates'
			]),
			async onloadrefresh() {
				await this.getLinkaAppointComplates()
			},
			next(item) {
				if(item.status == '已完成') {
					this.$router.push({
						name: 'reservationAssessed',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '已取消') {
					this.$router.push({
						name: 'initiatingRemove',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '已拒绝') {
					this.$router.push({
						name: 'reservationRefuse',
						params: {
							id: item.id
						}
					})
				}
			}
		},
		mounted() {
			
		}
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