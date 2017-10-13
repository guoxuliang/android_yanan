/**
 * 事项列表
 */
;define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	var aiMenu=require("aiMenu");
	
	var dataParam=null;
	
	module.exports = {
		onCreate : function(winObj){
            appWindow = winObj;
			//初始化按钮组件
			var buttonList = appWindow.getComponent('buttonlist');
            var that = this;
			getTabMenu();
			getParkInfo();
		},
	};
	
	function getTabMenu() {
		aigovApp.ajax("UserModule/module/busStop/tabMenu.json",null,function(data){
			var template_html = $('#tab-menu-template').html();
			var template = Handlebars.compile(template_html);
			var result_html = template(data);
			$('#aigov-tab-menu').html(result_html);
		});
	}
	
/* 	function getParkInfo() {
		aigovApp.ajax("UserModule/module/busStop/parkInfo.json",null,function(data){
			var template_html = $('#park-list-template').html();
			var template = Handlebars.compile(template_html);
			var result_html = template(data);
			$('#aigov-stop-list').html(result_html);
		});
	} */

	function getParkInfo() {
		aigovApp.ajax(aigovApp.constants.busStopListProperties.REMAIN_PARK_URL,null,function(data){
//		aigovApp.ajax("UserModule/module/busStop/test.json",null,function(data){
			console.info(data.data);
			var template_html = $('#park-list-template').html();
			var template = Handlebars.compile(template_html);
			var result_html = template(data.data);
			$('#aigov-stop-list').html(result_html);
		});
	}
	
	
});
