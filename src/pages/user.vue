<template>
	<div v-title data-title="我的" v-loading="loading">
		<div class="user">
			<div class="user-top">
				<router-link :to="{name: 'personalData'}">
					<img :src="LinkaProfileData.avatar" />
					<p class="user-top-name">{{LinkaProfileData.name}}</p>
				</router-link>
				<div class="clear"></div>
			</div>
			<div class="user-student" v-if="LinkaProfileData.status == 1">
				<p class="user-student-title">我是大咖</p>
				<div class="user-student-list">
					<div class="user-student-list-z">
						<router-link :to="{name: 'reservation'}">
							<clock fillColor="#29B6F6"/>
							<p>我的预约</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<router-link :to="{name: 'myQuestion'}">
							<cir fillColor="#29B6F6"/>
							<p>我的问题</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<router-link :to="{name: 'pageDaka'}">
							<clip fillColor="#29B6F6"/>
							<p>大咖专栏</p>
						</router-link>
					</div>
				</div>
			</div>
			<div class="user-student">
				<p class="user-student-title">我是学员</p>
				<div class="user-student-list">
					<div class="user-student-list-z">
						<router-link :to="{name: 'userMake'}">
							<clock fillColor="#29B6F6"/>
							<p>我预约过的大咖</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<router-link :to="{name: 'userLike'}">
							<heart fillColor="#29B6F6"/>
							<p>我喜欢的大咖</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<router-link :to="{name: 'userLook'}">
							<clip fillColor="#29B6F6"/>
							<p>我浏览过的大咖</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<router-link :to="{name: 'userAsked'}">
							<cir fillColor="#29B6F6"/>
							<p>我问过的问题</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<router-link :to="{name: 'userSeenask'}">
							<eye fillColor="#29B6F6"/>
							<p>我看过的问题</p>
						</router-link>
					</div>
					<div class="user-student-list-z">
						<horizontal fillColor="#29B6F6"/>
						<p>敬请期待</p>
					</div>
				</div>
			</div>
			<div class="user-b">
				<router-link :to="{name: 'userWallet'}">
					<div class="user-b-list">
						<div class="user-b-list-w">
							<wallet fillColor="#29B6F6"/>
						</div>
						<div class="user-b-list-l">
							<span>钱包</span>
						</div>
						<div class="user-b-list-r">
							<right fillColor="#cccccc"/>
						</div>
						<div class="clear"></div>
					</div>
				</router-link>
				<router-link :to="{name: 'userApply'}" v-if="LinkaProfileData.status != 1">
					<div class="user-b-list">
						<div class="user-b-list-w">
							<multiple fillColor="#29B6F6" />
						</div>
						<div class="user-b-list-l">
							<span>成为大咖</span>
						</div>
						<div class="user-b-list-r">
							<right fillColor="#cccccc" />
						</div>
						<div class="clear"></div>
					</div>
				</router-link>
				<router-link :to="{name: 'feedBack'}">
					<div class="user-b-list">
						<div class="user-b-list-w">
							<message fillColor="#29B6F6"/>
						</div>
						<div class="user-b-list-l">
							<span>意见反馈</span>
						</div>
						<div class="user-b-list-r">
							<right fillColor="#cccccc"/>
						</div>
						<div class="clear"></div>
					</div>
				</router-link>
				<div class="user-b-list" @click="link_kefu">
					<div class="user-b-list-w">
						<headset fillColor="#29B6F6"/>
					</div>
					<div class="user-b-list-l">
						<span>联系客服</span>
					</div>
					<div class="user-b-list-r">
						<right fillColor="#cccccc"/>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<bottom-nav :user="user"></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import BottomNav from '../components/common/BottomNav' //底部导航
	import chevron from "vue-material-design-icons/chevron-right"
	import clock from "vue-material-design-icons/clock"
	import heart from "vue-material-design-icons/heart"
	import clip from "vue-material-design-icons/clipboard-account"
	import cir from "vue-material-design-icons/help-circle"
	import eye from "vue-material-design-icons/eye"
	import horizontal from "vue-material-design-icons/dots-horizontal"
	import right from "vue-material-design-icons/chevron-right"
	import wallet from "vue-material-design-icons/wallet"
	import multiple from "vue-material-design-icons/account-multiple"
	import message from "vue-material-design-icons/message-processing"
	import headset from "vue-material-design-icons/headset"
	export default {
		components: {
			BottomNav,chevron,clock,heart,clip,cir,eye,horizontal,right,wallet,multiple,message,headset
		},
		data() {
			return {
				user: true,
				loading: false
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
			link_kefu () {
				window.location.href = "tel:0769-22898086"
			},
			async getData() {
				if(this.LinkaProfileData.length == 0) {
					this.loading = true
				}
				await this.getLinkaProfile()
				this.loading = false
			},
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.user{
	&-b{
		margin-top: .2rem;
    	background: #ffffff;
    	&-list{
    		padding: .3rem;
    		border-bottom: 1px solid #EDEDED;
    		&-l, &-w{
    			float: left;
    		}
    		&-l span{
    			font-size: .34rem;
    			margin-left: .15rem;
    		}
    		&-r{
    			float: right;
    		}
    	}
	}
	&-student{
		background: #ffffff;
    	margin-top: .2rem;
    	&-title{
    		font-size: .34rem;
		    padding: .3rem;
		    border-bottom: 1px solid #EDEDED;
    	}
    	&-list{
    		display: flex;
    		text-align: center;
    		flex-wrap: wrap;
    		&-z{
    			width: 33.33%;
    			padding: .4rem 0;
    			border-bottom: 1px solid #EDEDED;
    			border-right: 1px solid #EDEDED;
    			& p{
    				margin-top: .1rem;
    			}
    			& a{
    				display: block;
    			}
    		}
    		&-z:last-child{
    			border-right: none;
    		}
    	}
	}
	&-top{
		background: #ffffff;
    	padding: .3rem .4rem;
		& img{
			width: 45px;
    		border-radius: 50%;
    		float: left;
		}
		&-name{
			float: left;
		    font-size: .33rem;
		    padding: .25rem;
		}
		&-daka{
			float: right;
		    padding: .26rem 0 0 0;
		    color: #9A9DB5;
		    &-jue{
		    	vertical-align: super;
		    }
		    &-chevron{
		    	vertical-align: sub;
		    }
		}
	}
}
</style>
<style>
.user-student-list-z .eye-icon svg{
	width: 24px;
	height: 24px;
}
</style>