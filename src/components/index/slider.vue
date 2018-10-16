<template>
	<div v-if="adverts">
		<yd-slider autoplay="3000">
			<yd-slider-item v-for="item,index in adverts.data" :key="index">
				<a @click="comelink(item.link)">
					<img :src="item.image">
				</a>
			</yd-slider-item>
		</yd-slider>
	</div>
</template>
<script>
	export default {
		props: ['adverts'],
		created() {

		},
		data() {
			return {

			}
		},
		methods: {
			comelink(link) {
				const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
				if(reg.test(link)) {
					window.location.href = link
				} else {
					this.$router.push({
						name: 'dakadetail',
						params: {
							id: link
						}
					})
				}
			}
		},
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style>
	.yd-slider-pagination-item {
		border: 2px solid #ffffff;
		width: 11px;
		height: 11px;
		background: none;
	}
	
	.yd-slider-pagination-item-active {
		background: #FFFFFF;
	}
</style>