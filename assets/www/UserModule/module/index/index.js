/**
 * 主界面的js
 * @author keyz@asiainfo.com
 */
;
define(function (require, exports, module) {

	var aiAppAction = require("aiAppAction");

	//所有模板
	var Template = {
		indexHead: "{{@child}}<div class='swiper-slide' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><img alt='{{=_val.name}}' src='{{=_val.icon}}' /></div>{{/@child}}",
		app1: "{{@child}}<a href='javascript:;' class='ai-index-h-app' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}' ><div class='ai-index-h-a-img'><img src='{{=_val.icon}}'></div><p class='ai-index-h-a-t'>{{=_val.name}}</p></a>{{/@child}}",
		app2: "{{@child}}<a href='javascript:;' class='ai-index-app-grid' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><div class='ai-index-icon'><img src='{{=_val.icon}}'></div><div class='ai-index-txt'>{{=_val.name}}</div></a>{{/@child}}<a href='javascript:;' class='ai-index-app-grid' data_type='1' data_content='allapp' data_param='' data_name='更多服务'><div class='ai-index-icon'><img src='UserModule/module/index/style/images/app_more.png'></div><div class='ai-index-txt'>更多服务</div></a>",
		news: "{{@data}}<a href='javascript:;' class='inner hot-news' data_content='newsMain' content='aiMenu.openModule('newsMain')'><div class='hot-news-hd'><img class='icon' src='UserModule/module/index/style/images/icon_zixun.png' alt=''></div><div class='hot-news-bd'>{{=_val.title}}</div><div class='hot-news-ft'><i class='icon icon-left-arrows'></i></div></a>{{/@data}}"
	}
	//模块对外提供的方法
	var exportsMethods = {

		/**
		 *登陆页面的初始化
		 * @param {Object} appWindow  传入的窗口对象
		 */
		onCreate: function (appWindow) {
			var isConnection = aigovApp.nativeFunc.checkConnection();
			var width = $("body").width();
			var h = width * 0.183;
			$("#J-ai-index-m").height(h);
			// h=width*0.724;
			// $("#J-ai-index-swiper").height(h);
			if (isConnection) {
				var _this = this;
				//				window.plugins.PositionPlugin.getCurrentPosition(function(data){
				//					_this.loading(aigovApp.constants.indexProperties.CONFIG_URL, data.District);
				//				},function(data){
				//					_this.loading(aigovApp.constants.indexProperties.CONFIG_URL,"");
				//				});
				//				_this.loading(aigovApp.constants.indexProperties.CONFIG_URL2);

				// 广告
				_this.loadingSwiper(aigovApp.constants.indexProperties.CONFIG_URL)

				// 分类导航
				_this.loading(aigovApp.constants.indexProperties.CONFIG_URL2);

				// 调用新闻
				_this.newsLoading();
			} else {
				$("#error_info").show();
			}

		},

		loadingSwiper: function (url) {
			var that = this;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, {}, function (data) {
				aigovApp.utils.closeLoading();

				$.each(data.data, function (i, o) {
					if (o.id == '06_01') {
						var result = new t(Template.indexHead).render(o);
						$("#J-ai-index-head-c").html(result);
						new Swiper('#J-ai-index-swiper', {
							pagination: '.swiper-pagination',
							paginationClickable: true
						});
					}
				});
				aiAppAction.bindAction(".swiper-slide", "click");
			});

		},
		//加载事件
		loading: function (url) {

			var that = this;
			Handlebars.registerHelper("dateDayFormat", function (date) {
				return moment(date).format('YYYY-MM-DD');
			});

			aigovApp.ajax(url, {}, function (data) {
				$("#J-ai-index-box").show();
				$.each(data.data, function (i, o) {
					if (o.id == '05_05') {
						var result = new t(Template.app1).render(o);
						$("#ai-index-h-grids").html(result);
					} else if (o.id == '05_06') {
						var result = new t(Template.app2).render(o);
						$("#ai-index-app-grids").html(result);
					}
				});


				$("#my_nav").on("click", function () {
					var _this = $(this);
					var windowContent = _this.attr("data_content");
					aigovApp.openAppWindow(windowContent, null);
				});

				$("#allapp").on("click", function () {
					var _this = $(this);
					var windowContent = _this.attr("data_content");
					aigovApp.openAppWindow(windowContent, null);
				});

				$("#J-ai-index-cat").on("tap", ".more", function (e) {
					e.preventDefault();
					aigovApp.openAppWindow("allapp", null);
				});

				$("#q").on("tap", function () {
					var q = $(this).val();
					that.jumpWeb(q);
				});

				aiAppAction.bindAction(".ai-index-h-app");
				aiAppAction.bindAction(".ai-index-app-grid");


			});

		},

		/**
		 * 热门新闻
		 */
		newsLoading: function () {
			// 新闻列表页
			aigovApp.ajax(aigovApp.constants.indexProperties.NEWS_LIST_URL, {
				start: 0,
				length: 8
			}, function (data) {
				var tpl = $("#newslisttpl").html();
				var template = Handlebars.compile(tpl);
				var html = template(data);
				$('#J-ai-index-news-list').html(html);

				aiAppAction.bindAction(".link");
			});

			// 内容页
			aigovApp.ajax(aigovApp.constants.news.NEWS_LIST_URL, {
				catId: "10011",
				curPageNum: 0,
				pageCount: 1,
				dictId: "news_cat",
				isShowThumb: false
			}, function (data) {
				var result = new t(Template.news).render(data);
				$("#J-ai-index-hot-news").html(result);

				$(".hot-news").on("tap", function () {
					var _this = $(this);
					var windowContent = _this.attr("data_content");
					aigovApp.openAppWindow(windowContent, null);
				});

			});

		},

		//搜索跳转
		jumpWeb: function (_val) {
			if (!_val) _val = '文化旅游节';
			aigovApp.openAppWindow('openUrl2', {
				'url': 'https://m.baidu.com/s?word=' + _val,
				'title': '智能搜索'
			});
		}

	};

	module.exports = exportsMethods;

});