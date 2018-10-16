<template>
	<div v-title data-title="提交成功">
		<div class="walletCash">
			<check fillColor="#09bb07" width="110" height="110"/>
			<p class="walletCash-success">
				<span>提交成功</span>
			</p>
			<p class="walletCash-ti">我们正在快马加鞭审核您的信息，请耐心等候！</p>
			<router-link :to="{name: 'user'}">
				<div class="walletCash-btn">
					<span>好的</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import check from "vue-material-design-icons/check-circle"
	export default {
		components: {
			check
		},
		data() {
			return {
				
			}
		},
		computed: {

		},
		methods: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.walletCash {
		background: #ffffff;
		height: 100vh;
		text-align: center;
		& .check-circle-icon{
			margin-top: 1.5rem;
    		display: inline-block;
		}
		&-success{
			font-size: .4rem;
    		margin-top: .2rem;
		}
		&-ti {
			color: #999999;
			padding: .4rem 0;
    		font-size: .28rem;
		}
		&-btn {
			width: 80%;
			margin: .6rem auto;
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