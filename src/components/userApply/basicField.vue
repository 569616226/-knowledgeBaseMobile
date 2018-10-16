<template>
	<div v-title data-title="选择专业领域" v-loading="loading">
		<div class="basicField">
			<p class="basicField-title">
				已选择的领域
				<font color="#29b6f6">{{checkList.length}}</font>
			</p>
			<div class="basicField-list">
				<a v-for="item,index in checkList" :key="index">{{item.name}}</a>
			</div>
		</div>
		<div class="options-content">
			<div class="option" v-for="item,index in MobileNavsData" :key="index">
				<div class="content-bar clearfix">
					<div class="content-title">
						<img :src="item.icon" class="allclassify-poll-box" fillColor="#ffb647" />
						<span>{{item.name}}</span>
					</div>
					<span class="split-line"></span>
				</div>
				<div class="option-item">
					<a v-for="zitem,zindex in item.children" :key="zindex" @click="check_list(zitem)" :class="zitem.check ? 'option-item-check' : ''">{{zitem.name}}</a>
				</div>
			</div>
		</div>
		<div style="height: 1.1rem;"></div>
		<div class="basicField-save" @click="basicField_save">
			<span>保存</span>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import PollBoxIcon from "vue-material-design-icons/poll-box" //返回图标
	export default {
		components: {
			PollBoxIcon
		},
		computed: {
			...mapState([
				'MobileNavsData',
				'LinkaProfileData'
			])
		},
		data() {
			return {
				checkList: [],
				loading: false
			}
		},
		methods: {
			...mapActions([
				'getMobileNavs',
				'getLinkaProfile'
			]),
			check_list(item) {
				item.check = !item.check
				let icheck = true
				this.checkList.forEach((e, i) => {
					if(item.id == e.id) {
						this.checkList.splice(i, 1)
						icheck = false
					}
				})
				if(icheck) {
					this.checkList.push(item)
				}
			},
			basicField_save() {
				this.LinkaProfileData.navs_ids = []
				this.LinkaProfileData.navs_name = ''
				this.checkList.forEach(e => {
					this.LinkaProfileData.navs_ids.push(e.id)
					this.LinkaProfileData.navs_name += e.name + '、'
				})
				this.$router.push({
					name: 'basicNews'
				})
			},
			async getData() {
				if(this.MobileNavsData.length == 0) {
					this.loading = true
				}
				if(this.LinkaProfileData.length == 0){
					await this.getLinkaProfile()
				}
				await this.getMobileNavs()
				this.loading = false
				this.LinkaProfileData.navs_ids.forEach((item, index) => {
					this.MobileNavsData.forEach((item2, index2) => {
						item2.children.forEach((item3, index3) => {
							if(item == item3.id) {
								item3.check = !item3.check
								this.checkList.push(item3)
							}
						})
					})
				})
			},
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.basicField {
		background: #ffffff;
		padding: .3rem .2rem;
		&-list {
			margin-top: .1rem;
			& a {
				display: inline-block;
				color: #ffffff;
				width: 22.8%;
				height: .6rem;
				border-radius: 25px;
				text-align: center;
				line-height: .6rem;
				margin-top: .2rem;
				font-size: 13px;
				margin-left: .13rem;
				background-color: #29b6f6;
			}
		}
		&-save {
			color: rgb(255, 255, 255);
			background-color: rgb(41, 182, 246);
			height: .9rem;
			line-height: .9rem;
			position: fixed;
			bottom: 0;
			width: 100%;
			text-align: center;
			font-size: .28rem;
			z-index: 999;
		}
	}
	
	.options-content {
		padding: .2rem .2rem;
		background: #ffffff;
		margin-top: .3rem;
	}
	
	.option {
		margin-top: .3rem;
	}
	
	.options-content .option .content-bar {
		height: .5rem;
		position: relative;
	}
	
	.options-content .option .content-bar .content-title {
		position: absolute;
		display: inline-block;
		float: left;
		padding-right: .2rem;
		z-index: 999;
	}
	
	.options-content .option .content-bar .content-title span:nth-child(2) {
		font-size: 12px;
		display: inline-block;
		height: .5rem;
		line-height: .5rem;
		margin-left: .2rem;
	}
	
	.options-content .option .content-bar .content-title span {
		float: left;
	}
	.options-content .option .option-item {
		display: flex;
    	flex-wrap: wrap;
	}
	.options-content .option .option-item a {
		display: inline-block;
		color: #333;
		width: 28.8%;
		height: .6rem;
		border: 1px solid #c9c9c9;
		border-radius: 25px;
		text-align: center;
		line-height: .6rem;
		margin-top: .2rem;
		font-size: 13px;
		background: #ffffff;
		margin-left: .13rem;
	}
	
	.options-content .option .option-item .option-item-check {
		color: #ffffff;
		background-color: #29b6f6;
		border: 1px solid transparent;
	}
	.allclassify-poll-box {
		width: .3rem;
		float: left;
		margin-top: .07rem;
	}
</style>