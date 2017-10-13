/**
 * NFC充值记录
 */
;define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	
	module.exports = {

		onCreate : function(winObj){
			
			//winObj.intent={'cardNo' : '0200009377'};
			
			var _this = this;
			
			//得到模板
			var windowConfig = aigovApp.config.appWindows["czjl"];
			var componentPath = windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";
			
		    var documentList = winObj.getComponent('nfcDatalist');
		    var options = {
				datasUrl   : PROJECT_URL + "recharge/GetRechargeTradeRecord",
				dataParam : {
					"cardNo" : winObj.intent.cardNo
				},
				pageCount  : 15,
				hasSearch  : true,
				placeholder : "请输入订单编号",
				recordEvents : [{
					'type':'tap',
					'handle':_this.onClick
				}]
			};
		    
		    documentList._loadHtml(componentPath + 'template/default.html',function(tplHtml){
				options.recordTpl = tplHtml;
				documentList.init(options);
			});
		},
		//退回事件
        onBack:function(){
        	
        },
		//操作
		onClick : function($record){
			var terminalTranNo = $record.attr("terminalTranNo");
			var amount = $record.attr("amount");
			var url = PROJECT_URL + "recharge/queryForAlipay";
			var params = {
				"orderId" : terminalTranNo,
				"orderFee" : amount
			}
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(d){
				aigovApp.utils.closeLoading();
				if(d.code == 0){
					if(d.data != null){
						if(d.data.result_Code && d.data.result_Code == "0000"){
							window.plugins.webViewPlugin.open(d.data.alipay_Url);
						} else {
							aigovApp.nativeFunc.alert(d.data.error_Msg);
						}
					} else {
						aigovApp.nativeFunc.alert("支付失败！");
					}
				} else {
					aigovApp.nativeFunc.alert(d.message);
				}
			});
		}
		
	};
});
