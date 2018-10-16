<template>
	<div class="container" v-title data-title="意见反馈" v-loading="loading">
		<div class="essay">
			<div class="essay-write">
				<textarea style="padding:13px 8px;" placeholder="请填写具体内容帮助我们了解您的意见与建议，我们会竭尽所能为您服务！" v-model="txt"></textarea>
				<p class="essay-write-btn" @click="saveEmail">提交</p>
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
				txt: '',
				loading: false
			}
		},
		computed: {
			...mapState([

			])
		},
		methods: {
			...mapActions([

			]),
			async saveEmail() {
				if(this.txt == '') {
					this.$dialog.toast({
						mes: '请先填写内容',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				await api.postSendEmail(this.txt)
				this.loading = false
				this.$dialog.toast({
					mes: '提交成功',
					icon: 'success',
					timeout: 1000
				})
				this.$router.push({
					name: 'user'
				})
			}
		},
		mounted() {

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
				min-height: 270px;
				border: none;
				border-top: 1px solid #e3e3e3;
				border-bottom: 1px solid #e3e3e3;
				line-height: 20px;
				font-size: .28rem;
			}
			&-btn {
				margin: .3rem .2rem;
				text-align: center;
				color: #ffffff;
				font-size: .28rem;
				background-color: #42b0ff;
				border-radius: 40px;
				height: .8rem;
				line-height: .8rem;
			}
		}
	}
</style>
<style>

</style>