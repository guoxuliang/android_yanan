/**
 * 重置密码
 * @author chenyp
 */
;define(function(require, exports, module){

    var $ = jQuery;
    var appWindow;

    //定义工具类
    var My = function(){};
    //对象私有方法
    My.prototype = {
        init:function(){
            var that =this;

        }
    };

    var loadWeather = function(areaId,areaName){
    	aigovApp.utils.openLoading();
    	$.ajax({
            type: "POST",
            data: {'areaId':areaId,'areaName':areaName},
            url: PROJECT_URL + "/weather/queryWeatherInfo",
            timeout : 10000, //超时时间设置，单位毫秒
            success: function(data){
            	aigovApp.utils.closeLoading();
            	$('.dropDownMenuList').hide();
        		$('#curArea').find('img').attr('src','UserModule/module/weather/style/images/weather_Icon01.png')
                if (data.code == 0) {
                    var tpl = $("#weatherTpl").html();
                    var template = Handlebars.compile(tpl);
                    var html = template(data.data);
                    $('#weather').html(html);
                    $('#visibility').html(data.data.visibility);
                    $('.weatherQuality').show();

                    var areas = data.data.areas;
                    var curAreaName = '';
                    var xHtml = '';
                    for (var i = 0; i < areas.length; i++) {
                    	if (i == 0) xHtml += '<ul>';
                    	xHtml += '<li class="selArea" data-area-id="'+areas[i].areaId+'"><a href="javascript:void(0)" class="'+areas[i].current+'">'+areas[i].areaName+'</a> </li>';
                    	if ((i+1) % 4 == 0 && i > 0) xHtml += '</ul><div class="clear"></div><ul>';
                    	if (areas[i].current == 'current') curAreaName = areas[i].areaName;
                    }
                    xHtml += '</ul><div class="clear"></div><ul>';
                    $('.dropDownMenuList').html(xHtml);
                    $('#areaName').html(curAreaName);
                    $('#weatherBg2').hide();
                    $('#weatherBg2').attr('class','weatherBg0'+data.data.weatherImg);
                    $('#weatherBg2').fadeIn('slow',function(){
                    	$('#weatherBg1').attr('class','weatherBg0'+data.data.weatherImg);
                    });
                }else{
                    $('#message').css('margin', '10px');
                    $('#message').html('很抱歉服务器维护中暂不能访问，给您带来的不便请谅解.');
                    console.log(data.message);
                }
            },
            error: function() {
                aigovApp.utils.closeLoading();
                $('#message').css('margin', '10px');
                $('#message').html('很抱歉服务器维护中暂不能访问，给您带来的不便请谅解.');
                console.log("加载数据失败");
            }
        });
    }

    //模块对外提供的方法
    var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} winObj  传入的窗口对象
         */
        onCreate : function(winObj){
            this.loading();

            //进行窗口初始化
            var my = new My(winObj);
            my.init();


        },
        //加载事件
        loading : function(){

            /*aigovApp.utils.openLoading();
            window.plugins.PositionPlugin.getCurrentPosition(function(data){
                loadWeather('',data.City+data.Province);
            },function(data){
                aigovApp.nativeFunc.alert(data.message);
                aigovApp.utils.closeLoading();
                loadWeather('');
            })*/

            loadWeather('');

        	$('#curArea').click(function(){
        		if ($('.dropDownMenuList').is(":hidden")) {
        			$('.dropDownMenuList').show();
        			$('#curArea').find('img').attr('src','UserModule/module/weather/style/images/weather_Icon02.png')
        		}else{
        			$('.dropDownMenuList').hide();
        			$('#curArea').find('img').attr('src','UserModule/module/weather/style/images/weather_Icon01.png')
        		}
        	});

        	$('.dropDownMenuList').on('click', '.selArea', function(event) {
        		if (!$(this).children('a').hasClass('current')) {
        			$(".dropDownMenuList").find('a').removeClass('current');
        			$(this).children('a').addClass('current');
        			loadWeather($(this).data("areaId"));
        		}
        	});

        }

    };

    module.exports = exportsMethods;

});
