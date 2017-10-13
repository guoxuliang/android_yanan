/*
 * 资讯列表
 */
define(function(require, exports, module){

	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	var appWindow;
	var aiAppAction=require("aiAppAction");

	module.exports = {
		onCreate : function(winObj){
			var _this=this;
			_this.appWindow=winObj;
			
			
			//得到模板
			var windowConfig = aigovApp.config.appWindows[winObj.id];
			var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";
			
		    var documentList = winObj.getComponent('newsDatalist');// html中定义
		   // this.intent=winObj.intent;
		    //this.module=winObj.intent.module;
		    var options = {
					datasUrl   : aigovApp.constants.news.NEWS_LIST_URL,
					pageCount  : 15,
					hasSearch  : false,// 不显示搜索框
					recordEvents : [{
						'type':'tap',
						'handle':_this.openFrom
					}],
					dataParam : winObj.intent
				};
		    
		    documentList._loadHtml(componentPath + 'template/newsList.html',function(tplHtml){
				options.recordTpl = tplHtml;
				documentList.init(options);
			});
		},
		//开打表单
		openFrom : function($record){
			var id=$record.data("id");
			var param={
				id:id
			}
			aigovApp.openAppWindow("newsDetail", param);
		},
	};

});