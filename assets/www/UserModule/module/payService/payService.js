/**
 * 医疗缴费
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var Reset = function(){};
	//对象私有方法
	Reset.prototype = {

		init:function(winObj){

            var that = this;

            var params = winObj.intent;
            params['hospital_Mark'] = params.hospitalCode;
            params['charge_Status'] = '0';
            var session = $.parseJSON(window.localStorage.account);
            params['userId'] = session.user.userId;
            params['idNo'] = session.user.idCardNo;
            that.queryList(params, 'list1');

            $('.weui_navbar_item').on('tap', function(event) {
            	$(this).addClass('weui_bar_item_on').siblings('.weui_bar_item_on').removeClass('weui_bar_item_on');
            	var item = $(this).data("item");
            	if(item == "2" && $('#list2').html() == "") {
            		params['charge_Status'] = '1';
            		that.queryNot(params);
            	} else if(item == "3" && $('#list3').html() == ""){
            		params['charge_Status'] = '2';
            		that.queryList(params, 'list3');
            	}
            	$('.weui_tab_bd').find(".tab_content").each(function() {
            		if($(this).data("item") === item) {
            			$(this).show();
            		} else {
            			$(this).hide();
            		}
            	});
            });
            
            $('.weui_btn.weui_btn_primary').on('tap', function(event) {
            	var chk_value =[];
            	var all_Amt = 0;
            	$('input[name="ckb"]:checked').each(function(){
            		chk_value.push({
            			"amt" : $(this).attr("data-amt"),
            			"presc_No" : $(this).attr("data-presc_no"),
            			"presc_Seq_No" : $(this).attr("data-presc_seq_no"),
            			"serial_No" : $(this).attr("data-serial_no"),
            			"visit_No" : $(this).attr("data-visit_no")
            		});
            		all_Amt += parseFloat($(this).attr("data-amt"));
            	});
            	if(chk_value.length == 0){
            		aigovApp.nativeFunc.alert("你还未选择任何记录！");
            	} else {
            		var params2 = {
        				"all_Amt" : all_Amt,
            			"hospital_Code" : params.hospitalCode,
            			"patient_Id" : session.user.userId,
            			"pay_List" : {
            				"pay_Info" : chk_value
            			},
            			"pay_Mode" : "0"
            		}
            		var url = PROJECT_URL + "wiseMedical/savePayOrder";
                    aigovApp.utils.openLoading();
                    aigovApp.ajax(url, {"data" : $.toJSON(params2)}, function(data){
                        aigovApp.utils.closeLoading();
                        if (data.code == "0") {
                            if(data.data.result_Code == "0000") {
                            	aigovApp.openAppWindow("openUrl",{title:"支付",url:data.data.alipay_Url});
                            }else {
                            	aigovApp.nativeFunc.alert(data.data.error_Msg);
                            }
                        }else {
                            aigovApp.nativeFunc.alert(data.message);
                        }
                    });
            	}
            });
            
		},

        // 全部
		queryList : function(params, listId){
            var url = PROJECT_URL + "wiseMedical/queryAppPayInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                	var xHtml = '';
                    if (data.data != null) {
                    	var records = data.data;
                    	for (var i = 0; i < records.length; i++) {
                            var record = records[i];
                            xHtml += '<p>'+record.visit_Date+'</p>';
                            xHtml += '<dl>';
                            xHtml += '<dt>'+record.item_Name+'<span>'+record.item_Class+'</span></dt>';
                            xHtml += '<dd>￥'+record.pay_Costs+'</dd>';
                            xHtml += '<div class="cl"></div>';
                            xHtml += '</dl>';
                        }
                    }else {
                    	xHtml = '<dl>暂无数据</dl>';
                    }
                    $('#' + listId).html(xHtml);
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            });
        },

        // 未缴费
        queryNot : function(params){
            var url = PROJECT_URL + "wiseMedical/queryAppPayInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                	var xHtml = '';
                    if (data.data != null) {
                    	var records = data.data;
                    	for (var i = 0; i < records.length; i++) {
                            var record = records[i];
                            xHtml += '<p>'+record.visit_Date+'<input type="checkbox" name="ckb" class="fr" data-selective_payment="'+record.selective_Payment+'" data-serial_no="'+record.serial_No+'" data-amt="'+record.pay_Costs+'" data-presc_no="'+record.presc_No+'" data-presc_seq_no="'+record.presc_Seq_No+'" data-visit_no="'+record.visit_No+'" onclick="clickCkb(this);" /></p>';
                            xHtml += '<dl>';
                            xHtml += '<dt>'+record.item_Name+'<span>'+record.item_Class+'</span></dt>';
                            xHtml += '<dd>￥'+record.pay_Costs+'</dd>';
                            xHtml += '<div class="cl"></div>';
                            xHtml += '</dl>';
                        }
                    	if(xHtml != ''){
                    		$(".weui_btn_area").show();
                    	} else {
                    		$(".weui_btn_area").hide();
                    	}
                    }else {
                    	xHtml = '<dl>暂无数据</dl>';
                    	$(".weui_btn_area").hide();
                    }
                    $('#list2').html(xHtml);
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
            //进行窗口初始化
            var reset = new Reset(appWindow);
            reset.init(appWindow);
		},
		onBack : function(){
			aigovApp.back();
		}

	};

	module.exports = exportsMethods;

});

function clickCkb(ckb){
	var selectivePayment = $(ckb).attr("data-selective_payment");
	if(selectivePayment == '1'){
		$('input[data-selective_payment="1"]').prop("checked", $(ckb).prop('checked'));
	}
}