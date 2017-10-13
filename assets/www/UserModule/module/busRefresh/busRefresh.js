/**
 * 事项列表
 */
;define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	var aiMenu=require("aiMenu");
	
    var render_result;
    var currentLocation;   //距离当前位置最匹配的站点
    var busImgDataNo;     //当前站点的车辆数量
	module.exports = {
		onCreate : function(winObj){
            appWindow = winObj;
			//初始化按钮组件
			var buttonList = appWindow.getComponent('buttonlist');
            var that = this;
			getBusBasicInfo(appWindow);
			getLocation(appWindow);
		},
	};

    setInterval(function(){getLocation(appWindow)},20000);
   //获取当前位置
   function getLocation(appWindow) {
    		window.plugins.PositionPlugin.getWebCurrentPosition(function(data){
                aigovApp.ajax(aigovApp.constants.busProperties.BUS_URL+"getPointInfo?standarName=1&latitude="+data.coords.latitude
                              +"&longitude="+data.coords.longitude+"&lineName="+appWindow.intent,null,function(data){
                        currentLocation = data.data.stationName;
                        if (appWindow.parent.intent.pre_module == 'sameRoutePage') {
                            getBusRealtimeInfo(appWindow,appWindow.parent.intent.stationName);
                            getBusRouteStationInfo(appWindow,appWindow.parent.intent.stationName);
                        } else {
                            getBusRealtimeInfo(appWindow,currentLocation);
                            getBusRouteStationInfo(appWindow,currentLocation);
                        }
                });
    		},function(data){
    			aigovApp.nativeFunc.alert(data.message);
    		})
    }

//    setInterval(function(){getLocation(appWindow)},20000);

    //根据线路名称获取基础信息
	function getBusBasicInfo(appWindow){
			 // aigovApp.ajax("UserModule/module/busRealtime/busBasicInfo.json",null,function(data){
			    aigovApp.ajax(aigovApp.constants.busProperties.BUS_URL+"getBusLineInfoByLineName?lineName="+appWindow.intent,null,function(data){
					  for (var index in data.data) {
                        	if (data.data[index].direction == 0) {
                                render_result = data.data[index];
							}
						}
                        render_result.lineName = appWindow.intent;
					  	var template_html = $('#bus_nav_template').html();
					    var template = Handlebars.compile(template_html);
					    var result_html = template(render_result);
					    $('#busRealtimeNav').html(result_html);
                     }
                 );
	}
    //根据当前位置获取最近的三辆车辆信息
	function getBusRealtimeInfo(appWindow,currentSelectLocation){
//			aigovApp.ajax("UserModule/module/busRefresh/busRealtimeInfo.json",null,function(data){
            aigovApp.ajax(aigovApp.constants.busProperties.BUS_URL+"getNearbyBus?stationName="+currentSelectLocation+"&lineName="+appWindow.intent+"&directions=0",null,function(data){

                busImgDataNo = data.data.length;    //车辆数量
				var template_html = $('#bus_realtime_query_template').html();
				var template = Handlebars.compile(template_html);
				Handlebars.registerHelper('formatterNo',function(number,options){
					if(number == '1' || number == 1 || number == '一') {
						return '最近一辆';
					} else {
						return '第'+number+'辆';
					}
				});
                //格式化车辆数字
				Handlebars.registerHelper('formartterStation',function(station,options){
					if (station < 1 || station == 1){
						return '即将到站';
					} else {
						return station+'站';
					}
				});
                //格式化车辆个数
				Handlebars.registerHelper('judgeLength',function(num,number,options){
                	if (num == number) {
                		return options.fn(this);
                	} else {
                		return options.inverse(this);
                	}
                });
				var result_html = template(data);
				 $('#busRealtime-query').html(result_html);
			});
	}
    //获取公交线路站点
	function getBusRouteStationInfo(appWindow,currentSelectLocation) {
         var last_data = {};
         var render_data = [];
//		 aigovApp.ajax("UserModule/module/busRefresh/busRouteStation.json",null,function(data){
         aigovApp.ajax(aigovApp.constants.busProperties.BUS_URL+"getLineStateByLineName?lineName="+appWindow.intent+"&direction=0",null,function(data){
                 //同站线路塞参数
                 setLocationToSameRoute(appWindow,currentSelectLocation);

             	for (var index in data.data) {
             	    render_data.push(new render_html(parseInt(index)+1,data.data[index],data.data[index].color));
             	}
             	last_data.data = render_data;
			    var template_html = $('#bus_realtime_station_template').html();
                var template = Handlebars.compile(template_html);
                 //格式化交通线路图
                  Handlebars.registerHelper('judgeStatus',function(status,color,options){
                     if (status == color) {
                         return options.fn(this);
                     } else {
                         return options.inverse(this);
                     }
                  });
                  //格式化当前位置标记信息
                   Handlebars.registerHelper('judgeCurrentLocation',function(station_name,options){
                  		if (station_name == currentSelectLocation) {
                  			return options.inverse(this);
                  		} else {
                  		    return options.fn(this);
                  		}
                  	});

                  var result_html = template(last_data);
                  $('#busRealtime-station').html(result_html);
                  //位置偏移函数
                  offsetOfLocation(busImgDataNo);
             }
            );
	}

    //构造的自定义渲染对象
    function render_html(station_no,station_name,status) {
        this.station_no = station_no;
        this.station_name = station_name;
        this.status = status;
    }

    //同站线路按钮塞参数
    function setLocationToSameRoute(appWindow,currentLocation) {
        appWindow.parent
                 .components
                 .buttonlist
                 .buttonList[3]
                 .content ="aiMenu.openUserDefineModule('busSameRoute','"+currentLocation+"')";
    }

     //点击站点，处理信息
     $(document).on("click", "#bus_route_station li", function(){
            $(this).children("p").addClass("p_color").parent().siblings("li").children("p").removeClass("p_color");
    		var selectO = $(this).children("p").children("#busarrow").show();
            selectO.parent().parent().siblings("li").children("p").children("#busarrow").hide();
            var currentSelectLocation = $(this).children("p").children("span")[1].innerHTML;
            getBusRouteStationInfo(appWindow,currentSelectLocation);
            getBusRealtimeInfo(appWindow,currentSelectLocation);
        });

       //站点窗口位移变化
      function offsetOfLocation(busImgDataNo) {
        	$('#bus_route_station li').each(function(index,element){
        		var bus_li = $(this);
        		if($(this).children("p").hasClass("p_color")) {    //如果包含pclass
        			var divWidth = $('.ai-body-box')[0].clientWidth;  //屏幕宽度
        			var liWidth = bus_li[0].clientWidth;      //li宽度
        			var liNo = divWidth/liWidth;
        			var offsetLeft = parseInt(liNo) * liWidth;
        			var offsetNum = parseInt(index / parseInt(divWidth/liWidth));
        			$('#bus_route_station').scrollLeft(offsetLeft*offsetNum);
        			addBusImage(busImgDataNo,index);
        		}
        	});
        }

        function addBusImage(busImgDataNo,index) {
        	    if (busImgDataNo == 3) {
                    $('#bus_route_station li:nth-of-type('+(index+1)+')').css({
                        "background-image":"url(UserModule/module/busRealtime/style/bus_realtime.png)",
                        "background-repeat":"no-repeat",
                        "background-position":"20% 10%",
                        "background-size":"1.8rem"
                    });
                    $('#bus_route_station li:nth-of-type('+index+')').css({
                        "background-image":"url(UserModule/module/busRealtime/style/bus_realtime.png)",
                        "background-repeat":"no-repeat",
                        "background-position":"20% 10%",
                        "background-size":"1.8rem"
                    });
                    $('#bus_route_station li:nth-of-type('+(index-2)+')').css({
                        "background-image":"url(UserModule/module/busRealtime/style/bus_realtime.png)",
                        "background-repeat":"no-repeat",
                        "background-position":"20% 10%",
                        "background-size":"1.8rem"
                    });
                }
                if (busImgDataNo == 2) {
                    $('#bus_route_station li:nth-of-type('+(index+1)+')').css({
                        "background-image":"url(UserModule/module/busRealtime/style/bus_realtime.png)",
                        "background-repeat":"no-repeat",
                        "background-position":"20% 10%",
                        "background-size":"1.8rem"
                    });
                    $('#bus_route_station li:nth-of-type('+index+')').css({
                        "background-image":"url(UserModule/module/busRealtime/style/bus_realtime.png)",
                        "background-repeat":"no-repeat",
                        "background-position":"20% 10%",
                        "background-size":"1.8rem"
                    });
                }
                if (busImgDataNo == 1) {
                    $('#bus_route_station li:nth-of-type('+index+')').css({
                        "background-image":"url(UserModule/module/busRealtime/style/bus_realtime.png)",
                        "background-repeat":"no-repeat",
                        "background-position":"20% 10%",
                        "background-size":"1.8rem"
                    });
                }
            }
});
