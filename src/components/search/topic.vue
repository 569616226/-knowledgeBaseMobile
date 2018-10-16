<template>
	<div>
		<div class="search-interlocution index-wonderful">
			<div v-if="topic.length == 0" class="index-wonderful-nothing">
				<img src="../../assets/hollow.png" />
				<p>没有找到你想要的内容，换个关键词试试！！</p>
			</div>
			<div v-else>
				<scroll ref="scroll" :data="topic" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
					<div class="index-wonderful-content" v-for="item,index in topic" :key="index" @click="next(item.guest_id)">
						<div class="index-wonderful-content-head">
							<div class="index-wonderful-content-head-l width16">
								<img :src="item.guest_cover" />
							</div>
							<div class="index-wonderful-content-head-l width76 margin-left-2x">
								<p class="index-wonderful-content-head-l-p1">
									<span class="index-wonderful-content-head-l-p1-span1">
								{{item.guest_name}}
							</span>
									<span class="index-wonderful-content-head-l-p1-span2">
								 <font color="#d6d6d6">丨</font>
								 {{item.guest_office}}
							</span>
								</p>
								<p class="index-wonderful-content-head-l-p1 margin-top-4c">
									<span class="index-wonderful-content-head-l-p1-span3">
								{{item.title}}
							</span>
								</p>
								<p class="index-wonderful-content-head-l-p1 margin-top-4c">
									<account-multiple-icon class="seach-account-multiple" fillColor="#9A9DB5" />
									<span class="index-wonderful-content-head-l-p1-help">帮助了{{item.helps}}人</span>
								</p>
							</div>
							<div class="clear"></div>
						</div>
					</div>
				</scroll>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import AccountMultipleIcon from "vue-material-design-icons/account-multiple"
	export default {
		components: {
			AccountMultipleIcon,
			Scroll
		},
		props: ['topic'],
		created() {

		},
		data() {
			return {
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
				'postSearchTopic'
			]),
			next(id) {
				this.$router.push({
					name: 'dakadetail',
					params: {
						id: id
					}
				})
			},
			async onloadrefresh() {
				await this.postSearchTopic()
			}
		},
		computed: {

		},
		mounted() {

		},
		watch: {

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
	
	.width16 {
		width: 16%;
	}
	
	.width76 {
		width: 76%;
	}
	
	.index-wonderful {
		background: #FFFFFF;
		margin-top: .2rem;
		position: relative;
		height: 83vh;
		& .list-wrapper {
			background: none;
		}
		&-nothing img {
			width: 80%;
			padding-top: 1rem;
			margin: 0 auto;
			display: block;
		}
		&-nothing p {
			color: rgb(102, 102, 102);
			font-size: .28rem;
			margin-top: .6rem;
			text-align: center;
		}
		&-content {
			padding: .2rem;
			border-bottom: 1px solid #ededed;
		}
		&-content-head {
			margin-top: .3rem;
			&-l {
				float: left;
				& img {
					width: 45px;
					border-radius: 50%;
				}
				&-p1-span3 {
					color: #888888;
				}
				&-p1-span1 {
					font-size: 13.0px;
				}
				&-p1-span2 {
					font-size: 13.0px;
					color: #b0b0b0;
				}
				&-p1-help {
					color: #9A9DB5;
					vertical-align: super;
				}
			}
		}
		&-content-text {
			font-size: 15.0px;
			padding: .1rem 0;
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
	
	.seach-account-multiple {
		vertical-align: sub;
	}
</style>