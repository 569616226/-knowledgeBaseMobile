<template>
	<div v-title data-title="钱包" v-loading="loading">
		<div class="userWallet">
			<div class="userWallet-c">
				<img src="../assets/wallet.png" class="userWallet-c-img" />
				<p class="userWallet-c-me">我的余额</p>
				<p class="userWallet-c-qian">
					<font color="#ff4040">¥</font>
					<font color="#ff4040">{{LinkaProfileData.wallets}}</font>
				</p>
				<div class="userWallet-c-ti" @click="walletCash">
					<span>提现</span>
				</div>
				<p class="userWallet-c-n">
					所有收入将会存入钱包中，余额满100元才可以提现
				</p>
			</div>
			<p class="userWallet-ji">交易记录</p>
			<div class="userWallet-scroll">
					<div class="userWallet-list" v-for="item,index in GuestFinacesData.data" :key="index">
						<p class="userWallet-list-title">
							<span>{{item.finace_type}}</span>
						</p>
						<div class="userWallet-list-l">
							<p>
								<clock fillColor="#ADADAD" width="14" height="14" />{{item.created_at}}</p>
							<p v-if="item.finace_type == '提现收入'">
								<wallet fillColor="#ADADAD" width="14" height="14" />微信钱包
								<span class="userWallet-list-l-lv">提现成功</span>
							</p>
							<p v-else>
								<wallet fillColor="#ADADAD" width="14" height="14" />我的钱包
							</p>
						</div>
						<div class="userWallet-list-r">
							<span>{{item.price}}元</span>
						</div>
						<div class="clear"></div>
					</div>
			</div>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import clock from "vue-material-design-icons/clock"
	import wallet from "vue-material-design-icons/wallet"
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			clock,
			wallet,
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
				'GuestFinacesData',
				'LinkaProfileData'
			])
		},
		methods: {
			...mapActions([
				'getGuestFinaces',
				'getLinkaProfile'
			]),
			async getData() {
				if(this.GuestFinacesData.data.length == 0 && this.GuestFinacesData.data.length == 0) {
					this.loading = true
				}
				await this.getLinkaProfile()
				this.GuestFinacesData.page = 1
				await this.getGuestFinaces(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getGuestFinaces()
			},
			walletCash() {
				if(this.LinkaProfileData.wallets < 100) {
					this.$dialog.toast({
						mes: '余额不足',
						icon: 'error',
						timeout: 1000
					})
				}else{
					this.$router.push({
						name: 'walletCash'
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
	.userWallet {
		&-scroll{
			position: relative;
		}
		&-ji {
			color: #ff9800;
			padding: .3rem .2rem;
			font-weight: bold;
		}
		&-list {
			border-radius: 4px;
			box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
			background: #ffffff;
			margin: 0 .2rem .2rem .2rem;
			padding: .35rem .2rem;
			&-title {
				font-size: .33rem;
			}
			&-l {
				float: left;
				& p {
					margin-top: .2rem;
					color: #ADADAD;
					& .clock-icon,
					& .wallet-icon {
						vertical-align: sub;
						margin-right: .1rem;
					}
				}
				&-lv {
					color: #1fd13c;
					margin-left: .25rem;
				}
			}
			&-r {
				float: right;
				font-size: .45rem;
				color: #555555;
				font-weight: bold;
			}
		}
		&-c {
			background: #ffffff;
			padding: .8rem;
			text-align: center;
			&-img {
				width: 1.22rem;
			}
			&-me {
				padding: .2rem 0;
			}
			&-qian {
				font-size: .65rem;
			}
			&-ti {
				border-radius: 40px;
				color: #fff;
				background-color: #42b0ff;
				height: .9rem;
				line-height: .9rem;
				margin-top: .6rem;
				font-size: .28rem;
				& a {
					display: block;
				}
			}
			&-n {
				color: #b0b0b0;
				margin-top: .35rem;
			}
		}
	}
</style>
<style>

</style>