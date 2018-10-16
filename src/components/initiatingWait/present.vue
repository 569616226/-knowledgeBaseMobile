<template>
	<div v-title data-title="填写个人介绍" v-loading="loading">
		<div class="present">
			<div class="present-t">
				<p class="present-t-title">大咖想了解学员的问题</p>
				<p class="present-t-list" v-for="item,index in LinkaTopicDetailData.need_infos" :key="index">{{index+1}}、{{item.title}}</p>
			</div>
			<div class="present-text">
				<textarea style="padding:15px 10px;" placeholder="例如：学习做产品先关的工作应如何入门？" maxlength="300" v-model="initiating.profile"></textarea>
				<span><font color="#696969">{{initiating.profile.length}}</font><font color="#b0b0b0">/300</font></span>
			</div>
		</div>
		<div class="present-save" @click="present_save">
			<span>保存</span>
		</div>
		<div style="height: 1.1rem;"></div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		components: {
			
		},
		created() {

		},
		data() {
			return {
				content: '',
				loading: false
			}
		},
		methods: {
			async present_save() {
				if(this.initiating.profile == ''){
					this.$dialog.toast({mes: '请填写内容', timeout: 1000});
				}else{
					this.loading = true
					this.initiating.id = this.$route.params.id
					await api.patchAppointsid(this.initiating)
					this.loading = false
					this.$parent.index = true
					this.$parent.anwser = false
					this.$parent.present = false
				}
			}
		},
		props: [],
		computed: {
			...mapState([
				'LinkaTopicDetailData',
				'initiating'
			]),
		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.present{
		padding: 0 .2rem;
		&-t{
			padding: .2rem;
			&-title{
				color: #9A9DB5;
			    font-size: 14.0px;
			    padding: .2rem 0;
			}
			&-list{
				font-size: 14.0px;
    			margin-top: .2rem;
			}
		}
		&-text{
			position: relative;
			& textarea{
				padding: 15px 10px;
			    width: 100%;
			    min-height: 300px;
			    border: none;
			    border-radius: 4px;
			    margin-top: .2rem;
			    box-shadow: 0px 0px 6px 0px rgba(219,219,219,1);
			}
			& span{
				position: absolute;
			    right: .2rem;
			    bottom: 14px;
			}
		}
	}
	.present-save{
		text-align: center;
		color: #ffffff;
		font-size: 14px;
		background: rgb(41, 182, 246);
		line-height: .9rem;
		height: .9rem;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>