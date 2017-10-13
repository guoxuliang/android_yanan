/*
 * 咨询
 */
define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");

	var appWindow;
	var i = 1;
	var load = function(){
		var tpl   =  $("#tpl").html();
		var template = Handlebars.compile(tpl);
		var html = template(null);
		$('.ai-body-box').append(html);
		
		$('#showTooltips').click(function() {
			var hotMailTitle = $("#thingsHelp_title").val();
			if(hotMailTitle.length == 0){
				aigovApp.nativeFunc.alert("请输入咨询标题");
				return;
			}
			var hotMailContent = $("#thingsHelp_content").val();
			if(hotMailContent.length == 0){
				aigovApp.nativeFunc.alert("请输入内容");
				return;
			}
			var url = PROJECT_URL + "person/saveWorkConsult";
	        aigovApp.utils.openLoading();
	        //alert(appWindow.intent.deptCode+":"+appWindow.intent.deptName);return;
			var params = {
				"hotMailAim" : appWindow.intent.hotMailAim,
				"deptCode" : appWindow.intent.deptCode,
				"deptName" : appWindow.intent.deptName,
				"hotMailTitle" : hotMailTitle,
				"hotMailContent" : hotMailContent
			};
			aigovApp.ajax(url, params, function(data){
				aigovApp.utils.closeLoading();
				if(data.code == "0"){
					var paramInfo = {
						"icon": "weui_icon_success",
						"title": "发送成功",
						"desc": "您的信件已经提交，我们会立即给您回复，您可以在 [我的沟通] 中查看回复信息",
						"btnPrimaryName" : "确定",
						"btnDefaultName" : "",
						"btnPrimaryUrl" : 'aigovApp.back();',
						"btnDefaultUrl" : ""
					};
					aigovApp.openAppWindow("resultPage", paramInfo);
				}else{
					aigovApp.nativeFunc.alert("保存失败！");
				}
			});
		});
	}
	
	module.exports = {
		onCreate: function(winObj){ // 对外提供onCreate方法
			appWindow = winObj;
			load();
		}
	};
	
});
