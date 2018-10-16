// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import YDUI from 'vue-ydui'
import VueLazyload from 'vue-lazyload'
import 'vue-ydui/dist/ydui.rem.css'
import './styles/index.css'
import api from '@/utils/api'
import { getCookie, setCookie } from '@/utils'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import initRichText from '@/utils/initHTMLEditor'
import 'font-awesome/css/font-awesome.css'
import { Loading } from 'element-ui';
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
Vue.use(Loading)
Vue.use(VueTabs)
Vue.use(YDUI)
initRichText()
/* 图片懒加载插件 */
Vue.use(VueLazyload)
Vue.config.productionTip = false

//动态设置title
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = el.dataset.title
	}
})

async function mobileNext(wx, next) {
	const data = await api.getToken(wx)
	setCookie('token_mobile',data.access_token,null)
	next()
}

router.beforeEach((to, from, next) => {
	if(getCookie('openid')) {
		let wx = {
			name: decodeURIComponent(getCookie('nickname')),
			password: getCookie('openid')
		}
		if(getCookie('token_mobile')) {
			next()
		} else {
			mobileNext(wx, next)
		}

	} else {
		if(to.name == 'auth') {
			next()
		} else {
			next("/auth")
		}
	}
})

//router.beforeEach((to, from, next) => {
//	let openid = 'oy_pR0RDamfo4Yh35rQ4Nvhid10o'
//	if(openid) {
//		let wx = {
//			name: '末',
//			password: 'oy_pR0RDamfo4Yh35rQ4Nvhid10o'
//		}
//		if(getCookie('token_mobile')) {
//			next()
//		} else {
//			mobileNext(wx, next)
//		}
//
//	} else {
//		if(to.name == 'auth') {
//			next()
//		} else {
//			next("/auth")
//		}
//	}
//})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>',
	localStorage: {
		localhistory: {
			type: Array,
			default: []
		}
	}
})