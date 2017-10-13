/**
 * 我的评价
 */
;
define(function(require, exports, module){

	var load = function(){
		Handlebars.registerHelper("dateDayFormat", function(date){
			return moment(date).format('YYYY-MM-DD');
		});

		var paramsQuery = {
			userId : aigovApp.session.getSession().user.userId,
			//evaluateStatus : "wait_evaluate",
			visitStauts : 2
		};
		var url = aigovApp.constants.my.MY_HEALTH_MY_MESSAGE;
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
					$('#info').html('您还未有诊疗记录，请继续保持良好的生活习惯');
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
			var doctorCode = _this.attr("data_doctorcode");
			var doctorName = _this.attr("data_doctorname");
			var officeCode = _this.attr("data_officecode");
			var officeName = _this.attr("data_officename");
			var hospitalCode = _this.attr("data_hospitalcode");
			var hospitalName = _this.attr("data_hospitalname");
			var patientName = _this.attr("data_patientname");
			var treatmentTime = _this.attr("data_treatmenttime");
			var amPm = _this.attr("data_ampm");
			var evaluateStatus = _this.attr("data_evaluateStatus");
			var orderTime = _this.attr("data_orderTime");
			var params = {
				orderId : orderId,
				doctorCode : doctorCode,
				doctorName : doctorName,
				officeCode : officeCode,
				officeName : officeName,
				hospitalCode : hospitalCode,
				hospitalName : hospitalName,
				patientName : patientName,
				treatmentTime : treatmentTime,
				amPm : amPm,
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