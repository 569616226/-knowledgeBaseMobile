<template>
	<div>
		<div style="height: .2rem;"></div>
		<div class="index-wonderful">
			<div class="index-wonderful-top">
				<div class="index-wonderful-top-l">
					<span>明星大咖</span>
				</div>
				<div class="index-wonderful-top-r" @click="nextTopic">
					<span>更多></span>
				</div>
			</div>
			<div class="index-starcafe" v-if="linkas">
				<div class="index-starcafe-flex" v-for="item,index in linkas.data" :key="index" @click="next(item.id)">
					<div class="index-starcafe-flex-img">
						<img :src="item.avatar" />
					</div>
					<div class="index-starcafe-flex-name">
						<span><strong>{{item.real_name}}</strong></span>
					</div>
					<div class="index-starcafe-flex-text">
						<p>{{item.office}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			
		},
		props: ['linkas'],
		created() {

		},
		data() {
			return {
				
			}
		},
		methods: {
			next (id) {
				this.$router.push({
					name: 'dakadetail',
					params: {
						id: id
					}
				})
			},
			nextTopic() {
				this.$parent.nextTopic()
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
	background: #FFFFFF;
	&-top{
		display: flex;
		padding: .2rem .2rem 0 .2rem;
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
.index-starcafe{
	display: flex;
    overflow-x: scroll;
    padding: .3rem .15rem;
    &-flex{
    	text-align: center;
	    padding: .2rem .3rem;
	    width: 36%;
	    flex: none;
    	&-img img{
    		width: 53px;
    		border-radius: 50%;
    	}
    	&-name{
    		padding: .2rem 0;
    	}
    	&-text p{
    		text-align: center;
    		overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2; 
    	}
    }
}
</style>