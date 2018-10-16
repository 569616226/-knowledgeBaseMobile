<template>
	<div class="container" v-title data-title="文章详情" v-loading="loading">
		<div class="essay">
			<div class="essay-index">
				<img :src="data.cover" width="100%" />
				<p class="essay-index-title">{{data.title}}</p>
				<p class="essay-index-time">
					<font color="#a6a6a6">{{data.created_at}}</font>&nbsp;&nbsp;
					<font color="#9a9db5">{{data.guest_name}}</font>
				</p>
				<div class="essay-index-content">
					<p v-html="data.content"></p>
				</div>
				<p class="essay-index-num">
					<font color="#a6a6a6">阅读 {{data.readers}}</font>
					<span class="essay-index-num-zan" @click="thumb">
						<span v-if="!data.is_like">
							<thumbup class="essay-index-num-zan-thumbup" fillColor="#9A9DB5"/>
						</span>
					<span v-else>
							<thumb class="essay-index-num-zan-thumbup" fillColor="rgb(255, 99, 109)" />
						</span>
					<font :color="data.is_like ? '#FF636D' : '#a6a6a6'">{{data.like}}</font>
					</span>
				</p>
			</div>
			<div class="essay-comment" v-if="data.comments">
				<div class="essay-comment-show_more">
					<p>所有评论</p>
				</div>
				<router-link :to="{name: 'write', params: {id: $route.params.id}}">
					<p class="essay-comment-write">
						写评论
						<pencil class="essay-comment-write-pencil" fillColor="#9A9DB5" width="14" height="14" />
					</p>
				</router-link>
				<div class="essay-comment-list" v-for="item,index in data.comments.data" :key="index">
					<div class="essay-comment-list-l">
						<img :src="item.comment_user_image" />
					</div>
					<div class="essay-comment-list-r">
						<p class="essay-comment-list-r-name">{{item.comment_user}}</p>
						<p class="essay-comment-list-r-content">
							{{item.content}}
						</p>
						<p class="essay-comment-list-r-time">
							{{item.created_at}}
							<span @click="Dcomment(item.id)" v-if="item.is_del">删除</span>
						</p>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import thumbup from "vue-material-design-icons/thumb-up-outline"
	import thumb from "vue-material-design-icons/thumb-up"
	import pencil from "vue-material-design-icons/pencil"
	export default {
		name: 'index',
		components: {
			thumbup,
			thumb,
			pencil
		},
		data() {
			return {
				loading: false,
				data: []
			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
			async thumb() {
				if(this.data.is_like){
					return false
				}
				await api.getArticlesLike(this.$route.params.id)
				const data = await api.getArticlesDetail(this.$route.params.id)
				this.data = data.data
			},
			Dcomment(id) {
				this.$dialog.confirm({
					title: '真的要删除评论吗?',
					mes: '删除后无法恢复',
					opts: [{
							txt: '取消',
							color: 'rgb(136, 136, 136)',
							callback: () => {

							}
						},
						{
							txt: '确定',
							color: 'rgb(28, 116, 217)',
							callback: () => {
								this.deleteComments(id)
							}
						}
					]
				});
			},
			async getData() {
				this.loading = true
				const data = await api.getArticlesDetail(this.$route.params.id)
				this.data = data.data
				this.loading = false
			},
			async deleteComments(id) {
				this.loading = true
				const dataDel = await api.deleteComments(id)
				if(dataDel.status) {
					this.$dialog.toast({
						mes: '删除成功',
						icon: 'success',
						timeout: 1000
					})
				}
				const data = await api.getArticlesDetail(this.$route.params.id)
				this.data = data.data
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.essay {
		&-index {
			background: #ffffff;
			&-title {
				font-size: .44rem;
				padding: .3rem .2rem;
				border-bottom: 1px solid #e6e6e6;
			}
			&-time {
				padding: .35rem .2rem;
			}
			&-content {
				color: #555555;
				padding: 0 .2rem;
				font-size: .33rem;
			}
			&-num {
				padding: .5rem .2rem;
				border-bottom: 1px solid #e3e3e3;
				&-zan {
					&-thumbup {
						vertical-align: middle;
						margin-left: .2rem;
					}
				}
			}
		}
		&-comment {
			&-show_more {
				color: #888888;
				font-size: .28rem;
				text-align: center;
				padding: .3rem 0 0 0;
				position: relative;
				width: 65%;
				margin: 0 auto;
				&:before,
				&:after {
					content: "";
					height: 1px;
					width: 50%;
					position: absolute;
					background: #cfcfcf;
					top: .5rem;
				}
				&:before {
					right: -20%;
				}
				&:after {
					left: -20%;
				}
			}
			&-write {
				font-size: .28rem;
				text-align: right;
				color: #9A9DB5;
				padding: .3rem .2rem;
				&-pencil {
					vertical-align: middle;
				}
			}
			&-list {
				padding: .2rem .3rem .3rem .2rem;
				&-l {
					float: left;
					width: 11%;
					& img {
						width: 29px;
						border-radius: 50%;
					}
				}
				&-r {
					float: left;
					width: 89%;
					&-name {
						color: #666666;
						font-size: .28rem;
						margin-top: .1rem;
					}
					&-content {
						color: #333333;
						font-size: .28rem;
						margin: .2rem 0;
					}
					&-time {
						color: #b0b0b0;
						& span {
							color: #63819d;
							margin-left: .3rem;
						}
					}
				}
			}
		}
	}
</style>
<style>
	.essay-index-num-zan-thumbup svg {
		width: 14px;
		height: 14px;
	}
</style>