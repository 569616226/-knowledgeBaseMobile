<template>
	<div>
		<initiating-index v-if="index"></initiating-index>
		<initiating-anwser v-if="anwser"></initiating-anwser>
		<initiating-present v-if="present"></initiating-present>
	</div>
</template>
<script>
	import InitiatingIndex from "../components/initiating/index"
	import InitiatingAnwser from "../components/initiating/anwser"
	import InitiatingPresent from "../components/initiating/present"
	export default {
		components: {
			InitiatingIndex,
			InitiatingAnwser,
			InitiatingPresent
		},
		created() {

		},
		data() {
			return {
				index: true,
				anwser: false,
				present: false
			}
		},
		methods: {

		},
		props: [],
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style scoped>

</style>
<style>

</style>