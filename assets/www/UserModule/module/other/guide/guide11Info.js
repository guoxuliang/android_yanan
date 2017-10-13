/**
 * 一卡通
 */
;define(function(require, exports, module){


	module.exports = {
		onCreate : function(winObj){
			var tbl=$("#tpl").html();
			var result = new t(tbl).render(winObj.intent);
			$("#J_hopitalMap").html(result);
			$(".J_open_map").on("click",function(){
				var _this=$(this);
				var title=_this.attr("data_title");
				var address=_this.attr("data_address");
				//经度
				var lng=_this.attr("data_lng");
				//纬度
				var lat=_this.attr("data_lat");
				var param={
					title:title,
					address:address,
					lng:lng,
					lat:lat
				}
				aigovApp.openAppWindow("hopitalMap1",param);
				
			});
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }

	};
});
