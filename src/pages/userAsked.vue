<template>
	<div v-title data-title="我问过的问题" v-loading="loading">
		<div class="userAskedScroll">
			<scroll ref="scroll" :data="GuestAnswers.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="userAsked" v-for="item,index in GuestAnswers.data" :key="index" @click="next(item.id)">
					<p class="userAsked-content">
						{{item.name}}
					</p>
					<div class="userAsked-state">
						<span class="userAsked-state-lv" v-if="item.status == '待回答'">{{item.status}}</span>
						<span class="userAsked-state-lan" v-if="item.status == '已回答'">{{item.status}}</span>
						<span class="userAsked-state-hui" v-if="item.status == '已关闭'">{{item.status}}</span>
						<span class="userAsked-state-orange" v-if="item.status == '待付款'">{{item.status}}</span>
						<span class="userAsked-state-yuan"><font style="font-size: .32rem;font-weight: bold;">{{item.price}}</font>元</span>
					</div>
				</div>
			</scroll>
			<div class="userAskedScroll-noData" v-if="GuestAnswers.data.length == 0">
				<img src="../assets/hollow.png" />
				<p>暂无数据</p>
			</div>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			Scroll,
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
				'GuestAnswers'
			])
		},
		methods: {
			...mapActions([
				'getGuestAnswers'
			]),
			async getData() {
				if(this.GuestAnswers.data.length == 0) {
					this.loading = true
				}
				this.GuestAnswers.page = 1
				await this.getGuestAnswers(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getGuestAnswers()
			},
			next(id) {
				this.$router.push({
					name: 'questiondetail',
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
	.userAskedScroll{
		position: relative;
		height: 91vh;
		& .list-wrapper {
			background: none;
		}
		&-noData{
			text-align: center;
    		padding-top: 2rem;
    		& img{
    			width: 80%;
    		}
    		& p{
    			margin-top: 1rem;
			    font-size: .32rem;
			    color: #929292;
    		}
		}
	}
	.userAsked {
		background: #ffffff;
		border-bottom: 1px solid #EDEDED;
		padding: .4rem .2rem;
		&-content {
			font-size: .31rem;
		}
		&-state {
			margin-top: .2rem;
			&-lv {
				color: #3FBF4C;
				border: 1px solid #3FBF4C;
				border-radius: 30px;
				padding: .1rem;
			}
			&-lan {
				color: #42b0ff;
				border: 1px solid #42b0ff;
				border-radius: 30px;
				padding: .1rem;
			}
			&-hui {
				color: #b0b0b0;
				border: 1px solid #b0b0b0;
				border-radius: 30px;
				padding: .1rem;
			}
			&-orange {
				color: #FFA500;
				border: 1px solid #FFA500;
				border-radius: 30px;
				padding: .1rem;
			}
			&-yuan {
				float: right;
				color: #2ba6ff;
			}
		}
	}
</style>
<style>

</style>