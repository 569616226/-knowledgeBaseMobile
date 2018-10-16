<template>
	<div>
		<div class="expert-topics">
			<div class="topic-item" v-for="item,index in topic" @click="next(item.id)">
				<div class="topic-item-price">
					<span class="price-large"><b>{{item.price}}</b>元/次</span>
				</div>
				<div class="topic-item-title">{{item.title}}</div>
				<div class="topic-item-content" v-html="item.describe"></div>
				<div v-if="item.ser_type == '全国通话'">
					<div class="topic-item-duration">
						<span class="icon-duration"></span>{{item.ser_time}}分钟/次
					</div>
					<div class="topic-item-type offline">
						{{item.ser_type}}
					</div>
				</div>
				<div v-else>
					<div class="topic-item-duration">
						<span class="icon-duration"></span>{{item.ser_time}}小时/次
					</div>
					<div class="topic-item-type online">
						{{item.ser_type}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		created() {

		},
		data() {
			return {

			}
		},
		methods: {
			next(id) {
				if(this.linkdeatil.phone == null) {
					this.showData.dakaShow = true
					return false
				}
				this.$router.push({
					name: 'makedaka',
					params: {
						id: id
					}
				})
			}
		},
		props: ['topic','linkdeatil'],
		computed: {
			...mapState([
				'MobileLinkasDetailData',
				'LinkaProfileData',
				'showData'
			])
		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style scoped>
	.expert-topics {
		margin-top: .2rem;
	}
	
	.expert-topics .topic-item {
		padding: .3rem .2rem;
		margin: 0 .2rem .2rem;
		background-color: #fff;
		border-radius: .1rem;
		position: relative;
	}
	
	.expert-topics .topic-item .topic-item-price .price-large {
		color: #32a0e6;
		font-size: .24rem;
		margin-right: .1rem;
	}
	
	.expert-topics .topic-item .topic-item-price .price-large b {
		font-size: .32rem;
		font-weight: 400;
	}
	
	.expert-topics .topic-item .topic-item-title {
		color: #333;
		font-size: .34rem;
		margin: .2rem 0;
	}
	
	.expert-topics .topic-item .topic-item-content {
		color: #666;
		font-size: .3rem;
		line-height: .38rem;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 1.2rem;
	}
	
	.expert-topics .topic-item .topic-item-duration {
		margin-top: .2rem;
		font-size: .26rem;
		color: #9d9d9d;
	}
	
	.expert-topics .topic-item .topic-item-type {
		position: absolute;
		right: .2rem;
		top: -.04rem;
		width: 1.46rem;
		height: .62rem;
		color: #fff;
		font-size: .28rem;
		line-height: .62rem;
		text-align: center;
		text-indent: .08rem;
	}
	
	.offline {
		background-color: #ff9800;
	}
	
	.online {
		background-color: #ff543d;
	}
</style>