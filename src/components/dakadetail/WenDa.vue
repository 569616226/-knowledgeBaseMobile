<template>
	<div>
		<ul class="exp-ans-ul">
			<li class="q" v-for="item,index in answer" @click="next(item.id)">
				<p class="related-question-title">{{item.name}}</p>
				<div class="q-info"> 
					<eye-icon class="exp-ans-eye" fillColor="#D6D6D6"></eye-icon>
					<span class="view-count">{{item.readers}}</span>
					<yd-rate class="exp-ans-rate" v-model="item.star" size="14px" color="#d6d6d6" active-color="#ffd600" :readonly="true"></yd-rate>
					<span class="price"><span>1</span>元 </span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import EyeIcon from "vue-material-design-icons/eye"
	export default {
		components: {
			EyeIcon
		},
		created() {

		},
		data() {
			return {
				rate: 4
			}
		},
		methods: {
			next(id) {
				this.$router.push({
					name: 'questiondetail',
					params: {
						id: id
					}
				})
			}
		},
		props: ['answer'],
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style scoped>
.exp-ans-ul .q {
    padding: .3rem;
    border-bottom: 1px solid #e3e3e3;
    background: #fff;
    color: #333;
}
.exp-ans-ul .q .related-question-title {
    font-size: .34rem;
    color: #333;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.exp-ans-ul .q .q-info {
    margin-top: .2rem;
    height: .4rem;
    position: relative;
}
.exp-ans-ul .q .q-info .view-count {
    float: left;
    font-size: .26rem;
    color: #919ca9;
    padding-left: .1rem;
    height: .36rem;
    line-height: .36rem;
    margin-top: .08rem;
}
.exp-ans-ul .q .q-info .price {
    float: right;
    font-size: .26rem;
    color: #32a0e6;
}
.exp-ans-ul .q .q-info .price span {
    font-size: .36rem;
}
.exp-ans-eye{
	float: left;
}
.exp-ans-rate{
	float: left;
    margin-top: .08rem;
    margin-left: .2rem;
}
</style>