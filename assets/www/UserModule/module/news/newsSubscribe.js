/*
 * 资讯订阅
 */
define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	var appWindow;
	var parentWin;
	
	// 获取全部栏目
	var navLoad = function(o){
		
		aigovApp.utils.openLoading();	
		var that = o;
		var url = aigovApp.constants.news.NEWS_NAV_URL;
		var params = {
			dictId : that.opts.dictId
		};
		
		aigovApp.ajax(url, params, function(d){
			
			var tpl = $("#tpl1").html();
			var template = Handlebars.compile(tpl);
			var html = template(d);
			$('#sortable1').append(html);
			
			// 遍历全部栏目过滤用户已订阅的栏目
			$('#sortable2 li').each(function() {
				var id = $(this).data('id');
				$('#sortable1 li').each(function() {
					if($(this).data('id') == id){
						$(this).remove();
					}
				})
			})
			
			var foo = document.getElementById("sortable1");
			Sortable.create(foo, { group: "omega" });
			
			aigovApp.utils.closeLoading();
		});
	}
	
	// 获取用户订阅栏目
	var userNavLoad = function(o){
		
		aigovApp.utils.openLoading();	
		
		var that = o;
		var url = aigovApp.constants.news.NEWS_NAV_URL;
		var params = {
			userId : that.opts.userId,
			dictId : that.opts.dictId
		};
		
		aigovApp.ajax(url, params, function(d){
			
			aigovApp.utils.closeLoading();
			
			var tpl = $("#tpl2").html();
			var template = Handlebars.compile(tpl);
			var html = template(d);
			$('#sortable2').append(html);
			
			var bar = document.getElementById("sortable2");
			Sortable.create(bar, { group: "omega" });
			
			navLoad(that);
		});
	}
	
	var submit = function(o){
		$('#showTooltips').click(function(){
			var account = $.parseJSON(window.localStorage.account);
			var catIds = '';
			$('#sortable2 li').each(function() {
				catIds += $(this).data("id")+",";
			})
			var url=aigovApp.constants.news.NEWS_SUBSCRIBE_URL;
			var params = {
				userId: account.user.userId,
				dictId : o.opts.dictId,
				catIds: catIds.substr(0, catIds.length-1)
			}
	    	aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(data){
				aigovApp.utils.closeLoading();
				if(data.code==0){
					aigovApp.nativeFunc.alert("保存成功！");
					var params2 = {
						id : "newsMain",
						win: parentWin//将父窗口对象传给mainPage
					}
					aigovApp.back(params2);
				}else{
					aigovApp.nativeFunc.alert("保存失败！");	
				}
			});
		})
	}
	
	var NewsSubscribe = function(opts){
		parentWin = opts.win;
		var userId;
		if(window.localStorage.account){
			var account = $.parseJSON(window.localStorage.account);
			userId = account.user.userId;
		}
		this.opts = {
			userId : userId,
			dictId : opts.dictId
		}
	}
	
	NewsSubscribe.prototype.load = function(){	
		userNavLoad(this);	
		submit(this);
	}
	
	
	
	module.exports = {
		onCreate: function(winObj){ // 对外提供onCreate方法
			appWindow = winObj;
			
			var dictId = winObj.intent.dictId;
			var obj = winObj.getComponent('header');
			if(dictId == "news_cat"){
				obj.setTitle("资讯订阅");
			} else if(dictId == "invest_cat"){
				obj.setTitle("投资订阅");
			} else if(dictId == "tour_cat"){
				obj.setTitle("旅游订阅");
			}
			
			var ns = new NewsSubscribe(winObj.intent);
			ns.load();
		}
	};

	
	
});
