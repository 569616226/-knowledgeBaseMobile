<template>
	<div v-title data-title="申请大咖" v-loading="loading">
		<div class="userApply">
			<div class="userApply-ge" @click="basicNews">
				<img src="../assets/applyGe.png" />
				<p class="userApply-ge-name">
					<span>个人申请</span>
				</p>
			</div>
			<div class="userApply-zhu" @click="ApplyZhu">
				<img src="../assets/applyZhu.png" />
				<p class="userApply-zhu-name">
					<span>机构申请</span>
				</p>
			</div>
		</div>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import BottomNav from '../components/common/BottomNav' //底部导航
	export default {
		components: {
			BottomNav
		},
		data() {
			return {
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
				}
				await this.getLinkaProfile()
				this.loading = false
			},
			basicNews() {
				if(this.LinkaProfileData.status_txt == '待审核') {
					this.$dialog.confirm({
						mes: '您已提交过申请，请等待审核',
						opts: [{
							txt: '关闭',
							color: 'rgb(3, 155, 229)',
							callback: () => {

							}
						}]
					})
					return false
				}
				this.$router.push({
					name: 'basicNews'
				})
			},
			ApplyZhu() {
				this.$dialog.confirm({
					mes: '机构申请暂不开放',
					opts: [{
						txt: '关闭',
						color: 'rgb(3, 155, 229)',
						callback: () => {

						}
					}]
				});
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
	.userApply {
		height: 100vh;
		text-align: center;
		&-ge {
			height: 50%;
			padding: 15%;
			& img {
				width: 3rem;
			}
			&-name {
				font-size: .34rem;
				margin-top: .4rem;
			}
		}
		&-zhu {
			height: 50%;
			& img {
				width: 3rem;
			}
			&-name {
				font-size: .34rem;
				margin-top: .4rem;
			}
		}
	}
</style>
<style>

</style>