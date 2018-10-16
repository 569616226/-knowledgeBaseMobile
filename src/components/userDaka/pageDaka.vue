<template>
	<div v-title data-title="详细资料" v-loading="loading">
		<div class="basicData">
			<div class="basicData-img" @click="show2 = true">
				<img :src="LinkaProfileData.avatar" />
				<div class="basicData-img-camera">
					<camera fillColor="#ffffff" width="14" height="14" />
				</div>
			</div>
			<div class="basicData-name">
				<span>{{LinkaProfileData.real_name}}</span>
			</div>
			<div class="basicData-p">
				<span>{{LinkaProfileData.office}}</span>
			</div>
			<router-link :to="{name: 'pageEdit'}">
				<div class="basicData-data">
					<span>编辑资料</span>
				</div>
			</router-link>
			<div class="basicData-back">
				<router-link :to="{name: 'user'}">
					<yd-icon name="share2" size=".4rem" color="#FFFFFF"></yd-icon>
				</router-link>
			</div>
		</div>
		<div class="basicData-a" @click="basicData_a">
			<p class="basicData-a-title">个人介绍</p>
			<span class="basicData-a-revise"><pencil fillColor="#9A9DB5" width="12" height="12"/>编辑</span>
			<div class="basicData-a-content">
				<p v-html="LinkaProfileData.profile"></p>
			</div>
		</div>
		<div class="pageDaka">
			<div class="pageDaka-hua">
				<div class="pageDaka-hua-l">
					<span>大咖话题</span>
				</div>
				<div class="pageDaka-hua-r">
					<span>最多添加6个话题</span>
				</div>
			</div>
			<div class="pageDaka-listh" v-for="item,index in LinkaTopicsData" :key="index">
				<p class="pageDaka-listh-rmb">
					<b>{{item.price}}</b>元/次
				</p>
				<p class="pageDaka-listh-title">{{item.title}}</p>
				<p class="pageDaka-listh-content" v-html="item.describe"></p>
				<div class="pageDaka-listh-b">
					<div class="pageDaka-listh-b-l">
						<span v-if="item.ser_type == '全国通话'"><clock fillColor="#9A9DB5" width="14" height="14"/>{{item.ser_time}}分钟/次</span>
						<span v-if="item.ser_type == '线下约见'"><clock fillColor="#9A9DB5" width="14" height="14"/>{{item.ser_time}}小时/次</span>
						<font color="#ff5e68" v-if="item.status == '待审核'"><b>{{item.status}}</b></font>
						<font color="#3fbf4c" v-if="item.status == '审核通过'"><b>{{item.status}}</b></font>
						<font color="#5894cc" v-if="item.status == '审核失败'"><b>{{item.status}}</b></font>
					</div>
					<div class="pageDaka-listh-b-r">
						<span @click="deleteTopic(item.id)"><dele fillColor="#9A9DB5" width="14" height="14"/>删除</span>
						<span @click="editTopic(item.id)"><pencil fillColor="#9A9DB5" width="14" height="14"/>编辑</span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="pageDaka-listh-call" v-if="item.ser_type == '全国通话'">
					<span>{{item.ser_type}}</span>
				</div>
				<div class="pageDaka-listh-yue" v-if="item.ser_type == '线下约见'">
					<span>{{item.ser_type}}</span>
				</div>
			</div>
			<div class="pageDaka-addh" @click="addTopic" v-if="LinkaTopicsData.length <= 6">
				<p>
					<plus fillColor="#29B6F6" width="20" height="20" />添加话题</p>
			</div>
			<div class="pageDaka-hua">
				<div class="pageDaka-hua-l">
					<span>大咖文章</span>
				</div>
			</div>
			<div class="pageDaka-addh" @click="addArticle">
				<p>
					<plus fillColor="#29B6F6" width="20" height="20" />添加文章</p>
			</div>
			<div class="pageDaka-scroll">
				<div class="pageDaka-listh" v-for="item,index in ArticlesData.data" :key="item.id">
					<div class="pageDaka-listw">
						<div class="pageDaka-listw-title">
							<p>{{item.title}}</p>
						</div>
						<div class="pageDaka-listw-img">
							<img :src="item.cover" />
						</div>
						<div class="clear"></div>
					</div>
					<div class="pageDaka-listh-b">
						<div class="pageDaka-listh-b-l">
							<span>{{item.like}} 赞 · {{item.like}} 评论 · 2018-04-02</span>
							<font color="#ff5e68" v-if="item.status == '待审核'"><b>{{item.status}}</b></font>
							<font color="#3fbf4c" v-if="item.status == '审核通过'"><b>{{item.status}}</b></font>
							<font color="#5894cc" v-if="item.status == '审核失败'"><b>{{item.status}}</b></font>
						</div>
						<div class="pageDaka-listh-b-r">
							<span @click="deleteArticle(item.id, index)"><dele fillColor="#9A9DB5" width="14" height="14"/>删除</span>
							<span @click="editArticle(item.id)"><pencil fillColor="#9A9DB5" width="14" height="14"/>编辑</span>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
			<div style="height: 1rem;"></div>
		</div>
		<yd-popup v-model="show2" position="center" width="80%">
			<div class="basicData-popup">
				<div class="basicData-popup-tou">
					<span>头像</span>
				</div>
				<div class="basicData-popup-upload">
					<img :src="LinkaProfileData.avatar" />
					<input name="img_url" class="fileInput" type="file" accept="image/jpg,image/png,image/gif" @change="change" id="change">
				</div>
				<p class="basicData-popup-click">点击上传图片</p>
				<div class="basicData-popup-btn">
					<div class="basicData-popup-btn-false" @click="Cancel()">
						<span>取消</span>
					</div>
					<div class="basicData-popup-btn-true" @click="SavaAvatar()">
						<span>确定</span>
					</div>
				</div>
			</div>
		</yd-popup>
		<!-- 遮罩层 -->
		<div class="container" v-show="panel">
			<div>
				<img id="image" :src="url" alt="Picture">
			</div>
			<button type="button" id="button" @click="commit">确定</button>
			<button type="button" id="cancel" @click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import Cropper from "cropperjs"
	import Scroll from '@/components/better-scroll/Scroll.vue'
	import camera from "vue-material-design-icons/camera" //相机图标
	import pencil from "vue-material-design-icons/pencil" //修改图标
	import dele from "vue-material-design-icons/delete" //删除图标
	import clock from "vue-material-design-icons/clock" //时间图标
	import plus from "vue-material-design-icons/plus" //添加图标
	export default {
		components: {
			camera,
			pencil,
			dele,
			clock,
			plus,
			Scroll
		},
		computed: {
			...mapState([
				'LinkaTopicsData',
				'LinkaProfileData',
				'ArticlesData'
			])
		},
		data() {
			return {
				show2: false,
				files: '',
				loading: false,
				picValue: "",
				cropper: "",
				croppable: false,
				panel: false,
				url: "",
				imgCropperData: {
					accept: "image/gif, image/jpeg, image/png, image/jpg"
				},
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
				'getLinkaTopics',
				'getLinkaProfile',
				'getArticles'
			]),
			Cancel() {
				this.show2 = false
				this.getLinkaProfile()
			},
			async SavaAvatar() {
				this.loading = true
				let form = {
					avatar: this.LinkaProfileData.avatar,
					id: this.LinkaProfileData.id
				}
				const data = await api.putGuests(form)
				this.loading = false
				this.show2 = false
				this.$dialog.toast({
					mes: '修改成功',
					icon: 'success',
					timeout: 1000
				})
			},
			async upload(event) {
				if(event.target.files.length > 0) {
					this.files = event.target.files[0]; //提交的图片 
					let files = this.files;
					let param = new FormData(); //创建form对象  
					param.append('img_url', files, files.name); //单个图片 ，多个用循环 append 添加
					this.loading = true
					const data = await api.UploadImage(param)
					this.LinkaProfileData.avatar = data.img_url
					this.loading = false
				}
			},
			deleteTopic(id) {
				this.$dialog.confirm({
					title: '删除话题',
					mes: '真的要删除该话题吗？',
					opts: [{
							txt: '取消',
							color: 'rgb(136, 136, 136)',
							callback: () => {

							}
						},
						{
							txt: '确定',
							color: 'rgb(3, 155, 229)',
							callback: () => {
								this.deleteTopicAsync(id)
							}
						}
					]
				})
			},
			editTopic(id) {
				this.$router.push({
					name: 'editTopic',
					params: {
						id: id
					}
				})
			},
			deleteArticle(id, index) {
				this.$dialog.confirm({
					title: '删除话题',
					mes: '真的要删除该话题吗？',
					opts: [{
							txt: '取消',
							color: 'rgb(136, 136, 136)',
							callback: () => {

							}
						},
						{
							txt: '确定',
							color: 'rgb(3, 155, 229)',
							callback: () => {
								this.deleteArticleAsync(id, index)
							}
						}
					]
				})
			},
			editArticle(id) {
				this.$router.push({
					name: 'editArticle',
					params: {
						id: id
					}
				})
			},
			async deleteTopicAsync(id) {
				this.loading = true
				await api.deleteTopics(id)
				this.$dialog.toast({
					mes: '删除成功',
					icon: 'success',
					timeout: 1000
				})
				await this.getLinkaTopics()
				this.loading = false
			},
			async deleteArticleAsync(id, index) {
				this.loading = true
				await api.deleteArticle(id)
				this.$dialog.toast({
					mes: '删除成功',
					icon: 'success',
					timeout: 1000
				})
				console.log(index)
				this.ArticlesData.data.splice(index, 1)
				this.loading = false
			},
			basicData_a() {
				let id = this.LinkaProfileData.id
				this.$router.push({
					name: 'presentEdit',
					params: {
						id: id
					}
				})
			},
			dataSave() {
				this.$router.push({
					name: 'basicSuccess'
				})
			},
			addTopic() {
				this.$router.push({
					name: 'addTopic'
				})
			},
			addArticle() {
				this.$router.push({
					name: 'addArticle'
				})
			},
			async getData() {
				if(this.LinkaProfileData.length == 0 && this.LinkaTopicsData.length == 0) {
					this.loading = true
				}
				await this.getLinkaProfile()
				await this.getLinkaTopics()
				this.ArticlesData.page = 1
				await this.getArticles(true)
				this.loading = false
			},
			async onloadrefresh() {
				await this.getArticles()
			},
			//取消上传
			cancel() {
				this.panel = false;
				let obj = document.getElementById('change');
				obj.value = '';
			},
			//创建url路径
			getObjectURL(file) {
				var url = null;
				if(window.createObjectURL != undefined) {
					// basic
					url = window.createObjectURL(file);
				} else if(window.URL != undefined) {
					// mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if(window.webkitURL != undefined) {
					// webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			//input框change事件，获取到上传的文件
			change(e) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				let type = files[0].type; //文件的类型，判断是否是图片
				let size = files[0].size; //文件的大小，判断图片的大小
				if(this.imgCropperData.accept.indexOf(type) == -1) {
					alert("请选择我们支持的图片格式！");
					return false;
				}
				if(size > 5242880) {
					alert("请选择5M以内的图片！");
					return false;
				}
				this.picValue = files[0];
				this.url = this.getObjectURL(this.picValue);
				//每次替换图片要重新得到新的url
				if(this.cropper) {
					this.cropper.replace(this.url);
				}
				this.panel = true;
				let obj = document.getElementById('change');
				obj.value = '';
			},
			//确定提交
			async commit() {
				this.panel = false;
				let croppedCanvas;
				let roundedCanvas;
				if(!this.croppable) {
					return;
				}
				// Crop
				croppedCanvas = this.cropper.getCroppedCanvas();
				// Round
				roundedCanvas = this.getRoundedCanvas(croppedCanvas);
				this.LinkaProfileData.avatar = roundedCanvas.toDataURL();
				let blobImg = this.convertBase64UrlToBlob(roundedCanvas.toDataURL())
				let nameImg = new Date().getTime() + '.png'
				let param = new FormData(); //创建form对象  
				param.append('img_url', blobImg, nameImg); //单个图片 ，多个用循环 append 添加
				this.loading = true
				const data = await api.UploadImage(param)
				this.$dialog.toast({
					mes: '上传成功',
					icon: 'success',
					timeout: 1000
				})
				this.LinkaProfileData.avatar = data.img_url
				this.loading = false
				//上传图片
				//this.postImg();
			},
			convertBase64UrlToBlob(urlData) {
				let bytes = window.atob(urlData.split(',')[1])
				let ab = new ArrayBuffer(bytes.length)
				let ia = new Uint8Array(ab)
				for(var i = 0; i < bytes.length; i++) {
					ia[i] = bytes.charCodeAt(i)
				}
				return new Blob([ab], {
					type: 'image/png'
				})
			},
			//canvas画图
			getRoundedCanvas(sourceCanvas) {
				let canvas = document.createElement("canvas");
				let context = canvas.getContext("2d");
				let width = sourceCanvas.width;
				let height = sourceCanvas.height;
				canvas.width = width;
				canvas.height = height;
				context.imageSmoothingEnabled = true;
				context.drawImage(sourceCanvas, 0, 0, width, height);
				context.globalCompositeOperation = "destination-in";
				context.beginPath();
				context.arc(
					width / 2,
					height / 2,
					Math.min(width, height) / 2,
					0,
					2 * Math.PI,
					true
				);
				context.fill();

				return canvas;
			},
		},
		mounted() {
			this.getData()
			//初始化这个裁剪框
			let self = this;
			let image = document.getElementById("image");
			this.cropper = new Cropper(image, {
				aspectRatio: 1,
				viewMode: 1,
				background: false,
				zoomable: false,
				ready: function() {
					self.croppable = true;
				}
			});
		},
	}
</script>
<style lang="less" scoped>
	.pageDaka {
		margin: .4rem .2rem 0 .2rem;
		&-scroll {
			position: relative;
			& .list-wrapper {
				background: none;
			}
		}
		&-listw {
			display: flex;
			&-title {
				width: 60%;
				font-size: .33rem;
				line-height: .46rem;
			}
			&-img {
				width: 40%;
				padding: 0 0 0 .25rem;
				& img {
					width: 100%;
				}
			}
		}
		&-listh {
			margin-top: .2rem;
			background: #ffffff;
			padding: .35rem .25rem;
			box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
			border-radius: 4px;
			position: relative;
			&-rmb {
				color: #2ba6ff;
				& b {
					font-size: .32rem;
					margin-right: .1rem;
				}
			}
			&-title {
				font-size: .33rem;
				padding: .3rem 0 .25rem 0;
			}
			&-content {
				color: #888888;
				white-space: normal;
				word-break: break-all;
				text-overflow: ellipsis;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
				display: -webkit-box;
			}
			&-b {
				margin-top: .25rem;
				color: #b0b0b0;
				&-l {
					float: left;
					& font {
						margin-left: .15rem;
					}
					& .clock-icon {
						vertical-align: sub;
						margin-right: .05rem;
					}
				}
				&-r {
					float: right;
					& .delete-icon {
						vertical-align: sub;
						margin-right: .05rem;
					}
					& .pencil-icon {
						vertical-align: sub;
						margin-right: .05rem;
						margin-left: .15rem;
					}
				}
			}
			&-call {
				position: absolute;
				right: .2rem;
				top: 0;
				padding: .2rem;
				color: #ffffff;
				background-color: #ff9800;
			}
			&-yue {
				position: absolute;
				right: .2rem;
				top: 0;
				padding: .2rem;
				color: #ffffff;
				background-color: #ff543d;
			}
			&:before {
				content: '';
				position: absolute;
				top: -.2rem;
				width: 3px;
				height: .2rem;
				background: #bbbbbb;
				z-index: -1;
				left: .3rem;
			}
			&:after {
				content: '';
				position: absolute;
				top: -.2rem;
				width: 3px;
				height: .2rem;
				background: #bbbbbb;
				z-index: -1;
				right: .3rem;
			}
		}
		&-addh {
			margin-top: .2rem;
			box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
			background: #ffffff;
			border-radius: 4px;
			font-size: .28rem;
			color: #29B6F6;
			text-align: center;
			height: .98rem;
			line-height: .98rem;
			& .plus-icon {
				vertical-align: -webkit-baseline-middle;
				margin-right: .1rem;
			}
		}
		&-hua {
			display: flex;
			height: 1rem;
			line-height: 1rem;
			box-shadow: 0px 0px 6px 0px rgba(219, 219, 219, 1);
			border-radius: 4px;
			background: #ffffff;
			padding: 0 .2rem;
			margin-top: .4rem;
			position: relative;
			&:before {
				content: '';
				position: absolute;
				bottom: -.2rem;
				width: 3px;
				height: .2rem;
				background: #bbbbbb;
				z-index: -1;
				left: .3rem;
			}
			&:after {
				content: '';
				position: absolute;
				bottom: -.2rem;
				width: 3px;
				height: .2rem;
				background: #bbbbbb;
				z-index: -1;
				right: .3rem;
			}
			&-l {
				flex: 1;
				font-weight: bold;
				font-size: .28rem;
			}
			&-r {
				flex: 1;
				text-align: right;
				color: #b0b0b0;
			}
		}
	}
	
	.basicData {
		background: url(../../assets/dataBg.jpeg);
		background-size: cover;
		padding: .7rem 0;
		text-align: center;
		background-position: bottom;
		color: #ffffff;
		position: relative;
		&-back {
			position: absolute;
			left: .3rem;
			top: .3rem;
			transform: scaleX(-1);
		}
		&-data {
			position: absolute;
			right: .3rem;
			top: .3rem;
			background-color: #555555;
			border-radius: 30px;
			padding: .13rem .25rem;
		}
		&-img {
			width: 21%;
			margin: 0 auto;
			position: relative;
			& img {
				width: 1.52rem;
				border-radius: 50%;
				border: 2px solid #ffffff;
			}
			&-camera {
				position: absolute;
				right: 0;
				bottom: .1rem;
				border-radius: 50%;
				background-color: #ffc738;
				height: 19px;
				width: 19px;
				& .camera-icon {
					float: right;
					margin-top: .05rem;
				}
			}
		}
		&-name {
			font-size: .33rem;
			margin-top: .3rem;
		}
		&-p {
			margin-top: .1rem;
		}
		&-a {
			background: #ffffff;
			margin: .2rem;
			font-size: 14.0px;
			padding: 0 0 .6rem 0;
			border-radius: 4px;
			position: relative;
			&-title {
				font-size: 14.0px;
				font-weight: bold;
				padding: .3rem;
				border-bottom: 1px solid #E3E3E3;
			}
			&-content {
				font-size: .28rem;
				padding: .4rem .2rem .3rem .3rem;
				line-height: .49rem;
				&-list {
					margin-top: .2rem;
				}
			}
			&-revise {
				position: absolute;
				right: .2rem;
				top: .3rem;
				color: #9A9DB5;
				font-size: 12px;
			}
		}
		&-btn {
			color: rgb(255, 255, 255);
			background-color: rgb(41, 182, 246);
			height: .9rem;
			line-height: .9rem;
			font-size: .28rem;
			width: 100%;
			position: fixed;
			bottom: 0;
			text-align: center;
		}
		&-popup {
			background-color: #fff;
			border-radius: 6px;
			text-align: center;
			padding: .6rem .3rem;
			&-tou {
				font-size: .33rem;
				padding: 0 0 .4rem 0;
			}
			&-upload {
				position: relative;
				& img {
					width: 2.36rem;
				}
				& .fileInput {
					height: 2.36rem;
					overflow: hidden;
					font-size: .3rem;
					position: absolute;
					right: 0;
					top: 0;
					opacity: 0;
					filter: alpha(opacity=0);
					cursor: pointer;
				}
			}
			&-click {
				color: rgb(136, 136, 136);
				margin-top: .3rem;
			}
			&-btn {
				display: flex;
				margin-top: .5rem;
				&-false {
					flex: 1;
					height: .7rem;
					line-height: .7rem;
					border: 1px solid rgb(179, 179, 179);
					border-radius: 4px;
					margin: 0 .2rem;
					color: rgb(84, 84, 84);
					font-size: .28rem;
				}
				&-true {
					flex: 1;
					height: .7rem;
					line-height: .7rem;
					border-radius: 4px;
					margin: 0 .2rem;
					color: #ffffff;
					font-size: .28rem;
					background-color: rgb(66, 176, 255);
				}
			}
		}
	}
	
	#button,
	#cancel {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 80px;
		height: 40px;
		border: none;
		border-radius: 5px;
		background: white;
	}
	
	#cancel {
		left: 10px;
	}
	
	.show {
		width: 100px;
		height: 100px;
		overflow: hidden;
		position: relative;
		border-radius: 50%;
		border: 1px solid #d5d5d5;
	}
	
	.picture {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.container {
		z-index: 9999;
		position: fixed;
		padding-top: 60px;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 1);
	}
	
	#image {
		max-width: 100%;
	}
	
	.cropper-view-box,
	.cropper-face {
		border-radius: 50%;
	}
</style>
<style>
	/*! 
 * Cropper.js v1.0.0-rc 
 * https://github.com/fengyuanchen/cropperjs 
 * 
 * Copyright (c) 2017 Fengyuan Chen 
 * Released under the MIT license 
 * 
 * Date: 2017-03-25T12:02:21.062Z 
 */
	
	.cropper-container {
		font-size: 0;
		line-height: 0;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		direction: ltr;
		-ms-touch-action: none;
		touch-action: none;
	}
	
	.cropper-container img {
		display: block;
		min-width: 0 !important;
		max-width: none !important;
		min-height: 0 !important;
		max-height: none !important;
		width: 100%;
		height: 100%;
		image-orientation: 0deg;
	}
	
	.cropper-wrap-box,
	.cropper-canvas,
	.cropper-drag-box,
	.cropper-crop-box,
	.cropper-modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.cropper-wrap-box {
		overflow: hidden;
	}
	
	.cropper-drag-box {
		opacity: 0;
		background-color: #fff;
	}
	
	.cropper-modal {
		opacity: 0.5;
		background-color: #000;
	}
	
	.cropper-view-box {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		outline: 1px solid #39f;
		outline-color: rgba(51, 153, 255, 0.75);
	}
	
	.cropper-dashed {
		position: absolute;
		display: block;
		opacity: 0.5;
		border: 0 dashed #eee;
	}
	
	.cropper-dashed.dashed-h {
		top: 33.33333%;
		left: 0;
		width: 100%;
		height: 33.33333%;
		border-top-width: 1px;
		border-bottom-width: 1px;
	}
	
	.cropper-dashed.dashed-v {
		top: 0;
		left: 33.33333%;
		width: 33.33333%;
		height: 100%;
		border-right-width: 1px;
		border-left-width: 1px;
	}
	
	.cropper-center {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 0;
		height: 0;
		opacity: 0.75;
	}
	
	.cropper-center:before,
	.cropper-center:after {
		position: absolute;
		display: block;
		content: " ";
		background-color: #eee;
	}
	
	.cropper-center:before {
		top: 0;
		left: -3px;
		width: 7px;
		height: 1px;
	}
	
	.cropper-center:after {
		top: -3px;
		left: 0;
		width: 1px;
		height: 7px;
	}
	
	.cropper-face,
	.cropper-line,
	.cropper-point {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0.1;
	}
	
	.cropper-face {
		top: 0;
		left: 0;
		background-color: #fff;
	}
	
	.cropper-line {
		background-color: #39f;
	}
	
	.cropper-line.line-e {
		top: 0;
		right: -3px;
		width: 5px;
		cursor: e-resize;
	}
	
	.cropper-line.line-n {
		top: -3px;
		left: 0;
		height: 5px;
		cursor: n-resize;
	}
	
	.cropper-line.line-w {
		top: 0;
		left: -3px;
		width: 5px;
		cursor: w-resize;
	}
	
	.cropper-line.line-s {
		bottom: -3px;
		left: 0;
		height: 5px;
		cursor: s-resize;
	}
	
	.cropper-point {
		width: 5px;
		height: 5px;
		opacity: 0.75;
		background-color: #39f;
	}
	
	.cropper-point.point-e {
		top: 50%;
		right: -3px;
		margin-top: -3px;
		cursor: e-resize;
	}
	
	.cropper-point.point-n {
		top: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: n-resize;
	}
	
	.cropper-point.point-w {
		top: 50%;
		left: -3px;
		margin-top: -3px;
		cursor: w-resize;
	}
	
	.cropper-point.point-s {
		bottom: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: s-resize;
	}
	
	.cropper-point.point-ne {
		top: -3px;
		right: -3px;
		cursor: ne-resize;
	}
	
	.cropper-point.point-nw {
		top: -3px;
		left: -3px;
		cursor: nw-resize;
	}
	
	.cropper-point.point-sw {
		bottom: -3px;
		left: -3px;
		cursor: sw-resize;
	}
	
	.cropper-point.point-se {
		right: -3px;
		bottom: -3px;
		width: 20px;
		height: 20px;
		cursor: se-resize;
		opacity: 1;
	}
	
	@media (min-width: 768px) {
		.cropper-point.point-se {
			width: 15px;
			height: 15px;
		}
	}
	
	@media (min-width: 992px) {
		.cropper-point.point-se {
			width: 10px;
			height: 10px;
		}
	}
	
	@media (min-width: 1200px) {
		.cropper-point.point-se {
			width: 5px;
			height: 5px;
			opacity: 0.75;
		}
	}
	
	.cropper-point.point-se:before {
		position: absolute;
		right: -50%;
		bottom: -50%;
		display: block;
		width: 200%;
		height: 200%;
		content: " ";
		opacity: 0;
		background-color: #39f;
	}
	
	.cropper-invisible {
		opacity: 0;
	}
	
	.cropper-bg {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
	}
	
	.cropper-hide {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
	}
	
	.cropper-hidden {
		display: none !important;
	}
	
	.cropper-move {
		cursor: move;
	}
	
	.cropper-crop {
		cursor: crosshair;
	}
	
	.cropper-disabled .cropper-drag-box,
	.cropper-disabled .cropper-face,
	.cropper-disabled .cropper-line,
	.cropper-disabled .cropper-point {
		cursor: not-allowed;
	}
</style>