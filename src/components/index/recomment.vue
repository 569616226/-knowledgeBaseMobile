<template>
	<div v-if="topics">
		<div style="height: .2rem;"></div>
		<div class="index-wonderful">
			<div class="index-wonderful-top">
				<div class="index-wonderful-top-l">
					<span>推荐话题</span>
				</div>
			</div>
			<div class="index-recomment" v-for="item,index in topics.data" :key="index" @click="next(item.guest_id)">
				<div class="index-recomment-top">
					<img :src="item.guest_cover" style="width: 100%;" />
					<span class="index-recomment-top-help">帮助过{{item.helps}}人</span>
					<span class="index-recomment-top-yue" v-if="item.ser_type == '线下约见'">线下约见</span>
					<span class="index-recomment-top-call" v-else>全国通话</span>
				</div>
				<div class="index-recomment-title">
					<span>{{item.title}}</span>
				</div>
				<div class="index-recomment-name">
					<span class="index-recomment-name-span1">
						{{item.guest_name}}
					</span>
					<span class="index-recomment-name-span2">
						 <font color="#d6d6d6">丨</font>
						 {{item.guest_office}}
					</span>
				</div>
				<div class="index-recomment-price">
					<span><strong>{{item.price}}</strong>元/次</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			
		},
		props: ['topics'],
		created() {

		},
		data() {
			return {
				
			}
		},
		methods: {
			next(id) {
				this.$router.push({
					name: 'dakadetail',
					params: {
						id: id
					}
				})
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
<style lang="less" rel="stylesheet/less" scoped>
.index-wonderful{
	&-top{
		display: flex;
		padding: .2rem;
		background: #FFFFFF;
		&-l{
			flex: 1;
		}
		&-l span{
			font-size: 15.0px;
			font-weight: bold;
		}
		&-r span{
			color: #ababab;
		}
	}
}
.index-recomment:nth-child(2){
	margin-top: auto;
}
.index-recomment{
	background: #fff;
    margin-top: .2rem;
    &-top{
    	position: relative;
    	&-help{
    		position: absolute;
		    top: 10px;
		    left: 10px;
		    color: #ffffff;
		    background-color: #565f69;
		    border-radius: 22px;
		    padding: .05rem;
    	}
    	&-call{
    		position: absolute;
		    top: 0px;
		    right: 10px;
		    color: #ffffff;
		    background-color: #ff9800;
		    padding: .14rem;
		    border: 1px solid transparent;
    	}
    	&-yue{
    		position: absolute;
		    top: 0px;
		    right: 10px;
		    color: #ffffff;
		    background-color: #ff543d;
		    padding: .14rem;
		    border: 1px solid transparent;
    	}
    }
    &-title{
    	padding: .2rem .15rem;
    	font-size: 18.0px;
    }
    &-name{
    	padding: 0 .15rem;
    	color: #9a9db5;
    }
    &-price{
    	padding: .2rem .15rem;
    	color: #2ba6ff;
    	& span strong{
    		font-size: 16.0px;
    		margin-right: .1rem;
    	}
    }
}
</style>