/**
 * 我的账户--交易信息查询
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var CurWin = function(){};
	//对象私有方法
	CurWin.prototype = {

		init:function(winObj){

            var that = this;

            var cardNum = winObj.intent.cardNum;
            $('#cardNum').html(cardNum);

            $('#moon1').on('tap', function(event) {
                var startTime = Date.getDateOfPreMonth().format("yyyy-MM-dd");
                var endTime = new Date().format("yyyy-MM-dd");
                $('#startTime').val(startTime);
                $('#endTime').val(endTime);
            });

            $('#moon3').on('tap', function(event) {
                var startTime = Date.getDateOfPreMonth(null,3).format("yyyy-MM-dd");
                var endTime = new Date().format("yyyy-MM-dd");
                $('#startTime').val(startTime);
                $('#endTime').val(endTime);
            });

            //查询
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
            var that = this;
            var cardNo = $('#cardNum').html();
            var startDate = $("#startTime").val();
            var endDate = $("#endTime").val();
			var params = {"cardNo":cardNo,"startDate":startDate,"endDate":endDate};
            var url = PROJECT_URL + "card/queryRechargeInfo";

            // 缴费信息查询
            // that.jfxxcx(params,url);
            aigovApp.openAppWindow('myAccount-jycxDetail',params);
		},

		validate : function(type){
			var startTime = $('#startTime').val();
			var endTime = $('#endTime').val();
            if("" == startTime){
                aigovApp.nativeFunc.alert("开始时间不能为空！");
                return false;
            } else if("" == endTime){
                aigovApp.nativeFunc.alert("结束时间不能为空！");
                return false;
            }else {
                return true;
            }

		},

        // 缴费信息查询
        jfxxcx : function(params,url) {
            var that = this;
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){

                if (data.code == "0") {
                    if (data.data.resultCode == "0") {

                        // 消费信息查询
                        that.xfxxcx(params,url,data.data.records);

                    }else {
                        aigovApp.utils.closeLoading();
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.utils.closeLoading();
                    aigovApp.nativeFunc.alert(data.message);
                }
            },function(){
                aigovApp.utils.closeLoading();
                aigovApp.nativeFunc.alert("查询失败");
            });
        },

        // 消费信息查询
        xfxxcx : function(params,url,result1) {
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        var result2 = data.data.records;



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
            curWin.init(appWindow);

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
