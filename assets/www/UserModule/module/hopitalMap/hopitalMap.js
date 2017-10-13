/**
 * 热线
 */
;define(function(require, exports, module){
	
	
	
	module.exports = {
		onCreate : function(winObj){
			var intent=winObj.intent;
			var map = new BMap.Map("J_hopitalMap");
			var point = new BMap.Point(intent.lng,intent.lat);
			var marker = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker);
			map.centerAndZoom(point, 15);
			var opts = {
			  width : 200,     // 信息窗口宽度
			  height: 100,     // 信息窗口高度
			  title : intent.title , // 信息窗口标题
			  enableMessage:false//设置允许信息窗发送短息
			}
			var infoWindow = new BMap.InfoWindow("地址："+intent.address, opts);  // 创建信息窗口对象 
			marker.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,point); //开启信息窗口
			});

		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }
		
	};
});
