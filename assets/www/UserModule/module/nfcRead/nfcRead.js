/**
 * NFC充值
 */
;define(function(require, exports, module){
	
	
	
	module.exports = {
		
		onCreate : function(winObj){
			var cardNo = winObj.intent.cardNo;
			
			$('#aigov-header-login').hide();
			var btnHtml = '<a href="javascript:void(0);" onclick="aigovApp.openAppWindow(\'czjl\', {\'cardNo\' : \''+cardNo+'\'})">充值记录</a>';
			$('#aigov-header-button').html(btnHtml);
			
			window.plugins.NFCActionPlugin.init();

			var onDeviceReady=function(){
				nfc.addReadListener(
		            function (nfcEvent) {
		          		nfc.removeReadListener();
		            },
		            function() {
		            	
		            },
		            function(reason) {
		                navigator.notification.alert(reason, function() {}, "There was a problem");
		            }
		        );
			}
			
	        document.addEventListener("deviceready", onDeviceReady, false);  
		},onBack:function(){
			
			window.plugins.NFCActionPlugin.init();

			var onDeviceReady=function(){
				nfc.addReadListener(
		            function (nfcEvent) {
		          		nfc.removeReadListener();
		            },
		            function() {
		            	
		            },
		            function(reason) {
		                navigator.notification.alert(reason, function() {}, "There was a problem");
		            }
		        );
			}
			
	        document.addEventListener("deviceready", onDeviceReady, false); 
		}

	};

});