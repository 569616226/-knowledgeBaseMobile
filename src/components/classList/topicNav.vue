<template>
	<div v-loading="loading">
		<dl class="topmenu">
			<dt>
				<div class="selectlist">
					<div class="select_textdiv" @click="sel(1)">
						<p class="s_text">{{NavsLinkasData.Navname}}<ChevronDownIcon :class="[rotate1?'choose-chevron go-down':'choose-chevron go-up']" fillColor="rgb(41, 182, 246)"/></p>
					</div>
					<div class="select_textul" v-if="rotate1">
						<ul class="select_first_ul">
							<li v-for="item1,index1 in MobileNavsData" :key="index1" :class="item1.id == NavsLinkasData.Navid ? 'focus' : ''" @click="checkT(item1)">
								<p>{{item1.name}}</p>
								<ul class="select_second_ul" v-if="item1.id == NavsLinkasData.Navid">
									<li v-for="item2,index2 in item1.children" :key="index2" :class="item2.hashid == NavsLinkasData.id ? 'focusli' : ''" @click="checkF(item2)">{{item2.name}}<check v-if="item2.id == NavsLinkasData.id" class="choose-check" fillColor="rgb(41, 182, 246)" /></li>
								</ul>
							</li>
						</ul>
						<div class="select_textul_bg" @click="sel(1)"></div>
					</div>
				</div>	
			</dt>
			<dt>
				<div class="selectlist">
					<div class="select_textdiv" @click="sel(2)">
						<p class="s_text">{{NavsLinkasData.type}}<ChevronDownIcon :class="[rotate2?'choose-chevron go-down':'choose-chevron go-up']" fillColor="rgb(41, 182, 246)"/></p>
					</div>
					<div class="select_textul" v-if="rotate2">
						<ul class="select_first_ul">
							<li v-for="item,index in list2" :key="index" :class="item.id == NavsLinkasData.ser_type ? 'focusli' : ''" @click="checkallT(item)">
								<p style="width: 100%;">{{item.title}}<check v-if="item.id == NavsLinkasData.ser_type" class="choose-check" fillColor="rgb(41, 182, 246)" /></p>
							</li>
						</ul>
						<div class="select_textul_bg" @click="sel(2)"></div>
					</div>
				</div>	
			</dt>
			<dt>
				<div class="selectlist">
					<div class="select_textdiv" @click="sel(3)">
						<p class="s_text">{{NavsLinkasData.order}}<ChevronDownIcon :class="[rotate3?'choose-chevron go-down':'choose-chevron go-up']" fillColor="rgb(41, 182, 246)"/></p>
					</div>
					<div class="select_textul" v-if="rotate3">
						<ul class="select_first_ul">
							<li v-for="item,index in list3" :key="index" :class="item.id == NavsLinkasData.order_by ? 'focusli' : ''" @click="checkallF(item)">
								<p style="width: 100%;">{{item.title}}<check v-if="item.id == NavsLinkasData.order_by" class="choose-check" fillColor="rgb(41, 182, 246)" /></p>
							</li>
						</ul>
						<div class="select_textul_bg" @click="sel(3)"></div>
					</div>
				</div>	
			</dt>
		</dl>

	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import ChevronDownIcon from "vue-material-design-icons/chevron-down" //下标图标
	import check from "vue-material-design-icons/check" //选中图标
	export default {
		components: {
			ChevronDownIcon,
			check
		},
		data() {
			return {
				list2: [{
					id: null,
					title: "全部分类",
					isF: true
				}, {
					id: 1,
					title: "全国通话",
					isF: false
				}, {
					id: 0,
					title: "线下约见",
					isF: false
				}],
				list3: [{
					id: 0,
					title: "全部排序",
					isF: true
				}, {
					id: 1,
					title: "人气最高",
					isF: false
				}, {
					id: 2,
					title: "最新约见",
					isF: false
				}, {
					id: 3,
					title: "价格最低",
					isF: false
				}],
				rotate1: false,
				rotate2: false,
				rotate3: false,
				loading: false
			}
		},
		computed: {
			...mapState([
				'MobileNavsData',
				'NavsLinkasData'
			])
		},
		methods: {
			...mapActions([
				'getMobileNavs',
				'getNavsLinkas'
			]),
			async getData() {
				if(this.MobileNavsData.length == 0) {
					this.loading = true
				}
				await this.getMobileNavs()
				this.NavsLinkasData.id = this.$route.params.id
				this.MobileNavsData.forEach((item, index) => {
					item.children.forEach((item2, index2) => {
						if(this.NavsLinkasData.id == item2.hashid) {
							this.NavsLinkasData.Navid = item.id
							this.NavsLinkasData.Navname = item2.name
						}
					})
				})
				this.NavsLinkasData.page = 1
				await this.getNavsLinkas(true)
				this.loading = false
			},
			sel(item) {
				switch(item) {
					case 1:
						this.rotate1 = !this.rotate1
						this.rotate2 = false
						this.rotate3 = false
						break
					case 2:
						this.rotate2 = !this.rotate2
						this.rotate1 = false
						this.rotate3 = false
						break
					case 3:
						this.rotate3 = !this.rotate3
						this.rotate2 = false
						this.rotate1 = false
						break
				}
			},
			checkT(item) {
				this.NavsLinkasData.Navid = item.id
			},
			async checkF(item) {
				this.NavsLinkasData.id = item.hashid
				this.NavsLinkasData.Navname = item.name
				this.rotate1 = !this.rotate1
				this.loading = true
				this.NavsLinkasData.page = 1
				await this.getNavsLinkas(true)
				this.loading = false
			},
			async checkallT(item) {
				this.NavsLinkasData.ser_type = item.id
				this.NavsLinkasData.type = item.title
				this.rotate2 = !this.rotate2
				this.loading = true
				this.NavsLinkasData.page = 1
				await this.getNavsLinkas(true)
				this.loading = false
			},
			async checkallF(item) {
				this.NavsLinkasData.order_by = item.id
				this.NavsLinkasData.order = item.title
				this.rotate3 = !this.rotate3
				this.loading = true
				this.NavsLinkasData.page = 1
				await this.getNavsLinkas(true)
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
<style scoped>
	.select_textul_bg {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 9;
		left: 0;
	}
	
	.choose-chevron {
		vertical-align: -webkit-baseline-middle;
		margin-left: .04rem;
	}
	
	.topmenu {
		width: 100%;
		display: flex;
		background: #ffffff;
	}
	
	.topmenu dt {
		width: 33.3%;
	}
	
	.selectlist {
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}
	
	.select_textdiv {
		height: .9rem;
		width: 100%;
		line-height: .9rem;
		text-align: center;
		border-bottom: 1px solid #e3e3e3;
		position: relative;
		font-size: 14.0px;
	}
	
	.select_textul {
		width: 100%;
		line-height: .9rem;
		box-sizing: border-box;
		width: 980px;
		max-height: 20rem;
		overflow-y: scroll;
	}
	
	.select_first_ul {
		width: 100%;
		position: absolute;
		box-sizing: border-box;
		left: 0;
		border-bottom: 1px solid #e3e3e3;
		max-height: 300px;
		overflow: hidden;
		overflow-y: auto;
		background: #fff;
		z-index: 99;
	}
	
	.select_first_ul>li {
		box-sizing: border-box;
	}
	
	.select_first_ul>li>p {
		width: 50%;
		padding: 0 .5rem;
		box-sizing: border-box;
		background: #FFFFFF;
		position: relative;
	}
	
	.focus>p {
		color: rgb(41, 182, 246);
	}
	
	.select_second_ul {
		width: 50%;
		position: absolute;
		right: 0px;
		top: 0;
		background: #fff;
		box-sizing: border-box;
		padding-left: 0.5rem;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.down {
		position: absolute;
		top: 0;
		right: 0.5rem;
		display: inline-block;
		width: 1rem;
		height: 100%;
	}
	
	.down img {
		width: 1rem;
		margin-top: 1rem;
	}
	
	.divfocus::after {
		position: absolute;
		bottom: 0;
		left: 46%;
		border-bottom: 0.5rem solid #FF9800;
		border-left: 0.5rem solid transparent;
		border-right: 0.5rem solid transparent;
		content: "";
	}
	
	.focusli {
		color: rgb(41, 182, 246);
	}
	
	.select_second_ul>li {
		padding: 0 0.5rem;
		box-sizing: border-box;
		position: relative;
	}
</style>
<style>
	.choose-chevron svg {
		width: 16px;
		height: 16px;
	}
	
	.go-up svg {
		transition: all .5s;
	}
	
	.go-down svg {
		transform: rotate(-180deg);
		transition: all .5s;
	}
	
	.choose-check svg {
		width: 16px;
		height: 16px;
	}
	
	.choose-check {
		position: absolute;
		right: 10px;
		top: 3px;
	}
</style>