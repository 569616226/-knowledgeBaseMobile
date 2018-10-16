import { getCookie, setCookie, delCookie } from '@/utils'
import router from '@/router'
import api from '@/utils/api'
const Fly = require("flyio/dist/npm/fly")
const request = new Fly

request.interceptors.request.use((request) => {
	if(getCookie('token_mobile')) {
		request.headers.Accept = 'application/json'
		request.headers.Authorization = 'Bearer ' + getCookie('token_mobile')
	}
	return request
})

async function mobileNext2(wx) {
	const data = await api.getToken(wx)
	setCookie('token_mobile',data.access_token,null)
	window.location.reload()
}

request.interceptors.response.use(
	(response, promise) => {
		return promise.resolve(response.data)
	},
	(err, promise) => {
		if(err.status == 401 ||　err.status || 500) {
			delCookie('token_mobile')
			window.location.reload()
		}
		return promise.resolve()
	}
)

export default request