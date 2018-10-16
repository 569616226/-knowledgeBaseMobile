import request from './request'
import apiUrl from './apiUrl'
const api_url = apiUrl
const api = {
	getToken: (wx) => request.post(`${api_url}/v1/clients/web/mobile/login`, {
		name: wx.name,
		password: wx.password
	}),
	getIndex: () => request.get(`${api_url}/v1/homes`),
	getChats: (data) => request.get(`${api_url}/v1/chats?limit=${data.limit}&page=${data.page}`),
	getLinkaProfile: () => request.get(`${api_url}/v1/linka_profile`),
	getSmsCode: (item) => request.post(`${api_url}/v1/guests/get_sms_code`, {
		phone: item
	}),
	CheckSmsCode: (item, sms) => request.post(`${api_url}/v1/guests/check_sms_code`, {
		phone: item,
		sms_code: sms
	}),
	getLinkaTopics: () => request.get(`${api_url}/v1/linka_topics`),
	postTopics: (form) => request.post(`${api_url}/v1/topics`, {
		title: form.name,
		describe: form.present,
		price: form.price,
		ser_type: form.type,
		ser_time: form.time,
		need_infos: form.info
	}),
	postTopicsid: (form) => request.post(`${api_url}/v1/topics/${form.id}`, {
		title: form.name,
		describe: form.present,
		price: form.price,
		ser_type: form.type,
		ser_time: form.time,
		need_infos: form.info
	}),
	deleteTopics: (id) => request.delete(`${api_url}/v1/topics/${id}`),
	deleteArticle: (id) => request.delete(`${api_url}/v1/articles/${id}`),
	putGuests: (form) => request.put(`${api_url}/v1/guests/${form.id}`, {
		name: form.name,
		real_name: form.real_name,
		avatar: form.avatar,
		phone: form.phone,
		email: form.email,
		we_name: form.we_name,
		city: form.city,
		single_profile: form.single_profile,
		office: form.office,
		cover: form.cover,
		location: form.location,
		card_id: form.card_id,
		referee: form.referee,
		remark: form.remark,
		card_pic: form.card_pic,
		profile: form.content,
		nav_ids: form.navs_ids
	}),
	postGuests: (form) => request.post(`${api_url}/v1/to_be_linka`, {
		name: form.name,
		real_name: form.real_name,
		avatar: form.avatar,
		phone: form.phone,
		email: form.email,
		we_name: form.we_name,
		city: form.city,
		single_profile: form.single_profile,
		office: form.office,
		cover: form.cover,
		location: form.location,
		card_id: form.card_id,
		referee: form.referee,
		remark: form.remark,
		card_pic: form.card_pic,
		profile: form.content,
		navs: form.navs_ids
	}),
	getLinkaTopicDetail: (id) => request.get(`${api_url}/v1/linka_topics/${id}`),
	getArticlesDetail: (id) => request.get(`${api_url}/v1/articles/mobile/detail/${id}`),
	UploadImage: (files) => request.post(`${api_url}/v1/upload_image`, files),
	getArticles: (data) => request.get(`${api_url}/v1/articles/mobile/list?limit=${data.limit}&page=${data.page}`),
	getMobileNavs: () => request.get(`${api_url}/v1/mobile_navs`),
	getMobileChildrenNavs: () => request.get(`${api_url}/v1/mobile_children_navs`),
	getNavsLinka: (data) => request.get(`${api_url}/v1/navs/${data.id}/linkas?limit=${data.limit}&page=${data.page}`),
	postArticles: (form) => request.post(`${api_url}/v1/articles`, {
		title: form.title,
		cover: form.cover,
		content: form.content
	}),
	patchArticles: (form) => request.patch(`${api_url}/v1/articles/${form.id}`, {
		title: form.title,
		cover: form.cover,
		content: form.content
	}),
	postOrders: (price) => request.post(`${api_url}/v1/orders`, {
		price: price
	}),
	getWallets: () => request.get(`${api_url}/v1/wallets`),
	getGuestReadAnswers: (data) => request.get(`${api_url}/v1/guest_read_answers?limit=${data.limit}&page=${data.page}`),
	getLinkaAppoints: (data) => request.get(`${api_url}/v1/linka_appoint_complates?limit=${data.limit}&page=${data.page}`),
	getGuestFinaces: (data) => request.get(`${api_url}/v1/guest_finaces?limit=${data.limit}&page=${data.page}`),
	getTopicArticleAnswers: (data) => request.get(`${api_url}/v1/topic_article_answers?page_count=${data.limit}&page_index=${data.page}`),
	postAnswers: (data) => request.post(`${api_url}/v1/answers`, {
		name: data.name,
		linka_id: data.linka_id
	}),
	getAnswerOrder: (id) => request.get(`${api_url}/v1/answers/${id}/create_see_answer_order`),
	getSignature: () => request.get(`/get-signature`,{
		url: window.location.href.split('#')[0]
	}),
	getGuestAnswersDetail: (id) => request.get(`${api_url}/v1/guest_answers/${id}`),
	postSearchAnswer: (data) => request.post(`${api_url}/v1/homes/search_answer?limit=${data.limit}&page=${data.page}`, {
		search_text: data.search_text
	}),
	postSearchTopic: (data) => request.post(`${api_url}/v1/homes/search_topic?limit=${data.limit}&page=${data.page}`, {
		search_text: data.search_text
	}),
	getGuestSystemMessages: (data) => request.get(`${api_url}/v1/guest_system_messages?page_count=${data.limit}&page_index=${data.page}`),
	getMobileMessagesDetail: (id) => request.get(`${api_url}/v1/mobile_messages/${id}`),
	getLinkaAnswers: (data) => request.get(`${api_url}/v1/linka_answers?limit=${data.limit}&page=${data.page}`),
	getLinkaHasQuestionAnswers: (data) => request.get(`${api_url}/v1/linka_has_question_answers?limit=${data.limit}&page=${data.page}`),
	patchQuestions: (data) => request.patch(`${api_url}/v1/questions/${data.id}`, {
		content: data.txt
	}),
	getGuestAnswers: (data) => request.get(`${api_url}/v1/guest_answers?limit=${data.limit}&page=${data.page}`),
	postAnswersId: (data) => request.post(`${api_url}/v1/answers/${data.id}`, {
		star: data.rate
	}),
	getMobileLinkasDetail: (id) => request.get(`${api_url}/v1/mobile_linkas/${id}`),
	getArticlesDetail: (id) => request.get(`${api_url}/v1/articles/mobile/detail/${id}`),
	postArticleComments: (data) => request.post(`${api_url}/v1/article/${data.id}/comments`, {
		content: data.txt
	}),
	postLikeLinka: (id) => request.post(`${api_url}/v1/guests/like_linka`, {
		linka_id: id
	}),
	postAppoints: (data) => request.post(`${api_url}/v1/appoints`, {
		answers: data.answers,
		profile: data.profile,
		topic_id: data.topic_id
	}),
	patchAppointsid: (data) => request.patch(`${api_url}/v1/appoints/${data.id}`, {
		answers: data.answers,
		profile: data.profile,
		topic_id: data.topic_id
	}),
	getGuestViewedLinkas: (data) => request.get(`${api_url}/v1/guest_viewed_linkas?limit=${data.limit}&page=${data.page}`),
	getGuestLikeLinkas: (data) => request.get(`${api_url}/v1/guest_like_linkas?limit=${data.limit}&page=${data.page}`),
	getGuestNoComplateAppoints: (data) => request.get(`${api_url}/v1/guest_no_complate_appoints?limit=${data.limit}&page=${data.page}`),
	getGuestComplateAppoints: (data) => request.get(`${api_url}/v1/guest_complate_appoints?limit=${data.limit}&page=${data.page}`),
	getLinkaAppointNoComplates: (data) => request.get(`${api_url}/v1/linka_appoint_no_complates?limit=${data.limit}&page=${data.page}`),
	getLinkaAppointComplates: (data) => request.get(`${api_url}/v1/linka_appoint_complates?limit=${data.limit}&page=${data.page}`),
	getNavsLinkas: (data) => request.get(`${api_url}/v1/navs/${data.id}/topics?ser_type=${data.ser_type}&order_by=${data.order_by}&limit=${data.limit}&page=${data.page}`),
	getNavsAnsewrs: (data) => request.get(`${api_url}/v1/navs/${data.id}/answers?order_by=${data.order_by}&limit=${data.limit}&page=${data.page}`),
	getArticlesLike: (id) => request.patch(`${api_url}/v1/articles/${id}/like`),
	deleteComments: (id) => request.delete(`${api_url}/v1/comments/${id}`),
	getChatsDetail: (data) => request.get(`${api_url}/v1/find_chats`, {
		guest_id: data.guest_id
	}),
	postChats: (data) => request.post(`${api_url}/v1/chats`, {
		content: data.content,
		guest_id: data.guest_id,
		pid: data.pid
	}),
	postAppointsChangeStatus: (data) => request.post(`${api_url}/v1/appoints/${data.id}/change_status`, {
		status: data.status,
		cancel_res: data.cancel_res,
		cases_id: data.cases_id
	}),
	getLinkaAppointsDetail: (id) => request.get(`${api_url}/v1/linka_appoints/${id}`),
	getSettings: (key) => request.get(`${api_url}/v1/mobile/settings`, {
		key: key
	}),
	postAppointAppraises: (data) => request.post(`${api_url}/v1/appoint_appraises/${data.appoint_id}`, {
		content: data.content,
		star: data.star,
		degree: data.degree
	}),
	postAppointCases: (appoint_cases) => request.post(`${api_url}/v1/appoint_cases`, {
		appoint_cases: appoint_cases
	}),
	postSendEmail: (content) => request.post(`${api_url}/v1/send_email`, {
		content: content
	}),
	getPayNotPayOrder: (id) => request.get(`${api_url}/v1/answers/${id}/pay_not_pay_order`),
}

export default api