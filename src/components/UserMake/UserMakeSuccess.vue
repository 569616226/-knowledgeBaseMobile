<template>
	<div v-loading="loading">
		<div class="reservation-scroll2">
			<scroll ref="scroll" :data="success" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="userMake-list" v-for="item,index in success" :key="index" @click="next(item)">
					<div class="userMake-list-l">
						<img :src="item.guest_avatar" />
					</div>
					<div class="userMake-list-r">
						<span class="userMake-list-r-name">{{item.guest_name}}</span><span class="userMake-list-r-title"><font color="#d6d6d6">丨</font> {{item.guest_office}}</span>
						<div class="userMake-list-r-time">
							<div class="userMake-list-r-time-l" v-if="item.topic_ser_type == 0">
								<clock fillColor="#ADADAD" width="14" height="14" />
								<span>{{item.topic_ser_time}}小时/次</span>
							</div>
							<div class="userMake-list-r-time-l" v-else>
								<clock fillColor="#ADADAD" width="14" height="14" />
								<span>{{item.topic_ser_time}}分钟/次</span>
							</div>
							<div class="userMake-list-r-time-r">
								<package-up fillColor="#ADADAD" width="14" height="14" />
								<span>{{item.topic_price}}元/次</span>
							</div>
							<div class="userMake-list-r-time-lan" v-if="item.status == '已完成'">
								<span>{{item.status}}</span>
							</div>
							<div class="userMake-list-r-time-hui" v-if="item.status == '已取消'">
								<span>{{item.status}}</span>
							</div>
							<div class="userMake-list-r-time-hui" v-if="item.status == '已拒绝'">
								<span>{{item.status}}</span>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div class="clear"></div>
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
	import packageUp from "vue-material-design-icons/package-up"
	export default {
		components: {
			clock,
			MapMarker,
			message,
			Scroll,
			packageUp
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
				'getGuestComplateAppoints'
			]),
			async onloadrefresh() {
				await this.getGuestComplateAppoints()
			},
			next(item) {
				if(item.status == '已完成') {
					this.$router.push({
						name: 'initiatingAssessed',
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
	}
	
	.userMake {
		background: #ffffff;
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
		&-list {
			padding: .3rem .2rem;
			border-bottom: 1px solid #EDEDED;
			position: relative;
			&-l {
				float: left;
				& img {
					width: 1rem;
					border-radius: 50%;
				}
			}
			&-r {
				float: left;
				margin-left: .2rem;
				&-name {
					font-size: .27rem;
				}
				&-title {
					font-size: .27rem;
				}
				&-time {
					margin-top: .24rem;
					&-l {
						float: left;
						color: #ADADAD;
						& .clock-icon {
							vertical-align: sub;
						}
					}
					&-r {
						float: left;
						color: #ADADAD;
						& .package-up-icon {
							vertical-align: sub;
							margin-left: .2rem;
						}
					}
					&-lv {
						color: #3FBF4C;
						border: 1px solid #3FBF4C;
						border-radius: 30px;
						padding: .05rem .2rem;
						position: absolute;
						right: .2rem;
						top: .85rem;
					}
					&-lan {
						color: #42b0ff;
						border: 1px solid #42b0ff;
						border-radius: 30px;
						padding: .05rem .2rem;
						position: absolute;
						right: .2rem;
						top: .85rem;
					}
					&-hui {
						color: #b0b0b0;
						border: 1px solid #b0b0b0;
						border-radius: 30px;
						padding: .05rem .2rem;
						position: absolute;
						right: .2rem;
						top: .85rem;
					}
				}
			}
		}
	}
</style>
<style>

</style>