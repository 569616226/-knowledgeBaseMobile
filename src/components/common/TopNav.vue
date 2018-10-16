<template>
	<div>
		<yd-navbar :title="title">
			<router-link :to="{name: link}" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		created() {

		},
		data() {
			return {

			}
		},
		methods: {

		},
		props: ['title', 'link'],
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style>

</style>