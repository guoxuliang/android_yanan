/**
 * 我的账户--办卡进度查询
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
                that.cleanData();
            });

		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){
            var idNo = $('#idNo').val();
            var cardNo = $('#cardNo').val();
			var params = {"idNo":idNo,"cardNo":cardNo};
            // var url = "UserModule/module/my/ykt/ktgs.json";
			var url = PROJECT_URL + "card/queryCardStatus";
            aigovApp.utils.openLoading();
			aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {

                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
			},function(){
                aigovApp.nativeFunc.alert("查询失败");
            });
		},

		validate : function(type){
			var idNo = $('#idNo').val();
			var cardNo = $('#cardNo').val();
            if("" == idNo){
                aigovApp.nativeFunc.alert("身份证号不能为空！");
                return false;
            }else{
                return true;
            }
		},

        cleanData : function() {
            $('.weui_cells_form').find("input").val("");
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
