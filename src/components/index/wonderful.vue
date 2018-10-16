<template>
	<div v-if="answers">
		<div class="index-wonderful">
			<div class="index-wonderful-top">
				<div class="index-wonderful-top-l">
					<span>精彩问答</span>
				</div>
				<div class="index-wonderful-top-r" @click="nextAnswer">
					<span>更多></span>
				</div>
			</div>
			<div class="index-wonderful-content" v-for="item,index in answers.data" :key="index">
				<router-link :to="{name: 'questiondetail', params: { id: item.id }}">
					<div class="index-wonderful-content-head">
						<div class="index-wonderful-content-head-l width10">
							<img :src="item.answer_avatar" />
						</div>
						<div class="index-wonderful-content-head-l width85 margin-left-2x">
							<p class="index-wonderful-content-head-l-p1">
								<span class="index-wonderful-content-head-l-p1-span1">
									{{item.answer_name}}
								</span>
								<p class="index-wonderful-content-head-l-p1-span2">
									{{item.answer_office}}
								</p>
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
							<yd-rate v-model="item.star" size="14px" color="#d6d6d6" active-color="#ffd600" :readonly="true"></yd-rate>
						</span>
						<span class="blue-money" v-if="!item.is_reader"><strong style="font-size: 16px;">{{item.price}}</strong>元</span>
						<span class="red-check" v-else>已查看</span>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import EyeIcon from "vue-material-design-icons/eye"
	export default {
		components: {
			EyeIcon
		},
		props: ['answers'],
		created() {

		},
		data() {
			return {
				rate: 4
			}
		},
		methods: {
			nextAnswer() {
				this.$parent.nextAnswer()
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
		&-top {
			display: flex;
			padding: .2rem .2rem 0 .2rem;
			&-l {
				flex: 1;
			}
			&-l span {
				font-size: 15.0px;
				font-weight: bold;
			}
			&-r span {
				color: #ababab;
			}
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