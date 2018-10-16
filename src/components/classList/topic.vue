<template>
	<div v-title data-title="分类列表">
		<topic-nav></topic-nav>
		<div class="index-wonderful">
			<scroll ref="scroll" :data="NavsLinkasData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="index-wonderful-content" v-for="item,index in NavsLinkasData.data" :key="index" @click="next(item.guest_id)">
					<div class="index-wonderful-content-head">
						<div class="index-wonderful-content-head-l width16">
							<img :src="item.avatar" />
						</div>
						<div class="index-wonderful-content-head-l width76 margin-left-2x">
							<p class="index-wonderful-content-head-l-h1">{{item.name}}</p>
							<p class="index-wonderful-content-head-l-p1">
								<span class="index-wonderful-content-head-l-p1-span1">
									{{item.real_name}}
								</span>
								<span class="index-wonderful-content-head-l-p1-span2">
								 <font color="#d6d6d6">丨</font>
									{{item.office}}
								</span>
							</p>
							<p class="index-wonderful-content-head-l-p1 margin-top-4c">
								<account class="seach-account-multiple" fillColor="#9A9DB5" />
								<span class="index-wonderful-content-head-l-p1-help">帮助了37人</span>
								<message class="seach-account-multiple" fillColor="#9A9DB5" />
								<span class="index-wonderful-content-head-l-p1-help">1人评价</span>
								<span class="index-wonderful-content-head-l-yuan">
									<font>{{item.price}}</font>元
								</span>
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
	import topicNav from "./topicNav"
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import heart from "vue-material-design-icons/heart" //关注图标
	import account from "vue-material-design-icons/account-multiple" //帮助图标
	import message from "vue-material-design-icons/message-processing" //评价图标
	export default {
		components: {
			topicNav,
			heart,
			account,
			message,
			Scroll
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
		computed: {
			...mapState([
				'NavsLinkasData'
			])
		},
		methods: {
			...mapActions([
				'getNavsLinkas'
			]),
			async onloadrefresh() {
				await this.getNavsLinkas()
			},
			next(id) {
				this.$router.push({
					name: 'dakadetail',
					params: {
						id: id
					}
				})
			}
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
		height: 75vh;
		& .list-wrapper {
			background: none;
		}
		&-content {
			padding: .2rem;
			border-bottom: 1px solid #ededed;
		}
		&-content-head {
			margin-top: .3rem;
			&-l {
				float: left;
				&-h1 {
					font-size: .33rem;
					margin-bottom: .1rem;
				}
				&-yuan {
					float: right;
					margin-top: .1rem;
					color: rgba(0, 113, 255, 1);
					& font {
						font-size: .33rem;
						margin-right: .1rem;
						font-weight: bold;
					}
				}
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
		margin-left: .05rem;
	}
</style>
<style>

</style>