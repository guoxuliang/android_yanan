/**
 * 打开地址
 */
;define(function(require, exports, module){
	
	module.exports = {
		onCreate : function(winObj){
			var url=winObj.intent.url;
			
			if(url.indexOf("cpc.xys.gov.cn")>0){
				$.ajax({
					url:url,
					type: 'GET',
					timeout:'7000',
					complete: function(response){
						if(response.status == 200){
							$("#openUrl").attr("src",url);
						}else{
							$("#openUrl").attr("src","UserModule/module/error/error.html");
						}
					}
				});
			}else{
				$("#openUrl").attr("src",url);
			}
			
			$("#closeBtn").on("click",function(){
				aigovApp.back();
			})
		},
	};
});
