/**
 * 注册
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
    var aiLogin = require("aiLogin");

	var Register = function(){};
	//对象私有方法
	Register.prototype = {

        wait : 60,

		init:function(){

            var that =this;

            //注册
            $("#registerBtn").on("tap", function(){
                if ($("#registerBtn").hasClass('weui_btn_disabled')) return;
                //提交
                if (that.validate()) {
                	that.submit();
                }

            });

            //获取验证码
            $('#getCodeBtn').on('tap', function(event) {
                if ($(this).hasClass('weui_btn_disabled')) return;
            	if (that.validate("1")) {
                    var phoneNo = $('#phoneNo').val();
                    var params = {"phoneNo":phoneNo,"businessType":"REGISTER_PHONE"};
                    var url = PROJECT_URL + "user/pushMsg";
                    aigovApp.utils.openLoading();
                    aigovApp.ajax(url, params, function(data){
                        aigovApp.utils.closeLoading();
                        if (data.code == '0') {
                            if (data.data.retCode == "0") {
                                $("#registerBtn").removeClass('weui_btn_disabled');
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
                var phoneNo = $('#phoneNo').val();
				var username = $('#username').val();
				var code = $('#code').val();
				var pwd = $('#pwd').val();
				// var pwd2 = $('#pwd2').val();
				var params ={"userName":username,"phoneNo":phoneNo,"code":code,"passwd":pwd,"regisType":"phone_no","userType":"normal","mac":macAddress};
	            // var url = "UserModule/module/my/register/result.json";
				var url = PROJECT_URL + "user/registe";
	            aigovApp.utils.openLoading();
				aigovApp.ajax(url, params, function(data){
	                aigovApp.utils.closeLoading();
	                if (data.code == "0") {
	                	//保存登录信息
	                	aigovApp.session.setSession(data.data,phoneNo,pwd);
	                	aigovApp.nativeFunc.alert("登入成功");
	                    aigovApp.back("login");
	                }else {
	                    aigovApp.nativeFunc.alert(data.message);
	                }
				},function(){
	                aigovApp.utils.closeLoading();
	                aigovApp.nativeFunc.alert("提交失败！");
	            });
			 });
		},

		validate : function(type){
            var phoneNo = $('#phoneNo').val();
			var username = $('#username').val();
			var code = $('#code').val();
			var pwd = $('#pwd').val();
			// var pwd2 = $('#pwd2').val();
			if("" == phoneNo){
				aigovApp.nativeFunc.alert("手机号不能为空！");
				return false;
			} else if(phoneNo.length != 11){
				aigovApp.nativeFunc.alert("手机号格式不正确");
				return false;
			}
            if (type != "1") {
                if("" == code){
                    aigovApp.nativeFunc.alert("验证码不能为空！");
                    return false;
                }else if("" == username){
                    aigovApp.nativeFunc.alert("用户名不能为空！");
                    return false;
                }/*else if(username.search('^[A-Za-z0-9]+$') == -1 ||
                    username.search('[A-Za-z]+') == -1 ||
                    username.search('[0-9]+') == -1){
                    aigovApp.nativeFunc.alert("用户名请使用字母与数字组合！");
                    return false;
                }*/else if(username.search('^[a-zA-Z0-9_-]{4,16}$') == -1){
                    aigovApp.nativeFunc.alert("用户名由4至16位字母、数字、下划线、减号组成！");
                    return false;
                }else if("" == pwd){
                    aigovApp.nativeFunc.alert("密码不能为空！");
                    return false;
                }
                /*else if("" == pwd2){
                    aigovApp.nativeFunc.alert("密码不能为空！");
                    return false;
                } else if(pwd != pwd2){
                    aigovApp.nativeFunc.alert("两次输入的密码不同！");
                    return false;
                }*/
                else {
                    return true;
                }
            }else {
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
            var reg = new Register(appWindow);
            reg.init();

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
