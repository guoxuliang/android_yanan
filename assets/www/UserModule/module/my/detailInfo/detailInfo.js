/**
 * 我的详细信息
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var Reset = function(){};
	//对象私有方法
	Reset.prototype = {

		init:function(){

            var that = this;

            that.cleanData();

            var session = $.parseJSON(window.localStorage.account);
            /*if(session.user.realName && session.user.realName !==''){
        		$('#username').html(session.user.realName);
        	}else{
        		$('#username').html(session.user.userName);
        	}*/
            $('#username').html(session.user.userName);
            $('#phoneNo').html(session.user.phoneNo);
            $('#realName').html(session.user.realName);
            $('#userId').val(session.user.userId);
            $('#idCardNo').html(session.user.idCardNo);
            $('#address').val(session.user.address);
            $('#orgName').val(session.user.orgName);
            $('#orgCode').val(session.user.orgCode);
            if (session.user.userType == "normal") { // 普通用户

            }else if(session.userType == "enterprise"){ // 企业用户
                $('#tab2').trigger('tap');
            }

            $('.weui_navbar_item').on('tap', function(event) {
            	$(this).addClass('weui_bar_item_on').siblings('.weui_bar_item_on').removeClass('weui_bar_item_on');
            	var item = $(this).data("item");
            	$('.weui_tab_bd').find(".tab_content").each(function(index, el) {
            		if ($(this).data("item") === item) {
            			$(this).show();
            		}else {
            			$(this).hide();
            		}
            	});
            });

            //保存个人
            $('#saveBtn').on('tap', function(event) {
                if (that.validate("1")) {
                	that.submit("1");
                }
            });

            //保存企业
            $('#saveBtn2').on('tap', function(event) {
                if (that.validate("2")) {
                	that.submit("2");
                }
            });

            //修改密码
            $("#resetPwd").click(function(){
                aigovApp.openAppWindow('resetPwd');
            })

            //修改手机号码
            $("#resetPhone").click(function(){
            	aigovApp.openAppWindow('resetPhone');
            })
		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){
			var params = $('#czsForm').serialize();
			var url = PROJECT_URL + "wiseMedical/changePersonalBaseInfo";
            aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.result_Code == "0000") {
                        aigovApp.nativeFunc.alert("保存成功");

                        // 更新资料后重新保存登录用户信息
                        var session = $.parseJSON(window.localStorage.account);
                        session.user.address = $('#address').val();
                        session.user.orgName = $('#orgName').val();
                        session.user.orgCode = $('#orgCode').val();
                        window.localStorage.account = $.toJSON(session);
                        aigovApp.back();
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            });

		},

		validate : function(type){
			return true;

		},

        cleanData : function() {
            $('#czsForm').find("input").val("");
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
