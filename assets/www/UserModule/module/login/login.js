/**
 * 登陆界面的js
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var aiLogin = require("aiLogin");
	
	//窗口模块
	var appWindow = require("appWindow");

	var parentId;
	var parentWin;
	
	var Login = function(appWindow){
		this.$password = $("#password");		//密码输入框dom对象
		this.$username=$("#username");
		if(appWindow.intent){
			if(appWindow.intent.id){
				parentId = appWindow.intent.id;
			}
			if(appWindow.intent.win){
				parentWin = appWindow.intent.win;
			}
		}
	};

	//对象私有方法
	Login.prototype = {

		init:function(){

            var that =this;

            $('#checkCodeImg').attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            $('#checkCodeImg').on('tap', function(event) {
                $(this).attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            });

            //登陆
            $("#loginBtn").on("tap", function(){
                //提交
                that.submit(that.$username.val(),that.$password.val());
            });

			/*var slideout = new Slideout({
				'panel': document.getElementById('showMenu1'),
				'menu': document.getElementById('menu'),
				'padding': 256,
				'tolerance': 70
			});*/


			$('#showMenu').on('tap', function(event) {
				$('.maskAll').show();
				slideout.toggle();
			});
			$('.maskAll').on('tap', function(event) {
				$(this).hide();
				slideout.toggle();
			});

			var userName = window.localStorage.userName;
			if(typeof userName !== "undefined" && userName != null){
				$("#username").val(userName);
			}

		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(username,password){

			//验证
			if ($('#checkCode').val() == "") {
				aigovApp.nativeFunc.alert("请输入验证码");
				return;
			}
			if(!aiLogin.validate(username,password)){
				return;
			}

			var data ={
				"password":password,
				"userName":username,
				"checkCode":$('#checkCode').val(),
				"actionUrl":aigovApp.constants.loginProperties.ACTION_URL
			};

			aiLogin.submit(data, function(result){
	        	aigovApp.utils.closeLoading();
	            if(result.code == 0){
	            	
	                //保存登录信息
	                aigovApp.session.setSession(result.data,data.userName,data.password);
	                if(parentWin){
	                	if(parentId == "work"){
        					aigovApp.back("refresh");
	                	}
	                } else {
		            	//窗口模块
		            	var stack= appWindow.getWindowStack()
		            	
		            	//如果只有一个窗口并就是登入窗口
		            	if(stack.length!=0 && !(stack.length==1 && stack[0].id=='login')){
		            		aigovApp.back("login");
		            	}else{
		            		aigovApp.cleanHistory();
		            		aigovApp.openAppWindow('my');
		            	}
	                }
	            }else{//弹出出错信息
	                aigovApp.nativeFunc.alert(result.message);
	            }
	        });
			/*aiLogin.submit(data,function() {
				aigovApp.openAppWindow('my');
			});*/
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
            var login = new Login(appWindow);
            login.init();

		},
		onBack:function(str){
			if(str=='login'){
				aigovApp.back();
			}
		},
		//加载事件
		loading : function(){
			/*$(".J-personal,.J-legalperson").on("tap",function(){
				$(".service-info-head ul li").removeClass("cur");
				$(this).addClass("cur");
				var data=$(this).attr("data");
				$("#J-type").val(data);
			});

			//打开个人用户窗口
			$(".J-company-btn").on("click",function(){
				appApp.openAppWindow("companyRegister")
			});

			//打开法人员用户窗口
			$(".J-personal-btn").on("click",function(){
				aigovApp.openAppWindow("personalRegister")
			});

			//初始化默认个人用户登录
			$(".J-personal").addClass("cur");
			var data=$(".J-personal").attr("data");
			$("#J-type").val(data);*/
		}
	};

	module.exports = exportsMethods;

});
