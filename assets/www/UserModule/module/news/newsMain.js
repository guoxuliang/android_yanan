/**
 */
; define(function (require, exports, module) {


	module.exports = {
		onCreate: function (winObj) {
			// $("#aigov-header-back-btn").hide();
			var url = aigovApp.constants.news.NEWS_NAV_URL;

			//得到用户id
			var userId;
			if (window.localStorage.account) {
				var account = $.parseJSON(window.localStorage.account);
				userId = account.user.userId;
			}

			var params = {
				userId: userId,
				dictId: 'news_cat'
			};

			aigovApp.utils.openLoading();
			//加载菜单
			aigovApp.ajax(url, params, function (d) {
				aigovApp.utils.closeLoading();
				if (d.code == '0') {
					var datas = new Array()
					// debugger;
					for (var i = 0; i < d.data.length; i++) {
						var data = new Object();
						data.name = d.data[i].value;
						data.content = "aiTabs.openContentByWinId('news',{'catId':'" + d.data[i].key + "','dictId':'news_cat'});";
						datas.push(data);
					}

					// console.log('========>',  JSON.stringify(datas));
					var tabsComponent = winObj.getComponent("taskHomeTabs");
					tabsComponent.init({
						datas: datas
					}, function () {
						$(".subscribe").click(function () {
							var param = {
								userId: userId,
								dictId: 'news_cat',
								id: "newsMain",
								win: winObj//将当前窗口对象传给子窗口
							};
							aigovApp.openAppWindow("newsSubscribe", param);
						});

					});
				}
			});
		},
		//退回事件
		onBack: function () {
			//刷新
			// if (intent && intent.id && intent.id === "newsMain") {
			// 	aigovApp.newsMain.opts.catId = "";
			// 	intent.win.reloadNav();//重新加载导航
			// } else 
			
			if (aigovApp.openVideoFlag) {
				aigovApp.newsMain.reloadNav();
				aigovApp.openVideoFlag = false;
			}
		}

	};
});
