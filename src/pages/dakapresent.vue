<template>
	<div v-title data-title="大咖介绍" v-loading="loading">
		<div class="exp-detail-item exp-detail-about">
			<p class="exp-detail-title">
				关于大咖
			</p>
			<p class="exp-detail-content" v-html="MobileLinkasDetailData.profile"></p>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		created() {

		},
		data() {
			return {
				loading: false
			}
		},
		methods: {
			...mapActions([
				'getMobileLinkasDetail'
			]),
			async getData() {
				if(this.MobileLinkasDetailData.length == 0) {
					this.loading = true
				}
				await this.getMobileLinkasDetail(this.$route.params.id)
				this.loading = false
			},
		},
		props: [],
		computed: {
			...mapState([
				'MobileLinkasDetailData'
			])
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style scoped>
	.exp-detail-item {
		background: #ffffff;
		padding: .4rem .2rem;
	}
	
	.exp-detail-title {
		font-size: 16.0px;
		font-weight: bold;
		margin-bottom: .4rem;
	}
	
	.exp-detail-content {
		font-size: 14.0px;
		line-height: 24px;
		color: #333333;
		word-break: break-all;
		word-wrap: break-word;
	}
</style>