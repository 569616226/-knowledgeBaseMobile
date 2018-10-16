<template>
	<div>
		<div class="search-interlocution index-wonderful">
			<div v-if="answer.length == 0" class="index-wonderful-nothing">
				<img src="../../assets/hollow.png" />
				<p>没有找到你想要的内容，换个关键词试试！！</p>
			</div>
			<div v-else>
				<scroll ref="scroll" :data="answer" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
					<div class="index-wonderful-content" v-for="item,index in answer" :key="index" @click="next(item.id)">
						<div class="index-wonderful-content-head">
							<div class="index-wonderful-content-head-l width10">
								<img :src="item.answer_avatar" />
							</div>
							<div class="index-wonderful-content-head-l width85 margin-left-2x">
								<p class="index-wonderful-content-head-l-p1">
									<span class="index-wonderful-content-head-l-p1-span1">
								{{item.answer_name}}
							</span>
									<span class="index-wonderful-content-head-l-p1-span2">
								 <font color="#d6d6d6">丨</font>
								 {{item.answer_office}}
							</span>
								</p>
							</div>
							<div class="clear"></div>
						</div>
						<div class="index-wonderful-content-text">
							<p>{{item.name}}</p>
						</div>
						<div class="index-wonderful-content-down">
							<eye-icon fillColor="#D6D6D6"></eye-icon>
							<span class="index-wonderful-content-down-eye">{{item.readers}}</span>
							<span class="index-wonderful-content-down-rate">
						<yd-rate v-model="item.star" size="14px" color="#d6d6d6" active-color="#ffd600"></yd-rate>
					</span>
							<span class="blue-money" v-if="!item.is_reader"><strong style="font-size: 16px;">{{item.price}}</strong>元</span>
							<span class="red-check" v-else>已查看</span>
						</div>
					</div>
				</scroll>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import EyeIcon from "vue-material-design-icons/eye"
	export default {
		components: {
			EyeIcon,
			Scroll
		},
		props: ['answer'],
		created() {

		},
		data() {
			return {
				pullUpLoad: {
					threshold: 10,
					txt: {
						more: '',
						noMore: '暂无更多数据'
					}
				}
			}
		},
		methods: {
			...mapActions([
				'postSearchAnswer'
			]),
			next(id) {
				this.$router.push({
					name: 'questiondetail',
					params: {
						id: id
					}
				})
			},
			async onloadrefresh() {
				await this.postSearchAnswer()
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
	.blue-money {
		float: right;
		color: #2ba6ff;
	}
	
	.red-check {
		float: right;
		color: #ff4a55;
	}
	
	.index-wonderful {
		background: #FFFFFF;
		margin-top: .2rem;
		position: relative;
		height: 83vh;
		& .list-wrapper {
			background: none;
		}
		&-nothing img {
			width: 80%;
			padding-top: 1rem;
			margin: 0 auto;
			display: block;
		}
		&-nothing p {
			color: rgb(102, 102, 102);
			font-size: .28rem;
			margin-top: .6rem;
			text-align: center;
		}
		&-content {
			padding: .2rem;
			border-bottom: 1px solid #ededed;
		}
		&-content-head {
			margin-top: .3rem;
			&-l {
				float: left;
				& img {
					width: 33px;
					border-radius: 50%;
				}
				&-p1-span3 {
					color: #9a9db5;
					background-color: #f5f5f5;
					border-radius: 18px;
				}
				&-p1-span1 {
					font-size: 13.0px;
				}
				&-p1-span2 {
					font-size: 13.0px;
					color: #b0b0b0;
				}
			}
		}
		&-content-text {
			font-size: .32rem;
			margin: .1rem 0;
			white-space: normal;
			word-break: break-all;
			text-overflow: ellipsis;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			display: -webkit-box;
		}
		&-content-down {
			&-eye {
				color: #bfc4c7;
				vertical-align: super;
			}
			&-rate {
				display: inline-block;
				margin-left: .2rem;
				vertical-align: super;
			}
		}
	}
</style>