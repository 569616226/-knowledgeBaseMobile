<template>
	<div v-title data-title="填写基本信息" v-loading="loading">
		<yd-cell-group class="basic">
			
			<yd-cell-item arrow>
				<span slot="left" class="basic-item-name">大咖封面</span>
				<span slot="right" class="basic-item-name" @click="show3 = true" v-if="LinkaProfileData.cover">已上传</span>
				<span slot="right" class="basic-item-name" @click="show3 = true" v-else>点击上传</span>
			</yd-cell-item>
			
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">真实姓名</span>
				<yd-input slot="right" v-model="LinkaProfileData.real_name" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">任职机构</span>
				<yd-input slot="right" v-model="LinkaProfileData.office" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">一句话介绍</span>
				<yd-input slot="right" v-model="LinkaProfileData.single_profile" placeholder="请用简单的话介绍一下自己" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item arrow @click.native="bindPhone()">
				<span slot="left" class="basic-item-name">手机号</span>
				<span slot="right" class="basic-item-name">
					{{LinkaProfileData.phone}}
				</span>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">邮箱地址</span>
				<yd-input slot="right" v-model="LinkaProfileData.email" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item arrow>
				<span slot="left" class="basic-item-name">所在城市</span>
				<yd-input slot="right" @click.native.stop="show1 = true" v-model="LinkaProfileData.city" placeholder="请选择" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">所在区域</span>
				<yd-input slot="right" v-model="LinkaProfileData.location" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item arrow @click.native="fieldCheck()">
				<span slot="left" class="basic-item-name">专业领域</span>
				<span slot="right" class="basic-item-name">
					{{LinkaProfileData.navs_name}}
				</span>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">身份证号</span>
				<yd-input slot="right" v-model="LinkaProfileData.card_id" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item arrow>
				<span slot="left" class="basic-item-name">手持身份证照片</span>
				<span slot="right" class="basic-item-name" @click="show2 = true" v-if="LinkaProfileData.card_pic">已上传</span>
				<span slot="right" class="basic-item-name" @click="show2 = true" v-else>点击上传</span>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">微信号</span>
				<yd-input slot="right" v-model="LinkaProfileData.we_name" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
			<yd-cell-item class="basic-item">
				<span slot="left" class="basic-item-name">推荐人</span>
				<yd-input slot="right" v-model="LinkaProfileData.referee" placeholder="请输入" class="basic-tiem-nameInput"></yd-input>
			</yd-cell-item>
		</yd-cell-group>
		<div style="height: 1.1rem;"></div>
		<div class="basic-btn" @click="basic_next">
			<span>下一步</span>
		</div>
		<yd-cityselect v-model="show1" :callback="result1" :items="district" columns="2"></yd-cityselect>
		<yd-popup v-model="show2" position="center" width="80%">
			<div class="basic-popup">
				<div class="basic-popup-upload">
					<img :src="LinkaProfileData.card_pic ? LinkaProfileData.card_pic : imgDataUrl" />
					<input class="fileInput" name="img_url" type="file" accept="image/jpg,image/png,image/gif" @change="upload">
				</div>
				<p class="basic-popup-click">点击上传图片</p>
				<div class="basic-popup-btn">
					<div class="basic-popup-btn-false" @click="show2 = false">
						<span>取消</span>
					</div>
					<div class="basic-popup-btn-true" @click="SavaPic()">
						<span>确定</span>
					</div>
				</div>
			</div>
		</yd-popup>
		<yd-popup v-model="show3" position="center" width="80%">
			<div class="basic-popup">
				<div class="basic-popup-upload">
					<img :src="LinkaProfileData.cover ? LinkaProfileData.cover : imgCover" />
					<input class="fileInput2" name="img_url" type="file" accept="image/jpg,image/png,image/gif" @change="upload2">
				</div>
				<p class="basic-popup-click">点击上传图片</p>
				<div class="basic-popup-btn">
					<div class="basic-popup-btn-false" @click="show3 = false">
						<span>取消</span>
					</div>
					<div class="basic-popup-btn-true" @click="SavaPic2()">
						<span>确定</span>
					</div>
				</div>
			</div>
		</yd-popup>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import District from 'ydui-district/dist/jd_province_city_area_id';
	export default {
		components: {

		},
		data() {
			return {
				loading: false,
				show1: false,
				show2: false,
				show3: false,
				files: '',
				imgDataUrl: require('../../assets/cardPhoto.png'),
				imgCover: require('../../assets/cover.png'),
				district: District
			}
		},
		computed: {
			...mapState([
				'LinkaProfileData'
			])
		},
		methods: {
			...mapActions([
				'getLinkaProfile'
			]),
			async SavaPic() {
				this.loading = true
				let form = {
					card_pic: this.LinkaProfileData.card_pic,
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
			async SavaPic2() {
				this.loading = true
				let form = {
					cover: this.LinkaProfileData.cover,
					id: this.LinkaProfileData.id
				}
				const data = await api.putGuests(form)
				this.loading = false
				this.show3 = false
				this.$dialog.toast({
					mes: '修改成功',
					icon: 'success',
					timeout: 1000
				})
			},
			fieldCheck() {
				this.$router.push({
					name: 'basicField'
				})
			},
			bindPhone() {
				this.$router.push({
					name: 'bindPhone'
				})
			},
			result1(ret) {
				this.LinkaProfileData.city = ret.itemName1 + ' ' + ret.itemName2
			},
			async upload(event) {
				if(event.target.files.length > 0) {
					this.files = event.target.files[0]; //提交的图片  
					let files = this.files;
					let param = new FormData(); //创建form对象  
					param.append('img_url', files, files.name); //单个图片 ，多个用循环 append 添加
					this.loading = true
					const data = await api.UploadImage(param)
					this.LinkaProfileData.card_pic = data.img_url
					this.loading = false
				}
			},
			async upload2(event) {
				if(event.target.files.length > 0) {
					this.files = event.target.files[0]; //提交的图片  
					let files = this.files;
					let param = new FormData(); //创建form对象  
					param.append('img_url', files, files.name); //单个图片 ，多个用循环 append 添加
					this.loading = true
					const data = await api.UploadImage(param)
					this.LinkaProfileData.cover = data.img_url
					this.loading = false
				}
			},
			async basic_next() {
				if(this.LinkaProfileData.cover == null){
					this.$dialog.notify({
						mes: '请上传封面',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				const status1 = await this.check_status(this.LinkaProfileData.real_name, '请正确输入真实姓名')
				if(status1 == false){
					return false
				}
				const status2 = await this.check_status(this.LinkaProfileData.office, '请正确输入任职机构')
				if(status2 == false){
					return false
				}
				const status3 = await this.check_status(this.LinkaProfileData.single_profile, '请正确输入一句话介绍')
				if(status3 == false){
					return false
				}
				if(this.LinkaProfileData.phone == null){
					this.$dialog.notify({
						mes: '请绑定手机',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				const regMail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
				if(this.LinkaProfileData.email == null){
					this.$dialog.notify({
						mes: '请正确填写邮箱地址',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}else if(!regMail.test(this.LinkaProfileData.email)){
					this.$dialog.notify({
						mes: '请正确填写邮箱地址',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				if(this.LinkaProfileData.city == '--'){
					this.$dialog.notify({
						mes: '请正确填写所在城市',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				const status4 = await this.check_status(this.LinkaProfileData.location, '请正确输入所在区域')
				if(status4 == false){
					return false
				}
				if(this.LinkaProfileData.navs_name == ''){
					this.$dialog.notify({
						mes: '请正确填写专业领域',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				const regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				if(this.LinkaProfileData.card_id == null){
					this.$dialog.notify({
						mes: '请正确填写身份证号',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}else if(!regCard.test(this.LinkaProfileData.card_id)){
					this.$dialog.notify({
						mes: '请正确填写身份证号',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				if(this.LinkaProfileData.card_pic == null){
					this.$dialog.notify({
						mes: '请上传身份证照片',
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
				this.loading = true
				const data = await api.postGuests(this.LinkaProfileData)
				this.loading = false
				this.$router.push({
					name: 'basicData'
				})
			},
			async getData() {
				if(this.LinkaProfileData.length == 0) {
					this.loading = true
					await this.getLinkaProfile()
					this.loading = false
				}
			},
			check_status(name, mes) {
				if(name == null) {
					this.$dialog.notify({
						mes: mes,
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}else if(name.length > 20){
					this.$dialog.notify({
						mes: mes,
						timeout: 1000,
						callback: () => {
							
						}
					})
					return false
				}
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
	.basic {
		margin-top: .2rem;
		&-item {
			&-name {
				color: #999999;
			}
		}
		&-btn {
			color: rgb(255, 255, 255);
			background-color: rgb(41, 182, 246);
			position: fixed;
			bottom: 0;
			height: .9rem;
			line-height: .9rem;
			text-align: center;
			width: 100%;
			font-size: .28rem;
			z-index: 9;
		}
		&-popup {
			background-color: #fff;
			border-radius: 6px;
			text-align: center;
			padding: .6rem .3rem;
			&-upload {
				position: relative;
				& img {
					width: 4.5rem;
				}
				& .fileInput {
					height: 4rem;
					overflow: hidden;
					font-size: .3rem;
					position: absolute;
					right: 0;
					top: 0;
					opacity: 0;
					filter: alpha(opacity=0);
					cursor: pointer;
				}
				& .fileInput2 {
					height: 3rem;
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
	
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #b0b0b0;
	}
</style>
<style>
	.basic-tiem-nameInput input {
		text-align: right !important;
		color: #999999 !important;
		margin-right: .15rem;
	}
</style>