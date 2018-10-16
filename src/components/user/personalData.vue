<template>
	<div v-title data-title="个人资料">
		<div class="personalData">
			<yd-cell-group>
				<yd-cell-item class="personalData-item">
					<span slot="left">头像</span>
					<img slot="right" :src="LinkaProfileData.avatar" class="personalData-item-img" />
				</yd-cell-item>
				<yd-cell-item class="personalData-item">
					<span slot="left">姓名</span>
					<span slot="right">{{LinkaProfileData.name}}</span>
				</yd-cell-item>
				<yd-cell-item class="personalData-item">
					<span slot="left">性别</span>
					<span slot="right">{{LinkaProfileData.gender_txt}}</span>
				</yd-cell-item>
				<yd-cell-item class="personalData-item">
					<span slot="left">地区</span>
					<span slot="right">{{LinkaProfileData.city}}</span>
				</yd-cell-item>
				<yd-cell-item class="personalData-item">
					<span slot="left">手机号码</span>
					<span slot="right" v-if="LinkaProfileData.phone">{{LinkaProfileData.phone}}</span>
					<span slot="right" class="personalData-item-red" v-else @click="bind">未绑定</span>
				</yd-cell-item>
			</yd-cell-group>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		data() {
			return {

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
			async getData() {
				if(this.LinkaProfileData.length == 0) {
					this.loading = true
				}
				await this.getLinkaProfile()
				this.loading = false
			},
			bind(){
				this.$router.push({
					name: 'personalBindPhone'
				})
			}
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.personalData {
		margin-top: .2rem;
		&-item {
			padding: .3rem .2rem;
			&-img {
				width: 1.2rem;
				border-radius: 50%;
			}
			&-red {
				color: #e51c23;
			}
			& span {
				font-size: .33rem;
			}
		}
	}
</style>
<style>

</style>