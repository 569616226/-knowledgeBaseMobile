import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api'
import { formatIndexList } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		indexData: [],
		LinkaProfileData: [],
		LinkaTopicsData: [],
		LinkaAppointsDetailData: [],
		topicList: {
			name: '',
			type: null,
			time: null,
			price: null,
			present: '',
			info: []
		},
		articleList: {
			title: '',
			cover: '',
			content: ''
		},
		ArticlesData: {
			data: [],
			limit: 10,
			page: 1
		},
		MobileNavsData: [],
		WalletsData: [],
		GuestReadAnswersData: {
			data: [],
			limit: 10,
			page: 1
		},
		LinkaAppointsData: {
			data: [],
			limit: 10,
			page: 1
		},
		GuestFinacesData: {
			data: [],
			limit: 10,
			page: 1
		},
		TopicArticleAnswersData: {
			data: [],
			limit: 10,
			page: 1
		},
		answers: {
			name: '',
			linka_id: null,
			real_name: ''
		},
		MobileChildrenNavs: [],
		NavsLinkaData: {
			data: [],
			limit: 10,
			page: 1,
			id: null
		},
		SearchAnswerData: {
			data: [],
			limit: 10,
			page: 1,
			search_text: ''
		},
		SearchTopicData: {
			data: [],
			limit: 10,
			page: 1,
			search_text: ''
		},
		GuestSystemMessagesData: {
			data: [],
			limit: 10,
			page: 1,
			lastpage: null
		},
		chatsData: {
			data: [],
			limit: 10,
			page: 1
		},
		LinkaAnswersData: {
			data: [],
			limit: 10,
			page: 1
		},
		LinkaHasQuestionAnswers: {
			data: [],
			limit: 10,
			page: 1
		},
		GuestAnswers: {
			data: [],
			limit: 10,
			page: 1
		},
		MobileLinkasDetailData: [],
		LinkaTopicDetailData: [],
		initiating: {
			answers: [],
			profile: '',
			topic_id: null
		},
		GuestViewedLinkasData: {
			data: [],
			limit: 10,
			page: 1
		},
		GuestLikeLinkasData: {
			data: [],
			limit: 10,
			page: 1
		},
		GuestNoComplateAppointsData: {
			data: [],
			limit: 10,
			page: 1
		},
		GuestComplateAppointsData: {
			data: [],
			limit: 10,
			page: 1
		},
		LinkaAppointNoComplatesData: {
			data: [],
			limit: 10,
			page: 1
		},
		LinkaAppointComplatesData: {
			data: [],
			limit: 10,
			page: 1
		},
		NavsLinkasData: {
			data: [],
			limit: 10,
			page: 1,
			id: null,
			ser_type: null,
			order_by: 0,
			Navid: null,
			Navname: '',
			type: '全部分类',
			order: '全部排序'
		},
		NavsAnsewrsData: {
			data: [],
			limit: 10,
			page: 1,
			id: null,
			order_by: 0,
			Navid: null,
			Navname: '',
			order: '全部排序'
		},
		navsCheck: {
			id: 0
		},
		newsCheck: {
			id: 0
		},
		AppointCasesData: [],
		showData: {
			dakaShow: false
		}
	},
	mutations: {
		indexData(state, data) {
			state.indexData = data
		},
		MobileLinkasDetailData(state, data) {
			state.MobileLinkasDetailData = data
		},
		LinkaProfileData(state, data) {
			state.LinkaProfileData = data
		},
		LinkaTopicsData(state, data) {
			state.LinkaTopicsData = data
		},
		LinkaAppointsDetailData(state, data) {
			state.LinkaAppointsDetailData = data
		},
		ArticlesData(state, data) {
			state.ArticlesData.data = data
		},
		MobileChildrenNavs(state, data) {
			state.MobileChildrenNavs = data
		},
		MobileNavsData(state, data) {
			state.MobileNavsData = data
		},
		WalletsData(state, data) {
			state.WalletsData = data
		},
		LinkaAppointsData(state, data) {
			state.LinkaAppointsData.data = data
		},
		GuestFinacesData(state, data) {
			state.GuestFinacesData.data = data
		},
		TopicArticleAnswersData(state, data) {
			state.TopicArticleAnswersData.data = data
		},
		NavsLinkaData(state, data) {
			state.NavsLinkaData.data = data
		},
		SearchAnswerData(state, data) {
			state.SearchAnswerData.data = data
		},
		SearchTopicData(state, data) {
			state.SearchTopicData.data = data
		},
		GuestSystemMessagesData(state, data) {
			state.GuestSystemMessagesData.data = data
		},
		chatsData(state, data) {
			state.chatsData.data = data
		},
		LinkaAnswersData(state, data) {
			state.LinkaAnswersData.data = data
		},
		LinkaHasQuestionAnswers(state, data) {
			state.LinkaHasQuestionAnswers.data = data
		},
		GuestAnswers(state, data) {
			state.GuestAnswers.data = data
		},
		GuestReadAnswersData(state, data) {
			state.GuestReadAnswersData.data = data
		},
		LinkaTopicDetailData(state, data) {
			state.LinkaTopicDetailData = data
		},
		GuestViewedLinkasData(state, data) {
			state.GuestViewedLinkasData.data = data
		},
		GuestLikeLinkasData(state, data) {
			state.GuestLikeLinkasData.data = data
		},
		GuestNoComplateAppointsData(state, data) {
			state.GuestNoComplateAppointsData.data = data
		},
		GuestComplateAppointsData(state, data) {
			state.GuestComplateAppointsData.data = data
		},
		LinkaAppointNoComplatesData(state, data) {
			state.LinkaAppointNoComplatesData.data = data
		},
		LinkaAppointComplatesData(state, data) {
			state.LinkaAppointComplatesData.data = data
		},
		NavsLinkasData(state, data) {
			state.NavsLinkasData.data = data
		},
		NavsAnsewrsData(state, data) {
			state.NavsAnsewrsData.data = data
		},
		AppointCasesData(state, data) {
			state.AppointCasesData = data
		},
	},
	actions: {
		async getIndex({state, commit}) {
			const data = await api.getIndex()
			commit('indexData', data.data)
		},
		async getMobileLinkasDetail({state, commit}, id) {
			const data = await api.getMobileLinkasDetail(id)
			commit('MobileLinkasDetailData', data.data)
		},
		async getLinkaTopicDetail({state, commit}, id) {
			const data = await api.getLinkaTopicDetail(id)
			commit('LinkaTopicDetailData', data.data)
		},
		async getAppointCases({state, commit}, id) {
			const data = await api.getAppointCases(id)
			commit('AppointCasesData', data.data)
		},
		async getChats({state, commit}, init) {
			const data = await api.getChats(state.chatsData)
			state.chatsData.page++
			if(init){
				commit('chatsData', data.data)
			}else{
				commit('chatsData', state.chatsData.data.concat(data.data))
			}
		},
		async getLinkaProfile({state, commit}) {
			const data = await api.getLinkaProfile()
			commit('LinkaProfileData', data.data)
		},
		async getLinkaTopics({state, commit}) {
			const data = await api.getLinkaTopics()
			commit('LinkaTopicsData', data.data)
		},
		async getLinkaAppointsDetail({state, commit}, id) {
			const data = await api.getLinkaAppointsDetail(id)
			commit('LinkaAppointsDetailData', data.data)
		},
		async getArticles({state, commit}, init) {
			const data = await api.getArticles(state.ArticlesData)
			state.ArticlesData.page++
			if(init){
				commit('ArticlesData', data.data)
			}else{
				commit('ArticlesData', state.ArticlesData.data.concat(data.data))
			}
		},
		async getMobileNavs({state, commit}) {
			const data = await api.getMobileNavs()
			commit('MobileNavsData', data.data)
		},
		async getMobileChildrenNavs({state, commit}) {
			const data = await api.getMobileChildrenNavs()
			commit('MobileChildrenNavs', data.data)
		},
		async getWallets({state, commit}) {
			const data = await api.getWallets()
			commit('WalletsData', data.data)
		},
		async getGuestReadAnswers({state, commit}, init) {
			const data = await api.getGuestReadAnswers(state.GuestReadAnswersData)
			state.GuestReadAnswersData.page++
			if(init){
				commit('GuestReadAnswersData', data.data)
			}else{
				commit('GuestReadAnswersData', state.GuestReadAnswersData.data.concat(data.data))
			}
		},
		async getLinkaAppoints({state, commit}, init) {
			const data = await api.getLinkaAppoints(state.LinkaAppointsData)
			state.LinkaAppointsData.page++
			if(init){
				commit('LinkaAppointsData', data.data)
			}else{
				commit('LinkaAppointsData', state.LinkaAppointsData.data.concat(data.data))
			}
		},
		async getGuestFinaces({state, commit}, init) {
			const data = await api.getGuestFinaces(state.GuestFinacesData)
			state.GuestFinacesData.page++
			if(init){
				commit('GuestFinacesData', data.data)
			}else{
				commit('GuestFinacesData', state.GuestFinacesData.data.concat(data.data))
			}
		},
		async getTopicArticleAnswers({state, commit}, init) {
			const data = await api.getTopicArticleAnswers(state.TopicArticleAnswersData)
			state.TopicArticleAnswersData.page++
			if(init){
				commit('TopicArticleAnswersData', data.data)
			}else{
				commit('TopicArticleAnswersData', state.TopicArticleAnswersData.data.concat(data.data))
			}
		},
		async getNavsLinka({state, commit}, init) {
			const data = await api.getNavsLinka(state.NavsLinkaData)
			state.NavsLinkaData.page++
			if(init){
				commit('NavsLinkaData', data.data)
			}else{
				commit('NavsLinkaData', state.NavsLinkaData.data.concat(data.data))
			}
		},
		async postSearchAnswer({state, commit}, init) {
			const data = await api.postSearchAnswer(state.SearchAnswerData)
			state.SearchAnswerData.page++
			if(init){
				commit('SearchAnswerData', data.data)
			}else{
				commit('SearchAnswerData', state.SearchAnswerData.data.concat(data.data))
			}
		},
		async postSearchTopic({state, commit}, init) {
			const data = await api.postSearchTopic(state.SearchTopicData)
			state.SearchTopicData.page++
			if(init){
				commit('SearchTopicData', data.data)
			}else{
				commit('SearchTopicData', state.SearchTopicData.data.concat(data.data))
			}
		},
		async getGuestSystemMessages({state, commit}, init) {
			const data = await api.getGuestSystemMessages(state.GuestSystemMessagesData)
			state.GuestSystemMessagesData.page++
			state.GuestSystemMessagesData.lastpage = data.meta.pagination.total_pages
			if(init){
				commit('GuestSystemMessagesData', data.data)
			}else{
				commit('GuestSystemMessagesData', state.GuestSystemMessagesData.data.concat(data.data))
			}
		},
		async getLinkaAnswers({state, commit}, init) {
			const data = await api.getLinkaAnswers(state.LinkaAnswersData)
			state.LinkaAnswersData.page++
			if(init){
				commit('LinkaAnswersData', data.data)
			}else{
				commit('LinkaAnswersData', state.LinkaAnswersData.data.concat(data.data))
			}
		},
		async getLinkaHasQuestionAnswers({state, commit}, init) {
			const data = await api.getLinkaHasQuestionAnswers(state.LinkaHasQuestionAnswers)
			state.LinkaHasQuestionAnswers.page++
			if(init){
				commit('LinkaHasQuestionAnswers', data.data)
			}else{
				commit('LinkaHasQuestionAnswers', state.LinkaHasQuestionAnswers.data.concat(data.data))
			}
		},
		async getGuestAnswers({state, commit}, init) {
			const data = await api.getGuestAnswers(state.GuestAnswers)
			state.GuestAnswers.page++
			if(init){
				commit('GuestAnswers', data.data)
			}else{
				commit('GuestAnswers', state.GuestAnswers.data.concat(data.data))
			}
		},
		async getGuestViewedLinkas({state, commit}, init) {
			const data = await api.getGuestViewedLinkas(state.GuestViewedLinkasData)
			state.GuestViewedLinkasData.page++
			if(init){
				commit('GuestViewedLinkasData', data.data)
			}else{
				commit('GuestViewedLinkasData', state.GuestViewedLinkasData.data.concat(data.data))
			}
		},
		async getGuestLikeLinkas({state, commit}, init) {
			const data = await api.getGuestLikeLinkas(state.GuestLikeLinkasData)
			state.GuestLikeLinkasData.page++
			if(init){
				commit('GuestLikeLinkasData', data.data)
			}else{
				commit('GuestLikeLinkasData', state.GuestLikeLinkasData.data.concat(data.data))
			}
		},
		async getGuestNoComplateAppoints({state, commit}, init) {
			const data = await api.getGuestNoComplateAppoints(state.GuestNoComplateAppointsData)
			state.GuestNoComplateAppointsData.page++
			if(init){
				commit('GuestNoComplateAppointsData', data.data)
			}else{
				commit('GuestNoComplateAppointsData', state.GuestNoComplateAppointsData.data.concat(data.data))
			}
		},
		async getGuestComplateAppoints({state, commit}, init) {
			const data = await api.getGuestComplateAppoints(state.GuestComplateAppointsData)
			state.GuestComplateAppointsData.page++
			if(init){
				commit('GuestComplateAppointsData', data.data)
			}else{
				commit('GuestComplateAppointsData', state.GuestComplateAppointsData.data.concat(data.data))
			}
		},
		async getLinkaAppointNoComplates({state, commit}, init) {
			const data = await api.getLinkaAppointNoComplates(state.LinkaAppointNoComplatesData)
			state.LinkaAppointNoComplatesData.page++
			if(init){
				commit('LinkaAppointNoComplatesData', data.data)
			}else{
				commit('LinkaAppointNoComplatesData', state.LinkaAppointNoComplatesData.data.concat(data.data))
			}
		},
		async getLinkaAppointComplates({state, commit}, init) {
			const data = await api.getLinkaAppointComplates(state.LinkaAppointComplatesData)
			state.LinkaAppointComplatesData.page++
			if(init){
				commit('LinkaAppointComplatesData', data.data)
			}else{
				commit('LinkaAppointComplatesData', state.LinkaAppointComplatesData.data.concat(data.data))
			}
		},
		async getNavsLinkas({state, commit}, init) {
			const data = await api.getNavsLinkas(state.NavsLinkasData)
			state.NavsLinkasData.page++
			if(init){
				commit('NavsLinkasData', data.data)
			}else{
				commit('NavsLinkasData', state.NavsLinkasData.data.concat(data.data))
			}
		},
		async getNavsAnsewrs({state, commit}, init) {
			const data = await api.getNavsAnsewrs(state.NavsAnsewrsData)
			state.NavsAnsewrsData.page++
			if(init){
				commit('NavsAnsewrsData', data.data)
			}else{
				commit('NavsAnsewrsData', state.NavsAnsewrsData.data.concat(data.data))
			}
		}
	}
})

export default store