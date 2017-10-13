/**
 * 我的关注
 */
;
define(function(require, exports, module){

	var submit = function(){

	};

	var validate = function(){

	}
	var account = null;

	var load = function(op){

		Handlebars.registerHelper("dateDayFormat", function(date){
			return moment(date).format('YYYY-MM-DD');
		});

		Handlebars.registerHelper("nameHidden", function(name){
			if(name == null || name == undefined || name == '') {
				return '';
			}
			var newName = '';
			if(name.length == 1) {
				newName = name + '医生';
			} else if(name.length == 2) {
				newName = name.substring(0, 1) + '*医生';
			} else {
				newName = name.substring(0, 1) + '**医生';
			}
			return newName;
		});

		account = $.parseJSON(window.localStorage.account);

		var paramsQuery = {
			userId : account.user.userId
		};

		var url = aigovApp.constants.my.MY_HEALTH_MY_NOTICE;
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, paramsQuery, function(d){
			aigovApp.utils.closeLoading();
			if(d.code == 0) {
				if(d.data != null && d.data.length > 0) {
					var tpl = $("#tpl").html();
					var template = Handlebars.compile(tpl);

					var html = template(d);
					$('#info').append(html);

					bindEvent();
				} else {
					$('#info').css('text-align', 'center');
					$('#info').css('padding-top', '10px');
					$('#info').html('您还未有关注的医生');
				}
			} else {
				aigovApp.nativeFunc.alert("请求失败！");
			}
		});
	}

	var bindEvent = function(){
		$('.cancel').click(function(){
			var me = $(this);
			var id = me.data('id');
			var paramsQuery = {
				attentionId : id
			};

			var url = aigovApp.constants.my.MY_HEALTH_MY_NOTICE_CANCEL;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, paramsQuery, function(d){
				aigovApp.utils.closeLoading();
				if(d.code == 0) {
					aigovApp.nativeFunc.alert("取消成功！");
					me.closest('.notice_div').remove();
				} else {
					aigovApp.nativeFunc.alert("请求失败！");
				}
			});
		})

		$('.book').click(function(){
			var me = $(this);
			/*
			 * data-hospital-code = "{{hospitalCode}}" data-dept-code =
			 * "{{officeCode}}" data-dept-name = "{{officeName}}"
			 * data-hospital-name = "{{hospitalName}}" data-doctor-name =
			 * "{{doctorName}}" data-doctor-code = "{{doctorCode}}"
			 * data-mark-type = "{{markType}}"
			 */
			var hospitalCode = me.data('hospital-code');
			var deptCode = me.data('dept-code');
			var deptName = me.data('dept-name');
			var hospitalName = me.data('hospital-name');
			var doctor_Name = me.data('doctor-name');
			var doctor_Code = me.data('doctor-code');
			var mark_Type = me.data('mark-type');
			var hospitalId = me.data('hospital-id');
			var doctorId = me.data('doctor-id');
			var am_Pm = '';
			var hb_Date = '';

			var param = {
			hospitalCode : hospitalCode,
			deptCode : deptCode,
			deptName : deptName,
			hospitalName : hospitalName,
			hospitalId : hospitalId,
			doctor_Name : doctor_Name,
			doctor_Code : doctor_Code,
			doctorId : doctorId
			}
			// console.log(param);
			aigovApp.openAppWindow("reserveList", param);
		})
	}

	module.exports = {
	onCreate : function(winObj){
		load(winObj.intent);
	},
	// 退回事件
	onBack : function(){
		// 刷新
		// this.appWindow.getComponent('serviceDatalist').refresh();
	}

	};
});