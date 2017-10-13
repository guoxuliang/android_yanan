/*
 * 办事全部
 */
define(function(require, exports, module){

	var appWindow;
	var aiAppAction=require("aiAppAction");
	//所有模板
	var Template={
		app:""
	}
	
	var load = function(){
		var url=aigovApp.constants.serviceProperties.TYPE_MORE_URL;
		var t = appWindow.intent[0].id;		
		
		var param = {
			type : appWindow.intent[1].type,
			code : appWindow.intent[0].id,
			pageIndex: 1,
			pageSize: 100
		}
		
    	aigovApp.utils.openLoading();
    	aigovApp.ajax(url, param, function(d){    		
    		aigovApp.utils.closeLoading();    		
    		var tpl   =  $("#tpl").html();
			var template = Handlebars.compile(tpl);
			var html = template(d.data.results);
			$(".ai-body-box").append(html);
			
			aiAppAction.bindAction(".ai-service-app-grid");			
    	});
	}


	module.exports = {
		onCreate: function(winObj){ // 对外提供onCreate方法
			appWindow = winObj;
			load();
		}
	};



});
