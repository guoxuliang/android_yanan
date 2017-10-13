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

		init:function(winObj){

            var that = this;


            //得到模板（分页）
            /*var params = winObj.intent;
            var windowConfig = aigovApp.config.appWindows[winObj.id];
            var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";
            var documentList = winObj.getComponent('jycxList');
            this.intent=winObj.intent;
            this.module=winObj.intent.module;
            var options = {
                    datasUrl   : PROJECT_URL + "card/queryRechargeInfo",
                    pageCount  : 10,
                    dataParam  : params
                };

            documentList._loadHtml(componentPath + 'template/default.html',function(tplHtml){
                options.recordTpl = tplHtml;
                documentList.init(options);
            });*/
            var params = winObj.intent;
            params.pageCount = "20";
            params.curPageNum = "1";
            that.jyxxcx(params);

            $('.weui_navbar_item').on('tap', function(event) {
            	$(this).addClass('weui_bar_item_on').siblings('.weui_bar_item_on').removeClass('weui_bar_item_on');
            	var item = $(this).data("item");
            	$('.weui_tab_bd').find(".tab_content").each(function(index, el) {
                    if (item == "2" && $('#xfxx').html() == "") {
                        that.xfxxcx(winObj.intent);
                    }else if(item == "3" && $('#jfxx').html() == ""){
                        that.jfxxcx(winObj.intent);
                    }
            		if ($(this).data("item") === item) {
            			$(this).show();
            		}else {
            			$(this).hide();
            		}
            	});
            });

		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){

		},

        // 交易信息查询
        jyxxcx : function(params){
            var url = PROJECT_URL + "card/queryTradeInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        var records = data.data.records.record;
                        var xHtml = '';
                        if (records) {
                            var type = "";
                            for (var i = 0; i < records.length; i++) {
                                var record = records[i];
                                var tradeType = record.tradeType;
                                if (tradeType == "01") {
                                    type = "+";
                                }else if(tradeType == "03"){
                                    type = "-";
                                }
                                xHtml += '<div class="weui_cell">';
                                xHtml += '<label class="w-b-70">'+record.createDate+'</label>';
                                xHtml += '<label class="fr">'+type+record.orderFee+'</label>';
                                xHtml += '</div>';
                            }
                        }else{
                            xHtml = '暂无数据';
                        }
                        $('#jyxx').html(xHtml);
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            });
        },

        // 缴费信息查询
        jfxxcx : function(params){
            params.pageCount = "20";
            params.curPageNum = "1";
            var url = PROJECT_URL + "card/queryRechargeInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        var records = data.data.records.record;
                        var xHtml = '';
                        if (records) {
                            for (var i = 0; i < records.length; i++) {
                                var record = records[i];
                                xHtml += '<div class="weui_cell">';
                                xHtml += '<label class="w-b-70">'+record.createDate+'</label>';
                                xHtml += '<label class="fr">+'+record.orderFee+'</label>';
                                xHtml += '</div>';
                            }
                        }else{
                            xHtml = '暂无数据';
                        }
                        $('#jfxx').html(xHtml);
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            });
        },

        // 消费信息查询
        xfxxcx : function(params){
            params.pageCount = "20";
            params.curPageNum = "1";
            var url = PROJECT_URL + "card/queryConsumeInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        var records = data.data.records.record;
                        var xHtml = '';
                        if (records) {
                            for (var i = 0; i < records.length; i++) {
                                var record = records[i];
                                xHtml += '<div class="weui_cell">';
                                xHtml += '<label class="w-b-70">'+record.createDate+'</label>';
                                xHtml += '<label class="fr">-'+record.orderFee+'</label>';
                                xHtml += '</div>';
                            }
                        }else{
                            xHtml = '暂无数据';
                        }
                        $('#xfxx').html(xHtml);
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
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
            var reset = new Reset(appWindow);
            reset.init(appWindow);

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
