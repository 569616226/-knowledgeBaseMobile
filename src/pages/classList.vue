<template>
	<div v-title data-title="分类列表">
		<div class="class-list">
			<div class="class-list-tab">
				<span v-for="item,index in navList" :key="index" @click="chanceNav(item)" :class="item.id == navsCheck.id ? 'class-list-tab-h check-r': 'class-list-tab-h'">{{item.title}}</span>
			</div>
		</div>
		<topic v-if="navsCheck.id == 0"></topic>
		<interlocution v-else></interlocution>
		<bottom-nav></bottom-nav>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import topic from "../components/classList/topic"
	import interlocution from "../components/classList/interlocution"
	import BottomNav from '../components/common/BottomNav' //底部导航
	import heart from "vue-material-design-icons/heart" //关注图标
	import account from "vue-material-design-icons/account-multiple" //帮助图标
	import message from "vue-material-design-icons/message-processing" //评价图标
	export default {
		components: {
			topic,
			interlocution,
			heart,
			account,
			message,
			BottomNav
		},
		data() {
			return {
				navList: [{
					id: 0,
					title: '话题'
				}, {
					id: 1,
					title: '问答'
				}]
			}
		},
		computed: {
			...mapState([
				'navsCheck'
			])
		},
		methods: {
			chanceNav(item) {
				this.navsCheck.id = item.id
			}
		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.class-list {
		background: #ffffff;
		border-bottom: 1px solid #e3e3e3;
		padding: .2rem 0;
		&-tab {
			width: 55%;
			margin: 0 auto;
			display: flex;
			text-align: center;
			height: .7rem;
			line-height: .7rem;
			border: 1px solid #0076FF;
			border-radius: 30px;
			color: #0076ff;
			&-h {
				flex: 1;
			}
			& .check-r {
				background: #0076FF;
				border-radius: 30px;
				color: #ffffff;
			}
		}
	}
</style>
<style>

</style>