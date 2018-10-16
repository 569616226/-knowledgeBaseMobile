<template>
</template>

<script>
	export default {
		name: '',
		data() {
			return {}
		},
		methods: {
			oauth() {
				let url = encodeURIComponent('https://wx.qatest.elinkport.com/wechatOauth/oauth/redirect')
				location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe276e2b5a3cf864&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
			}
		},
		mounted() {
			this.oauth()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>