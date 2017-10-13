/**
 * 用户配置
 */
define(function(require, exports, module){

	module.exports = {

		/**
		 * 欢迎界面标识
		 */
		welcomeWinId  : "welcome",

		/**
		 * 主窗口
		 */
		mainWindow : "advert",

		/**
		 * 窗口页面配置
		 */
		appWindows : {

			/**
			 * 全部分类
			 */
			"allapp": {
				html: "UserModule/module/allapp/allapp.html",
				css: "UserModule/module/allapp/style/allapp.css",
				js: "UserModule/module/allapp/allapp.js"
			},
			/**
			 * 欢迎页面
			 */
			"welcome"  : {
				html : "UserModule/module/welcome/welcome.html",
				css : "UserModule/module/welcome/style/welcome.css",
				js : "UserModule/module/welcome/welcome.js",
				isHistory : false
			},
			/**
			 * 主窗口页面
			 */
			"mainPage" : {
				html : "UserModule/module/mainPage/mainPage.html",
				css : "UserModule/module/mainPage/style/mainPage.css",
				js : "UserModule/module/mainPage/mainPage.js"
			},
			/**
			 * 首页
			 */
			"index": {
				html: "UserModule/module/index/index.html",
				css: "UserModule/module/index/style/index.css",
				js: "UserModule/module/index/index.js"
			},
			/**
			 * 热门新闻详情
			 */
			"hotNewsDetail": {
				html: "UserModule/module/index/hotNewsDetail.html",
				css: "UserModule/module/index/style/index.css",
				js: "UserModule/module/index/hotNewsDetail.js"
			},
			/**
			 * 办事
			 */
			"work": {
				html: "UserModule/module/work/work.html",
				css: "UserModule/module/work/style/work.css",
				js: "UserModule/module/work/work.js"
			},
			/**
			 * 办事分类
			 */
			"workItem": {
				html: "UserModule/module/work/workItem.html",
				css: "UserModule/module/work/style/work.css",
				js: "UserModule/module/work/workItem.js"
			},
			/**
			 * 服务
			 */
			"service" :{
				html : "UserModule/module/service/service.html",
				css : ["UserModule/module/service/style/service.css","BaseModule/components/headerBack/style/default.css"],
				js : "UserModule/module/service/service.js"
			},

			/**
			 * 预约医院列表
			 */
			"hospitalList":{
				html : "UserModule/module/hospitalList/hospitalList.html",
				js : "UserModule/module/hospitalList/hospitalList.js"
			},
			/**
			 * 预约医院列表
			 */
			"hospitalDeptByOfficeId":{
				html : "UserModule/module/hospitalDeptByOfficeId/hospitalDeptByOfficeId.html",
				css : "UserModule/module/hospitalDeptByOfficeId/style/hospitalDeptByOfficeId.css",
				js : "UserModule/module/hospitalDeptByOfficeId/hospitalDeptByOfficeId.js"
			},
			/**
			 * 热线
			 */
			"hotline": {
				html: "UserModule/module/hotLine/hotline.html",
				css: "UserModule/module/hotLine/style/hotline.css",
				js: "UserModule/module/hotLine/hotline.js"
			},
			/**
			 * 城市声音
			 */
			"cityVoice":{
				html : "UserModule/module/cityVoice/cityVoice.html",
				css : "UserModule/module/cityVoice/style/cityVoice.css",
				js : "UserModule/module/cityVoice/cityVoice.js"
			},
			/**
			 * 城市声音评论
			 */
			"cityVoiceReply":{
				html : "UserModule/module/cityVoice/reply.html",
				css : "UserModule/module/cityVoice/style/cityVoice.css",
				js : "UserModule/module/cityVoice/reply.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},
			/**
			 * 我要爆料
			 */
			"fact":{
				html : "UserModule/module/cityVoice/fact/fact.html",
				css : "UserModule/module/cityVoice/style/cityVoice.css",
				js : "UserModule/module/cityVoice/fact/fact.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},

            /**
            * 最美咸阳
            */
			"beautifulXianYang": {
				html: "UserModule/module/beautifulXianYang/beautifulXianYang.html",
				css: "UserModule/module/beautifulXianYang/style/beautifulXianYang.css",
				js: "UserModule/module/beautifulXianYang/beautifulXianYang.js"
			},
			/**
             * 我要上传
             */
			"uploadPic": {
				html: "UserModule/module/beautifulXianYang/uploadPic/uploadPic.html",
				css: "UserModule/module/beautifulXianYang/style/beautifulXianYang.css",
				js: "UserModule/module/beautifulXianYang/uploadPic/uploadPic.js",
				isHistory: false //不记录到历史记录中，返回时跳过此页面
				, isLogin: true
			},
			/**
             * 最美咸阳评论
             */
			"beautifulXianYangReply": {
				html: "UserModule/module/beautifulXianYang/reply.html",
				css: "UserModule/module/beautifulXianYang/style/beautifulXianYang.css",
				js: "UserModule/module/beautifulXianYang/reply.js",
				isHistory: false //不记录到历史记录中，返回时跳过此页面
				, isLogin: true
			},
			/**
			* 话题
			*/
			"topic": {
				html: "UserModule/module/topic/topic.html",
				css: "UserModule/module/topic/style/topic.css",
				js: "UserModule/module/topic/topic.js"
			},


			/**
			 * 办卡进度查询
			 */
			"queryCard":{
				html : "UserModule/module/queryCard/queryCard.html",
				css : "UserModule/module/queryCard/style/queryCard.css",
				js : "UserModule/module/queryCard/queryCard.js"
			},
			/**
			 * 部门信箱
			 */
			"deptMailList":{
				html : "UserModule/module/deptMail/deptMailList.html",
				css : "UserModule/module/my/relate/style/relate.css",
				js : "UserModule/module/deptMail/deptMailList.js",
				isLogin:true
			},
			/**
			 * 部门信箱
			 */
			"deptMailList2":{
				html : "UserModule/module/deptMail/deptMailList2.html",
				css : "UserModule/module/my/relate/style/relate.css",
				js : "UserModule/module/deptMail/deptMailList2.js",
				isLogin:true
			},
			/**
			 * 部门信箱
			 */
			"deptMailList3":{
				html : "UserModule/module/deptMail/deptMailList3.html",
				css : "UserModule/module/my/relate/style/relate.css",
				js : "UserModule/module/deptMail/deptMailList3.js",
				isLogin:true
			},
			/**
			 * 部门信箱
			 */
			"deptMail":{
				html : "UserModule/module/deptMail/deptMail.html",
				js : "UserModule/module/deptMail/deptMail.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},
			/**
			 * 部门信箱
			 */
			"deptMail2":{
				html : "UserModule/module/deptMail/deptMail2.html",
				js : "UserModule/module/deptMail/deptMail.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},
			/**
			 * 部门信箱
			 */
			"deptMail3":{
				html : "UserModule/module/deptMail/deptMail3.html",
				js : "UserModule/module/deptMail/deptMail.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},
			/**
			 * 热线12345
			 */
			"line12345":{
				html : "UserModule/module/line12345/line12345.html",
				js : "UserModule/module/line12345/line12345.js"
			},
			/**
			 * 市长信箱列表
			 */
			"mayorMailList":{
				html : "UserModule/module/mayorMail/mayorMailList.html",
				js : "UserModule/module/mayorMail/mayorMailList.js",
				css : "UserModule/module/my/relate/style/relate.css",
				isLogin:true
			},
			/**
			 * 市长信箱
			 */
			"mayorMail":{
				html : "UserModule/module/mayorMail/mayorMail.html",
				js : "UserModule/module/mayorMail/mayorMail.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},
			/**
			 * 掌上信箱
			 */
			"padMailList":{
				html : "UserModule/module/padMail/padMailList.html",
				css : "UserModule/module/my/relate/style/relate.css",
				js : "UserModule/module/padMail/padMailList.js",
				isLogin:true
			},
			/**
			 * 掌上信箱
			 */
			"padMail":{
				html : "UserModule/module/padMail/padMail.html",
				js : "UserModule/module/padMail/padMail.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
				,isLogin:true
			},
			/**
			 * 我的报告
			 */
			"myReport":{
				html : "UserModule/module/myReport/myReport.html",
				css : ["UserModule/module/myReport/style/myReport.css","BaseModule/components/headerBack/style/default.css"],
				js : "UserModule/module/myReport/myReport.js",
				isLogin:true
			},
			/**
			 * 支付服务
			 */
			"payService":{
				html : "UserModule/module/payService/payService.html",
				css : ["UserModule/module/payService/style/ydt.css"],
				js : "UserModule/module/payService/payService.js",
				isLogin:true
			},
			/**
			 * 我的
			 */
			"my":{
				html : "UserModule/module/my/my.html",
				css : "UserModule/module/my/style/my.css",
				js : "UserModule/module/my/my.js",
				isLogin:true
			},

			/**
			 * 实名认证
			 */
			"authentification":{
				html : "UserModule/module/authentification/authentification.html",
				css : ["UserModule/module/my/ykt/style/idcard_netinfo.css"],
				js : "UserModule/module/authentification/authentification.js",
				isLogin:true
			},

			/**
			 * 快速实名认证
			 */
			"kAuthentification":{
				html : "UserModule/module/kAuthentification/kAuthentification.html",
				css : ["UserModule/module/my/ykt/style/idcard_netinfo.css"],
				js : "UserModule/module/kAuthentification/kAuthentification.js",
				isHistory : false,
				isLogin:true
			},
			/**
			 * 打开url地址
			 */
			"openUrl":{
				html : "UserModule/module/openUrl/openUrl.html",
				css : "UserModule/module/openUrl/style/openUrl.css",
				js : "UserModule/module/openUrl/openUrl.js"
			},
			/**
			 * 打开url地址
			 */
			"openUrl2":{
				html : "UserModule/module/openUrl2/openUrl2.html",
				js : "UserModule/module/openUrl2/openUrl2.js"
			},
			/**
			 * 医院科室
			 */
			"hospitalDeptList":{
				html : "UserModule/module/hospitalDeptList/hospitalDeptList.html",
				css : "UserModule/module/hospitalDeptList/style/hospitalDeptList.css",
				js : "UserModule/module/hospitalDeptList/hospitalDeptList.js"
			},
			/**
			 * 医院信息
			 */
			"hospitalInfo":{
				html : "UserModule/module/hospitalInfo/hospitalInfo.html",
				css : ["UserModule/module/hospitalInfo/style/hospitalInfo.css","BaseModule/components/headerBack/style/default.css"],
				js : "UserModule/module/hospitalInfo/hospitalInfo.js"
			},
			/**
			 * 医院地信息页面
			 */
			"hopitalMap":{
				html : "UserModule/module/hopitalMap/hopitalMap.html",
				css : "UserModule/module/hopitalMap/style/hopitalMap.css",
				js : "UserModule/module/hopitalMap/hopitalMap.js"
			},
			"hopitalMap1":{
				html : "UserModule/module/hopitalMap/hopitalMap1.html",
				css : "UserModule/module/hopitalMap/style/hopitalMap.css",
				js : "UserModule/module/hopitalMap/hopitalMap.js"
			},
			/**
			 * 挂号预约列表
			 */
			"reserveList":{
				html : "UserModule/module/reserve/reserveList/reserveList.html",
				css : ["UserModule/module/reserve/reserveList/style/reserveList.css","BaseModule/components/headerBack/style/default.css"],
				js : "UserModule/module/reserve/reserveList/reserveList.js",
				isLogin:true
			},
			/**
			 * 挂号预约确认
			 */
			"reserveConfirm":{
				html : "UserModule/module/reserve/reserveConfirm/reserveConfirm.html",
				css : "UserModule/module/reserve/reserveConfirm/style/reserveConfirm.css",
				js : "UserModule/module/reserve/reserveConfirm/reserveConfirm.js",
				isLogin:true
			},
			/**
			 * 挂号预约成功后跳转到确认单
			 */
			"reserveSuccess":{
				html : "UserModule/module/reserve/yySuccess/yySuccess.html",
				js : "UserModule/module/reserve/yySuccess/yySuccess.js",
				isHistory : false, //不记录到历史记录中，返回时跳过此页面
				isLogin:true
			},
			/**
			 * 短信发送
			 */
			"reserveSend":{
				html : "UserModule/module/reserve/reserveSend/reserveSend.html",
				css : "UserModule/module/reserve/reserveSend/style/reserveSend.css",
				js : "UserModule/module/reserve/reserveSend/reserveSend.js",
				isLogin:true
			},
			/**
			 * 预约排版
			 */
			"reserveTypeset":{
				html : "UserModule/module/reserve/reserveList/reserveList.html",
				css : ["UserModule/module/reserve/reserveList/style/reserveList.css","BaseModule/components/headerBack/style/default.css"],
				js : "UserModule/module/reserve/reserveTypeset/reserveTypeset.js",
				isLogin:true
			},
			/**
			 * 智慧路况
			 */
			"road":{
				html : "UserModule/module/road/road.html",
				css : "UserModule/module/road/style/road.css",
				js : "UserModule/module/road/road.js"
			},
			/**
			 * 智慧路况列表页
			 */
			"roadvideo": {
				html: "UserModule/module/roadvideo/roadvideo.html",
				css: "UserModule/module/roadvideo/style/roadvideo.css",
				js: "UserModule/module/roadvideo/roadvideo.js"
			},

			/**
			 * 自检查功能
			 */
			"selfCheck":{
				html : "UserModule/module/selfCheck/selfCheck.html",
				css : ["UserModule/module/selfCheck/style/selfCheck.css","BaseModule/components/headerBack/style/default.css"],
				js : "UserModule/module/selfCheck/selfCheck.js"
			},

			/**
			 * 得到相关症状
			 */
			"relSymptomInfo":{
				html : "UserModule/module/relSymptomInfo/relSymptomInfo.html",
				css : "UserModule/module/relSymptomInfo/style/relSymptomInfo.css",
				js : "UserModule/module/relSymptomInfo/relSymptomInfo.js"
			},
			/**
			 *  疾病信息
			 */
			"diseaseInfo":{
				html : "UserModule/module/diseaseInfo/diseaseInfo.html",
				css : "UserModule/module/diseaseInfo/style/diseaseInfo.css",
				js : "UserModule/module/diseaseInfo/diseaseInfo.js"
			},


			"newsMain" : {
				html : "UserModule/module/news/newsMain.html",
				css :  ["UserModule/module/news/style/newsMain.css","BaseModule/components/list/style/default.css"],
				js :   "UserModule/module/news/newsMain.js"
			},

			"news" : {
				html : "UserModule/module/news/news.html",
				css :  ["UserModule/module/news/style/newsMain.css","BaseModule/components/list/style/default.css"],
				js :   "UserModule/module/news/news.js"
			},

			/***************我的start**************************/

			/**
			 * 登录
			 */
			"login" : {
				html : "UserModule/module/login/login.html?3",
				css :  "UserModule/module/login/style/login.css",
				js : "UserModule/module/login/login.js?1"
			},

			/**
			 * 注册
			 */
			"register" : {
				html : "UserModule/module/my/register/register.html",
				js : "UserModule/module/my/register/register.js"
			},

			/**
			 * 重置密码
			 */
			"resetPwd" : {
				html : "UserModule/module/my/resetPwd/resetPwd.html",
				js : "UserModule/module/my/resetPwd/resetPwd.js",
				isHistory : false
			},

			/**
			 * 修改手机号码
			 */
			"resetPhone" : {
				html : "UserModule/module/my/resetPhone/resetPhone.html",
				js : "UserModule/module/my/resetPhone/resetPhone.js",
				isHistory : false
			},

			/**
			 * 完善信息
			 */
			"myDetailInfo" : {
				html : "UserModule/module/my/detailInfo/detailInfo.html",
				js : "UserModule/module/my/detailInfo/detailInfo.js",
				isLogin:true
			},

			//*******我的健康 start*********//

			/**
			 * 我的健康
			 */
			"myHealthy" : {
				html : "UserModule/module/my/healthy/healthy.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/healthy.js",
				isLogin:true
			},

			/**
			 * 我的健康-我的信息
			 */
			"myHealthyInfo" : {
				html : "UserModule/module/my/healthy/my/myInfo.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/my/myInfo.js",
				isLogin:true
			},

			/**
			 * 我的健康-我的关注
			 */
			"myHealthyNotice" : {
				html : "UserModule/module/my/healthy/my/myNotice.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/my/myNotice.js",
				isLogin:true
			},

			/**
			 * 我的健康-我的消息
			 */
			"myHealthyMessage" : {
				html : "UserModule/module/my/healthy/my/myMessage.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/my/myMessage.js",
				isLogin:true
			},

			/**
			 * 我的健康-查看预约挂号全部清单
			 */
			"myHealthyOrderList" : {
				html : "UserModule/module/my/healthy/list/orderListMy.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/list/orderListMy.js",
				isLogin:true
			},

			/**
			 * 我的健康-查看全部清单
			 */
			"myHealthyList" : {
				html : "UserModule/module/my/healthy/list/list.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/list/list.js",
				isLogin:true
			},

			/**
			 * 我的健康-详细-传染病
			 */
			"myHealthyCRB" : {
				html : "UserModule/module/my/healthy/detail/crb.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/crb.js",
				isLogin:true
			},

			/**
			 * 我的健康-详细-体检
			 */
			"myHealthyTJ" : {
				html : "UserModule/module/my/healthy/detail/tj.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/tj.js",
				isLogin:true
			},

			/**
			 * 我的健康-详细-血糖
			 */
			"myHealthyXT" : {
				html : "UserModule/module/my/healthy/detail/xt.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/xt.js",
				isLogin:true
			},

			/**
			 * 我的健康-详细-血压
			 */
			"myHealthyXY" : {
				html : "UserModule/module/my/healthy/detail/xy.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/xy.js",
				isLogin:true
			},

			/**
			 * 我的健康-详细-疫苗
			 */
			"myHealthyYM" : {
				html : "UserModule/module/my/healthy/detail/ym.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/ym.js",
				isLogin:true
			},

			/**
			 * 我的健康-详细-诊疗
			 */
			"myHealthyZL" : {
				html : "UserModule/module/my/healthy/detail/zl.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/zl.js",
				isLogin:true
			},

			/**
			 * 我的健康-预约取消成功
			 */
			"myHealthyQxSuccess" : {
				html : "UserModule/module/my/healthy/qxSuccess.html",
				js : "UserModule/module/my/healthy/qxSuccess.js",
				isLogin:true
			},

			//*******我的健康 end*********//

			/**
			 * 诊疗详细信息
			 */
			"myHealthyZL" : {
				html : "UserModule/module/my/healthy/detail/zl.html",
				css : "UserModule/module/my/healthy/detail/style/detail.css",
				js : "UserModule/module/my/healthy/detail/zl.js",
				isLogin:true
			},

			/**
			 * 我的健康--评价医生
			 */
			"myHealthy-doctor" : {
				html : "UserModule/module/my/doctor/doctor.html",
				js : ["UserModule/module/my/doctor/doctor.js","UserModule/module/my/doctor/jquery.raty.min.js"]
			},

			/**
			 * 我的沟通
			 */
			"myRelate" : {
				html : "UserModule/module/my/relate/relate.html",
				css : "UserModule/module/my/relate/style/relate.css",
				js : "UserModule/module/my/relate/relate.js",
				isLogin:true
			},

			/**
			 * 我的沟通——详情
			 */
			"myRelateDetail" : {
				html : "UserModule/module/my/relate/detail.html",
				css : "UserModule/module/my/relate/style/relate.css",
				js : "UserModule/module/my/relate/detail.js"
			},

			/**
			 * 我的办事
			 */
			"myWork" : {
				html : "UserModule/module/my/work/work.html",
				css : "UserModule/module/my/work/style/work.css",
				js : "UserModule/module/my/work/work.js",
				isLogin:true
			},

			/**
			 * 我的账户
			 */
			"myAccount" : {
				html : "UserModule/module/my/account/account.html",
				css : "UserModule/module/my/ykt/style/ykt.css",
				js : "UserModule/module/my/account/account.js",
				isLogin:true
			},

			/**
			 * 一卡通-卡状态查询
			 */
			"myAccount-kztcx" : {
				html : "UserModule/module/my/ykt/kztcx.html",
				js : "UserModule/module/my/ykt/kztcx.js",
				isLogin:true
			},

			/**
			 * 一卡通-缴费信息查询
			 */
			"myAccount-jfxxcx" : {
				html : "UserModule/module/my/ykt/jfxxcx.html",
				js : "UserModule/module/my/ykt/jfxxcx.js",
				isLogin:true
			},

			/**
			 * 一卡通-消费信息查询
			 */
			"myAccount-xfxxcx" : {
				html : "UserModule/module/my/ykt/xfxxcx.html",
				js : "UserModule/module/my/ykt/xfxxcx.js",
				isLogin:true
			},

			/**
			 * 一卡通-口头挂失
			 */
			"myAccount-ktgsbl" : {
				html : "UserModule/module/my/ykt/ktgs.html",
				js : "UserModule/module/my/ykt/ktgs.js",
				isLogin:true
			},

			/**
			 * 一卡通-补换卡
			 */
			"myAccount-bhk" : {
				html : "UserModule/module/my/ykt/bhk.html",
				css : ["UserModule/module/my/style/czsWebTool.css","UserModule/module/my/ykt/style/ykt.css"],
				js : ["UserModule/module/my/ykt/bhk.js","UserModule/module/my/czsWebTool.js"],
				isLogin:true
			},

			/**
			 * 一卡通-充值
			 */
			"myAccount-cz" : {
				html : "UserModule/module/my/ykt/cz.html",
				js : "UserModule/module/my/ykt/cz.js",
				isLogin:true
			},

			/**
			 * 一卡通-卡余额查询
			 */
			"myAccount-kyecz" : {
				html : "UserModule/module/my/ykt/kyecz.html",
				js : "UserModule/module/my/ykt/kyecz.js",
				isLogin:true
			},

			/**
			 * 一卡通-办卡进度查询
			 */
			"myAccount-bkjdcx" : {
				html : "UserModule/module/my/ykt/bkjdcx.html",
				js : "UserModule/module/my/ykt/bkjdcx.js",
				isLogin:true
			},

			/**
			 * 一卡通-消费信息查询
			 */
			"myAccount-xfxxcx" : {
				html : "UserModule/module/my/ykt/xfxxcx.html",
				js : "UserModule/module/my/ykt/xfxxcx.js",
				isLogin:true
			},

			/**
			 * 一卡通-个人申领
			 */
			"myAccount-grsl" : {
				html : "UserModule/module/my/ykt/bhk.html",
				css : ["UserModule/module/my/style/czsWebTool.css"
				       ,"UserModule/module/my/ykt/style/ykt.css"
				       ,"UserModule/module/my/ykt/style/idcard_netinfo.css"
				       ],
				js : ["UserModule/module/my/ykt/grsl.js"
				      ,"UserModule/module/my/czsWebTool.js"
				      ,"UserModule/module/my/jquery.pack.js"
				      ,"UserModule/module/my/sxdg_common.js"
				      ],
				isLogin:true,
				isHistory : false
			},

			/**
			 * 一卡通-交易查询
			 */
			"myAccount-jycx" : {
				html : "UserModule/module/my/ykt/jycx.html",
				css : "UserModule/module/my/ykt/style/ykt.css",
				js : "UserModule/module/my/ykt/jycx.js",
				isLogin:true
			},

			/**
			 * 一卡通-交易查询详细信息
			 */
			"myAccount-jycxDetail" : {
				html : "UserModule/module/my/ykt/jycxDetail.html",
				css : "UserModule/module/my/ykt/style/ykt.css",
				js : "UserModule/module/my/ykt/jycxDetail.js",
				isLogin:true
			},

			/***************我的end**************************/

			"things" : {
				html : "UserModule/module/service/things.html",
				css :  ["BaseModule/lib/bootstrap/bootstrap.min.css",
				        "UserModule/module/service/style/things.css"],
				js :   "UserModule/module/service/things.js"
			},

			"thingsSb" : {
				html : "UserModule/module/service/thingsSb.html",
				css :  "UserModule/module/service/style/thingsSb.css",
				js :   "UserModule/module/service/thingsSb.js",
				isHistory : false, //不记录到历史记录中，返回时跳过此页面
				isLogin: true
			},

			"resultPage" : {
				html : "UserModule/module/common/resultPage.html",
				css :  "UserModule/module/common/style/resultPage.css",
				js :   "UserModule/module/common/resultPage.js"
			},

			"newsDetail" : {
				html : "UserModule/module/news/newsDetail.html",
				css :  ["BaseModule/lib/bootstrap/bootstrap.min.css",
				        "UserModule/module/news/style/newsDetail.css"],
				js :   "UserModule/module/news/newsDetail.js"
			},

			"newsDetail2" : {
				html : "UserModule/module/news/newsDetail2.html",
				css :  ["BaseModule/lib/bootstrap/bootstrap.min.css",
				        "UserModule/module/news/style/newsDetail.css"],
				js :   "UserModule/module/news/newsDetail2.js"
			},

			"thingsHelp" : {
				html : "UserModule/module/service/thingsHelp.html",
				css :  ["BaseModule/lib/bootstrap/bootstrap.min.css",
				        "UserModule/module/service/style/thingsHelp.css"],
				js :   "UserModule/module/service/thingsHelp.js",
				isHistory : false, //不记录到历史记录中，返回时跳过此页面
				isLogin: true
			},

			"newsSubscribe" : {
				html : "UserModule/module/news/newsSubscribe.html",
				css :  ["BaseModule/lib/bootstrap/bootstrap.min.css",
				        "UserModule/module/news/style/newsSubscribe.css"],
				js :   "UserModule/module/news/newsSubscribe.js",
				isHistory : false, //不记录到历史记录中，返回时跳过此页面
				isLogin: true
			},

			"newsList" : {
				html : "UserModule/module/news/newsList.html",
				css :  ["UserModule/module/news/style/newsList.css"],
				js :   "UserModule/module/news/newsList.js"
			},


			"thingsAll" : {
				html : "UserModule/module/service/thingsAll.html",
				css :  ["BaseModule/lib/bootstrap/bootstrap.min.css",
				        "UserModule/module/service/style/thingsAll.css"],
				js :   "UserModule/module/service/thingsAll.js",
				isLogin: false
			},

			"nfc" : {
				html : "UserModule/module/nfc/nfc.html",
				css :  "UserModule/module/nfc/style/tax.css",
				js :   "UserModule/module/nfc/nfc.js",
				isLogin: true
			},
			"czjl" : {
				html : "UserModule/module/nfc/czjl.html",
		        js :   "UserModule/module/nfc/czjl.js",
		        isLogin: true
			},
			/*"nfcRead" : {
				html : "UserModule/module/nfcRead/nfcRead.html",
				css :  ["UserModule/module/nfcRead/style/pay.css"],
				js :   "UserModule/module/nfcRead/nfcRead.js",
				isHistory : false, //不记录到历史记录中，返回时跳过此页面
				isLogin: true
			},*/
			/** 就诊人管理 */
			"memberList" : {
				html : "UserModule/module/member/memberList.html",
				js : "UserModule/module/member/memberList.js",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
			},
			"memberEdit" : {
				html : "UserModule/module/member/memberEdit.html",
				js : ["UserModule/module/member/memberEdit.js","UserModule/module/member/idcardutil.js"],
				isHistory : false //不记录到历史记录中，返回时跳过此页面
			},

			/*家政服务*/
			"homeService" : {
				html : "UserModule/module/homeService/homeService.html",
				css:"UserModule/module/homeService/style/lifeService.css",
				js : "UserModule/module/homeService/homeService.js"
			},

			"homeServiceSearch" : {
				html : "UserModule/module/homeService/homeServiceSearch.html",
				css:"UserModule/module/homeService/style/lifeService.css",
				js : "UserModule/module/homeService/homeServiceSearch.js",
				isHistory : false
			},

			"homeServiceDetail" : {
				html : "UserModule/module/homeService/homeServiceDetail.html",
				css:"UserModule/module/homeService/style/lifeService.css",
				js : "UserModule/module/homeService/homeServiceDetail.js"
			},

			/** 健康关怀 */
			"healthcare" : {
				html : "UserModule/module/healthcare/index.html",
				js : "UserModule/module/healthcare/index.js",
				css : "UserModule/module/my/relate/style/relate.css",
				isHistory : false //不记录到历史记录中，返回时跳过此页面
			},

			/*天气预报*/
			"weather" : {
				html : "UserModule/module/weather/weather.html",
				css:"UserModule/module/weather/style/weather.css",
				js : "UserModule/module/weather/weather.js"
			},

			//可评价列表
			"evaluate" : {
				html : "UserModule/module/my/healthy/my/evaluate.html",
				css : "UserModule/module/my/healthy/style/healthy.css",
				js : "UserModule/module/my/healthy/my/evaluate.js",
				isLogin:true
			},
			"xysmfww":{
				html : "UserModule/module/xysmfww/xysmfww.html",
				css : "UserModule/module/xysmfww/style/xysmfww.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide1":{
				html : "UserModule/module/other/guide/guide1.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide2":{
				html : "UserModule/module/other/guide/guide2.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide3":{
				html : "UserModule/module/other/guide/guide3.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide4":{
				html : "UserModule/module/other/guide/guide4.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide5":{
				html : "UserModule/module/other/guide/guide5.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide6":{
				html : "UserModule/module/other/guide/guide6.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide7":{
				html : "UserModule/module/other/guide/guide7.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide8":{
				html : "UserModule/module/other/guide/guide8.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide9":{
				html : "UserModule/module/other/guide/guide9.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide10":{
				html : "UserModule/module/other/guide/guide10.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide10Info":{
				html : "UserModule/module/other/guide/guide10Info.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide10Info.js"
			},
			"guide11":{
				html : "UserModule/module/other/guide/guide11.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide.js"
			},
			"guide11Info":{
				html : "UserModule/module/other/guide/guide11Info.html",
				css : "UserModule/module/other/guide/style/guide.css",
				js:"UserModule/module/other/guide/guide11Info.js"
			},
			/**
			 * 一卡通
			 */
			"edotMain":{
				html : "UserModule/module/edotMain/edotMain.html",
				css : "UserModule/module/edotMain/style/edotMain.css",
				js : "UserModule/module/edotMain/edotMain.js"
			},
			/**
			 * 一卡通
			 */
			"cardList":{
				html : "UserModule/module/cardList/cardList.html",
				css : "UserModule/module/cardList/style/cardList.css",
				js : "UserModule/module/cardList/cardList.js",
				isLogin:true
			},
			/**
			 * 健康
			 */
			"myHealth":{
				html : "UserModule/module/myHealth/myHealth.html",
				css : "UserModule/module/myHealth/style/myHealth.css",
				js : "UserModule/module/myHealth/myHealth.js",
				isLogin:false
			},
			/**
			 * 广告
			 */
			"advert" :{
				html : "UserModule/module/advert/advert.html",
				css : "UserModule/module/advert/style/advert.css",
				js : "UserModule/module/advert/advert.js",
                isHistory : false
			},"upgrade" : {
				html : "UserModule/module/upgrade/upgrade.html",
				js : "UserModule/module/upgrade/upgrade.js",
				css:"UserModule/module/upgrade/style/upgrade.css"
			},
			/**
			 * 实时公交
			 */
			"bus" : {
			    html : "UserModule/module/bus/bus.html",
                css : "UserModule/module/bus/style/bus.css",
                js : "UserModule/module/bus/bus.js",
			},
			/**
			 * 实时公交和停车详情页面
			 */
			"busRealtime": {
			     html : "UserModule/module/busRealtime/busRealtime.html",
                 css : "UserModule/module/busRealtime/style/busRealtime.css",
                 js : "UserModule/module/busRealtime/busRealtime.js",
			},
			"busStop": {
				 html : "UserModule/module/busStop/busStop.html",
                 css : "UserModule/module/busStop/style/busStop.css",
                 js : "UserModule/module/busStop/busStop.js",
			},
			"busRefresh": {
				html : "UserModule/module/busRefresh/busRefresh.html",
                css : "UserModule/module/busRefresh/style/busRefresh.css",
                js : "UserModule/module/busRefresh/busRefresh.js",
				isLogin:false
			},
			"busStationNear": {
				html: "UserModule/module/busStationNear/busStationNear.html",
				css: "UserModule/module/busStationNear/style/busStationNear.css",
				js: "UserModule/module/busStationNear/busStationNear.js",
				isLogin: false
			},
			"busTrans": {
				html: "UserModule/module/busTrans/busTrans.html",
				css: "UserModule/module/busTrans/style/busTrans.css",
				js: "UserModule/module/busTrans/busTrans.js",
				isLogin: false
			},
			"busSameRoute": {
				html:"UserModule/module/busSameRoute/busSameRoute.html",
				css:"UserModule/module/busSameRoute/style/busSameRoute.css",
				js:"UserModule/module/busSameRoute/busSameRoute.js",
				isLogin:false
			},
			"busMore": {
                html:"UserModule/module/busMore/busMore.html",
                css:"UserModule/module/busMore/style/busMore.css",
                js:"UserModule/module/busMore/busMore.js",
				isLogin:false
			}



		},


		/**
		 * 用户二次开发的js模块配置
		 */
		jsModules : {
			"aiAppAction":"UserModule/jsModules/aiAppAction",
			"aiScroll":"UserModule/jsModules/aiScroll"
		}
	};
});
