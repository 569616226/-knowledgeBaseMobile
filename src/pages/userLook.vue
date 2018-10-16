<template>
	<div v-title data-title="我浏览的大咖" v-loading="loading">
		<div class="userMake">
			<scroll ref="scroll" :data="GuestViewedLinkasData.data" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
				<div class="userMake-list" v-for="item,index in GuestViewedLinkasData.data" :key="index" @click="next(item.id)">
					<div class="userMake-list-l">
						<img :src="item.avatar" />
					</div>
					<div class="userMake-list-r">
						<span class="userMake-list-r-name">{{item.real_name}}</span><span class="userMake-list-r-title"><font color="#d6d6d6">丨</font> {{item.office}}</span>
						<div class="userMake-list-r-time">
							<div class="userMake-list-r-time-l">
								<heart fillColor="#ADADAD" width="14" height="14" />
								<span>{{item.likes}}人喜欢</span>
							</div>
							<div class="userMake-list-r-time-r">
								<multiple fillColor="#ADADAD" width="14" height="14" />
								<span>帮助过{{item.helpers}}人</span>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</scroll>
			<div class="userMake-noData" v-if="GuestViewedLinkasData.data.length == 0">
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
	import heart from "vue-material-design-icons/heart"
	import multiple from "vue-material-design-icons/account-multiple"
	import deleteLike from "vue-material-design-icons/delete"
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			heart,
			multiple,
			deleteLike,
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
				'GuestViewedLinkasData'
			])
		},
		methods: {
			...mapActions([
				'getGuestViewedLinkas'
			]),
			async getData() {
				if(this.GuestViewedLinkasData.data.length == 0) {
					this.loading = true
				}
				this.GuestViewedLinkasData.page = 1
				await this.getGuestViewedLinkas(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getGuestViewedLinkas()
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
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.userMake {
		background: #ffffff;
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
						& .heart-icon {
							vertical-align: sub;
						}
					}
					&-r {
						float: left;
						color: #ADADAD;
						& .account-multiple-icon {
							vertical-align: sub;
							margin-left: .2rem;
						}
					}
					&-lv {
						position: absolute;
						right: .2rem;
						top: .65rem;
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