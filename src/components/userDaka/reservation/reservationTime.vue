<template>
	<div v-title data-title="设置约见时间地点" v-loading="loading">
		<div class="anwser-num" v-for="item,index in anwserList" :key="index">
			<div v-if="!item.is_del">
				<div class="anwser-num-a">
					<span class="anwser-num-a-title">方案</span>
					<span class="anwser-num-a-delete" @click="Delete_an(item,index)"><delete-an class="anwser-num-a-delete-an" fillColor="#9A9DB5"/>删除</span>
					<div class="clear"></div>
				</div>
				<div class="anwser-num-text">
					<div class="anwser-num-text-time">
						<div class="anwser-num-text-time-l">
							<span>时间</span>
						</div>
						<div class="anwser-num-text-time-r">
							<yd-datetime v-model="item.appoint_time" :start-date="getTime" class="anwser-num-text-time-r-date"></yd-datetime>
							<chevron fillColor="#b0b0b0" />
						</div>
						<div class="clear"></div>
					</div>
					<div class="anwser-num-text-time" v-if="LinkaAppointsDetailData.ser_type == '线下约见'">
						<div class="anwser-num-text-time-l">
							<span>地点</span>
						</div>
						<div class="anwser-num-text-time-r">
							<input type="text" v-model="item.location" placeholder="请输入地点位置" />
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="anwser-add" @click="anwser_add">
			<span><plus-an class="anwser-add-an" fillColor="#1DA4FF"/>新建方案</span>
		</div>
		<div style="height: 1.1rem;"></div>
		<div class="anwser-save" @click="anwser_save">
			<span>保存</span>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import { formatAppoint } from '@/utils'
	import DeleteAn from "vue-material-design-icons/delete" //垃圾箱图标
	import PlusAn from "vue-material-design-icons/plus" //添加图标
	import chevron from "vue-material-design-icons/chevron-right" //添加图标
	export default {
		components: {
			DeleteAn,
			PlusAn,
			chevron
		},
		created() {

		},
		data() {
			return {
				anwserList: [],
				loading: false
			}
		},
		methods: {
			...mapActions([
				'getLinkaAppointsDetail'
			]),
			async getData() {
				if(this.LinkaAppointsDetailData.length == 0) {
					this.loading = true
				}
				await this.getLinkaAppointsDetail(this.$route.params.id)
				this.anwserList = formatAppoint(this.LinkaAppointsDetailData.appoint_cases)
				this.loading = false
			},
			Delete_an(item, index) {
				if(item.location != '') {
					this.$dialog.confirm({
						mes: '您已经填写内容，确定要删除吗？',
						opts: () => {
							this.$set(this.anwserList, index, {
								appoint_time: item.appoint_time,
								location: item.location,
								appoint_id: item.appoint_id,
								id: item.id,
								is_del: true
							})
						}
					})
				} else {
					this.$set(this.anwserList, index, {
						appoint_time: item.appoint_time,
						location: item.location,
						appoint_id: item.appoint_id,
						id: item.id,
						is_del: true
					})
				}
			},
			anwser_add() {
				if(this.LinkaAppointsDetailData.ser_type == '线下约见') {
					this.anwserList.push({
						appoint_time: this.getNowFormatDate(),
						location: '',
						appoint_id: this.LinkaAppointsDetailData.real_id
					})
				} else {
					this.anwserList.push({
						appoint_time: this.getNowFormatDate(),
						appoint_id: this.LinkaAppointsDetailData.real_id
					})
				}
			},
			async anwser_save() {
				let check = 0
				this.anwserList.forEach(e => {
					if(e.location == '') {
						check = 1
					}
				})
				if(check == 1) {
					this.$dialog.toast({
						mes: '请填写地点',
						timeout: 1000
					});
				} else {
					this.loading = true
					await api.postAppointCases(this.anwserList)
					this.loading = false
					this.$router.push({
						name: 'reservationPay'
					})
				}
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var hours = date.getHours();
				if(hours >= 0 && hours <= 9) {
					hours = "0" + hours;
				}
				var minutes = date.getMinutes();
				if(minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				var seconds = date.getSeconds();
				if(seconds >= 0 && seconds <= 9) {
					seconds = "0" + seconds;
				}
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
					" " + hours + seperator2 + minutes;
				return currentdate;
			}
		},
		props: [],
		computed: {
			...mapState([
				'LinkaAppointsDetailData'
			]),
			getTime() {
				const getDate = this.getNowFormatDate()
				return getDate
			}
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
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
			&-time {
				padding: .35rem .25rem;
				background: #ffffff;
				border-radius: 4px;
				box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
				color: #999999;
				font-size: .28rem;
				position: relative;
				margin-bottom: .2rem;
				&-l {
					float: left;
				}
				&-r {
					float: right;
					margin-top: .05rem;
					&-date {
						margin-right: .4rem;
					}
					& .chevron-right-icon {
						position: absolute;
						right: .2rem;
						top: .32rem;
					}
					& input {
						text-align: right;
						color: #b0b0b0;
						border: none;
					}
				}
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
	
	input::-webkit-input-placeholder {
		color: #b0b0b0;
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