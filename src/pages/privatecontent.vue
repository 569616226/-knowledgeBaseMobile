<template>
	<div v-title data-title="私信内容" v-loading="loading">
		<div class="privatecontent">
			<!--<scroll ref="scroll" :data="data" :listenScrollEnd="true" :pullDownRefresh="pullDownRefreshObj" @pullingDown="onPullingDown" :scrollToEndFlag="true">-->
			<scroll ref="scroll" :data="data" :listenScrollEnd="true">
				<div class="privatecontent-index" v-for="item,index in data" :key="index">
					<div v-if="!item.is_send">
						<p class="privatecontent-index-time">
							<span>{{item.created_at}}</span>
						</p>
						<div class="privatecontent-index-ke">
							<div class="privatecontent-index-ke-l">
								<img :src="item.guest_avatar" />
							</div>
							<div class="privatecontent-index-ke-r">
								<p class="privatecontent-index-ke-r-name">{{item.guest_name}}</p>
								<p class="privatecontent-index-ke-r-c">
									{{item.content}}
								</p>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<div v-else>
						<p class="privatecontent-index-time">
							<span>{{item.created_at}}</span>
						</p>
						<div class="privatecontent-index-zhu">
							<div class="privatecontent-index-zhu-l">
								<img :src="item.guest_avatar" />
							</div>
							<div class="privatecontent-index-zhu-r">
								<p class="privatecontent-index-zhu-r-name">{{item.guest_name}}</p>
								<p class="privatecontent-index-zhu-r-c">
									{{item.content}}
								</p>
							</div>
							<div class="clear"></div>
						</div>
					</div>
				</div>
			</Scroll>
			<div class="privatecontent-bottom">
				<input type="text" v-model="postData.content" placeholder="请输入" class="privatecontent-bottom-text" />
				<span class="privatecontent-bottom-btn" @click="seed">发送</span>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/utils/api'
	import Scroll from '@/components/better-scroll/Scroll.vue'
	export default {
		components: {
			Scroll
		},
		data() {
			return {
				postData: {
					content: '',
					guest_id: null,
					pid: null
				},
				loading: false,
				data: [],
				// 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
				pullDownRefreshObj: {
					threshold: 90,
					stop: 40
				},
				getDatas: {
					guest_id: this.$route.params.id,
					page: 1,
					limit: 10
				},
				scrollWait: null
			}
		},
		computed: {

		},
		methods: {
			async getData() {
				this.loading = true
				const data = await api.getChatsDetail(this.getDatas)
				this.data = data.data
				
				let checkData = []
				this.data.forEach(item => {
					if(!item.is_send){
						checkData.push(item)
					}
				})
				const id = checkData.length - 1
				const pid = this.data.length - 1
				if(this.data.length > 0){
					this.postData.pid = this.data[pid].real_id
				}else{
					this.postData.pid = 0
				}
				this.postData.guest_id = this.$route.params.id
				this.$nextTick(() => {
					setTimeout(() => {
						this.scrollWait = this.$refs.scroll.scroll.maxScrollY
						this.$refs.scroll.scroll.scrollTo(0, this.scrollWait)
					}, 100)
				})
				this.loading = false
			},
			async onPullingDown() {
				this.getDatas.page++
				const data2 = await api.getChatsDetail(this.getDatas)
				data2.data.forEach(item => {
					this.data.unshift(item)
				})
				this.$nextTick(() => {
					setTimeout(() => {
						const scrollWait = this.$refs.scroll.scroll.maxScrollY - this.scrollWait
						this.$refs.scroll.scroll.scrollTo(0, scrollWait)
						this.scrollWait = this.$refs.scroll.scroll.maxScrollY
					}, 1500)
				})
				this.$refs.scroll.forceUpdate(true)
			},
			async seed() {
				if(this.postData.content == ''){
					this.$dialog.toast({
						mes: '请输入内容',
						icon: 'error',
						timeout: 1000
					})
					return false
				}
				this.loading = true
				await api.postChats(this.postData)
				this.postData.content = ''
				await this.getData()
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.privatecontent {
		position: relative;
		height: 93vh;
		& .list-wrapper {
			background: none;
		}
		&-index {
			&-time {
				padding: .3rem 0;
				text-align: center;
				& span {
					padding: .1rem .2rem;
					color: #ffffff;
					background-color: #cecece;
					border-radius: 4px;
				}
			}
			&-ke {
				padding: .2rem .15rem;
				&-l {
					float: left;
					width: 16%;
					& img {
						width: 45px;
						border-radius: 50%;
					}
				}
				&-r {
					float: left;
					width: 84%;
					&-c {
						color: #ffffff;
						background: #29b6f6;
						display: inline-block;
						padding: .3rem .15rem;
						border-radius: 5px;
						margin-top: .1rem;
						position: relative;
						margin-left: .2rem;
						font-size: .28rem;
						&:after {
							content: '';
							position: absolute;
							left: -18px;
							top: 14px;
							border: 9px solid transparent;
							border-right-color: #29b6f6;
							width: 10px;
							height: 10px;
						}
					}
				}
			}
			&-zhu {
				padding: .2rem .15rem;
				&-l {
					float: right;
					width: 16%;
					text-align: right;
					& img {
						width: 45px;
						border-radius: 50%;
					}
				}
				&-r {
					float: right;
					width: 84%;
					text-align: right;
					&-c {
						float: right;
						color: #101010;
						background: #ffffff;
						display: inline-block;
						padding: .3rem .15rem;
						border-radius: 5px;
						margin-top: .1rem;
						position: relative;
						margin-left: .2rem;
						font-size: .28rem;
						text-align: left;
						&:after {
							content: '';
							position: absolute;
							right: -18px;
							top: 14px;
							border: 9px solid transparent;
							border-left-color: #ffffff;
							width: 10px;
							height: 10px;
						}
					}
				}
			}
		}
		&-bottom {
			position: fixed;
			bottom: 0;
			background: #f8f8f8;
			border-top: 1px solid #bbbbbb;
			width: 100%;
			padding: .13rem;
			&-text {
				width: 80%;
				height: .6rem;
				font-size: .28rem;
				padding: .1rem;
				border: 1px solid rgb(219, 219, 219);
				color: rgb(176, 176, 176);
				border-radius: 4px;
				background: #ffffff;
			}
			&-btn {
				width: 17%;
				text-align: center;
				display: inline-block;
				color: #ffffff;
				background-color: white;
				background-color: rgb(41, 182, 246);
				border-radius: 4px;
				padding: .13rem;
				margin-left: .1rem;
			}
		}
	}
</style>
<style>

</style>