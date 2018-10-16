<template>
	<div v-title data-title="全部分类" v-loading="loading">
		<div class="options-content">
			<div class="option" v-for="item,index in MobileNavsData" :key="index">
				<div class="content-bar clearfix">
					<div class="content-title">
						<img :src="item.icon" class="allclassify-poll-box" fillColor="#ffb647" />
						<span>{{item.name}}</span>
					</div>
					<span class="split-line"></span>
				</div>
				<div class="option-item">
					<a v-for="item2,index2 in item.children" :key="index2" @click="next(item2)">{{item2.name}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import PollBoxIcon from "vue-material-design-icons/poll-box" //返回图标
	export default {
		components: {
			PollBoxIcon
		},
		computed: {
			...mapState([
				'MobileNavsData'
			])
		},
		data() {
			return {
				loading: false
			}
		},
		methods: {
			...mapActions([
				'getMobileNavs'
			]),
			async getData() {
				if(this.MobileNavsData.length == 0) {
					this.loading = true
				}
				await this.getMobileNavs()
				this.loading = false
			},
			next(item) {
				this.$router.push({
					name: 'classList',
					params: {
						id: item.hashid
					}
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
<style scoped>
	.options-content {
		padding: 0 .2rem;
	}
	
	.option {
		margin-top: .6rem;
	}
	
	.options-content .option .content-bar {
		height: .5rem;
		position: relative;
	}
	
	.options-content .option .content-bar .content-title {
		position: absolute;
		display: inline-block;
		float: left;
		padding-right: .2rem;
		z-index: 999;
	}
	
	.options-content .option .content-bar .content-title span:nth-child(2) {
		font-size: 12px;
		display: inline-block;
		height: .5rem;
		line-height: .5rem;
		margin-left: .2rem;
	}
	
	.options-content .option .content-bar .content-title span {
		float: left;
	}
	
	.options-content .option .option-item a {
		display: inline-block;
		color: #333;
		width: 30.8%;
		height: .6rem;
		border: 1px solid #c9c9c9;
		border-radius: 25px;
		text-align: center;
		line-height: .6rem;
		margin-top: .2rem;
		font-size: 13px;
		background: #ffffff;
		margin-right: .1rem;
	}
	
	.allclassify-poll-box {
		width: .3rem;
		float: left;
		margin-top: .07rem;
	}
</style>
<style>

</style>