<template>
	<div v-title data-title="我预约过的大咖" v-loading="loading">
		<div class="userMake">
			<yd-tab active-color="rgb(41, 182, 246)">
				<yd-tab-panel :label="'待完成'+'('+GuestNoComplateAppointsData.data.length+')'">
					<div class="userMake-scroll2">
						<scroll ref="scroll" :data="GuestNoComplateAppointsData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
							<div class="userMake-list" v-for="item,index in GuestNoComplateAppointsData.data" :key="index" @click="next(item)">
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
										<div class="userMake-list-r-time-lv" v-if="item.status == '待确认'">
											<span>{{item.status}}</span>
										</div>
										<div class="userMake-list-r-time-lv" v-if="item.status == '待付款'">
											<span>{{item.status}}</span>
										</div>
										<div class="userMake-list-r-time-lv" v-if="item.status == '待评价'">
											<span>{{item.status}}</span>
										</div>
										<div class="userMake-list-r-time-lv" v-if="item.status == '待见面'">
											<span>{{item.status}}</span>
										</div>
										<div class="clear"></div>
									</div>
								</div>
								<div class="clear"></div>
							</div>
						</scroll>
					</div>
				</yd-tab-panel>
				<yd-tab-panel :label="'已完成'+'('+GuestComplateAppointsData.data.length+')'">
					<successes :success="GuestComplateAppointsData.data"></successes>
				</yd-tab-panel>
			</yd-tab>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import Successes from '@/components/UserMake/UserMakeSuccess'
	import clock from "vue-material-design-icons/clock"
	import packageUp from "vue-material-design-icons/package-up"
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			clock,
			packageUp,
			Scroll,
			Successes,
			BottomNav
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
		computed: {
			...mapState([
				'GuestNoComplateAppointsData',
				'GuestComplateAppointsData'
			])
		},
		methods: {
			...mapActions([
				'getGuestNoComplateAppoints',
				'getGuestComplateAppoints'
			]),
			async getData() {
				if(this.GuestNoComplateAppointsData.data.length == 0) {
					this.loading = true
				}
				this.GuestNoComplateAppointsData.page = 1
				this.GuestComplateAppointsData.page = 1
				await this.getGuestNoComplateAppoints(true)
				await this.getGuestComplateAppoints(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getGuestNoComplateAppoints()
			},
			next(item) {
				if(item.status == '待确认') {
					this.$router.push({
						name: 'initiatingWait',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '待付款') {
					this.$router.push({
						name: 'initiatingPay',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '待见面') {
					this.$router.push({
						name: 'initiatingSeen',
						params: {
							id: item.id
						}
					})
				}
				if(item.status == '待评价') {
					this.$router.push({
						name: 'initiatingAssess',
						params: {
							id: item.id
						}
					})
				}
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
	.userMake {
		background: #ffffff;
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