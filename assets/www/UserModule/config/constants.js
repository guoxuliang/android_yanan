
/**
 * 常量模块
 * @author keyz@aigov.com
 * @since 2016-05-25
 */
define(function (require, exports, module) {

	/**
	 * 项目地址
	 */
	PROJECT_URL = "https://ydt.xy12345.cn/edot/";
	//PROJECT_URL = "http://xytest.lingwww.com:8181/edot/";
	// PROJECT_URL = "http://localhost:8080/edot/";

	/**
	 * 附件下载的根路径
	 */
	DOWNLOAD_ROOT = "aigovApp";

	/**
	 * PC端上传路径
	 */
	UPLOAD_PATH = "upload";

	/**
	 * 附件下载的实际路径
	 */
	DOWNLOAD_PATH = "aigovApp/download";

	/**
	 * 图片路径
	 */
	IMG_PATH = "aigovApp/img";

	/**
	 * 版本更新路径
	 */
	VERSION_PATH = "version/";

	/**
	 * 版本更新信息文件名
	 */
	VESION_INFO_FILE = "version.json";

	//模块对外提供的公共方法
	var exportsMethods = {

		DOWNLOAD_URL: PROJECT_URL + "uploadApp.html",

		PROJECT_URL: PROJECT_URL,
		DOWNLOAD_ROOT: DOWNLOAD_ROOT,
		DOWNLOAD_PATH: DOWNLOAD_PATH,
		UPLOAD_PATH: UPLOAD_PATH,
		IMG_PATH: IMG_PATH,
		VERSION_PATH: VERSION_PATH,
		VESION_INFO_FILE: VESION_INFO_FILE,

		/**
		 * 登陆属性
		 */
		loginProperties: {

			/**
			 * 登陆动作的action地址
			 */
			ACTION_URL: PROJECT_URL + "system/user/login",
			ACTION_RE_URL: PROJECT_URL + "system/user/relogin"
		},
		indexProperties: {
		    // 二次进入测试接口， aiFiler.js 96行 处使用， 判断首屏加载。
		    ADVERY_URL:PROJECT_URL +"system/feature/selectDatas?id=02_00",
			CONFIG_URL: PROJECT_URL + "system/feature/selectDatasByZone?id=06_01,06_02",
			CONFIG_URL2: PROJECT_URL + "system/feature/selectDatas?id=05_05,05_06",
			// CONFIG_URL: "UserModule/module/index/config.json",
			// CONFIG_URL2: "UserModule/module/index/config2.json",
			NEWS_LIST_URL: "https://ydt.xy12345.cn/edot/api/news/getNews",
			NEWS_DETAIL_URL: "https://ydt.xy12345.cn/edot/api/news/getNewsById"

			//NEWS_LIST_URL: "UserModule/module/index/news.json",
			//NEWS_DETAIL_URL: "UserModule/module/index/news-detail.json"
		},
		/**
		 * 全部分类
		 */
		appAllProperties: {
			CONFIG_URL: PROJECT_URL + "system/feature/selectDatas?id=05_09"
			// CONFIG_URL: "UserModule/module/allapp/config.json"
		},
		/**
		 * 办件连接
		 */
		thingsProperties: {
			WORK_GUIDE_URL: PROJECT_URL + "work/guide/selectGuideInfo1",
			WORK_APPLY_URL: PROJECT_URL + "work/material/selectMaterialCfg1"
		},

		/**
		 * 用户认证
		 */
		authentification: {
			SAVE_URL: PROJECT_URL + "user/saveRealAuthen",
			GET_URL: PROJECT_URL + "user/getRealAuthen"
		},
		/**
			 * 服务常用参数
			 */
		serviceProperties: {
			//生活
			TYPE_LIVES_URL: PROJECT_URL + "system/feature/selectDatas?id=01_01,01_02,01_07,01_03,01_04,01_08",
			//TYPE_LIVES_URL:"UserModule/module/service/config_0.json",
			//个人办事
			TYPE_PERSONAL_URL: PROJECT_URL + "system/feature/selectWorkFeaturesByType?id=001_001,001_002,001_003&workCount=6",
			//法人办事
			TYPE_LAW_URL: PROJECT_URL + "system/feature/selectWorkFeaturesByType?id=002_001,002_002,002_003&workCount=6",
			//部门办画
			TYPE_DEPT_URL: PROJECT_URL + "system/feature/selectWorkFeaturesByDept?id=610400000000LL000,610400000000YB000,610400000000GA000&workCount=6",

			//办事首页
			TYPE_URL: PROJECT_URL + "/work/guide/selectGuides",
			//办事更多
			TYPE_MORE_URL: PROJECT_URL + "/work/guide/selectMoreGuides"

		},

		/**
		 * 预约常用参数
		 */
		reserveProperties: {
			/**
			 * 得到预约列表
			 */
			RESERVE_LIST_URL: PROJECT_URL + "wiseMedical/queryAppointDoctor",
			SEND_SMS_URL: PROJECT_URL + "user/pushMsg",
			REGISTHID_URL: PROJECT_URL + "wiseMedical/queryRegistHid",
			QUERYPATIENTLIST_URL: PROJECT_URL + "wiseMedical/queryPatientList",
			//QUERYPATIENTLIST_URL:"UserModule/module/reserve/reserveConfirm/config.json",
			SAVEORDER_URL: PROJECT_URL + "wiseMedical/saveOrder",
			QUERYFORALIPAY_URL: PROJECT_URL + "wiseMedical/queryForAlipay",
			//OPAPPOINT_URL:PROJECT_URL+"wiseMedical/opAppoint",
			//OPREGIST_URL:PROJECT_URL+"wiseMedical/opRegist"
			OPAPPOINT_URL: PROJECT_URL + "wiseMedical/appoint",
			SYS_DATE_TIME: PROJECT_URL + "/wiseMedical/getDateTime",
			OPREGIST_URL: PROJECT_URL + "wiseMedical/regist"

		},
		/**
		 * 自我诊断参数
		 */
		selfCheckProperties: {
			PART_URL: PROJECT_URL + "wiseMedical/queryBodyPartInfo",
			SYMPTOM_INFO_URL: PROJECT_URL + "wiseMedical/querySymptomInfo"
		},
		/**
		 * 得到关联症状
		 */
		relSymptomInfoProperties: {
			RELSYMPTOM_LIST_URL: PROJECT_URL + "wiseMedical/queryRelSymptomInfo"
		},
		/**
		 * 得到详细信息
		 */
		diseaseInfoProperties: {
			DISEASEINFO_LIST_URL: PROJECT_URL + "wiseMedical/queryDiseaseInfo"
		},
		/**
		 * 关注常用参数
		 */
		attentionProperties: {
			ATTENTION_USER_CANCEL_URL: PROJECT_URL + "wiseMedical/deleteAttentionInfo",
			ATTENTION_USER_OK_URL: PROJECT_URL + "wiseMedical/addAttentionDoctor"
		},


		/**
		 * 热线
		 */
		hotLine: {
			/**
			 * 保存热线
			 */
			HOT_LINE_SAVE: PROJECT_URL + "hotMail/saveHotMail",
			//    		HOT_LINE_SAVE:"UserModule/module/mayorMail/result.json",
			//    		FACT_SAVE:"UserModule/module/cityVoice/result.json",
			CITY_VOICE_LIST: PROJECT_URL + "cityVoice/list",
			CITY_VOICE_LIKE: PROJECT_URL + "cityVoice/like",
			CITY_VOICE_REPLY_LIST: PROJECT_URL + "cityVoice/listReply",
			FACT_SAVE: PROJECT_URL + "cityVoice/save",
			CITY_VOICE_REPLY_DEL: PROJECT_URL + "cityVoice/delReply",
			CITY_VOICE_REPLY_SAVE: PROJECT_URL + "cityVoice/save",
			CITY_VOICE_DEL: PROJECT_URL + "cityVoice/del",

			// 互动广告
			HOT_LINE_SLIDE: "UserModule/module/hotLine/config.json",

			// 城市 最美
			BEAUTIFUL_XIANYANG_LIST: PROJECT_URL + "cityVoice/mbList",
			BEAUTIFUL_XIANYANG_FACT_SAVE: PROJECT_URL + "cityVoice/mbSave",
			TOPIC_LIST: PROJECT_URL + "cityVoice/topicList",
			TOPIC_FACT_SAVE: PROJECT_URL + "cityVoice/topicSave"

		},

		/**
		 * 我的报告
		 */
		myReportProperties: {
			"QUERY_PATIENTS": PROJECT_URL + "wiseMedical/queryPatients",
			"MYREPORT_URL": PROJECT_URL + "wiseMedical/queryCheckListMaster",
			"MYREPORT_INFO_URL": PROJECT_URL + "wiseMedical/queryCheckListDetails",
			"EXAMMASTER_URL": PROJECT_URL + "wiseMedical/queryExamMaster"
		},

		/**
		 * 选择科室
		 */
		hospitalDeptByOfficeIdProperties: {
			"LIST_URL": PROJECT_URL + "wiseMedical/queryOfficesByMainOffice"
		},

		/**
		 * 办卡进度查询
		 */
		queryCardProperties: {
			//"URL":"UserModule/module/queryCard/result.json"
			"URL": PROJECT_URL + "card/queryCardProgressList"
		},

		/**
		 * 我的
		 */
		my: {
			MY_WORK_LIST: PROJECT_URL + "person/qryUserWorkGuide",
			MY_APPOINT_ORDER: PROJECT_URL + "person/queryAppointOrder",
			MY_RELATE_LIST: PROJECT_URL + "person/selectConsultList",
			MY_RELATE_DETAIL: PROJECT_URL + "person/getConsultDetail",
			//我的健康
			//诊疗记录
			MY_HEALTH_ZL: PROJECT_URL + "healthArchives/getOutpatientList",
			//诊疗记录详细-门诊
			MY_HEALTH_ZL_DETAIL_MZ: PROJECT_URL + "healthArchives/getOutpatientDetails",
			//诊疗记录详细-住院
			MY_HEALTH_ZL_DETAIL_ZY: PROJECT_URL + "healthArchives/getInpatientDetails",
			//健康体检
			MY_HEALTH_TJ: PROJECT_URL + "healthArchives/getHealexamList",
			//健康体检详细
			MY_HEALTH_TJ_DETAIL: PROJECT_URL + "healthArchives/getHealexamDetails",
			//预防接种
			MY_HEALTH_YM: PROJECT_URL + "healthArchives/getVaccList",
			//预防接种详细
			MY_HEALTH_YM_DETAIL: PROJECT_URL + "healthArchives/getVaccDetails",
			//血压
			MY_HEALTH_XY: PROJECT_URL + "healthArchives/getHyperList",
			//血压详细
			MY_HEALTH_XY_DETAIL: PROJECT_URL + "healthArchives/getHyperDetails",
			//血糖
			MY_HEALTH_XT: PROJECT_URL + "healthArchives/getDiabetesList",
			//血糖记录详细
			MY_HEALTH_XT_DETAIL: PROJECT_URL + "healthArchives/getDiabetesDetails",
			//传染病
			MY_HEALTH_CRB: PROJECT_URL + "healthArchives/getInfectList",
			//传染病详细
			MY_HEALTH_CRB_DETAIL: PROJECT_URL + "healthArchives/getInfectDetails",

			//预约挂号
			MY_HEALTH_ORDER: PROJECT_URL + "wiseMedical/queryOrder",
			//是否可以取消预约
			MY_HEALTH_ORDER_CAN_CANCEL: PROJECT_URL + "wiseMedical/queryPatsRegistStatus",
			//取消预约
			MY_HEALTH_ORDER_CANCEL_OPAPPOINT: PROJECT_URL + "wiseMedical/opAppoint",
			//支付宝退款
			MY_HEALTH_ORDER_CANCEL_ALIPAYREFUND: PROJECT_URL + "wiseMedical/queryAlipayRefund",
			//个人信息
			MY_HEALTH_MY_INFO: PROJECT_URL + "healthArchives/getBaseinfo",
			//我的关注
			MY_HEALTH_MY_NOTICE: PROJECT_URL + "wiseMedical/queryAttentionInfo",
			//我的关注-取消
			MY_HEALTH_MY_NOTICE_CANCEL: PROJECT_URL + "wiseMedical/deleteAttentionInfo",
			//我的关注-预约
			MY_HEALTH_MY_NOTICE_BOOK: PROJECT_URL + "wiseMedical/queryAttentionInfo",
			//我的信息
			MY_HEALTH_MY_MESSAGE: PROJECT_URL + "wiseMedical/queryOrder",
			//问卷调查
			MY_HEALTH_SAVE_QUESTIONNAIRE: PROJECT_URL + "wiseMedical/saveQuestionnaire"
			//问卷查询
			, MY_HEALTH_QUERY_QUESTIONNAIRE: PROJECT_URL + "wiseMedical/queryQuestionnaire"
		},

		/**
		 * 医院信息
		 */
		hospitalProperties: {
			"HOSPITAL_INFO_URL": PROJECT_URL + "wiseMedical/queryHospitalInfo",
			"HOSPITAL_LIST_URL": PROJECT_URL + "wiseMedical/queryHospital",
			"HOSPITAL_DEPT_LIST_URL": PROJECT_URL + "wiseMedical/queryAppointDept"
		}

		/**
	 * 资讯参数
	 */
		, news: {
			// 栏目导航接口地址
			NEWS_NAV_URL: PROJECT_URL + "news/info/selectNewsCatList",
			// 新闻列表接口地址
			NEWS_LIST_URL: PROJECT_URL + "news/info/selectInfoList",
			// 新闻详细接口地址
			NEWS_DETAIL_URL: PROJECT_URL + "news/info/getInfoDetail",
			// 栏目订阅接口地址
			NEWS_SUBSCRIBE_URL: PROJECT_URL + "news/info/setUserNewsCat",
		}

		/***************案例开始****************/

		/**
		* 事项参数
		*/
		, serivceListProperties: {
			//得到个人主题分类地址
			PERSONAL_CLASSIFY_URL: PROJECT_URL + "personalAction.action?fn=serviceClassify",
			//得到图片地址
			PERSONAL_CLASSIFY_IMG_URL: PROJECT_URL + "website/images/rightclass/",
			//得到企业主题分类地址
			LEGALPERSON_CLASSIFY_URL: PROJECT_URL + "legalpersonAction.action?fn=serviceClassify",
			//得面权力分类
			CATEGORY_URL: PROJECT_URL + "appServiceList.action?fn=getCategory",
			//根据权力分类得到权力事项
			SERVICEBYTYPE_URL: PROJECT_URL + "service.action?fn=getServiceByType"
		}

		/**
	 * 办事
	 */
		, work: {
			APPLY: PROJECT_URL + "work/apply"
		}
		/********************案例结束************************/


		, member: {
			// 查取就诊卡信息
			MEMBER_CARD_URL: PROJECT_URL + "wiseMedical/queryPatsCardInfo",
			// 新增就诊人信息
			MEMBER_ADD_URL: PROJECT_URL + "wiseMedical/addPatientInfo",
			// 就诊人信息变更
			MEMBER_MOD_URL: PROJECT_URL + "wiseMedical/changePatientInfo",
			// 删除就诊人信息
			MEMBER_DEL_URL: PROJECT_URL + "wiseMedical/deletePatient",
			// 就诊人列表查询
			MEMBER_LIST_URL: PROJECT_URL + "wiseMedical/queryPatients",
			// 就诊人详细信息查询
			MEMBER_DETAIL_URL: PROJECT_URL + "wiseMedical/queryPatientDetail",
		},

		healthcare: {
			// 健康关怀
			HEALTH_CARE_COUNT_URL: PROJECT_URL + "healthcare/count",
			HEALTH_CARE_URL: PROJECT_URL + "healthcare",
			HEALTH_CARE_READ_URL: PROJECT_URL + "healthcare/read"
		},

		/**
		 * 公交出行
		 */
		busProperties: {
			BUS_URL: "https://ydt.xy12345.cn/edot/api/bus/"
			//   BUS_URL : "UserModule/module/bus/bus.json"
		},
		busrealtime: {
			BUS_REALTIME_URL: "UserModule/module/busRealtime/busRealtime.json"
		},
		bussameroute: {
			BUS_SAMEROUTE_URL: "UserModule/module/busSameRoute/busSameRoute.json"
		},
		busnearstation: {
			BUS_NEAR_URL: "UserModule/module/busStationNear/busStationNear.json"
		},
		busStopListProperties: {
			REMAIN_PARK_URL: "https://ydt.xy12345.cn/edot/api/park/getRemainingParkingSpace",
		}
	};

	module.exports = exportsMethods;
});
