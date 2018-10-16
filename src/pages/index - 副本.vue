<template>
	<div class="container">
		<android-icon />
		<scroll ref="scroll" :data="petals" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onloadrefresh">
			<list-content :list="petals"></list-content>
		</scroll>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Scroll from '../components/better-scroll/Scroll.vue'
	import ListContent from '../components/index/Content'
	import AndroidIcon from "vue-material-design-icons/android"
	export default {
		name: 'index',
		components: {
			Scroll,
			ListContent,
			AndroidIcon
		},
		data() {
			return {
				pullUpLoad: {
					threshold: 10,
					txt: {
						more: '',
						noMore: '暂无更多数据'
					}
				}
			}
		},
		computed: {
			...mapState([
				'petals'
			])
		},
		methods: {
			...mapActions([
				'getPetals'
			]),
			async refresh() {
				await this.getPetals(true)
			},
			async onloadrefresh() {
				await this.getPetals()
			}
		},
		mounted() {
			this.refresh()
		}
	}
</script>

<style scoped>

</style>