/**
 * 我的账户
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;
	var reset;

	//定义工具类
	var Reset = function(){};
	//对象私有方法
	Reset.prototype = {

		init:function(){
            var that = this;

            var session = $.parseJSON(window.localStorage.account);
            var cardNo = session.user.cardNum;  //一卡通卡号
            var sfzhm = session.user.idCardNo;  //身份证号码
            if(cardNo){
                // 获取一卡通状态
                var params = {"sfzhm":sfzhm};
                var url = PROJECT_URL + "card/searchCardStatus";
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, params, function(data){
                    aigovApp.utils.closeLoading();
                    if (data.code == "0") {
                        if (data.data.resultCode == "10000") {  //操作成功
                            //获取一卡通卡列表
                            that.queryCardStatus(sfzhm);

                        }else if(data.data.resultCode == "10155") { //办理中
                            $('#ykt0').removeClass('hidden2');
                            $('#ykt0').show();
                        }else {
                            aigovApp.nativeFunc.alert(data.data.message);
                        }
                    }else {
                        aigovApp.nativeFunc.alert(data.message);
                    }
                });
            }else{
                $('#ykt1').removeClass('hidden2');
                $('#ykt1').show();
                $('#applyYkt2').hide();
            }

            $('.cartTitle').on('tap', function(event) {
                if ($(this).data("init") == "1") {  // 我的公积金
                    $(this).data("init","0");
                    if (!sfzhm) {
                        $('#gjj2').removeClass('hidden2');
                        return;
                    }
                    var params = {"idCode":sfzhm,"name":session.user.realName};
                    var url = PROJECT_URL + "user/selectGJJ";
                    aigovApp.utils.openLoading();
                    aigovApp.ajax(url, params, function(data){
                        aigovApp.utils.closeLoading();
                        if (data.code == "0") {
                            if (data.data.datainfo) {
                                $('#dealtime').html(data.data.datainfo.dealtime);
                                $('#monthAdd').html(data.data.datasets[0].monthAdd);
                                $('#sum').html(data.data.datasets[0].sum);
                                $('#gjj1').removeClass('hidden2');
                            }else{
                                $('#gjj2').removeClass('hidden2');
                            }
                        }else {
                            aigovApp.nativeFunc.alert(data.message);
                        }
                    });
                }

                if ($(this).next(".cardInfo2").is(":hidden")) {
                    $(this).next(".cardInfo2").removeClass('hidden2');
                } else {
                    $(this).next(".cardInfo2").addClass('hidden2');
                }

            });

            // 卡余额查询
            $('body').on('tap', '#balanceSeach', function(event) {

            });

            // 充值
            $('body').on('tap', '#rechargeCard', function(event) {
                // aigovApp.openAppWindow('myAccount-cz');
            });

            // 交易查询
            $('body').on('tap', '#paySearchBtn', function(event) {
                var cardNum = $(this).parents(".myAccount1").find('div.curCardNo').html();
                aigovApp.openAppWindow('myAccount-jycx',{"cardNum":cardNum});
            });

            // 口头挂失办理
            $('body').on('tap', '#lossCard', function(event) {
                aigovApp.openAppWindow('myAccount-ktgsbl');
            });

            // 补换卡
            $('body').on('tap', '#changeCard', function(event) {
                aigovApp.openAppWindow('myAccount-bhk');
            });

            // 办卡进度查询
            $('#bkjdcxCard').on('tap', function(event) {
                aigovApp.openAppWindow('myAccount-bkjdcx');
            });

            // 更换手机登陆
            $('#changePhoneLogin').on('tap', function(event) {
                window.localStorage.removeItem("account");
                aigovApp.session.clearSession();
                aigovApp.openAppWindow('login');
            });

            // 申领一卡通
            $('#applyYkt').on('tap', function(event) {
                aigovApp.openAppWindow('myAccount-grsl');
            });
            $('#applyYkt2').on('tap', function(event) {
            	aigovApp.openAppWindow('myAccount-grsl');
            	//aigovApp.openAppWindow('czjl', {"cardNo" : "0200009377"});
            });
            $('#applyYkt3').on('tap', function(event) {
            	aigovApp.openAppWindow('queryCard');
            	//aigovApp.openAppWindow('czjl', {"cardNo" : "0200009377"});
            });

		},

        // 获取一卡通列表
        queryCardStatus : function(idNo) {
            var that = this;
            var params = {"idNo":idNo};
            var url = PROJECT_URL + "card/queryCardStatus";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        that.setCardInfo(data.data.records);
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

        // 设置一卡通列表
        setCardInfo : function(records){
            var xHtml = '';
            for (var i = 0; i < records.record.length; i++) {
                var record = records.record[i];

                xHtml += '<div class="myAccount1 cardInfo2">';
                xHtml += '<div class="padding">';
                xHtml += '<div class="weui_cells">';
                xHtml += '<div class="weui_cell">';
                xHtml += '<div class="weui_cell_bd weui_cell_primary">';
                xHtml += '<p>'+record.masterCardTypeDesc+'</p>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell_ft curCardNo">';
                xHtml += record.cardNo;
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell">';
                xHtml += '<div class="weui_cell_bd weui_cell_primary">';
                xHtml += '<p>卡内余额：<a class="read_nfc">读取</a> </p>';
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell">';
                xHtml += '<div class="weui_cell_bd weui_cell_primary">';
                xHtml += '<p>状态正常</p>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell_ft">';
                xHtml += '有效期：'+record.cardValidity;
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '</div>';
            }
            $('#ykt2').html(xHtml);
            $(".read_nfc").on("tap",function(){
            	window.plugins.NFCScanPlugin.NFCScan();
            })
            $('#ykt2').removeClass('hidden2');
            $('#ykt2').show();
        },

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){

			var params = {};
			var url = "UserModule/module/my/detailInfo/result.json";
			aigovApp.ajax(url, params, function(data){
				aigovApp.nativeFunc.alert("保存成功！");
			});
		},

		validate : function(type){
			var username = $('#username').val();
			var idcard = $('#idcard').val();
			var addr = $('#addr').val();
			var ykth = $('#ykth').val();
			return true;

		},

        cleanData : function() {
            $('#username').val("");
            $('#idcard').val("");
            $('#addr').val("");
            $('#ykth').val("");
            $('#username2').val("");
            $('#code').val("");
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
            reset = new Reset(appWindow);
            reset.init();
		},
		//加载事件
		loading : function(){

		},
		onBack : function(intent){
			if(intent == "login"){
				// 重置页面
				if(!$('#ykt2').hasClass('hidden2')){
					$('#ykt2').addClass('hidden2');
				}
				$(".myAccount1").each(function(){
					if(!$(this).hasClass('hidden2')){
						$(this).addClass('hidden2');
					}
				});
				// 重置事件
				$('.cartTitle').unbind('tap');
				$('body').unbind('tap');
				$('#bkjdcxCard').unbind('tap');
				$('#changePhoneLogin').unbind('tap');
				$('#applyYkt').unbind('tap');
				$('#applyYkt2').unbind('tap');
				$(".read_nfc").unbind('tap');
				// 初始化
				reset.init();
			}

			nfc.removeReadListener();
		}
	};

	module.exports = exportsMethods;

});

// 交易查询
function paySearchBtnFun(cardNum){
    aigovApp.openAppWindow('myAccount-jycx',{"cardNum":cardNum});
}

function goNFC(cardNo){
	if(window.cordova){
		aigovApp.openAppWindow('nfcRead',{"cardNo":cardNo});
	}else{
		aigovApp.openAppWindow("openUrl",{"url":aigovApp.constants.DOWNLOAD_URL});
	}

}
