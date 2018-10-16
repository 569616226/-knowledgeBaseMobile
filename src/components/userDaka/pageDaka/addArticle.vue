<template>
	<div v-title data-title="添加文章" v-loading="loading">
		<div class="addArticle">
			<div class="addArticle-name">
				<p>文章标题</p>
				<input  type="text" v-model="articleList.title" placeholder="输入文章的标题"/>
			</div>
			<div class="addArticle-cover">
				<h3>文章封面</h3>
				<div class="addArticle-cover-img">
					<img :src="articleList.cover" v-if="articleList.cover"/>
					<div v-else>
						<image-article fillColor="#b0b0b0" width="28" height="28"/>
						<p>添加文章封面</p>
					</div>
					<input class="fileInput" type="file" accept="image/jpg, image/png, image/gif" @change="upload">
				</div>
			</div>
			<div class="addArticle-content">
				<p>文章正文</p>
				<div class="addArticle-content-editor">
					<vue-html5-editor :content="articleList.content" :height="height" :style="{width:'100%'}" @change="updateData"></vue-html5-editor>
				</div>
			</div>
			<div style="height: 1.2rem;"></div>
			<div class="addArticle-btn" @click="clickTi">
				<span>提交</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import ImageArticle from "vue-material-design-icons/image" //图片图标
	export default {
		components: {
			ImageArticle
		},
		data() {
			return {
				loading: false,
				height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
			}
		},
		computed: {
			...mapState([
				'articleList'
			])
		},
		methods: {
			async upload(event) {
				if(event.target.files.length > 0) {
					this.files = event.target.files[0]; //提交的图片 
					let files = this.files;
					let param = new FormData(); //创建form对象  
					param.append('img_url', files, files.name); //单个图片 ，多个用循环 append 添加
					this.loading = true
					const data = await api.UploadImage(param)
					this.articleList.cover = data.img_url
					this.loading = false
				}
			},
			async clickTi () {
				this.loading = true
				if(this.$route.params.id){
					this.articleList.id = this.$route.params.id
					const data = await api.patchArticles(this.articleList)
				}else{
					const data = await api.postArticles(this.articleList)
				}
				this.loading = false
				this.$dialog.toast({
					mes: '提交成功',
					icon: 'success',
					timeout: 1000
				})
				this.$router.push({
					name: 'pageDaka'
				})
				this.articleList.title = ''
				this.articleList.cover = ''
				this.articleList.content = ''
			},
			updateData (e = '') {
				let c1 = e.replace(/<img width="100%"/g, '<img');
				let c2 = c1.replace(/<img/g, '<img width="100%"');
				this.articleList.content = c2;
			},
			async getData() {
				this.loading = true
				const data = await api.getArticlesDetail(this.$route.params.id)
				this.articleList.title = data.data.title
				this.articleList.cover = data.data.cover
				this.articleList.content = data.data.content
				this.loading = false
			},
		},
		mounted() {
			if(this.$route.params.id){
				this.getData()
			}
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.addArticle{
		&-name{
			margin: 0 .2rem;
			& p{
				padding: .25rem 0;
			    font-weight: bold;
			    font-size: .28rem;
			}
			& input{
				color: #b0b0b0;
			    background: white;
			    box-shadow: 0px 0px 6px 0px rgba(219,219,219,1);
			    border: none;
			    border-radius: 4px;
			    font-size: .28rem;
			    padding: .3rem .2rem;
			    width: 100%;
			}
		}
		&-content{
			margin: 0 .2rem;
			& p{
				padding: .25rem 0;
			    font-weight: bold;
			    font-size: .28rem;
			}
		}
		&-cover{
			margin: 0 .2rem;
			& h3{
				padding: .25rem 0;
			    font-weight: bold;
			    font-size: .28rem;
			}
			&-img{
				box-shadow: 0px 0px 6px 0px rgba(219,219,219,1);
			    border-radius: 4px;
			    background: #ffffff;
			    min-height: 3.5rem;
			    text-align: center;
			    position: relative;
			    & img{
			    	width: 100%;
			    }
			    & .fileInput{
		    	    height: 3.5rem;
				    overflow: hidden;
				    font-size: .39rem;
				    position: absolute;
				    right: 0;
				    top: 0;
				    opacity: 0;
				    filter: alpha(opacity=0);
				    cursor: pointer;
			    }
			    & .image-icon{
			    	margin-top: 1.1rem;
    				display: inline-block;
			    }
			    & p{
			    	margin-top: .2rem;
    				color: #b0b0b0;
			    }
			}
			
		}
		&-btn{
			text-align: center;
		    color: rgb(255, 255, 255);
		    background-color: rgb(41, 182, 246);
		    height: .9rem;
		    line-height: .9rem;
		    font-size: .28rem;
		    position: fixed;
		    bottom: 0;
		    width: 100%;
		    z-index: 9999;
		}
	}
</style>
<style>
	
</style>