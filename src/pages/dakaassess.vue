<template>
	<div v-title data-title="大咖评价" v-loading="loading">
		<div class="exp-detail-item exp-detail-about" v-if="MobileLinkasDetailData.appoint_appraises">
			<p class="exp-detail-title">
				用户评价<span class="exp-detail-title-num">({{MobileLinkasDetailData.appoint_appraises.length}})</span>
			</p>
			<div class="comment-answer-list">
				<div class="item" v-for="item,index in MobileLinkasDetailData.appoint_appraises" :key="index">
					<div class="comment-user">
						<img :src="item.guest_avatar" class="avatar" /> {{item.guest_name}}
					</div>
					<div class="comment-text" v-if="!item.content">无评价内容</div>
					<div class="comment-text" v-else>{{item.content}}</div>
					<div class="comment-course">话题名称：{{item.topic_name}}</div>
				</div>
			</div>
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
				this.loading = true
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
		height: 100vh;
	}
	
	.exp-detail-title {
		font-size: 16.0px;
		font-weight: bold;
		margin-bottom: .1rem;
	}
	
	.exp-detail-title-num {
		color: #29b6f6;
	}
	
	.comment-answer-list .item {
		padding: .3rem 0;
		color: #333;
	}
	
	.comment-answer-list .comment-user {
		height: .5rem;
		position: relative;
		padding-left: .7rem;
		font-size: .26rem;
		line-height: .5rem;
		color: #999999;
	}
	
	.comment-answer-list .comment-user .avatar {
		width: .5rem;
		height: .5rem;
		background-position: 50% 50%;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.comment-answer-list .comment-text {
		font-size: .3rem;
		line-height: .4rem;
		padding: .15rem 0;
		margin-left: .7rem;
	}
	
	.comment-answer-list .comment-course {
		padding-top: .15rem;
		color: #919ca9;
		font-size: .26rem;
		line-height: 1;
		margin-left: .7rem;
	}
</style>