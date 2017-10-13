/**
 * 重置密码
 * @author chenyp
 */
;define(function(require, exports, module){

    var $ = jQuery;
    
    //定义工具类
    var My = function(){};
    //对象私有方法
    My.prototype = {

        init:function(){

            var that =this;

            var session = aigovApp.session.getSession();
            if (session) {
            	if(session.user.realName && session.user.realName !==''){
            		$('#userName').html(session.user.realName);
                	$('#phone').html("账号：" + session.user.phoneNo);
            	}else{
            		$('#userName').html(session.user.userName);
            	}
                
            }

            /*
            var url = PROJECT_URL + "person/queryMyInfo";
            aigovApp.utils.openLoading();
            window.plugins.PositionPlugin.getCurrentPosition(function(data){
            	$("#cityname").html(data.City);
            });
            aigovApp.ajax(url, {"phoneNo":session.user.phoneNo}, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    $("#today").html(data.data.curDate);
                    $("#today2").html(data.data.curDate2);
                    
                    var result = data.data.result;
                    result = result.replace('/[\r\n]/g', '');
                    result = $.parseJSON(result);
                    if (result.errNum == 0) {
                        var weather = result.retData.weather;
                        var ws = result.retData.WS;
                        var tmp = result.retData.l_tmp + "℃~" + result.retData.h_tmp + "℃";
                        $("#weather").html(weather);
                        $("#weather_tmp").html(tmp);

                        var weathers = ["晴","多云","阴","阵雨","雷阵雨","雷阵雨伴有冰雹","雨夹雪","小雨","中雨","大雨","暴雨","大暴雨","特大暴雨","阵雪","小雪","中雪","大雪","暴雪","雾","冻雨","沙尘暴","小到中雨","中到大雨","大到暴雨","暴雨到大暴雨","大暴雨到特大暴雨","小到中雪","中到大雪","大到暴雪","浮尘","强沙尘暴","霾","无"];
                        var weatherImgs = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","53"];
                        var weatherImg = ""
                        for (var i = 0; i < weathers.length; i++) {
                            if (weathers[i] == weather) {
                                weatherImg = "UserModule/module/my/style/images/" + weatherImgs[i] + ".png";
                                break;
                            }
                        }
                        $("#weatherImg").attr("src",weatherImg);
                    }else{

                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            });
            */

            //是否退出登录
            $("#outBtn").on("tap", function(){
                 $('#ifOut').show();
            });

             //取消
            $('#cancelBtn').on('click', function(event) {
                $('#ifOut').hide();
            });

            //确认退出登录
            $('#sureBtn').on('click', function(event) {
                window.localStorage.removeItem("account");
                aigovApp.session.clearSession();
               	//加载过滤模块
    			require.async('aiFilter',function(aiFilter){
    				aigovApp.cleanHistory();
    				//对欢迎界面相关进行过滤
    				aiFilter.init("mainPage",aigovApp.config.welcomeWinId,aigovApp.config);
    			});
            });

            var userInfo = aigovApp.session.getSession().user;
            if(typeof userInfo !== "undefined"){
            	//获取我的沟通提醒
                aigovApp.ajax(PROJECT_URL + "person/qryUnReadConsultCount",{"userId":userInfo.userId},function(datas){
                	if(datas.code == "0") {
                		var count = datas.unReadCount;
                		if(count > 0){
                			$("div.my-cricle").addClass("my-cricle1");
                			$("div.my-cricle").html(count);
            		  	} else {
            		  		$("div.my-cricle").removeClass("my-cricle1");
            		  		$("div.my-cricle").html("");
            		  	}
                	}
                });
            }
        },
    };
    
    // 获取健康关怀如果存在未坊信息标记小红点
    var healthcare = function(){
        aigovApp.ajax(aigovApp.constants.healthcare.HEALTH_CARE_COUNT_URL, null, function(d){
			if(d.page && d.page.rowCount && d.page.rowCount > 0){
				$("div.health-cricle").addClass("health-cricle1");
				$("div.health-cricle").html(d.page.rowCount);
			}else{
				$("div.health-cricle").removeClass("health-cricle1");
				$("div.health-cricle").html("");
			}
		});
    }

    //模块对外提供的方法
    var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
        onCreate : function(appWindow){
            this.loading();

            //进行窗口初始化
            var my = new My(appWindow);
            my.init();
            healthcare();// 只在创建时执行，回退在mainpage.js里处理。
        },
        onBack:function(intent){
        	if(intent ==="refresh_user"){
        		var session = aigovApp.session.getSession();
        		var isAuth= session.user.isAuth
            	if(isAuth=='0' || isAuth=='00'){
    	       		 $("#userName_st").html("未认证")
    	       		 $("#J_real_buton").show();
            	}else if(isAuth=='1'  || isAuth=='01'){
    	       		 $("#userName_st").html("认证中")
    	       		 $("#J_real_buton").hide();
            	}else if(isAuth=='2' || isAuth=='02'){
    	       		 $("#userName_st").html("已认证")
    	       		 $("#J_real_buton").hide();
            	}else if(isAuth=='3' || isAuth=='03'){
    	       		 $("#userName_st").html("不通过")
    	       		 $("#J_real_buton").show();
            	}
			}	
        },
        //加载事件
        loading : function(){
        	var session = aigovApp.session.getSession();
        	var isAuth= session.user.isAuth
        	if(isAuth=='0' || isAuth=='00'){
	       		 $("#userName_st").html("未认证")
	       		 $("#J_real_buton").show();
        	}else if(isAuth=='1'  || isAuth=='01'){
	       		 $("#userName_st").html("认证中")
	       		 $("#J_real_buton").hide();
        	}else if(isAuth=='2' || isAuth=='02'){
	       		 $("#userName_st").html("已认证")
	       		 $("#J_real_buton").hide();
        	}else if(isAuth=='3' || isAuth=='03'){
	       		 $("#userName_st").html("不通过")
	       		 $("#J_real_buton").show();
        	}
        }
    };

    module.exports = exportsMethods;

});
