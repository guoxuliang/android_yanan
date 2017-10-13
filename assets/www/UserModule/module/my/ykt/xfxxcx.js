/**
 * 我的账户--缴费信息查询
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

            $('#aigov-header-title').html("消费信息查询");

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

			var params = $('#czsForm').serialize();
			// var url = "UserModule/module/my/ykt/ktgs.json";
            var url = PROJECT_URL + "card/queryRechargeInfo";
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
                aigovApp.utils.closeLoading();
                aigovApp.nativeFunc.alert("查询失败");
            });
		},

		validate : function(type){
			var idType = $('#idType').val();
			var idNo = $('#idNo').val();
			var name = $('#name').val();
            var cardNo = $('#cardNo').val();
            if("" == idType){
                aigovApp.nativeFunc.alert("证件类型不能为空！");
                return false;
            } else if("" == idNo){
                aigovApp.nativeFunc.alert("证号号码不能为空！");
                return false;
            }else if("" == name){
                aigovApp.nativeFunc.alert("姓名不能为空！");
                return false;
            }else if("" == cardNo){
                aigovApp.nativeFunc.alert("卡号不能为空！");
                return false;
            }else {
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
