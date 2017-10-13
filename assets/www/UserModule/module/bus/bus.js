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

		    var documentList = winObj.getComponent('busDatalist');
		    this.intent=winObj.intent;
		    this.module=winObj.intent.module;
		    var options = {
					// datasUrl   : aigovApp.constants.bus.BUS_URL,
					datasUrl: aigovApp.constants.busProperties.BUS_URL+"getAllBusLineName",
					pageCount  : 15,
					hasSearch  : true,
					recordEvents : [{
						'type':'tap',
						'handle':_this.openFrom
					}]
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
		//开打表单
		openFrom : function($record){
			var lineName=$record.attr("lineName");
			var busName=$record.attr("busName");
			var startStation=$record.attr("startStation");
			var endStation = $record.attr("endStation");
			var param={
                	lineName:lineName,
                	startStation:startStation,
                	endStation:endStation,
				    direction:0
			}
//			aigvApp.openAppWindow(module.exports.module,param,true);
			aigovApp.openAppWindow(module.exports.module,param,true);
		},
		
	};
});
