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
            debugger;
		    var documentList = winObj.getComponent('hospitallDatalist');
		    this.intent=winObj.intent;
		    this.module=winObj.intent.module;
		    var options = {
					datasUrl   : aigovApp.constants.hospitalProperties.HOSPITAL_LIST_URL,
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
			var hospitalId=$record.attr("hospitalId");
			var hospitalName=$record.attr("hospitalName");
			var hospitalCode=$record.attr("hospitalCode");
			var param={
					hospitalId:hospitalId,
					hospitalName:hospitalName,
					hospitalCode:hospitalCode,
					module:module.exports.intent.module2
			}
			aigovApp.openAppWindow(module.exports.module,param,true);
		},
		
	};
});
