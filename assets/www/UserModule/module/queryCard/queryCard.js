/**
 * 办理进度查询js
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){

	//模块对外提供的方法
	var exportsMethods = {
        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loading();
		},
		onBack:function(str){
		},
		//加载事件
		loading : function(){
			$("#queryBtn").on("click",function(){
				var url=aigovApp.constants.queryCardProperties.URL
				var idNo=$("#IdNo").val();
				var combinedTreatmentNo=$("#CombinedTreatmentNo").val();
				if(idNo==""){
					aigovApp.nativeFunc.alert("请输入身份证号码");
					return;
				}
				
				aigovApp.utils.openLoading();
				aigovApp.ajax(url,{idNo:idNo,combinedTreatmentNo:combinedTreatmentNo} , function(rs){
					aigovApp.utils.closeLoading();
					if(rs.code=="0"){
						$("#J_table_box").show();
						$("#J_query_box").html("");
						if(!rs.data || rs.data.length==0){
							$("#J_query_box").html("<tr><td colspan='4'><span color='red'>未找到相关数据</span></td></tr>")
							return;
						}
						for(var i=0;i<rs.data.length;i++){
							$("#J_query_box").append("<tr><td>"+rs.data[i].name+"</td><td>"+rs.data[i].idNo+"</td><td>"+rs.data[i].combinedTreatmentNo+"</td><td>"+rs.data[i].message+"</td></tr>")
						}
					}else{
						aigovApp.nativeFunc.alert(rs.message);
					}
				});
			});
		}
	};

	module.exports = exportsMethods;

});
