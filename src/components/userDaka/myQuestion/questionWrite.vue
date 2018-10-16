<template>
	<div class="container" v-title data-title="回答问题" v-loading="loading">
		<div class="essay">
			<div class="essay-write">
				<p class="essay-write-title">
					{{data.name}}
				</p>
				<div class="essay-write-textarea">
					<textarea style="padding:13px 8px;" placeholder="例如：学习做产品先关的工作应如何入门？" v-model="postData.txt" maxlength="300"></textarea>
					<span><font color="#696969">{{postData.txt.length}}</font><font color="#b0b0b0">/300</font></span>
				</div>
				<p class="essay-write-btn" @click="next">提交</p>
			</div>
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
			async getData() {
				this.loading = true
				const data = await api.getGuestAnswersDetail(this.$route.params.id)
				this.data = data.data
				this.loading = false
			},
			async next() {
				if(this.postData.txt == '') {
					this.$dialog.toast({
						mes: '请填写答案',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				await api.patchQuestions(this.postData)
				this.loading = false
				this.$router.push({
					name: 'questiondetail',
					params: {
						id: this.$route.params.id
					}
				})
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
			&-textarea {
				position: relative;
				box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
				margin: 0 .15rem;
				background: #ffffff;
				border-radius: 4px;
				& textarea {
					width: 100%;
					min-height: 300px;
					border: none;
					border-top: 1px solid #e3e3e3;
					border-bottom: 1px solid #e3e3e3;
					border: none;
					border-radius: 4px;
				}
				& span {
					position: absolute;
					right: .2rem;
					bottom: .3rem;
				}
			}
			&-btn {
				text-align: center;
				color: #ffffff;
				font-size: .28rem;
				background-color: #42b0ff;
				height: .9rem;
				line-height: .9rem;
				position: fixed;
				width: 100%;
				bottom: 0;
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