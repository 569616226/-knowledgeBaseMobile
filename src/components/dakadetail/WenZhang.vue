<template>
	<div>
		<ul class="expert-articles">
			<li class="article-item" v-for="item,index in articles" @click="next(item.id)">
				<div class="a-info">
					<p class="a-title">{{item.title}}</p>
					<p class="a-time">
						<span>{{item.like}} 赞 · {{item.comment_counts}} 评论 · {{item.created_at}}</span>
					</p>
				</div>
				<div class="a-image">
					<img :src="item.cover" style="width: 100%;" />
				</div>
				<div class="clear"></div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		components: {

		},
		created() {

		},
		data() {
			return {

			}
		},
		methods: {
			next(id) {
				this.$router.push({
					name: 'essay',
					params: {
						id: id
					}
				})
			}
		},
		props: ['articles'],
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style scoped>
.expert-articles .article-item {
    padding: .4rem .2rem;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #e3e3e3;
}
.expert-articles .a-info {
    float: left;
    width: 70%;
}
.expert-articles .a-image {
    float: left;
    width: 30%;
}
.expert-articles .a-info .a-title {
    font-size: 16px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: .2rem;
}
.expert-articles .a-info .a-time{
	color: #9A9DB5;
}
</style>