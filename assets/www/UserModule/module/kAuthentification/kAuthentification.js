/**
 * 注册
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	var Register = function(){};
	//对象私有方法
	Register.prototype = {

        wait : 60,

		init:function(intent){
			var phoneNo=aigovApp.session.getSession().user.phoneNo;
			$("#phoneNo").val(phoneNo)
            var that =this;

            //注册
            $("#submitBtn").on("tap", function(){
                if ($("#submitBtn").hasClass('weui_btn_disabled')) return;
                //提交
                if (that.validate()) {
                	that.submit(intent);
                }

            });

            //取消
            $('#cancelBtn').on('click', function(event) {
                $('#ifOut').hide();
            });
            
            $('#sureBtn').on('click', function(event) {
            	$('#ifOut').hide();
            	aigovApp.openAppWindow('authentification')
            });
            //获取验证码
            $('#getCodeBtn').on('tap', function(event) {
                if ($(this).hasClass('weui_btn_disabled')) return;
            	if (that.validate("1")) {
                    var phoneNo = $('#phoneNo').val();
                    var params = {"phoneNo":phoneNo,"businessType":"REALNAME_AUTH"};
                    var url = PROJECT_URL + "user/pushMsg";
                    aigovApp.utils.openLoading();
                    aigovApp.ajax(url, params, function(data){
                        aigovApp.utils.closeLoading();
                        if (data.code == '0') {
                            if (data.data.retCode == "0") {
                                $("#submitBtn").removeClass('weui_btn_disabled');
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
		submit : function(intent){
            var phoneNo = $('#phoneNo').val();
			var realName = $('#realName').val();
			var code = $('#code').val();
			var cardNo = $('#cardNo').val();
			
			var params ={"realName":realName,"phoneNo":phoneNo,"code":code,"cardNo":cardNo};
			//var url =  "UserModule/module/kAuthentification/result.json";
			var url= PROJECT_URL+"user/fastCheckUser";
            aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0" || data.code == "-7") {
                	if(typeof intent != "undefined" && intent == "ngariHealth"){
                		params ={"patientName":realName,"mobile":phoneNo,"tid":aigovApp.session.getSession().user.userId,"idcard":cardNo};
                		url= PROJECT_URL+"ngariHealth/createPageUrl";
                		aigovApp.utils.openLoading();
                		aigovApp.ajax(url, params, function(data2){
                            aigovApp.utils.closeLoading();
                            aigovApp.openAppWindow("openUrl2",{
                            	title:"纳里健康",
                            	url:data2.data
                            });
                		});
                	} else {
                		if(data.code == "-7"){
                    		aigovApp.nativeFunc.alert(data.message);
                    	}
                    	
    					aigovApp.rLogin(function(rs){
    						aigovApp.nativeFunc.alert(rs.message);
    						aigovApp.back("refresh_user")
    					})
                	}
                }else {
                	$("#kAuthentification_msg").html(data.message+",是否进入手工认证");
                    $('#ifOut').show();
                }
			},function(){
                aigovApp.utils.closeLoading();
                aigovApp.nativeFunc.alert("提交失败！");
            });
		},

		validate : function(type){
            var phoneNo = $('#phoneNo').val();
			var realName = $('#realName').val();
			var code = $('#code').val();
			var cardNo = $('#cardNo').val();
			if("" == phoneNo){
				aigovApp.nativeFunc.alert("手机号不能为空！");
				return false;
			} else if(phoneNo.length != 11){
				aigovApp.nativeFunc.alert("手机号格式不正确");
				return false;
			}
			if(type!='1'){
				if("" == code){
                    aigovApp.nativeFunc.alert("验证码不能为空！");
                    return false;
				}
			}
			
			if("" == realName){
                    aigovApp.nativeFunc.alert("姓名不能为空！");
                    return false;
			}
			if("" == cardNo){
                    aigovApp.nativeFunc.alert("身份证不能为空！");
                    return false;
			}
			
			cardNo=cardNo.replace(/^\s+|\s+$/g,"");//去除字符串的前后空格，允许用户不小心输入前后空格
	        if (cardNo.match(/^\d{14,17}(\d|X)$/gi)==null) {//判断是否全为18或15位数字，最后一位可以是大小写字母X
	        	aigovApp.nativeFunc.alert("身份证号码须为18位或15位数字");      //允许用户输入大小写X代替罗马数字的Ⅹ
	        	return false;
	        }
			return true;
            
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
            reg.init(appWindow.intent);

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
