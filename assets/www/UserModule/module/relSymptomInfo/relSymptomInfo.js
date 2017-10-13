/**
 * 热线
 */
;define(function(require, exports, module){
	
	module.exports = {
		onCreate : function(winObj){
			var intent=winObj.intent;
			var symptomId=intent.symptomId;
			$("#aigov-header-login").hide();
			
			$("#aigov-header-button").append("<a id='J_submit'>确定</a?");
			
			$("#J_submit").on("tap",function(){
				var symptomIds="";
				$("input[name='symptomId']").each(function(){
					if(this.checked){
						symptomIds+=this.value+",";
					}
				})
				if(symptomIds!=""){
					symptomIds=symptomIds.substring(0,symptomIds.length-1)
				}
				intent.relSymptomId=symptomIds
				aigovApp.openAppWindow("diseaseInfo",intent);
				
			})
			
			var url=aigovApp.constants.relSymptomInfoProperties.RELSYMPTOM_LIST_URL;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url,{symptomId:symptomId} , function(data){
				aigovApp.utils.closeLoading();
				if(data.code=="0"){
					var tpl=$("#J_relSymptomInfo_tpl").html();
					var result = new t(tpl).render(data);
					$("#J-ai-box").append(result);
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
