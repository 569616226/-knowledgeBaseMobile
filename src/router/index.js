import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index' //首页
import auth from '@/pages/auth' //验证
import search from '@/pages/search' //搜索
import allclassify from '@/pages/allclassify' //全部分类
import classList from '@/pages/classList' //分类列表
import question from '@/pages/question' //快速提问
import questionSuccess from '@/components/question/questionSuccess' //提问支付成功
import questionSuccessYuan from '@/components/question/questionSuccessYuan' //提问支付成功
import questiondetail from '@/pages/questiondetail' //问题详情
import choose from '@/pages/choose' //选择大咖
import dakadetail from '@/pages/dakadetail' //大咖详情
import dakapresent from '@/pages/dakapresent' //大咖介绍
import dakaassess from '@/pages/dakaassess' //大咖评价
import makedaka from '@/pages/makedaka' //约见大咖
import initiating from '@/pages/initiating' //发起预约
import initiatingWait from '@/pages/initiatingWait' //发起预约 -- 等待确认
import initiatingRemove from '@/pages/initiatingRemove' //发起预约 -- 取消预约
import initiatingPay from '@/pages/initiatingPay' //发起预约 -- 学员付款
import initiatingSeen from '@/pages/initiatingSeen' //发起预约 -- 确认见过
import initiatingAssess from '@/pages/initiatingAssess' //发起预约 -- 服务评价
import initiatingAssessed from '@/pages/initiatingAssessed' //发起预约 -- 评价后
import makeask from '@/pages/makeask' //约·问
import essay from '@/pages/essay' //文章详情
import write from '@/pages/write' //文章详情 -- 写评论
import news from '@/pages/news' //消息
import syscontent from '@/pages/syscontent' //消息-消息内容
import privatecontent from '@/pages/privatecontent' //消息-私信内容
import user from '@/pages/user' //个人中心
import userMake from '@/pages/userMake' //个人中心-我预约过的大咖
import userLike from '@/pages/userLike' //个人中心-我喜欢的大咖
import userLook from '@/pages/userLook' //个人中心-我浏览过的大咖
import userAsked from '@/pages/userAsked' //个人中心-我问过的问题
import userSeenask from '@/pages/userSeenask' //个人中心-我看过的问题
import userWallet from '@/pages/userWallet' //个人中心-钱包
import walletCash from '@/components/userWallet/walletCash' //个人中心-钱包-余额提现
import walletSuccess from '@/components/userWallet/walletSuccess' //个人中心-钱包-余额提现-提交成功
import userApply from '@/pages/userApply' //个人中心-申请大咖
import basicNews from '@/components/userApply/basicNews' //个人中心-申请大咖-填写基本信息
import bindPhone from '@/components/userApply/bindPhone' //个人中心-申请大咖-填写基本信息-绑定手机
import basicField from '@/components/userApply/basicField' //个人中心-申请大咖-填写基本信息-选择专业领域
import basicData from '@/components/userApply/basicData' //个人中心-申请大咖-详细资料
import basicEdit from '@/components/userApply/basicEdit' //个人中心-申请大咖-详细资料-填写个人介绍
import basicSuccess from '@/components/userApply/basicSuccess' //个人中心-申请大咖-详细资料-提交成功
import personalData from '@/components/user/personalData' //个人中心-个人资料
import personalBindPhone from '@/components/user/bindPhone' //个人中心-个人资料-绑定手机
import feedBack from '@/components/user/feedBack' //个人中心-意见反馈
import userDaka from '@/pages/userDaka' //个人中心-大咖角色
import reservation from '@/components/userDaka/reservation' //个人中心-大咖角色-我的预约
import reservationWait from '@/components/userDaka/reservation/reservationWait' //个人中心-大咖角色-我的预约-等待确认
import reservationRefuse from '@/components/userDaka/reservation/reservationRefuse' //个人中心-大咖角色-我的预约-拒绝约见
import reservationPay from '@/components/userDaka/reservation/reservationPay' //个人中心-大咖角色-我的预约-学员付款
import reservationTime from '@/components/userDaka/reservation/reservationTime' //个人中心-大咖角色-我的预约-学员付款-设置约见时间地点
import reservationPayWait from '@/components/userDaka/reservation/reservationPayWait' //个人中心-大咖角色-我的预约-等待学员付款
import reservationSeen from '@/components/userDaka/reservation/reservationSeen' //个人中心-大咖角色-我的预约-确认见过
import reservationAssess from '@/components/userDaka/reservation/reservationAssess' //个人中心-大咖角色-我的预约-服务评价
import reservationAssessed from '@/components/userDaka/reservation/reservationAssessed' //个人中心-大咖角色-我的预约-服务评价-已评价
import myQuestion from '@/components/userDaka/myQuestion' //个人中心-大咖角色-我的问题
import questionReply from '@/components/userDaka/myQuestion/questionReply' //个人中心-大咖角色-我的问题-回答问题
import questionWrite from '@/components/userDaka/myQuestion/questionWrite' //个人中心-大咖角色-我的问题-回答问题-回答
import pageDaka from '@/components/userDaka/pageDaka' //个人中心-大咖角色-大咖专栏
import pageEdit from '@/components/userDaka/pageDaka/pageEdit' //个人中心-大咖角色-大咖专栏-编辑资料
import pagePhone from '@/components/userDaka/pageDaka/pagePhone' //个人中心-大咖角色-大咖专栏-编辑资料-绑定手机
import pageField from '@/components/userDaka/pageDaka/pageField' //个人中心-大咖角色-大咖专栏-编辑资料-选择领域
import presentEdit from '@/components/userDaka/pageDaka/presentEdit' //个人中心-大咖角色-大咖专栏-个人介绍
import addTopic from '@/components/userDaka/pageDaka/addTopic' //个人中心-大咖角色-大咖专栏--添加话题
import topicPresent from '@/components/userDaka/pageDaka/topicPresent' //个人中心-大咖角色-大咖专栏--添加话题-填写话题介绍
import topicAnwser from '@/components/userDaka/pageDaka/topicAnwser' //个人中心-大咖角色-大咖专栏--添加话题-想了解学员的问题
import addArticle from '@/components/userDaka/pageDaka/addArticle' //个人中心-大咖角色-大咖专栏--添加文章
import RichTextPage from '@/components/RichTextPage/index' //富文本编辑器

const parentComponent = {
	template: '<router-view></router-view>'
}

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/RichTextPage',
		name: 'RichTextPage',
		component: RichTextPage
	}, {
		path: '/',
		name: 'index',
		component: index
	}, {
		path: '/auth',
		name: 'auth',
		component: auth
	}, {
		path: '/search',
		name: 'search',
		component: search
	}, {
		path: '/allclassify',
		component: parentComponent,
		children: [{
			path: '',
			name: 'allclassify',
			component: allclassify,
		}, {
			path: 'classList/:id',
			name: 'classList',
			component: classList,
		}]
	}, {
		path: '/question',
		name: 'question',
		component: question
	}, {
		path: '/questionDaka/:id',
		name: 'questionDaka',
		component: question
	}, {
		path: '/questionSuccess/:id',
		name: 'questionSuccess',
		component: questionSuccess
	}, {
		path: '/questionSuccessYuan/:id',
		name: 'questionSuccessYuan',
		component: questionSuccessYuan
	}, {
		path: '/questiondetail/:id',
		name: 'questiondetail',
		component: questiondetail
	}, {
		path: '/choose',
		name: 'choose',
		component: choose
	}, {
		path: '/dakadetail',
		component: parentComponent,
		children: [{
			path: '/dakadetail/:id',
			name: 'dakadetail',
			component: dakadetail,
		}, {
			path: 'dakapresent/:id',
			name: 'dakapresent',
			component: dakapresent,
		}, {
			path: 'dakaassess/:id',
			name: 'dakaassess',
			component: dakaassess,
		}]
	}, {
		path: '/makedaka',
		component: parentComponent,
		children: [{
			path: '/makedaka/:id',
			name: 'makedaka',
			component: makedaka,
		}, {
			path: 'initiating/:id',
			name: 'initiating',
			component: initiating,
		}, {
			path: 'initiatingWait/:id',
			name: 'initiatingWait',
			component: initiatingWait,
		}, {
			path: 'initiatingRemove/:id',
			name: 'initiatingRemove',
			component: initiatingRemove,
		}, {
			path: 'initiatingPay/:id',
			name: 'initiatingPay',
			component: initiatingPay,
		}, {
			path: 'initiatingSeen/:id',
			name: 'initiatingSeen',
			component: initiatingSeen,
		}, {
			path: 'initiatingAssess/:id',
			name: 'initiatingAssess',
			component: initiatingAssess,
		}, {
			path: 'initiatingAssessed/:id',
			name: 'initiatingAssessed',
			component: initiatingAssessed,
		}]
	}, {
		path: '/makeask',
		name: 'makeask',
		component: makeask
	}, {
		path: '/essay',
		component: parentComponent,
		children: [{
			path: '/essay/:id',
			name: 'essay',
			component: essay,
		}, {
			path: 'write/:id',
			name: 'write',
			component: write,
		}]
	}, {
		path: '/news',
		component: parentComponent,
		children: [{
			path: '',
			name: 'news',
			component: news,
		}, {
			path: 'syscontent/:id',
			name: 'syscontent',
			component: syscontent,
		}, {
			path: 'privatecontent/:id',
			name: 'privatecontent',
			component: privatecontent,
		}]
	}, {
		path: '/user',
		component: parentComponent,
		children: [{
			path: '',
			name: 'user',
			component: user,
		}, {
			path: 'userMake',
			name: 'userMake',
			component: userMake,
		}, {
			path: 'userLike',
			name: 'userLike',
			component: userLike,
		}, {
			path: 'userLook',
			name: 'userLook',
			component: userLook,
		}, {
			path: 'userAsked',
			name: 'userAsked',
			component: userAsked,
		}, {
			path: 'userSeenask',
			name: 'userSeenask',
			component: userSeenask,
		}, {
			path: 'userWallet',
			name: 'userWallet',
			component: userWallet,
		}, {
			path: 'walletCash',
			name: 'walletCash',
			component: walletCash,
		}, {
			path: 'walletSuccess',
			name: 'walletSuccess',
			component: walletSuccess,
		}, {
			path: 'userApply',
			name: 'userApply',
			component: userApply,
		}, {
			path: 'basicNews',
			name: 'basicNews',
			component: basicNews,
		}, {
			path: 'bindPhone',
			name: 'bindPhone',
			component: bindPhone,
		}, {
			path: 'basicField',
			name: 'basicField',
			component: basicField,
		}, {
			path: 'basicData',
			name: 'basicData',
			component: basicData,
		}, {
			path: 'basicEdit',
			name: 'basicEdit',
			component: basicEdit,
		}, {
			path: 'basicSuccess',
			name: 'basicSuccess',
			component: basicSuccess,
		}, {
			path: 'personalData',
			name: 'personalData',
			component: personalData,
		}, {
			path: 'personalBindPhone',
			name: 'personalBindPhone',
			component: personalBindPhone,
		}, {
			path: 'feedBack',
			name: 'feedBack',
			component: feedBack,
		}, {
			path: 'userDaka',
			name: 'userDaka',
			component: userDaka,
		}, {
			path: 'reservation',
			name: 'reservation',
			component: reservation,
		}, {
			path: 'reservationWait/:id',
			name: 'reservationWait',
			component: reservationWait,
		}, {
			path: 'reservationRefuse/:id',
			name: 'reservationRefuse',
			component: reservationRefuse,
		}, {
			path: 'reservationPay/:id',
			name: 'reservationPay',
			component: reservationPay,
		}, {
			path: 'reservationTime/:id',
			name: 'reservationTime',
			component: reservationTime,
		}, {
			path: 'reservationPayWait/:id',
			name: 'reservationPayWait',
			component: reservationPayWait,
		}, {
			path: 'reservationSeen/:id',
			name: 'reservationSeen',
			component: reservationSeen,
		}, {
			path: 'reservationAssess/:id',
			name: 'reservationAssess',
			component: reservationAssess,
		}, {
			path: 'reservationAssessed/:id',
			name: 'reservationAssessed',
			component: reservationAssessed,
		}, {
			path: 'myQuestion',
			name: 'myQuestion',
			component: myQuestion,
		}, {
			path: 'questionReply/:id',
			name: 'questionReply',
			component: questionReply,
		}, {
			path: 'questionWrite/:id',
			name: 'questionWrite',
			component: questionWrite,
		}, {
			path: 'pageDaka',
			name: 'pageDaka',
			component: pageDaka,
		}, {
			path: 'pageEdit',
			name: 'pageEdit',
			component: pageEdit,
		}, {
			path: 'pagePhone',
			name: 'pagePhone',
			component: pagePhone,
		}, {
			path: 'pageField',
			name: 'pageField',
			component: pageField,
		}, {
			path: 'presentEdit/:id',
			name: 'presentEdit',
			component: presentEdit,
		}, {
			path: 'addTopic',
			name: 'addTopic',
			component: addTopic,
		}, {
			path: 'editTopic/:id',
			name: 'editTopic',
			component: addTopic,
		}, {
			path: 'topicPresent',
			name: 'topicPresent',
			component: topicPresent,
		}, {
			path: 'editTopicPresent/:id',
			name: 'editTopicPresent',
			component: topicPresent,
		}, {
			path: 'topicAnwser',
			name: 'topicAnwser',
			component: topicAnwser,
		}, {
			path: 'editTopicAnwser/:id',
			name: 'editTopicAnwser',
			component: topicAnwser,
		}, {
			path: 'addArticle',
			name: 'addArticle',
			component: addArticle,
		}, {
			path: 'editArticle/:id',
			name: 'editArticle',
			component: addArticle,
		}]
	}],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})