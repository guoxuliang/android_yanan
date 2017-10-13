/**
 * 我的账户--口头挂失办理
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var CurWin = function(){};
	//对象私有方法
	CurWin.prototype = {

		init:function(){

            var that = this;

            //挂失
            $("#submitBtn").on("tap", function(){

                //提交
                if (that.validate()) {
                    that.submit();
                }

            });

		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){
            var session = $.parseJSON(window.localStorage.account);
            var name = $('#name').val();
            var idNo = $('#idNo').val();
            var cardNo = session.user.cardNum
            var loginName = session.user.userName;
            var phoneNo = session.user.phoneNo;
			var params = {"name":name,"idNo":idNo,"cardNo":cardNo,"loginName":loginName,"phoneNo":phoneNo};
			var url = PROJECT_URL + "card/syncCardInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        aigovApp.nativeFunc.alert("挂失成功");
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
            var session = $.parseJSON(window.localStorage.account);
			var name = $('#name').val();
			var idNo = $('#idNo').val();
            if("" == name){
                aigovApp.nativeFunc.alert("姓名不能为空");
                return false;
            } else if("" == idNo){
                aigovApp.nativeFunc.alert("身份证号不能为空");
                return false;
            }else if(name != session.user.realName) {
                aigovApp.nativeFunc.alert("姓名不符");
                return false;
            }else if(idNo != session.user.idCardNo) {
                aigovApp.nativeFunc.alert("身份证号不符");
                return false;
            }else {
                return true;
            }
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
            var curWin = new CurWin(appWindow);
            curWin.init();

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
