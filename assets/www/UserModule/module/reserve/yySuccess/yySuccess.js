/**
 * 重置密码
 * 
 * @author chenyp
 */
;
define(function(require, exports, module){

	var $ = jQuery;

	// 定义工具类
	var Reset = function(){
	};
	// 对象私有方法
	Reset.prototype = {

		init : function(winObj){

			var that = this;
			aigovApp.utils.closeLoading();
			var orderId = winObj.intent; // 订单编码
			var session = aigovApp.session.getSession();

			var params = {
			"userId" : session.user.userId,
			"orderId" : orderId
			};
			var url = aigovApp.constants.my.MY_HEALTH_ORDER; // 预约挂号订单查询
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(data){
				aigovApp.utils.closeLoading();
				if(data.code == "0") {
					var result = data.data[0];
					$('#phoneNo').html(session.user.phoneNo);
					$('#orderId').html(result.orderId);
					$('#patientName').html(result.patientName);
					$('#hospitalName').html(result.hospitalName);
					$('#doctorName').html(result.doctorName);
					$('#doctorLevel').html(result.doctorLevel);
					$('#orderFee').html(result.orderFee);
					$('#amPm').html(result.amPm);
					var paymentMode = "";
					if(result.orderFee == '0') {
						paymentMode = '无';
					} else {
						if(result.paymentMode == "0") {
							paymentMode = '支付宝';
						} else if(result.paymentMode == "1") {
							paymentMode = '银联';
						} else if(result.paymentMode == "2") {
							paymentMode = '微信支付';
						} else if(result.paymentMode == "3") {
							paymentMode = '预交金';
						} else if(result.paymentMode == "4") {
							paymentMode = '全民支付';
						} else if(result.paymentMode == "5") {
							paymentMode = '交行支付';
						} else if(result.paymentMode == "6") {
							paymentMode = '免挂号费';
						} else if(result.paymentMode == "7") {
							paymentMode = '现金';
						} else if(result.paymentMode == "8") {
							paymentMode = '小额支付';
						}
					}
					$('#paymentMode').html(paymentMode);
					var status = "";
					if(result.status == "1") {
						status = "成功";
					} else {
						status = '失败';
					}
					$('#status').html(status);
				} else {
					aigovApp.nativeFunc.alert(data.message);
				}
			});

			$('body').on('tap', '#successBtn, #myYyd', function(event){
				aigovApp.openAppWindow('myHealthy');
			});

		}

	};

	// 模块对外提供的方法
	var exportsMethods = {

	/**
	 * 登陆页面的初始化
	 * 
	 * @param {Object}
	 *            appWindow 传入的窗口对象
	 */
	onCreate : function(appWindow){
		this.loading();

		// 进行窗口初始化
		var reset = new Reset(appWindow);
		reset.init(appWindow);

	},
	// 加载事件
	loading : function(){

	}
	};

	module.exports = exportsMethods;

});
