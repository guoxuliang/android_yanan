/**
 * 重置密码
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var Reset = function(){};
	//对象私有方法
	Reset.prototype = {

		init:function(winObj){

            var that =this;
            aigovApp.utils.closeLoading();
            var params = winObj.intent;
            var session = $.parseJSON(window.localStorage.account);
            $('#phoneNo').html(session.user.phoneNo);
            $('#orderId').html(params.orderId);
            $('#patientName').html(params.patientName);
            $('#hospitalName').html(params.hospitalName);
            $('#doctorName').html(params.doctorName);
            $('#doctorLevel').html(params.doctorLevel);
            $('#orderFee').html(params.orderFee);
            $('#amPm').html(params.amPm);
            var paymentMode = "";
            if(params.orderFee == '0'){
            	paymentMode = '无';
            } else {
            	if (params.paymentMode == "0") {
                    paymentMode = '支付宝';
                }else if(params.paymentMode == "1"){
                    paymentMode = '银联';
                }else if(params.paymentMode == "2"){
                    paymentMode = '微信支付';
                }else if(params.paymentMode == "3"){
                    paymentMode = '预交金';
                }else if(params.paymentMode == "4"){
                    paymentMode = '全民支付';
                }else if(params.paymentMode == "5"){
                    paymentMode = '交行支付';
                }else if(params.paymentMode == "6"){
                    paymentMode = '免挂号费';
                }else if(params.paymentMode == "7"){
                    paymentMode = '现金';
                }else if(params.paymentMode == "8"){
                    paymentMode = '小额支付';
                }
            }
            $('#paymentMode').html(paymentMode);
            var status = "";
            if(params.status == "1"){
                status = "成功";
            } else {
                status = '失败';
            }
            $('#status').html(status);

            $('body').on('tap', '#successBtn, #myHealthy', function(event) {
                aigovApp.openAppWindow('myHealthy');
            });

		}

	};

	//模块对外提供的方法
	var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loading();

            //进行窗口初始化
            var reset = new Reset(appWindow);
            reset.init(appWindow);

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
