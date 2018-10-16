<template>
	<div v-title data-title="消息">
		<!--<vue-tabs v-model="tabName">
			<v-tab title="系统">
				<div slot="title">系统
					<yd-badge class="news-badge" bgcolor="#e4593f">1</yd-badge>
				</div>
				<system></system>
			</v-tab>
			<v-tab title="私信">
				<div slot="title">私信
					<yd-badge class="news-badge" bgcolor="#e4593f">1</yd-badge>
				</div>
				<private-letter></private-letter>
			</v-tab>
		</vue-tabs>-->
		<yd-tab	v-model="newsCheck.id" active-color="rgb(41, 182, 246)">
			<yd-tab-panel label="系统">
				<system></system>
			</yd-tab-panel>
			<yd-tab-panel label="私信">
				<private-letter></private-letter>
			</yd-tab-panel>
		</yd-tab>
		<yd-badge class="news-badge system_bad" bgcolor="#e4593f" v-if="LinkaProfileData.system_msgs > 0">{{LinkaProfileData.system_msgs}}</yd-badge>
		<yd-badge class="news-badge private_bad" bgcolor="#e4593f" v-if="LinkaProfileData.chats > 0">{{LinkaProfileData.chats}}</yd-badge>
		<bottom-nav :news="news"></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import BottomNav from '../components/common/BottomNav' //底部导航
	import system from '../components/news/system' //系统消息
	import privateLetter from '../components/news/private' //私信消息
	import order from '../components/news/order' //私信消息
	export default {
		components: {
			BottomNav,
			system,
			order,
			privateLetter
		},
		data() {
			return {
				news: true,
			}
		},
		computed: {
			...mapState([
				'LinkaProfileData',
				'newsCheck'
			]),
		},
		methods: {
			...mapActions([
				'getLinkaProfile'
			]),
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
	.news-badge {
		margin-left: .1rem;
		vertical-align: text-bottom;
	}
	.system_bad{
		position: absolute;
		top: .21rem;
		left: 2.2rem;
	}
	.private_bad{
		position: absolute;
		top: .21rem;
		right: 1rem;
	}
</style>
<style>
	.vue-tabs .nav {
		display: flex;
		background: #FFFFFF;
	}
	
	.vue-tabs .nav-tabs>li {
		margin-bottom: 0px;
		flex: 1;
		text-align: center;
		font-size: 15px;
		color: #999999;
	}
	
	.vue-tabs .nav-tabs>li.active>a,
	.vue-tabs .nav-tabs>li.active>a:hover,
	.vue-tabs .nav-tabs>li.active>a:focus {
		color: #29b6f6;
		border: none;
		border-bottom: 2.7px solid #29b6f6;
		border-bottom-color: #29b6f6;
	}
	
	.vue-tabs .nav-tabs>li>a {
		border: none;
	}
</style>