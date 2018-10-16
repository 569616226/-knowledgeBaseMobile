<template>
	<div v-title data-title="绑定手机" class="bind_mobile" v-loading="loading">
		<yd-cell-group>
			<yd-cell-item>
				<yd-icon slot="icon" name="phone3" size=".45rem" color="#7d7d7d"></yd-icon>
				<input type="text" slot="right" placeholder="请输入11位手机号" v-model="mobile" maxlength="11">

				<!-- ↓↓关键代码是这里↓↓ -->
				<yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" init-str="获取验证码" reset-str="重新获取" type="warning"></yd-sendcode>
				<!-- ↑↑关键代码是这里↑↑ -->

			</yd-cell-item>
		</yd-cell-group>
		<yd-cell-item>
			<security slot="icon" fillColor="#7d7d7d" width="20" />
			<yd-input slot="right" v-model="code" placeholder="请输入4位验证码"></yd-input>
		</yd-cell-item>
		<yd-button size="large" bgcolor="#42b0ff" color="#ffffff" @click.native="sumbit">提交</yd-button>
	</div>
</template>

<script>
	import security from "vue-material-design-icons/security"
	import api from '@/utils/api'
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {
			security
		},
		data() {
			return {
				start1: false,
				code: '',
				mobile: '',
				loading: false
			}
		},
		computed: {
			...mapState([
				'LinkaProfileData'
			])
		},
		methods: {
			async sendCode1() {
				let phone = this.mobile
				if(!(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
					this.mobile = ''
				} else {
					this.$dialog.loading.open('发送中...');
					await api.getSmsCode(this.mobile)
					setTimeout(() => {
						this.start1 = true;
						this.$dialog.loading.close();
						this.$dialog.toast({
							mes: '已发送',
							icon: 'success',
							timeout: 1500
						});
					}, 1000);

				}
			},
			async sumbit() {
				if(this.mobile == '' || !(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.mobile))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
				} else if(this.code == '') {
					this.$dialog.toast({
						mes: '请填写验证码',
						icon: 'error',
						timeout: 1500
					});
				} else {
					// 提交绑定
					this.loading = true
					const data = await api.CheckSmsCode(this.mobile, this.code)
					if(data.status) {
						this.loading = false
						this.$dialog.toast({
							mes: '绑定成功',
							icon: 'success',
							timeout: 1500
						})
						this.LinkaProfileData.phone = this.mobile
						this.$router.push({
							name: 'basicNews'
						})
					}
				}
			}
		}
	}
</script>
<style scoped>
	.bind_mobile {
		padding: .4rem .2rem;
	}
	
	.yd-cell-item {
		background: #FFFFFF;
	}
	
	.yd-btn-warning {
		background: #42b0ff;
	}
</style>
<<style>
	.yd-cell-item:not(:last-child):after{ border-bottom:none; } .yd-cell:after{ border-bottom:none; }
	</style>