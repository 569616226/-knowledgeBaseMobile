<template>
	<div class="container" v-title data-title="链答">
		<div v-loading="loading">
			<div class="index-search" @click="search">
				<div class="index-search-a">
					<yd-icon name="search" size=".2rem" color="#919191"></yd-icon>
					<span class="index-search-a-span">可搜索问答、话题</span>
				</div>
			</div>
			<slider :adverts="indexData.adverts"></slider>
			<yd-flexbox class="index-classify" v-if="indexData.navs">
				<yd-flexbox-item class="index-classify-item-flex" v-for="item,index in indexData.navs.data" :key="index">
					<router-link :to="{name: 'classList', params: { id: item.first_children_id }}" class="router-link-exact-active router-link-active">
						<div class="yd-grids-icon col_height"><img :src="item.icon" /></div>
						<div class="yd-grids-txt"><span>{{item.name}}</span></div>
					</router-link>
				</yd-flexbox-item>
				<yd-flexbox-item class="index-classify-item-flex">
					<router-link to="/allclassify" class="router-link-exact-active router-link-active">
						<div class="yd-grids-icon col_height">
							<widgets-icon fillColor="#43a2fa" />
						</div>
						<div class="yd-grids-txt"><span>全部</span></div>
					</router-link>
				</yd-flexbox-item>
			</yd-flexbox>
			<yd-flexbox class="index-wy">
				<yd-flexbox-item class="index-wy-w">
					<router-link to="/question" class="router-link-exact-active router-link-active">
						<div class="index-wy-w-l">
							<img src="../assets/question.png" style="width: 49px;" />
						</div>
						<div class="index-wy-w-r">
							<p class="index-wy-w-r-title">
								我要提问
							</p>
							<p class="index-wy-w-r-p">
								向大咖提问题
							</p>
						</div>
					</router-link>
				</yd-flexbox-item>
				<yd-flexbox-item class="index-wy-w">
					<router-link to="/choose" class="router-link-exact-active router-link-active">
						<div class="index-wy-w-l">
							<img src="../assets/meet.png" style="width: 49px;" />
						</div>
						<div class="index-wy-w-r">
							<p class="index-wy-w-r-title">
								约见大咖
							</p>
							<p class="index-wy-w-r-p">
								线下约见大咖
							</p>
						</div>
					</router-link>
				</yd-flexbox-item>
			</yd-flexbox>
			<wonderful :answers="indexData.answers"></wonderful>
			<starcafe :linkas="indexData.linkas"></starcafe>
			<recomment :topics="indexData.topics"></recomment>
			<div class="index-more" @click="nextTopic">
				<span>查看更多话题</span>
			</div>
		</div>
		<bottom-nav :index="index"></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import BottomNav from '../components/common/BottomNav' //底部导航
	import slider from '../components/index/slider' //轮播图
	import WidgetsIcon from "vue-material-design-icons/widgets" //分类'全部'图标
	import wonderful from '../components/index/wonderful' //精彩问答
	import starcafe from '../components/index/starcafe' //明星大咖
	import recomment from '../components/index/recomment' //推荐话题
	export default {
		name: 'index',
		components: {
			BottomNav,
			slider,
			WidgetsIcon,
			wonderful,
			starcafe,
			recomment
		},
		data() {
			return {
				pullUpLoad: {
					threshold: 10,
					txt: {
						more: '',
						noMore: '暂无更多数据'
					}
				},
				index: true,
				loading: false
			}
		},
		computed: {
			...mapState([
				'indexData',
				'navsCheck'
			])
		},
		methods: {
			...mapActions([
				'getIndex'
			]),
			nextTopic() {
				this.navsCheck.id = 0
				const id = this.indexData.navs.data[0].first_children_id
				this.$router.push({
					name: 'classList',
					params: {
						id: id
					}
				})
			},
			nextAnswer() {
				this.navsCheck.id = 1
				const id = this.indexData.navs.data[0].first_children_id
				this.$router.push({
					name: 'classList',
					params: {
						id: id
					}
				})
			},
			async getData() {
				if(this.indexData.length == 0){
					this.loading = true
				}
				await this.getIndex()
				this.loading = false
			},
			search() {
				this.$router.push({
					name: 'search'
				})
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	.index-search {
		background: #FFFFFF;
		padding: .14rem;
		&-a {
			padding: .14rem .4rem;
			background-color: #f2f2f2;
			border-radius: 30px;
			&-span {
				color: #b0b0b0;
				margin-left: .14rem;
			}
		}
	}
	
	.index-classify {
		padding: 0 0 .3rem 0;
		background: #FFFFFF;
		flex-wrap: wrap;
		&-item-flex {
			width: 25%;
			flex: none;
			margin-top: .3rem;
		}
	}
	
	.index-wy {
		padding: .2rem;
		&-w:first-child {
			margin-right: .2rem;
		}
		&-w {
			background: #fff;
			padding: .2rem;
			border-radius: 4px;
			height: 77px;
			&-l {
				float: left;
			}
			&-r {
				float: right;
				text-align: right;
				&-title {
					color: #2ba6ff;
					font-size: 14px;
					margin-top: .1rem;
				}
				&-p {
					color: #858585;
					margin-top: .1rem;
				}
			}
		}
	}
	
	.index-more {
		text-align: center;
		margin: .5rem .15rem;
		background: #ffffff;
		border: 1px solid #D6D6D6;
		border-radius: 50px;
		padding: .23rem 0;
		font-size: 14.0px;
	}
</style>