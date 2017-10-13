/**
 * 热线
 */
;define(function(require, exports, module){
	
	var map=null;
	
	var aiAppAction=require("aiAppAction");
	//var aigovApp = require("aigovApp");

	// 定义一个控件类,即function
	function MyControl(){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	  this.defaultOffset = new BMap.Size(10, 150);
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
	MyControl.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
	MyControl.prototype.initialize = function(map){
	  // 创建一个DOM元素
	  var div = $("<div class=\"BMap_geolocationIconBackground\" style=\"float: left; width: 32px; height: 32px; background-image: url('http://api0.map.bdimg.com/images/geolocation-control/mobile/gradient-bg-1x64.png'); background-size: 1px 32px; background-repeat: repeat-x;border: 1px solid #AFAFAF;\"><div class=\"BMap_geolocationIcon\" style=\"width: 32px; height: 32px; cursor: pointer; background-image: url('http://api0.map.bdimg.com/images/geolocation-control/mobile/default-40x40.png'); background-size: 20px 20px; background-repeat: no-repeat; background-position: center center;\"></div></div>");

	  // 绑定事件,点击一次放大两级
	  div.on("click",function(e){
		  window.plugins.PositionPlugin.getCurrentPosition(function(data){
			  var overlays=map.getOverlays();
			  for(var i=0;i<overlays.length;i++){
				  map.removeOverlay(overlays[i]);
			  }
			  
			  var point = new BMap.Point(data.coords.longitude,data.coords.latitude);
			  var mk = new BMap.Marker(point);
			  mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			  map.addOverlay(mk);
			  map.panTo(point);
		  },function(data){
			  aigovApp.nativeFunc.alert(data.message);
		  });
	  })
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div[0]);
	  // 将DOM元素返回
	  return div[0];
	}
	
	var openMap=function(){
		window.plugins.PositionPlugin.getCurrentPosition(function(data){
			var point = new BMap.Point(data.coords.longitude,data.coords.latitude);
			map = new BMap.Map("J_hopitalMap");
			map.centerAndZoom(point,13);
			var mk = new BMap.Marker(point);
			mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			map.addOverlay(mk);
			var ctrl = new BMapLib.TrafficControl({
		           showPanel: false //是否显示路况提示面板
			});
			
			// 添加带有定位的导航控件
			var navigationControl = new BMap.NavigationControl({
				// 靠左上角位置
			    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			    offset:new BMap.Size(10, 150),
				// LARGE类型
				type: BMAP_NAVIGATION_CONTROL_LARGE,
				// 启用显示定位
				enableGeolocation: true
			});
			
			// 创建控件
			var myControl = new MyControl();
			// 添加到地图当中
			map.addControl(myControl);
			
			map.addControl(navigationControl);
			map.addControl(ctrl);
			ctrl.showTraffic();
			ctrl.setAnchor(BMAP_ANCHOR_TOP_RIGHT);
		},function(data){
			aigovApp.nativeFunc.alert(data.message);
		})
	}
	module.exports = {
		onCreate : function(winObj){
			var windowCurrent = winObj;
			aigovApp.utils.openLoading();
			aigovApp.ajax("https://ydt.xy12345.cn/edot/videoConfig/getAllVideoConfig", null, function(data){
			//aigovApp.ajax("UserModule/module/roadvideo/roadvideolist.json", null, function(data){
				aigovApp.utils.closeLoading();
				$.each(data.data,function(i,o){
					var html="<a href='javascript:;' class='ai-road-h-app' data_url='"+o.url+"' data_img='"+o.mapImg+"'><div class='ai-road-h-a-img'><img src='"+o.img+"'></div><p class='ai-road-h-a-t'>"+o.title+"</p></a>"
					$("#J_road_view_list").append(html);
				});
				$(".ai-road-h-app").on("tap",function(){
					var _this=$(this);
					var url=_this.attr("data_url");
					var img=_this.attr("data_img");
					var title=_this.text();
					window.plugins.CameraPlayerPlugin.PlayCamera(url,title,img);
				})
			})
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }
		
	};
});
