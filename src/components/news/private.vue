<template>
	<div v-loading="loading">
		<div style="height: .2rem;"></div>
		<div class="system_news" v-if="chatsData">
			<scroll ref="scroll" :data="chatsData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div v-for="item,index in chatsData.data" :key="index" @click="next(item.guest_id)">
					<div class="private">
						<div class="private-l">
							<img :src="item.guest_avatar" />
						</div>
						<div class="private-r">
							<p class="private-r-title">
								{{item.guest_name}}<span class="private-r-time">{{item.created_at}}</span>
							</p>
							<p class="private-r-ml">
								{{item.content}}
							</p>

						</div>
						<div class="clear"></div>
					</div>
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
				'chatsData'
			])
		},
		methods: {
			...mapActions([
				'getChats'
			]),
			async getData() {
				if(this.chatsData.data.length == 0) {
					this.loading = true
				}
				this.chatsData.page = 1
				await this.getChats(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getChats()
			},
			next(id) {
				this.$router.push({
					name: 'privatecontent',
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
	.system_news {
		position: relative;
		height: 83vh;
		& .list-wrapper {
			background: none;
		}
	}
	
	.private {
		background: #ffffff;
		padding: .4rem .2rem .3rem .2rem;
		border-bottom: 1px solid #EDEDED;
		&-l {
			float: left;
			width: 16%;
			& img {
				width: 45px;
				border-radius: 50%;
			}
		}
		&-r {
			float: left;
			width: 84%;
			&-title {
				font-size: .28rem;
			}
			&-ml {
				color: #999999;
				padding: .2rem 0;
			}
			&-time {
				color: #999999;
				font-size: .24rem;
				float: right;
			}
		}
	}
</style>
<style>

</style>