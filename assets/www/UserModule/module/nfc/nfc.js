/**
 * NFC充值
 */
;define(function(require, exports, module){
	
	var $ = jQuery;

	var cardNo, chipSerial, cardSerial, tranAmount;
	
	var orderFee = 10;// 默认值10元
	
	var NFC = function(){};
	
	NFC.prototype = {

		init:function(){
			var that = this;
			
			var url = PROJECT_URL + "recharge/ValidateCard";
			var params = {
				"cardNo" : cardNo,
				"chipSerial" : chipSerial
			}
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(d){
				aigovApp.utils.closeLoading();
				if(d.code == 0){
					if(d.data != null){
						if(d.data.resultCode == "0"){
				            $("#cardNo").val(cardNo);
				            $("#tranAmount").val(tranAmount / 100);// 分转元
				            
				            $(".nfc>ul>li>a").on("tap", function(){
				            	var me = $(this);
				                
				                $(".nfc>ul>li>a").removeClass("current");
				                me.addClass("current");
				                
				                orderFee = me.data('order-fee');
				                if(orderFee == ""){
				                	$("#orderFee").removeAttr("disabled");
				                } else {
				                	$("#orderFee").val("");
				                	$("#orderFee").attr("disabled", "disabled");
				                }
				            });
				            
				            $("button").on("tap", function(){
				            	that.submit();
				            });
						} else {
							aigovApp.nativeFunc.alert(d.data.errMsg);
							aigovApp.back();
						}
					} else {
						aigovApp.nativeFunc.alert("验卡失败！");
						aigovApp.back();
					}
				} else {
					aigovApp.nativeFunc.alert(d.message);
					aigovApp.back();
				}
			});
		},
		
		submit:function(){
			var orderFee2;
			if(orderFee == ""){
				orderFee2 = $("#orderFee").val();
        	} else {
        		orderFee2 = orderFee;
        	}
			if(parseInt(orderFee2) != orderFee2){
        		aigovApp.nativeFunc.alert("选择[其它]时,请输入整数金额...");
        		return false;
        	}
			if(orderFee2 <= 0){
        		aigovApp.nativeFunc.alert("选择[其它]时,请输入大于零的金额...");
        		return false;
        	}
			// 调用充值接口1
			var url = PROJECT_URL + "recharge/CardRecharge1";
			var params = {
				"cardNo" : cardNo,
				"amount" : orderFee2 * 100,// 元转分
				//"amount" : 1,
				"chipSerial" : chipSerial,
				"cardSerial" : cardSerial,
				"tranAmount" : tranAmount
			}
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(d){
				aigovApp.utils.closeLoading();
				if(d.code == 0){
					if(d.data != null){
						if(d.data.result_Code && d.data.result_Code == "0000"){
							aigovApp.back();
							window.plugins.webViewPlugin.open(d.data.alipay_Url);
						} else {
							aigovApp.nativeFunc.alert("充值失败！");
						}
					} else {
						aigovApp.nativeFunc.alert("充值失败！");
					}
				} else {
					aigovApp.nativeFunc.alert(d.message);	
				}
			});
		}
	
	}
	
	module.exports = {
		
		onCreate : function(winObj){
			cardNo = winObj.intent.cardNo;
			chipSerial = winObj.intent.chipSerial;
			cardSerial = winObj.intent.cardSerial;
			tranAmount = parseInt(winObj.intent.tranAmount);// 单位：分
			
			var nfc = new NFC(winObj);
			nfc.init();
		}

	};

});