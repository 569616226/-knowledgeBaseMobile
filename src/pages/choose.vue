<template>
	<div v-title data-title="选择大咖">
		<nav-choose></nav-choose>
		<div class="choose_content">
			<scroll ref="scroll" :data="NavsLinkasData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="choose_content_idx" v-for="item,index in NavsLinkasData.data" :key="index" @click="next(item.guest_id)">
					<div class="choose_content_idx_t">
						<img :src="item.avatar" />
						<p class="choose_content_idx_t_name">{{item.real_name}}</p>
						<p class="choose_content_idx_t_p1">{{item.office}}</p>
						<p class="choose_content_idx_t_p2">
							<heart class="choose-heart" fillColor="rgb(154, 157, 181)" />
							<span>{{item.like}}人喜欢</span>
							<account class="choose-heart" fillColor="rgb(154, 157, 181)" />
							<span>帮助了{{item.helps}}人</span>
							<message class="choose-heart" fillColor="rgb(154, 157, 181)" />
							<span>{{item.appraises}}人评价</span>
						</p>
					</div>
					<div class="choose_content_idx_b">
						<p class="choose_content_idx_b_name">大咖话题</p>
						<p class="choose_content_idx_b_title">{{item.name}}</p>
					</div>
				</div>
			</scroll>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import NavChoose from "../components/choose/nav"
	import heart from "vue-material-design-icons/heart" //关注图标
	import account from "vue-material-design-icons/account-multiple" //帮助图标
	import message from "vue-material-design-icons/message-processing" //评价图标
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			NavChoose,
			heart,
			account,
			message,
			Scroll,
			BottomNav
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
	.choose_content {
		position: relative;
		height: 84vh;
		& .list-wrapper {
			background: none;
		}
	}
	
	.choose_content_idx {
		background: #fff;
		margin: .2rem .15rem 0 .15rem;
		border-radius: 4px;
		text-align: center;
		&_t {
			padding-bottom: .3rem;
			border-bottom: 1.5px solid rgb(227, 227, 227);
			&_name {
				font-size: 15px;
			}
			&_p1 {
				color: rgb(176, 176, 176);
				margin-top: .2rem;
			}
			&_p2 {
				color: rgb(176, 176, 176);
				margin-top: .3rem;
			}
		}
		&_t img {
			width: 54px;
			border-radius: 50%;
			margin: .4rem 0 .2rem 0;
		}
		&_b {
			text-align: left;
			padding: .2rem;
			&_name {
				color: rgb(170, 170, 170);
			}
			&_title {
				margin-top: .2rem;
			}
		}
	}
</style>
<style>
	.choose-heart svg {
		width: 12px;
		height: 12px;
	}
	
	.choose-heart {
		vertical-align: middle;
		margin-left: .1rem;
	}
</style>