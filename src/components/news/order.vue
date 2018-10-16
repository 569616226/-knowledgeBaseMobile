<template>
	<div>
		<div style="height: .2rem;"></div>
		<div class="order">
			<div class="order-l">
				<img src="../../assets/index-head.png" />
			</div>
			<div class="order-r">
				<p class="order-r-title">
					邀请您对此次会面进行评价，分享会面心得吧！
				</p>
				<p class="order-r-ml">
					话题：如何营造线上与线下互通的社群
				</p>
				<p class="order-r-time">
					2018-04-02 14:47
				</p>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.order{
	background: #ffffff;
    padding: .3rem .1rem .4rem .1rem;
    border-bottom: 1px solid #EDEDED;
    &-l{
    	float: left;
    	width: 14%;
    	& img{
    		width: 45px;
    		border-radius: 50%;
    	}
    }
    &-r{
    	float: left;
    	width: 86%;
    	&-title{
    		font-size: .28rem;
    	}
    	&-ml{
    		color: #999999;
    		padding: .2rem 0;
    	}
    	&-time{
    		color: #999999;
    	}
    }
}
</style>
<style>

</style>