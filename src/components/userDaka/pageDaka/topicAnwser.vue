<template>
	<div v-title data-title="想了解学员的问题">
		<div class="anwser-num" v-for="item,index in anwserList" :key="index">
			<div class="anwser-num-a">
				<span class="anwser-num-a-title">问题{{index+1}}</span>
				<span class="anwser-num-a-delete" @click="Delete_an(item,index)"><delete-an class="anwser-num-a-delete-an" fillColor="#9A9DB5"/>删除</span>
				<div class="clear"></div>
			</div>
			<div class="anwser-num-text">
				<textarea style="padding:15px 10px;" placeholder="例如：您有几年工作经验？" maxlength="100" v-model="item.title"></textarea>
				<span><font color="#696969">{{item.title.length}}</font><font color="#b0b0b0">/100</font></span>
			</div>
		</div>
		<div class="anwser-add" @click="anwser_add">
			<span><plus-an class="anwser-add-an" fillColor="#1DA4FF"/>添加问题</span>
		</div>
		<p class="anwser-ti">最多添加3个问题</p>
		<div class="anwser-save" @click="anwser_save">
			<span>提交</span>
		</div>
		<div style="height: 1.1rem;"></div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import DeleteAn from "vue-material-design-icons/delete" //垃圾箱图标
	import PlusAn from "vue-material-design-icons/plus" //添加图标
	export default {
		components: {
			DeleteAn,
			PlusAn
		},
		created() {

		},
		computed: {
			...mapState([
				'topicList'
			])
		},
		data() {
			return {
				anwserList: []
			}
		},
		methods: {
			Delete_an(item, index) {
				if(item.title != '') {
					this.$dialog.confirm({
						mes: '您已经填写内容，确定要删除吗？',
						opts: () => {
							this.anwserList.splice(index, 1)
						}
					})
				} else {
					this.anwserList.splice(index, 1)
				}

			},
			anwser_add() {
				if(this.anwserList.length >= 3) {
					this.$dialog.toast({
						mes: '不能超过三个',
						timeout: 1000
					});
				} else {
					this.anwserList.push({
						title: ''
					})
				}
			},
			async anwser_save() {
				let check = 0
				this.anwserList.forEach(e => {
					if(e.title == '') {
						check = 1
					}
				})
				if(check == 1) {
					this.$dialog.toast({
						mes: '请填写问题',
						timeout: 1000
					});
				} else {
					this.topicList.info = this.anwserList
					this.$dialog.toast({
						mes: '保存成功',
						icon: 'success',
						timeout: 1000
					})
					const id = this.$route.params.id
					if(id) {
						this.topicList.id = this.$route.params.id
						await api.postTopicsid(this.topicList)
						this.$router.push({
							name: 'editTopic',
							id: id
						})
					} else {
						this.$router.push({
							name: 'addTopic'
						})
					}
				}
			}
		},
		props: [],
		mounted() {
			this.anwserList = this.topicList.info
		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.anwser-ti {
		text-align: center;
		color: #b0b0b0;
		margin-top: .6rem;
	}
	
	.anwser-num {
		padding: 0 .2rem;
		&-a {
			padding: .2rem 0;
			&-title {
				font-size: 14.0px;
				font-weight: bold;
			}
			&-delete {
				color: #9A9DB5;
				float: right;
				&-an {
					vertical-align: middle;
				}
			}
		}
		&-text {
			position: relative;
			& textarea {
				padding: 5px 8px;
				width: 100%;
				color: #101010;
				min-height: 100px;
				border-color: transparent;
				box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
				border-radius: 4px;
				margin-bottom: .1rem;
			}
			& span {
				position: absolute;
				right: .2rem;
				bottom: 20px;
			}
		}
	}
	
	.anwser-add {
		text-align: center;
		font-size: 14px;
		box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
		border-radius: 4px;
		background: white;
		padding: .3rem 0;
		margin: .3rem .2rem;
		&-an {
			vertical-align: -webkit-baseline-middle;
		}
	}
	
	.anwser-save {
		text-align: center;
		color: #ffffff;
		font-size: 14px;
		background: rgb(41, 182, 246);
		line-height: .9rem;
		height: .9rem;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>
<style>
	.anwser-num-a-delete-an svg {
		width: 12px;
		height: 12px;
	}
	
	.anwser-add-an svg {
		width: 20px;
		height: 20px;
	}
</style>