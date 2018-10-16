<template>
	<div v-title data-title="余额提现" v-loading="loading">
		<div class="walletCash">
			<div class="walletCash-title">
				<p class="walletCash-title-p">提现余额<span>(余额满100元才可以提现)</span></p>
				<p class="walletCash-title-yuan">¥<input type="text" placeholder="请输入" v-model="txt"></p>
			</div>
			<div class="walletCash-q">
				<p class="walletCash-q-l">可用余额<span>{{LinkaProfileData.wallets}}元</span></p>
				<p class="walletCash-q-r">
					<span @click="txt = LinkaProfileData.wallets">全部提现</span>
				</p>
				<div class="clear"></div>
			</div>
		</div>
		<p class="walletCash-ti">余额提现到微信钱包中</p>
		<div class="walletCash-btn" @click="clickTi">
			<span>提交</span>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		components: {

		},
		data() {
			return {
				txt: '',
				loading: false
			}
		},
		computed: {
			...mapState([
				'LinkaProfileData'
			])
		},
		methods: {
			...mapActions([
				'getLinkaProfile'
			]),
			async getData() {
				if(this.LinkaProfileData.length == 0) {
					this.loading = true
					await this.getLinkaProfile()
					this.loading = false
				}
			},
			async clickTi() {
				if(this.txt == '') {
					this.$dialog.toast({
						mes: '请填写余额',
						icon: 'error',
						timeout: 1000
					})
					return false
				} else if(this.txt < 100) {
					this.$dialog.toast({
						mes: '余额不足100元',
						icon: 'error',
						timeout: 1000
					})
					return false
				} else {
					this.loading = true
					const data = await api.postOrders(this.txt)
					this.loading = false
					if(data.status == false) {
						this.$dialog.toast({
							mes: data.msg,
							icon: 'error',
							timeout: 1000
						})
						return false
					}
					await this.$dialog.toast({
						mes: '提交成功',
						icon: 'success',
						timeout: 1000
					})
					this.$router.push({
						name: 'user'
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
	.walletCash {
		background: #ffffff;
		margin-top: .2rem;
		padding: .4rem .2rem;
		&-title {
			border-bottom: 1px solid #EDEDED;
			&-p span {
				color: #999999;
				margin-left: .2rem;
			}
			&-yuan {
				font-size: 30.0px;
				padding: .25rem 0;
				& input {
					width: 70%;
					border: none;
					margin-left: .1rem;
				}
			}
		}
		&-q {
			margin-top: .3rem;
			&-l {
				float: left;
				color: #999999;
				& span {
					color: #101010;
					margin-left: .1rem;
				}
			}
			&-r {
				float: right;
				color: #04B2FF;
				font-weight: bold;
			}
		}
		&-ti {
			color: #999999;
			padding: .3rem .2rem;
		}
		&-btn {
			width: 80%;
			margin: .2rem auto;
			border-radius: 40px;
			color: #ffffff;
			background-color: #04B3FF;
			text-align: center;
			height: 1rem;
			line-height: 1rem;
			font-size: .32rem;
		}
	}
</style>
<style>

</style>