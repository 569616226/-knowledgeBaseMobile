<template>
	<div class="container" v-title data-title="写评论" v-loading="loading">
		<div class="essay">
			<div class="essay-write">
				<p class="essay-write-title">
					{{data.title}}
				</p>
				<textarea style="padding:13px 8px;" placeholder="写下您对文章的看法..." v-model="postData.txt"></textarea>
				<p class="essay-write-btn" @click="next">发布</p>
			</div>
			<!--<div class="essay-comment">
				<div class="essay-comment-show_more">
					<p>我的评论</p>
				</div>
				<div class="essay-comment-list">
					<div class="essay-comment-list-l">
						<img src="../assets/index-head.png" />
					</div>
					<div class="essay-comment-list-r">
						<p class="essay-comment-list-r-name">狸猫先森</p>
						<p class="essay-comment-list-r-content">
							纯干货而且非常真诚认真，专业过人而且人品也令人敬佩，金老师辛苦了，支持你！！！
						</p>
						<p class="essay-comment-list-r-time">
							2017-01-02 11:30:35
							<span @click="Dcomment">删除</span>
						</p>
					</div>
					<div class="clear"></div>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		name: 'index',
		components: {

		},
		data() {
			return {
				postData: {
					txt: '',
					id: this.$route.params.id
				},
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
			async next() {
				if(this.postData.txt == '') {
					this.$dialog.toast({
						mes: '请先填写评论',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				const data = await api.postArticleComments(this.postData)
				if(data.status) {
					this.$dialog.toast({
						mes: '评论成功',
						icon: 'success',
						timeout: 1000
					})
				}
				window.history.go(-1)
				this.loading = false
			},
			Dcomment() {
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
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.essay {
		&-write {
			&-title {
				color: #333333;
				font-size: .33rem;
				padding: .3rem .2rem;
			}
			& textarea {
				width: 100%;
				min-height: 170px;
				border: none;
				border-top: 1px solid #e3e3e3;
				border-bottom: 1px solid #e3e3e3;
			}
			&-btn {
				margin: .3rem .2rem;
				text-align: center;
				color: #ffffff;
				font-size: .28rem;
				background-color: #42b0ff;
				border-radius: 4px;
				height: .8rem;
				line-height: .8rem;
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