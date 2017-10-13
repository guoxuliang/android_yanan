/**
 * 我的账户--卡余额查询
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

            //查询
            $("#submitBtn").on("tap", function(){

                //提交
                if (that.validate()) {
                    that.submit();
                }

            });

            //重置
            $('#resetBtn').on('tap', function(event) {
                this.cleanData();
            });

		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){

			var params = {};
			var url = "UserModule/module/my/ykt/ktgs.json";
			aigovApp.ajax(url, params, function(data){
				aigovApp.nativeFunc.alert("保存成功！");
			});
		},

		validate : function(type){
			var idcard = $('#idcard').val();
			var cardNum = $('#cardNum').val();
            if("" == idcard){
                aigovApp.nativeFunc.alert("身份证号不能为空！");
                return false;
            } else if("" == cardNum){
                aigovApp.nativeFunc.alert("卡号不能为空！");
                return false;
            } else {
                return true;
            }

		},

        cleanData : function() {
            $('#idcard').val("");
            $('#cardNum').val("");
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
