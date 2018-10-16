<template>
	<div v-title data-title="消息内容" v-loading="loading">
		<div class="system">
			<p class="system-title">
				 {{data.title}}
			</p>
			<p class="system-time">
				{{data.created_at}}
			</p>
			<p class="system-content">
				{{data.content}}
				<img :src="data.img_url" width="100%"/>
			</p>
		</div>
	</div>
</template>

<script>
	import api from '@/utils/api'
	export default {
		components: {
			
		},
		data() {
			return {
				data: [],
				loading: false
			}
		},
		computed: {

		},
		methods: {
			async getData() {
				this.loading = true
				const data = await api.getMobileMessagesDetail(this.$route.params.id)
				this.data = data.data
				this.loading = false
			},
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.system{
	& .see{
		color: #888888;
	}
	background: #ffffff;
    padding: .3rem .2rem;
    &-title{
    	font-size: .31rem;
    }
    &-time{
    	color: #999999;
    	padding: .2rem 0;
    }
    &-content{
    	color: #999999;
    }
}
</style>
<style>

</style>