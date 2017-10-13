/*
 * 申报
 */
define(function(require, exports, module){

	$.fn.removeImg = function (a, index) {
		$(a).parent().remove();
		delete module.exports.fileObj[index];
	};
	
	// ajax模块，用来处理ajax请求
	var ajax = require("ajax");

	var appWindow;

	var load = function(){
		// var url = "UserModule/module/service/sqcl.json";
		var code = appWindow.intent.code;
		var url = PROJECT_URL + "work/material/selectMaterialCfg1.do?workCode=" + code;
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, null, function(d){
			aigovApp.utils.closeLoading();
					if(!d.data) {
						var param = {
						"icon" : "weui_icon_warn",
						"title" : "暂无内容",
						"desc" : "无法获取到相关内容，请稍后再重新尝试",
						"btnPrimaryName" : "确定",
						"btnDefaultName" : "",
						"btnPrimaryUrl" : 'aigovApp.back();',
						"btnDefaultUrl" : "",

						};
						aigovApp.openAppWindow("resultPage", param);
						return;
					}

					var tpl = $("#tpl").html();
					var template = Handlebars.compile(tpl);
					var html = template(d.data);
					$('.ai-body-box').append(html);
					
					var session = $.parseJSON(window.localStorage.account);
					
					if(session.user.phoneNo) $("#netcaseapplicantmobile").val(session.user.phoneNo);
					if(session.user.idCardNo) $("#netcaseapplicantpapercode").val(session.user.idCardNo);
					if(session.user.realName) $("#netcaseapplicant").val(session.user.realName);
					//测试用
					if(false){
						$("#netcaseapplicant").val("宋某某");
						$("#netcaseapplicantpapercode").val("35223776311029004X");
						$("#netcaseapplicantphone").val("05912829267");
						$("#netcaseapplicantaddress").val("咸阳市某地");
						$("#netcaseapplicantzipcode").val("712000");
						$("#netcaseapplicantemail").val("243134@qq.com");
					}
					/*
					 * $("body").on('change', 'input:file', function(e) { var ul =
					 * $(this).parent().prev(); lrz(this.files[0], { width:1024,
					 * height:768, quality:0.5 }) .then(function (rst) {
					 * ul.append('<li class="weui_uploader_file" style="background-image: url('+rst.base64+')"><input
					 * type="hidden" name="uploader_file"
					 * value="'+rst.base64+'"></li>'); }); });
					 */

					$("input:file").change( function() {
						var file = this.files[0];
						if(typeof file.type != "undefined" && file.type.length > 6 && file.type.substring(0, 6) == "image/"){
							var ul = $(this).parent().prev();
							var mateno = $(this).parent().attr("mateno");
							module.exports.fileObj[module.exports.index] = {mateno:mateno};
							
							var freader = new FileReader();
							freader.readAsDataURL(file);
							
							aigovApp.utils.openLoading();
							freader.onload = function(e){
								aigovApp.utils.closeLoading();
								var base64 = this.result;
								ul.append('<li class="weui_uploader_file" style="background-image: url('+base64+')"><a href="javascript:void(0);" onclick="$(this).removeImg(this, '+module.exports.index+')">X</a></li>');
								
								module.exports.fileObj[module.exports.index].file64 = base64;
								module.exports.index++;
							}
						} else {
							aigovApp.nativeFunc.alert("上传文件只能选择图片！");
						}
					});

					$('#workApply').click(function(e){
						if($('#netcaseapplicant').val() == ''){
							aigovApp.nativeFunc.alert("'个人/企业名称'不能为空！");
							return false;
						}
						if($('#netcaseapplicantpapercode').val() == ''){
							aigovApp.nativeFunc.alert("'证件号码'不能为空！");
							return false;
						}
						if($('#netcaseapplicantmobile').val() == ''){
							aigovApp.nativeFunc.alert("'手机号码'不能为空！");
							return false;
						}
						aigovApp.utils.openLoading();
						var session = $.parseJSON(window.localStorage.account);
						var params ={
//							servno:$("#servno").val(),
//							loginName:session.user.phoneNo,
//							netcaseapplicant:$("#netcaseapplicant").val(),
//							netcaseapplicanttype:$("#netcaseapplicanttype").val(),
//							netcaseapplicantpapertype:$("#netcaseapplicantpapertype").val(),
//							netcaseapplicantpapercode:$("#netcaseapplicantpapercode").val(),
//							netcaseapplicantphone:$("#netcaseapplicantphone").val(),
//							netcaseapplicantmobile:$("#netcaseapplicantmobile").val(),
//							netcaseapplicantaddress:$("#netcaseapplicantaddress").val(),
//							netcaseapplicantzipcode:$("#netcaseapplicantzipcode").val(),
//							netcaseapplicantemail:$("#netcaseapplicantemail").val(),
							files:JSON.stringify(module.exports.fileObj)
						};
						for(key in params){
							//alert(key+"="+params[key].substring(0,200));
						}
						//alert("文件个数："+module.exports.fileObj.length);
						
						var url=aigovApp.constants.work.APPLY;
						aigovApp.ajaxForm("saveForm", url, params, function(data){
							aigovApp.utils.closeLoading();
							if(data.code==0){
								var param = {
									"icon" : "weui_icon_success",
									"title" : "操作成功",
									"desc" : "申请提交成功，请到[我的办事]中查看办事详情",
									"btnPrimaryName" : "确定",
									"btnDefaultName" : "",
									"btnPrimaryUrl" : 'aigovApp.back();',
									"btnDefaultUrl" : "aiMenu.openModule('things')",
									};
									aigovApp.openAppWindow("resultPage", param);
							}else{
								aigovApp.nativeFunc.alert("申请失败，失败原因："+data.message);	
							}
						});
					});
				});

	}

	module.exports = {
		fileObj : [],
		index : 0,
		onCreate : function(winObj){ // 对外提供onCreate方法
			appWindow = winObj;
			load();
			this.fileObj = [];
			this.index = 0;
		}
	};

});
