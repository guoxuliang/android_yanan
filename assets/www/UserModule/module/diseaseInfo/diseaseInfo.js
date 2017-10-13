/**
 * 热线
 */
;define(function(require, exports, module){
	
	
	
	module.exports = {
		onCreate : function(winObj){
			var intent=winObj.intent;
			aigovApp.utils.openLoading();
			var url=aigovApp.constants.diseaseInfoProperties.DISEASEINFO_LIST_URL;
			aigovApp.ajax(url,intent , function(data){
				aigovApp.utils.closeLoading();
				var tpl=$("#J_diseaseInfo_tpl").html();
				if(data.code=="0" && data.data){
					var tdata=data.data;
					for(var i=0;i<tdata.length;i++){
						var result = new t(tpl).render(tdata[i]);
						$("#J-ai-box").append(result);
					}
					$(".J_btn").on("tap",function(){
						var _this=$(this);
						var url=_this.attr("data_url");
						var title=_this.attr("data_title");
						aigovApp.openAppWindow("openUrl2",{url:url,title:title});
					})
					
					$(".J_button").on("tap",function(){
						var _this=$(this);
						var vid=_this.attr("vid");
						aigovApp.openAppWindow("hospitalDeptByOfficeId",{officeId:vid});
					})
				}else{
					aigovApp.nativeFunc.alert("未找到相关记录");
				}
			});
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }
		
	};
});
