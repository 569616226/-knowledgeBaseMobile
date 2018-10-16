<template>
	<div v-loading="loading">
		<div class="system_news">
			<scroll ref="scroll" :data="GuestSystemMessagesData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="system" v-for="item,index in GuestSystemMessagesData.data" :key="index" @click="next(item.id)">
					<p :class="item.is_read ? 'gay_color system-title' : 'system-title'">
						{{item.title}}
					</p>
					<p class="system-time">
						{{item.created_at}}
					</p>
					<p class="system-content">
						{{item.content}}
					</p>
				</div>
			</scroll>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	export default {
		components: {
			Scroll
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
				'GuestSystemMessagesData'
			])
		},
		methods: {
			...mapActions([
				'getGuestSystemMessages'
			]),
			async getData() {
				if(this.GuestSystemMessagesData.data.length == 0) {
					this.loading = true
				}
				this.GuestSystemMessagesData.page = 1
				await this.getGuestSystemMessages(true)
				this.loading = false
			},
			async onloadrefresh() {
				if(this.GuestSystemMessagesData.lastpage == 1 || this.GuestSystemMessagesData.lastpage < this.GuestSystemMessagesData.page){
					this.$refs.scroll.isPullUpLoad = false
					return false
				}
				await this.getGuestSystemMessages()
			},
			next(id) {
				this.$router.push({
					name: 'syscontent',
					params: {
						id: id
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
<style lang="less" rel="stylesheet/less" scoped>
	.gay_color {
		color: #999999;
	}
	
	.system_news {
		position: relative;
		height: 83vh;
		& .list-wrapper {
			background: none;
		}
	}
	
	.system {
		& .see {
			color: #888888;
		}
		background: #ffffff;
		margin-top: .2rem;
		padding: .3rem .1rem;
		&-title {
			font-size: .31rem;
		}
		&-time {
			color: #999999;
			padding: .2rem 0;
		}
		&-content {
			color: #999999;
		}
	}
</style>
<style>

</style>