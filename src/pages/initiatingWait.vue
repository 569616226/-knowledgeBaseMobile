<template>
	<div>
		<initiating-index v-if="index"></initiating-index>
		<initiating-anwser v-if="anwser"></initiating-anwser>
		<initiating-present v-if="present"></initiating-present>
	</div>
</template>
<script>
	import InitiatingIndex from "../components/initiatingWait/index"
	import InitiatingAnwser from "../components/initiatingWait/anwser"
	import InitiatingPresent from "../components/initiatingWait/present"
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