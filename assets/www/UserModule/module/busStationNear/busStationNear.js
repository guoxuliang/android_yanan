/**
 * 事项列表
 */
;define(function(require, exports, module){

	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");

	var dataParam=null;

	module.exports = {
		appWindow:null,
		module:null,
		intent:null,
		onCreate : function(winObj){
			var _this=this;
			_this.appWindow=winObj;

			//得到模板
			var windowConfig = aigovApp.config.appWindows[winObj.id];
			var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";

		    var documentList = winObj.getComponent('busNearStationDatalist');
		    var options = {
					datasUrl   : aigovApp.constants.busnearstation.BUS_NEAR_URL,
//					datasUrl   : aigovApp.constants.busProperties.BUS_URL+"getBusLineInfoByStation?stationName="+winObj.intent,
					pageCount  : 15,
					hasSearch  : false
				};

		    documentList._loadHtml(componentPath + 'template/default.html',function(tplHtml){
				options.recordTpl = tplHtml;
				documentList.init(options);
			});
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        },

	};
});
