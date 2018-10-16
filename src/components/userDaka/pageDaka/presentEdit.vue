<template>
	<div v-title data-title="填写个人介绍" v-loading="loading">
		<div class="basicEdit">
			<vue-html5-editor :content="formData.content" :height="height" :style="{width:'100%'}" @change="updateData" placeholder="1"></vue-html5-editor>
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
				loading: false,
				formData: {
					content: '',
					id: this.$route.params.id
				},
				width: 0,
				height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
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
			updateData(e = '') {
				let c1 = e.replace(/<img width="100%"/g, '<img');
				let c2 = c1.replace(/<img/g, '<img width="100%"');
				this.formData.content = c2;
			},
			async basicEdit_save() {
				if(this.formData.content == '') {
					this.$dialog.toast({
						mes: '请填写内容',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				await api.putGuests(this.formData)
				this.loading = false
				this.$router.push({
					name: 'pageDaka'
				})
			},
			async getData() {
				if(this.LinkaProfileData.length == 0) {
					this.loading = true
				}
				await this.getLinkaProfile()
				this.formData.content = this.LinkaProfileData.profile
				this.loading = false
			},
		},
		mounted() {
			let w = document.documentElement.clientWidth;
			let h = document.documentElement.clientHeight;
			this.width = (w - 10) + 'px';
			this.height = h - 90;
			this.getData()
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