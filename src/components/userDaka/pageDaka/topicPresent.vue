<template>
	<div v-title data-title="填写话题介绍">
		<div class="basicEdit">
			<vue-html5-editor :content="content" :height="height" :style="{width:'100%'}" @change="updateData"></vue-html5-editor>
			<div class="basicEdit-save" @click="basicEdit_save">
				<span>保存</span>
			</div>
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
				content: '',
				width: 0,
				height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
			}
		},
		computed: {
			...mapState([
				'topicList'
			])
		},
		methods: {
			updateData(e = '') {
				let c1 = e.replace(/<img width="100%"/g, '<img');
				let c2 = c1.replace(/<img/g, '<img width="100%"');
				this.content = c2;
			},
			async basicEdit_save() {
				if(this.content == '') {
					this.$dialog.toast({
						mes: '请填写内容',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.topicList.present = this.content
				this.$dialog.toast({
					mes: '保存成功',
					icon: 'success',
					timeout: 1000
				})
				const id = this.$route.params.id
				if(id) {
					this.topicList.id = this.$route.params.id
					await api.postTopicsid(this.topicList)
					this.$router.push({
						name: 'editTopic',
						id: id
					})
				} else {
					this.$router.push({
						name: 'addTopic'
					})
				}
			}
		},
		mounted() {
			let w = document.documentElement.clientWidth;
			let h = document.documentElement.clientHeight;
			this.width = (w - 10) + 'px';
			this.height = h - 90;
			this.content = this.topicList.present
		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.basicEdit {
		&-save {
			color: rgb(255, 255, 255);
			background-color: rgb(41, 182, 246);
			height: 45px;
			line-height: 45px;
			font-size: .28rem;
			position: fixed;
			width: 100%;
			bottom: 0;
			text-align: center;
		}
	}
</style>
<style>

</style>