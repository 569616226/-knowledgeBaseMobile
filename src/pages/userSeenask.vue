<template>
	<div v-title data-title="我看过的问题" v-loading="loading">
		<div class="index-wonderful">
			<scroll ref="scroll" :data="GuestReadAnswersData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="index-wonderful-content" v-for="item,index in GuestReadAnswersData.data" :key="index" @click="next(item.id)">
					<div class="index-wonderful-content-head">
						<div class="index-wonderful-content-head-l width10">
							<img :src="item.linka_avatar" />
						</div>
						<div class="index-wonderful-content-head-l width85 margin-left-2x">
							<p class="index-wonderful-content-head-l-p1">
								<span class="index-wonderful-content-head-l-p1-span1">
								{{item.linka_name}}
							</span>
								<span class="index-wonderful-content-head-l-p1-span2">
								 <font color="#d6d6d6">丨</font>
								 {{item.linka_office}}
							</span>
							</p>
						</div>
						<div class="clear"></div>
					</div>
					<div class="index-wonderful-content-text">
						<p>{{item.name}}</p>
					</div>
					<div class="index-wonderful-content-down">
						<eye-icon fillColor="#D6D6D6"></eye-icon>
						<span class="index-wonderful-content-down-eye">{{item.readers.length}}</span>
						<span class="index-wonderful-content-down-rate">
							<yd-rate v-model="item.star" size="14px" color="#d6d6d6" active-color="#ffd600" :readonly="true"></yd-rate>
						</span>
						<span class="red-check">已查看</span>
					</div>
				</div>
			</scroll>
			<div class="index-wonderful-noData" v-if="GuestReadAnswersData.data.length == 0">
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
	import EyeIcon from "vue-material-design-icons/eye"
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			EyeIcon,
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
				'GuestReadAnswersData'
			])
		},
		methods: {
			...mapActions([
				'getGuestReadAnswers'
			]),
			async getData() {
				if(this.GuestReadAnswersData.data.length == 0) {
					this.loading = true
				}
				this.GuestReadAnswersData.page = 1
				await this.getGuestReadAnswers(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getGuestReadAnswers()
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
	.blue-money {
		float: right;
		color: #2ba6ff;
	}
	
	.red-check {
		float: right;
		color: #ff4a55;
	}
	
	.index-wonderful {
		background: #FFFFFF;
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
		&-content {
			padding: .2rem;
			border-bottom: 1px solid #ededed;
		}
		&-content-head {
			margin-top: .3rem;
			&-l {
				float: left;
				& img {
					width: 33px;
					border-radius: 50%;
				}
				&-p1-span3 {
					color: #9a9db5;
					background-color: #f5f5f5;
					border-radius: 18px;
				}
				&-p1-span1 {
					font-size: 13.0px;
				}
				&-p1-span2 {
					font-size: 13.0px;
					color: #b0b0b0;
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
</style>
<style>

</style>