/**
*
*	调用百度API 获取当前位置的经纬度
* {"coords":{"latitude":26.070873,"longitude":119.260428,"radius":40},"locationType":161,"message":"表示网络定位结果","Province":"福建省","City":"福州市","District":"仓山区","AddrStr":"中国福建省福州市仓山区金榕北路"}
*/
var baiduMap = function(){
	
};

baiduMap.prototype = {
		getWebCurrentPosition:function(successCallback, errorCallback){
			var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if (this.getStatus() == BMAP_STATUS_SUCCESS) {
						var addr = r.address.province + r.address.city + r.address.district + r.address.street + r.address.street_number;
						var json={
						  "coords" : {
						    "latitude" :  r.point.lat,
						    "longitude" :r.point.lng,
						  },
						  "AddrStr" : addr,
						  "message" : "表示网络定位结果",
						  "District" : r.address.district,
						  "Province" :  r.address.province,
						  "City" : r.address.city
						}
						successCallback(json);
					} else {
						errorCallback('failed' + this.getStatus());
					}
				})
		},
		execute: function(action, successCallback, errorCallback) {
			var _this=this;
			if(window.cordova){
				cordova.exec(    
					function(pos) {
						var errcode = pos.locationType;
						if (errcode == 61 || errcode == 65 || errcode == 161) {
							successCallback(pos);
						} else {
							if (typeof(errorCallback) != "undefined") {
								if (errcode >= 162) {
									errcode = 162;
								}
								errorCallback(pos)
							};
						}
					}, 
					function(err){
						_this.getWebCurrentPosition(successCallback, errorCallback);
					},
					"PositionPlugin",
					action,
					[]
				)
			}else{
				_this.getWebCurrentPosition(successCallback, errorCallback);
			}
				
	},
	getCurrentPosition: function(successCallback, errorCallback) {
		this.execute("get", successCallback, errorCallback);
	},
	stop: function(action, successCallback, errorCallback) {
		this.execute("stop", successCallback, errorCallback);
	}
}
if(window.cordova){
	cordova.addConstructor(function() {
		if (!window.plugins) {
			window.plugins = {};
		}
		window.plugins.PositionPlugin = new baiduMap();
	});
}else{
	if (!window.plugins) {
		window.plugins = {};
	}
	window.plugins.PositionPlugin = new baiduMap();
}
