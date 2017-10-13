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
			var session = $.parseJSON(window.localStorage.account);

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
                    var phoneNo = $('#phoneNo').val();
                    var params = {"phoneNo":phoneNo,"businessType":"REGISTER_PHONE"};
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
                var session = $.parseJSON(window.localStorage.account);
                var userId = session.user.userId;
                var userName = session.user.userName;
                var phoneNo = $('#phoneNo').val();
                var code = $('#code').val();
                var params ={"userId":userId,"userName":userName,"newPhone":phoneNo,"code":code,"mac":macAddress};
                // var url = "UserModule/module/my/resetPwd/result.json";
                var url = PROJECT_URL + "user/changePhone";
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, params, function(data){
                    aigovApp.utils.closeLoading();
                    if (data.code == '0') {
                        //保存登录信息
                        aigovApp.session.setSession(data.data,phoneNo,session.passWord);
                        aigovApp.nativeFunc.alert("手机号码修改成功！");
                        appWindow.cleanHistory();
                        //aigovApp.back("my");
                        aigovApp.openAppWindow("my");
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
			var phoneNo = $('#phoneNo').val();
			var code = $('#code').val();
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
                }else {
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
