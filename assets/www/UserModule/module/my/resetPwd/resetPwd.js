/**
 * 重置密码
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

    var appWindow = require("appWindow");

	//定义工具类
	var Reset = function(){};
	//对象私有方法
	Reset.prototype = {

        wait : 60,

		init:function(){
            if (window.localStorage.account) {
                var session = $.parseJSON(window.localStorage.account);
                $("#username").val(session.user.phoneNo);
                if (session.user.phoneNo!=null && session.user.phoneNo.length > 0) {
                    $("#username").attr("disabled",true);
                    $("#username").css("color","#999");
                }
            }

            var that =this;

            //重置
            $("#resetBtn").on("tap", function(){

                if ($(this).hasClass('weui_btn_disabled')) return;
                //提交
                if (that.validate()) {
                	that.submit();
                }

            });

            //获取验证码
            $('#getCodeBtn').on('tap', function(event) {
                if ($(this).hasClass('weui_btn_disabled')) return;
                if (that.validate("1")) {
                    var phoneNo = $('#username').val();
                    var params = {"phoneNo":phoneNo,"businessType":"UPDATE_PASSWD"};
                    var url = PROJECT_URL + "user/pushMsg";
                    aigovApp.utils.openLoading();
                    aigovApp.ajax(url, params, function(data){
                        aigovApp.utils.closeLoading();
                        if (data.code == '0') {
                            if (data.data.retCode == "0") {
                                $("#resetBtn").removeClass('weui_btn_disabled');
                                that.times($('#getCodeBtn'));
                            }else {
                                aigovApp.nativeFunc.alert(data.data.retMsg);
                            }
                        } else {
                            aigovApp.nativeFunc.alert(data.message);
                        }
                    },function(){
                        aigovApp.utils.closeLoading();
                        aigovApp.nativeFunc.alert("提交失败！");
                    });
                }
            });

		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(){
            window.MacAddress.getMacAddress(function(macAddress) {
                var username = $('#username').val();
                var code = $('#code').val();
                var pwd = $('#pwd').val();
                var pwd2 = $('#pwd2').val();
                var params ={"phoneNo":username,"code":code,"pwd":pwd,"mac":macAddress};
                // var url = "UserModule/module/my/resetPwd/result.json";
                var url = PROJECT_URL + "user/changePwd";
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, params, function(data){
                    aigovApp.utils.closeLoading();
                    if (data.code == '0') {
                        //保存登录信息
                        aigovApp.session.setSession(data.data,username,pwd);
                        aigovApp.nativeFunc.alert("密码重置成功！");
                        //appWindow.cleanHistory();
                        aigovApp.back("login");
                        //aigovApp.openAppWindow("my");
                    } else {
                        aigovApp.nativeFunc.alert(data.message);
                    }
                },function(){
                    aigovApp.utils.closeLoading();
                    aigovApp.nativeFunc.alert("提交失败！");
                });
            });
		},

		validate : function(type){
			var username = $('#username').val();
			var code = $('#code').val();
			var pwd = $('#pwd').val();
			var pwd2 = $('#pwd2').val();
			if("" == username){
				aigovApp.nativeFunc.alert("手机号不能为空！");
				return false;
			} else if(username.length != 11){
				aigovApp.nativeFunc.alert("手机号格式不正确");
				return false;
			}
            if (type != "1") {
                if("" == code){
                    aigovApp.nativeFunc.alert("验证码不能为空！");
                    return false;
                }else if("" == pwd){
                    aigovApp.nativeFunc.alert("密码不能为空！");
                    return false;
                } else if("" == pwd2){
                    aigovApp.nativeFunc.alert("密码不能为空！");
                    return false;
                } else if(pwd != pwd2){
                    aigovApp.nativeFunc.alert("两次输入的密码不同！");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
		},

        times : function(o) {
            var that =this;
            if (that.wait == 0) {
                o.removeClass("weui_btn_disabled");
                o.html("重新发送");
                that.wait = 60;
            } else {
                o.addClass('weui_btn_disabled');
                o.html(that.wait + "s后重发");
                that.wait--;
                setTimeout(function() {
                    that.times(o);
                }, 1000);
            };
        }

	};

	//模块对外提供的方法
	var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loading();

            //进行窗口初始化
            var reset = new Reset(appWindow);
            reset.init();

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
