<template>
	<div>
		<div style="height: 1.15rem;"></div>
		<yd-tabbar fixed="fixed" activeColor="rgb(41, 182, 246)" color="rgb(146, 146, 146)">
				<yd-tabbar-item title="主页" link="/" :active="index">
					<home-icon slot="icon" custom size="1.04rem" fillColor="rgb(216, 216, 216)" v-if="!index"/>
					<home-icon slot="icon" custom size="1.04rem" fillColor="rgb(41, 182, 246)" v-else/>
				</yd-tabbar-item>
				<yd-tabbar-item title="约·问" link="/makeask" :active="makeask">
					<message-processing-icon slot="icon" custom size="1.04rem" fillColor="rgb(216, 216, 216)" v-if="!makeask"/>
					<message-processing-icon slot="icon" custom size="1.04rem" fillColor="rgb(41, 182, 246)" v-else/>
				</yd-tabbar-item>
				<yd-tabbar-item title="" link="/question">
					<img src="../../assets/wen.png" slot="icon" class="yd-tabbar-icon-wenimg"/>
				</yd-tabbar-item>
				<yd-tabbar-item title="消息" link="/news" :active="news">
					<bell-icon slot="icon" custom size="1.04rem" fillColor="rgb(216, 216, 216)" v-if="!news"/>
					<bell-icon slot="icon" custom size="1.04rem" fillColor="rgb(41, 182, 246)" v-else/>
					<yd-badge slot="badge" type="danger" v-if="news && num > 0">{{LinkaProfileData.system_msgs + LinkaProfileData.chats}}</yd-badge>
				</yd-tabbar-item>
				<yd-tabbar-item title="我的" link="/user" :active="user">
					<account-icon slot="icon" custom size="1.04rem" fillColor="rgb(216, 216, 216)" v-if="!user"/>
					<account-icon slot="icon" custom size="1.04rem" fillColor="rgb(41, 182, 246)" v-else/>
				</yd-tabbar-item>
			</yd-tabbar>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import HomeIcon from "vue-material-design-icons/home"
	import MessageProcessingIcon from "vue-material-design-icons/message-processing"
	import BellIcon from "vue-material-design-icons/bell"
	import AccountIcon from "vue-material-design-icons/account"
	export default {
		components: {
			HomeIcon,MessageProcessingIcon,BellIcon,AccountIcon
		},
		created() {

		},
		data() {
			return {
				fixed: true
			}
		},
		methods: {

		},
		props: ['index', 'makeask', 'news', 'user'],
		computed: {
			...mapState([
				'LinkaProfileData'
			]),
			num () {
				const data = this.LinkaProfileData.system_msgs + this.LinkaProfileData.chats
				return data
			}
		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style>
	.yd-tabbar-icon{
		height: .4rem;
		position: relative;
	}
	.yd-tabbar-icon-wenimg{
	    width: 44px;
	    position: absolute;
	    top: -20px;
	    height: 44px !important;
	    left: -18px;
	    z-index: 9;
	}
</style>