/**
 * 打开地址
 */
;define(function(require, exports, module){
	
	module.exports = {
		onCreate : function(winObj){
			var url=winObj.intent.url;
			var title=winObj.intent.title;
			var obj = winObj.getComponent('header');
			obj.init({title:title},function(){
				$(".aigov-header-back a").css("background-image","url('UserModule/module/openUrl2/images/close.png')")
				obj.setTitle(title);
			})
			
			if(title=="缴党费"){
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
		},
	};
});
