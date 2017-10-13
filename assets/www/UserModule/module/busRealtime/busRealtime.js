/**
 * 事项列表
 */
;define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	var aiMenu=require("aiMenu");
	
	module.exports = {
		onCreate : function(winObj){
            appWindow = winObj;
			//初始化按钮组件
			var buttonList = appWindow.getComponent('buttonlist');
            var that = this;
            var search_intent = buttonList.appWindow.intent;
			getBusInfoButton(buttonList,search_intent);
		},
	};
	
	
	function getBusInfoButton(buttonList,search_intent) {
		 aigovApp.ajax("UserModule/module/busRealtime/menubutton.json",null,function(datas){
			 for (var index = 0; index < datas.length; index++) {
			 	datas[index].content = datas[index].content+"'"+search_intent.lineName+"')";
			 }
			 buttonList.init({datas:datas},function(){
		          //初始化完成后默认选择第三个菜单项
		          buttonList.getButtonList()[2].$dom.trigger('tap');
		      });
		    },{type:"get"});
	}
	
});
