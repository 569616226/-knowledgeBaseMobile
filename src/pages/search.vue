<template>
	<div v-title data-title="搜索" v-loading="loading">
		<yd-flexbox class="search_box">
			<div onclick="window.history.go(-1)">
				<ArrowLeftIcon class="backspace_search" fillColor="#444444" />
			</div>
			<yd-flexbox-item>
				<yd-search placeholder="可搜索问答、话题" v-model="value2" :on-submit="submitHandler" :on-cancel="calcelTxt" ref="yd_search">
				</yd-search>
			</yd-flexbox-item>
		</yd-flexbox>
		<yd-flexbox class="searchhistory" v-if="!searchshow">
			<yd-flexbox-item>
				<span>搜索历史</span>
			</yd-flexbox-item>
			<yd-flexbox-item class="history_right">
				<span class="red" @click="deletehis">清除记录</span>
			</yd-flexbox-item>
		</yd-flexbox>
		<div class="search_hos_box" v-if="!searchshow && history_i.length > 0">
			<div class="search_hos" v-for="item,key in history_i" :key="key">
				<clock class="search_hos_icon" fillColor="#ababab" />
				<span class="history_left" @click="PostSearch(item)">{{item}}</span>
				<span class="icon_x_right" @click="delete_index(key)">
					<close fillColor="#ababab"/>
				</span>
				<div class="clear"></div>
			</div>
		</div>
		<yd-tab active-color="#29b6f6" v-if="searchshow" v-model="tab1">
			<yd-tab-panel label="问答">
				<interlocution :answer="SearchAnswerData.data"></interlocution>
			</yd-tab-panel>
			<yd-tab-panel label="话题">
				<topic :topic="SearchTopicData.data"></topic>
			</yd-tab-panel>
		</yd-tab>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import ArrowLeftIcon from "vue-material-design-icons/arrow-left" //返回图标
	import clock from "vue-material-design-icons/clock" //时间图标
	import close from "vue-material-design-icons/close" //关闭图标
	import interlocution from "../components/search/interlocution" //问答
	import topic from "../components/search/topic" //话题
	export default {
		components: {
			ArrowLeftIcon,
			clock,
			close,
			interlocution,
			topic
		},
		computed: {
			...mapState([
				'SearchAnswerData',
				'SearchTopicData'
			])
		},
		data() {
			return {
				value2: '',
				searchshow: false,
				isSearch: false,
				history_i: [],
				loading: false,
				tab1: 0
			}
		},
		methods: {
			...mapActions([
				'postSearchAnswer',
				'postSearchTopic'
			]),
			calcelTxt() {
				this.value2 = ''
			},
			async submitHandler(item) {
				this.isSearch = false
				this.history_i.forEach((cod) => {
					if(cod == item) {
						this.isSearch = true
					}
				})
				if(this.isSearch == false) {
					this.history_i.push(item)
					this.$localStorage.set('localhistory', this.history_i)
				}
				setTimeout(() => {
					this.setValue(item)
				}, 100)
				this.searchshow = true
				this.loading = true
				this.SearchAnswerData.search_text = item
				await this.getAnswer()
				this.loading = false
			},
			async PostSearch(item) {
				this.searchshow = true
				this.loading = true
				this.SearchAnswerData.search_text = item
				await this.getAnswer()
				this.loading = false
			},
			async getAnswer() {
				this.SearchAnswerData.page = 1
				await this.postSearchAnswer(true)
			},
			async getTopic() {
				this.SearchTopicData.search_text = this.SearchAnswerData.search_text
				this.SearchTopicData.page = 1
				await this.postSearchTopic(true)
			},
			setValue(item) {
				this.$nextTick(function() {
					this.value2 = item
				})
			},
			deletehis() {
				this.$dialog.confirm({
					title: '清空',
					mes: '确定清空搜索记录吗？',
					opts: [{
						txt: '取消',
						color: false,
						callback: () => {

						}
					}, {
						txt: '清空',
						color: true,
						callback: () => {
							this.history_i = []
							this.$localStorage.set('localhistory', this.history_i)
							this.$dialog.toast({
								mes: '清空成功',
								timeout: 1000
							})
						}
					}]
				});
			},
			delete_index(key) {
				this.history_i.splice(key, 1)
				this.$localStorage.set('localhistory', this.history_i)
			},
			get_history() {
				let gethis = this.$localStorage.get('localhistory')
				if(gethis != null) {
					this.history_i = this.$localStorage.get('localhistory')
				}
			},
		},
		mounted() {
			this.get_history()
		},
		watch: {
			tab1 (item) {
				if(item == 0){
					this.getAnswer()
				}else{
					this.getTopic()
				}
			}
		}
	}
</script>
<style scoped>
	.search_box {
		border-bottom: 1px solid #d1d1d1;
		background: #ffffff;
	}
	
	.hollow_img {
		text-align: center;
		margin-top: 1.5rem;
	}
	
	.hollow_img img {
		width: 80%;
	}
	
	.hollow_img p {
		margin-top: .7rem;
	}
	
	.search_img img {
		width: 114px;
	}
	
	.search_img {
		float: left;
	}
	
	.search_title {
		width: 60%;
		float: left;
		margin-left: .2rem;
	}
	
	.search_title_p1 {
		font-size: 16px;
		margin-top: .1rem;
	}
	
	.search_title_p2 {
		color: #b3b2b2;
		margin-top: .4rem;
	}
	
	.search_title_p1,
	.search_title_p2 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.search_result {
		padding: 15px;
		background: #ffffff;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.search_result:nth-child(1) {
		margin-top: .3rem;
		border-top: 1px solid #CCCCCC;
	}
	
	.backspace_search {
		margin-left: .2rem;
		color: #444444;
	}
	
	.search_right {
		color: #17b9ff;
		font-size: 15.0px;
		margin-right: .2rem;
	}
	
	.searchhistory {
		padding: 10px;
		border-bottom: 1px solid #d1d1d1;
	}
	
	.history_right {
		text-align: right;
	}
	
	.search_size {
		font-size: 16px;
		font-weight: bold;
		letter-spacing: 2px;
	}
	
	.search_hos {
		margin-left: 20px;
		border-bottom: 1px solid #ccc;
		padding: 15px 0;
	}
	
	.search_hos:last-child {
		border-bottom: none
	}
	
	.search_hos_box {
		background: #FFFFFF;
		border-bottom: 1px solid #d1d1d1;
	}
	
	.search_hos_icon {
		vertical-align: middle;
		margin-right: .4rem;
		float: left;
	}
	
	.icon_x_right {
		float: right;
		margin-right: 15px;
	}
	
	.history_left {
		float: left;
		width: 75%;
		padding-top: 1px;
		overflow: hidden;
		white-space: nowrap;
		padding-right: 12px;
		text-overflow: ellipsis;
	}
	
	.clear {
		clear: both;
	}
	
	.show_class {
		height: 1rem;
		text-align: center;
	}
	
	.show_class svg {
		height: 1rem;
	}
</style>
<style>
	.yd-search-input {
		background-color: #ffffff;
	}
	
	.yd-search-input:after,
	.yd-search-input:before {
		border: none;
	}
	
	.yd-search-input>.search-input {
		border: 1px solid #e3e3e3;
		border-radius: 30px;
	}
	
	.yd-input>input {
		outline: none;
		-webkit-appearance: none;
	}
	
	.search_hos_icon svg {
		width: 18px;
		height: 20px;
	}
	
	.icon_x_right svg {
		width: 18px;
		height: 20px;
	}
</style>