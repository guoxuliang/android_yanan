/**
 * 可评价列表
 */
;
define(function(require, exports, module){

	var load = function(){
		Handlebars.registerHelper("dateDayFormat", function(date){
			return moment(date).format('YYYY-MM-DD');
		});

		$('.weui_navbar_item').click(function(event) {
			if (!$(this).hasClass("weui_bar_item_on")) {
				$('.weui_navbar_item').removeClass('class weui_bar_item_on')
				$(this).addClass('weui_bar_item_on')
				var item = $(this).data('item')
				$('.tab_content').each(function(index, el) {
					if ($(this).data('item') == item) {
						$(this).removeClass('hidden')
					}else{
						$(this).addClass('hidden')
					}
				});
			}
		});

		//未评价
		var paramsQuery = {
			certNo : aigovApp.session.getSession().user.idCardNo,
			evaluateStatus : ''
		};
		var url = PROJECT_URL+"wiseMedical/queryEvaluateList";
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, paramsQuery, function(d){
			aigovApp.utils.closeLoading();
			if(d.code == 0) {
				if(d.data != null && d.data.length > 0) {
					var tpl = $("#tpl").html();
					var template = Handlebars.compile(tpl);
					var html = template(d);
					$('#info').html(html);
				} else {
					$('#info').css('text-align', 'center');
					$('#info').css('padding-top', '10px');
					$('#info').html('您还未有诊疗后未评价记录');
				}
			} else {
				aigovApp.nativeFunc.alert("请求失败！");
			}
		}, {
			"async" : false
		});

		//已评价
		var paramsQuery = {
			userId:aigovApp.session.getSession().user.userId,
			paitentCertNo : aigovApp.session.getSession().user.idCardNo,
			status : '1'
		};
		var url = PROJECT_URL+"wiseMedical/queryQuestionnaire";
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, paramsQuery, function(d){
			aigovApp.utils.closeLoading();
			if(d.code == 0) {
				if(d.data != null && d.data.length > 0) {
					var tpl = $("#tpl2").html();
					var template = Handlebars.compile(tpl);
					var html = template(d);
					$('#info2').html(html);
				} else {
					$('#info2').css('text-align', 'center');
					$('#info2').css('padding-top', '10px');
					$('#info2').html('您还未有诊疗后已评价记录');
				}
			} else {
				aigovApp.nativeFunc.alert("请求失败！");
			}
		}, {
			"async" : false
		});

	}

	var bindEvent = function(){
		$('.remark').click(function(){
			var _this = $(this);
			var orderId = _this.attr("data_orderid");
			//var doctorCode = _this.attr("data_doctorcode");
			var doctorName = _this.attr("data_doctorname");
			var officeCode = _this.attr("data_officecode");
			var officeName = _this.attr("data_officename");
			var hospitalCode = _this.attr("data_hospitalcode");
			var hospitalName = _this.attr("data_hospitalname");
			var patientName = _this.attr("data_patientname");
			var treatmentTime = _this.attr("data_treatmenttime");
			//var amPm = _this.attr("data_ampm");
			var evaluateStatus = _this.attr("data_evaluateStatus");
			var orderTime = _this.attr("data_orderTime");
			var params = {
				orderId : orderId,
				//doctorCode : doctorCode,
				doctorName : doctorName,
				officeCode : officeCode,
				officeName : officeName,
				hospitalCode : hospitalCode,
				hospitalName : hospitalName,
				patientName : patientName,
				treatmentTime : treatmentTime,
				//amPm : amPm,
				evaluateStatus: evaluateStatus,
				orderTime: orderTime
			}
			aigovApp.openAppWindow('myHealthy-doctor', params);
		});
	}

	module.exports = {

		onCreate : function(){
			load();
			bindEvent();
		},

		onBack : function(){
			load();
			bindEvent();
		}

	};
});
