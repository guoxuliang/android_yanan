﻿﻿﻿﻿﻿/**
 * 我的账户--卡余额查询
 * @author chenyp
 */
;define(function(require, exports, module){

    var $ = jQuery;

    //定义工具类
    var CurWin = function(){};
    //对象私有方法
    CurWin.prototype = {
        appWindow:null,
        hospitalId:null,
        module:null,
        account:null,
        nameHid:function(name){
            if(name==null||name==undefined||name==''){
                return '';
            }
            var newName = '';
            if(name.length==1){
                newName = name+'医生';
            }else if(name.length==2){
                newName = name.substring(0,1)+'*医生';
            }else{
                newName = name.substring(0,1)+'**医生';
            }
            return newName;
        },
        init:function(winObj){

            var that = this;

            that.account = $.parseJSON(window.localStorage.account);

            Handlebars.registerHelper("showCancel",function(operateType,status,options){
                if((operateType=='0'||operateType=='1')&&status=='1'){
                    return options.fn(this);
                }else{
                    return options.inverse(this);
                }
            });

            Handlebars.registerHelper("visitStatusName",function(operateType,status,payStatus){

            	var state="";
                if(status=='1' && operateType=='0'){
                    state += '预约成功';
                }
                if(status=='1' && operateType=='1'){
                    state += '挂号成功';
                }
                if(status=='1' && operateType=='3' ){
                    state += '预约已取消';
                }
                if(status=='1' && operateType=='4'){
                    state += '挂号已取消';
                    if(payStatus=='30'){
                    	state+='(已退款)';
                    }
                }
                if(status=='2'){
                    state += '预约失败';
                    if(payStatus=='30'){
                    	state += "(已退款)";
                    }
                    if(payStatus=='20'){
                    	state += "(已支付)";
                    }
                }


               /* <c:if test="${bean.status=='1' && bean.operateType=='0' }">
                	<button class="btn_ApplyRefund" onclick="canalOrder(this,${bean.id})">取消预约</button>
                </c:if>
				<c:if test="${bean.status=='1' && bean.operateType=='1' }"><button class="btn_ApplyRefund" onclick="canalOrder(this,${bean.id})">取消挂号</button></c:if>
				<c:if test="${bean.status=='2'}"><c:if test="${bean.payStatus=='20'}"><button class="btn_ApplyRefund" onclick="refundFee(this,${bean.id})">申请退款</button></c:if></c:if>
                */
                return state;
            });

            Handlebars.registerHelper("dateDayFormat",function(date){
                return moment(date).format('YYYY-MM-DD');
            });

            Handlebars.registerHelper("nameHidden",function(name){
                if(name==null||name==undefined||name==''){
                    return '';
                }
                var newName = '';
                if(name.length==1){
                    newName = name+'医生';
                }else if(name.length==2){
                    newName = name.substring(0,1)+'*医生';
                }else{
                    newName = name.substring(0,1)+'**医生';
                }
                return newName;
            });


            Handlebars.registerHelper("dateLast",function(date){
                var s = (new Date(date)).getTime() - (new Date()).getTime();
                var day = s/1000/60/60/24
                return Math.ceil(day);
            });

            that.appWindow=winObj;

            $('.cartTitle').on('tap', function(event) {
            	if($(this).next(".contentDiv").length > 0){
                    if ($(this).next(".contentDiv").is(":hidden")) {
                        var content = $(this).next(".contentDiv");
                        content.show();
                        var btn = content.find('.allListBtn');
                        if(btn.length==0){
                            btn = content.find('#orderAllBtn');
                        }
                        if(btn.is(":hidden")&&content.find('.noListBtn').is(":hidden")){
                            var type = content.find('.list').data('type');
                            if(type=='order'){
                                that.queryOrder();
                            }else if(type=='crb'){
                                that.queryCRB();
                            }else if(type=='tj'){
                                that.queryTJ();
                            }else if(type=='xt'){
                                that.queryXT();
                            }else if(type=='xy'){
                                that.queryXY();
                            }else if(type=='ym'){
                                that.queryYM();
                            }else if(type=='zl'){
                                that.queryZL();
                            }
                        }
                        $(this).children('span:first-child').children('i').removeClass('fa-angle-right').addClass('fa-angle-down');
                    } else {
                        $(this).next(".contentDiv").hide();
                        $(this).children('span:first-child').children('i').removeClass('fa-angle-down').addClass('fa-angle-right');
                    }
            	} else {
            		if($(this).attr("id") == "healthcare"){
            			aigovApp.openAppWindow('healthcare');
            		}else if($(this).attr("id") == "myOrder"){
            			var params = {
                			"patientName":aigovApp.session.getSession().user.realName/*"张一天"*/,
                			"mobile":aigovApp.session.getSession().user.phoneNo/*"13584675644"*/,
                			"tid":aigovApp.session.getSession().user.userId/*"6654"*/,
                			"idcard":aigovApp.session.getSession().user.idCardNo/*"330101199912249351"*/
                		};
                		var url= PROJECT_URL+"ngariHealth/createPageUrl";
                		aigovApp.utils.openLoading();
                		aigovApp.ajax(url, params, function(data){
                            aigovApp.utils.closeLoading();
                            window.plugins.webPlugin.open("我的预约",data.data + "&module=userAppointIndex");
                		});
            		}else{
            			window.plugins.webPlugin.open("健康小屋","http://health.xy12345.cn/mps/mps/healthHouseLogin/login.html");
            		}
            	}
            });

            $('.title_icon .fr').hide();

            /*$('#myInfoBtn').click(function(){
                aigovApp.openAppWindow('myHealthyInfo');
            });*/

            /*$('#myNoticeBtn').click(function(){
                aigovApp.openAppWindow('myHealthyNotice');
            });*/

            /*$('#myMessageBtn').click(function(){
                //我的评价
                //aigovApp.openAppWindow('myHealthyMessage');
                aigovApp.openAppWindow('evaluate');
            });*/

            /*$('#myMemberBtn').click(function(){
                aigovApp.openAppWindow('memberList');
            });*/

            $('#orderAllBtn').click(function(){
                aigovApp.openAppWindow('myHealthyOrderList');
            });

            $('.allListBtn').click(function(){
                var me = $(this);
                var type = me.data('type');
                var pageParam = {
                        type:type
                }
                aigovApp.openAppWindow('myHealthyList',pageParam);
            });


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

            //获取数据
            that.queryOrder();

            //获取其他数据
            that.queryOther();
        },

        load : function(){
            var that = this;
            var url = aigovApp.constants.my.MY_APPOINT_ORDER;
            var params = {
                    patientId:'000000578050',
                    hospitalMark:'435631450'
            };
            aigovApp.ajax(url, params, function(d){
                if(d.data&&d.data.length>0){
                    var tpl   =  $("#tplAppointOrder").html();
                    var template = Handlebars.compile(tpl);
                    var html = template(d);
                    $('#appointOrderListDiv').append(html);
                    that.bindEvent();
                }else{
                    $('#appointOrderListDiv').append('查无记录');
                }


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
        },

        //查询预约
        queryOrder : function(){
            var that = this;

            var params ={
                userId:that.account.user.userId,
                isToday: true
            };

            var url=aigovApp.constants.my.MY_HEALTH_ORDER;
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(d){
                aigovApp.utils.closeLoading();
                if(d.code == "0" && d.data != null){
                    var newData = [];
                    if(d.data.length>0){
                        for(var i = 0;i<d.data.length;i++){
                            newData.push(d.data[i]);
                            if(newData.length==3){
                                break;
                            }
                        }
                    }

                    if(newData.length==0){
                        $('#orderAllBtn').parent().find('.noListBtn').show();
                        return false;
                    }else{
                        $('#orderAllBtn').show();
                    }

                    var tpl   =  $("#tplAppointOrder").html();
                    var template = Handlebars.compile(tpl);
                    var html = template({data:newData});

                    $('#orderList').html(html);

                    $('.cancelOrder').click(function(){
                    	var me = $(this);
                    	aigovApp.nativeFunc.confirm('您确定要取消吗？',function(buttonKey){
                    		if(buttonKey == '1'){
            					var type = me.data('type');
            					var orderId = me.data('order-id');
            					var hospitalCode = me.data('hospital-code');
            					var appointNo = me.data('appoint-no');
            					var receiptNo = me.data('receipt-no');
            					var hisPatientId = me.data('his-patient-id');
            					var orderFee = me.data('order-fee');
            					var hid = me.data('hid');
            					var idNo = me.data('id-no');
            					var patientName = me.data('patient-name');
            					var officeCode = me.data('office-code');
            					var officeName = me.data('office-name');
            					var doctorCode = me.data('doctor-code');
            					var doctorName = me.data('doctor-name');
            					var hbDate = me.data('app-time');
            					var amPm = me.data('am-pm');
            					var hmCardNo = me.data('attend-card-num');
            					var hospitalName = me.data('hospital-name');
            					var doctorLevel = me.data('doctor-level');
            					var paymentMode = me.data('payment-mode');
            					var status = me.data('status');

            					//查询是否可以取消
            					var urlIsCancel=aigovApp.constants.my.MY_HEALTH_ORDER_CAN_CANCEL;
            					var params1 ={
            						'hospitalCode':hospitalCode,
            						'patient_Id':hisPatientId
            		    		};
            					//预约
            					if(type=="0"){
            						params1['visit_No']=appointNo;
            					//挂号
            					}else if(type=="1"){
            						params1['visit_No']=appointNo;
            						params1['receipt_No']=receiptNo;
            					}
            		        	aigovApp.utils.openLoading();
            		    		aigovApp.ajax(urlIsCancel, params1, function(data1){
            		    			if(data1.code == "0" && data1.data != null){
            		    				//预约取消
            		    				if(type==0){
            		    					//可以取消
            		    					if(data1.data.visit_Status == "0"){
                		    					var urlOPAPPOINT=aigovApp.constants.my.MY_HEALTH_ORDER_CANCEL_OPAPPOINT;
                		    					var params2 ={
            		    							'hospital_Mark':hospitalCode,
                		    						'hid':hid,
                		    						'id_No':idNo,
                		    						'patient_Name':patientName,
                		    						'patient_Id':hisPatientId,
                		    						'dept_Code':officeCode,
                		    						'dept_Name':officeName,
                		    						'doctor_Code':doctorCode,
                		    						'doctor_Name':doctorName,
                		    						'hb_Date':hbDate,
                		    						'am_Pm':amPm,
                		    						'operate_Type':'1',//撤销
                		    						'flow_No':orderId,
                		    						'hm_Card_No':hmCardNo,
            		    							'appoint_No':appointNo
                		    		    		};
                		    		    		aigovApp.ajax(urlOPAPPOINT, params2, function(data2){
                		    		    			if(data2.code == "0" && data2.data != null){
                		    		    				if(data2.data.result_Code == "0000"){
                		    		    					var updateOrderUrl = PROJECT_URL + "wiseMedical/updateOrder";
                		    		    					var params3 = {
                		    		    						'orderId':orderId,
                		    		    						'status':status,
                		    		    						'operateType':'3',
                		    		    						'appointNo':appointNo
                		    		    					}
                		    		    					aigovApp.ajax(updateOrderUrl, params3, function(data3){
                		    		    						if(data3.code == "0" && data3.data != null){
                		    		    							if(data3.data.result_Code == "0000"){
                		    		    								aigovApp.utils.closeLoading();
                		    		    								var params4 = {
            		    		    		    							'orderId':orderId,
            		    		    		    							'patientName':patientName,
            		    		    		    							'hospitalName':hospitalName,
            		    		    		    							'doctorName':doctorName,
            		    		    		    							'doctorLevel':doctorLevel,
            		    		    		    							'orderFee':orderFee,
            		    		    		    							'amPm':amPm,
            		    		    		    							'paymentMode':paymentMode,
            		    		    		    							'status':status
            		    		    		    						}
            		    		    		    						aigovApp.openAppWindow('myHealthyQxSuccess',params4);
                		    		    							} else {
                		    		    								aigovApp.utils.closeLoading();
                        		    		    						aigovApp.nativeFunc.alert(data3.data.error_Msg);
                		    		    							}
                		    		    						} else {
                		    		    							aigovApp.utils.closeLoading();
                	        		    		    				aigovApp.nativeFunc.alert(data3.message);
                    		    		    					}
                		    		    					});
            		    		    					} else {
            		    		    						aigovApp.utils.closeLoading();
            		    		    						aigovApp.nativeFunc.alert(data2.data.error_Msg);
            		    		    					}
                		    		    			}else{
                		    		    				aigovApp.utils.closeLoading();
                		    		    				aigovApp.nativeFunc.alert(data2.message);
                		    		    			}
                		    		    		});
                                        	} else {
                                        		aigovApp.utils.closeLoading();
                                        		aigovApp.nativeFunc.alert("该订单无法取消!");
                                        	}
            		    				// 挂号取消
            		    				}else if(type==1){
            		    					if(data1.data.visit_Status == "1"){
                                                if(orderFee == "0"){
                                                    //费用==0  挂号取消
                                                	var url = PROJECT_URL + "wiseMedical/opRegist";
                                                	var params2 ={
                		    							'hospital_Mark':hospitalCode,
                    		    						'hid':hid,
                    		    						'patient_Id':hisPatientId,
                    		    						'dept_Code':officeCode,
                    		    						'dept_Name':officeName,
                    		    						'doctor_Code':doctorCode,
                    		    						'doctor_Name':doctorName,
                    		    						'hb_Date':hbDate,
                    		    						'am_Pm':amPm,
                    		    						'operate_Type':'1',//撤销
                    		    						'flow_No':orderId,
                    		    						'hm_Card_No':hmCardNo,
                    		    						'sum_Fee':orderFee,
                    		    						'pay_Way':paymentMode
                    		    		    		};
                                                    aigovApp.ajax(url, params2, function(data2){
                                                        if (data2.code == "0" && data2.data != null) {
                                                            if (data2.data.result_Code == "0000") {
                                                            	var updateOrderUrl = PROJECT_URL + "wiseMedical/updateOrder";
                    		    		    					var params3 = {
                    		    		    						'orderId':orderId,
                    		    		    						'status':status,
                    		    		    						'operateType':'4',
                    		    		    						'receiptNo':receiptNo
                    		    		    					}
                    		    		    					aigovApp.ajax(updateOrderUrl, params3, function(data3){
                    		    		    						if(data3.code == "0" && data3.data != null){
                    		    		    							if(data3.data.result_Code == "0000"){
                    		    		    								aigovApp.utils.closeLoading();
                    		    		    								var params4 = {
                		    		    		    							'orderId':orderId,
                		    		    		    							'patientName':patientName,
                		    		    		    							'hospitalName':hospitalName,
                		    		    		    							'doctorName':doctorName,
                		    		    		    							'doctorLevel':doctorLevel,
                		    		    		    							'orderFee':orderFee,
                		    		    		    							'amPm':amPm,
                		    		    		    							'paymentMode':paymentMode,
                		    		    		    							'status':status
                		    		    		    						}
                		    		    		    						aigovApp.openAppWindow('myHealthyQxSuccess',params4);
                    		    		    							} else {
                    		    		    								aigovApp.utils.closeLoading();
                            		    		    						aigovApp.nativeFunc.alert(data3.data.error_Msg);
                    		    		    							}
                    		    		    						} else {
                    		    		    							aigovApp.utils.closeLoading();
                    	        		    		    				aigovApp.nativeFunc.alert(data3.message);
                        		    		    					}
                    		    		    					});
                                                            }else {zzzzzz
                                                            	aigovApp.utils.closeLoading();
                                                                aigovApp.nativeFunc.alert(data2.data.error_Msg);
                                                            }
                                                        }else {
                                                        	aigovApp.utils.closeLoading();
                                                            aigovApp.nativeFunc.alert(data2.message);
                                                        }
                                                    });
                                                }else {
                                                    //费用不为0 调用退费
                                                    var urlAlipayRefund=aigovApp.constants.my.MY_HEALTH_ORDER_CANCEL_ALIPAYREFUND;
                                                    var params2 ={
                                                    	orderId:orderId
                                                    };
                                                    aigovApp.ajax(urlAlipayRefund, params2, function(data2){
                                                        if(data2.code == "0" && data2.data != null){
                                                        	if (data2.data.result_Code == "0000") {
                                                        		var params3 = {
                		    		    							'orderId':orderId,
                		    		    							'patientName':patientName,
                		    		    							'hospitalName':hospitalName,
                		    		    							'doctorName':doctorName,
                		    		    							'doctorLevel':doctorLevel,
                		    		    							'orderFee':orderFee,
                		    		    							'amPm':amPm,
                		    		    							'paymentMode':paymentMode,
                		    		    							'status':status
                		    		    						}
                                                                aigovApp.openAppWindow('myHealthyQxSuccess',params3);
                                                            }else {
                                                            	aigovApp.utils.closeLoading();
                                                                aigovApp.nativeFunc.alert(data2.data.error_Msg);
                                                            }
                                                        }else{
                                                        	aigovApp.utils.closeLoading();
                                                            aigovApp.nativeFunc.alert(data2.message);
                                                        }
                                                    });
                                                }
                                            } else {
                                            	aigovApp.utils.closeLoading();
                                            	aigovApp.nativeFunc.alert("该订单无法取消!");
                                            }
            		    				}
            		    			}else{
            		    				aigovApp.utils.closeLoading();
            		    				aigovApp.nativeFunc.alert(data1.message);
            		    			}
            		    		});
                    		}
                    	});
    				});

                }else{
                	aigovApp.nativeFunc.alert(d.message);
                }
            });
        },
        //查询其他选项
        queryOther:function(){
            var tpl   =  $("#tplListItem").html();
            var template = Handlebars.compile(tpl);
            var that = this;
            //传染病
            that.queryCRB = function(){

                var idCardNo = that.account.user.idCardNo;
                if (!idCardNo) {
                    var p = $('#crbList').parent();
                    p.find('.noListBtn').show();
                    return;
                }
                var paramsQuery ={
                        healthArchivesNo:idCardNo
                };

                var url=aigovApp.constants.my.MY_HEALTH_CRB;
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, paramsQuery, function(d){
                    aigovApp.utils.closeLoading();
                    if(d.code==0){
                        var data = d.data;
                        var p = $('#crbList').parent();
                        if (data == null) {
                            p.find('.noListBtn').show();
                            return ;
                        }else {
                            if(data.length>0){
                                var newList = [];
                                var length = data.length;
                                if(length>3){
                                    length = 3;
                                }
                                for(var i = 0;i<length;i++){
                                    var d = data[i];
                                    newList.push({
                                        type:'crb',
                                        id:d.infectionReporId,
                                        time:d.reportDateDesc,
                                        data1:d.reportOrgName,
                                        data2:d.infectionTypeName
                                    })
                                }

                                if(newList.length==0){
                                    p.find('.noListBtn').show();
                                    return ;
                                }else{
                                    p.find('.allListBtn').show();
                                }

                                var html = template({data:newList});
                                $('#crbList .item').append(html);

                                $('.detailBtncrb').click(function(){
                                    var me = $(this);
                                    var id = me.data('id');
                                    var pageParam = {
                                            id:id
                                    }
                                    aigovApp.openAppWindow('myHealthyCRB',pageParam);
                                });
                            }else {
                                p.find('.noListBtn').show();
                                return ;
                            }
                        }
                    }else{
                        aigovApp.nativeFunc.alert("查询失败!");
                    }
                });
            }
            //体检
            that.queryTJ = function(){

                var idCardNo = that.account.user.idCardNo;
                if (!idCardNo) {
                    var p = $('#tjList').parent();
                    p.find('.noListBtn').show();
                    return;
                }
                var paramsQuery ={
                        healthArchivesNo:idCardNo
                };

                var url=aigovApp.constants.my.MY_HEALTH_TJ;
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, paramsQuery, function(d){
                    aigovApp.utils.closeLoading();
                    if(d.code==0){
                        var data = d.data;
                        var p = $('#tjList').parent();
                        if (data == null) {
                            p.find('.noListBtn').show();
                            return ;
                        }
                        if(data.length>0){
                            var newList = [];
                            var length = data.length;
                            if(length>3){
                                length = 3;
                            }
                            for(var i = 0;i<length;i++){
                                var d = data[i];
                                /*newList.push({
                                    type:'tj',
                                    id:d.healthExamId,
                                    time:d.examDateDesc,
                                    data1:d.orgName
                                })*/
                                newList.push({
                                    type:'tj',
                                    id:d.healthArchivesNo,
                                    time:d.examDate,
                                    data1:d.examOrgName,
                                    data2:d.totalFee+'元'
                                })
                            }

                            if(newList.length==0){
                                p.find('.noListBtn').show();
                                return ;
                            }else{
                                p.find('.allListBtn').show();
                            }

                            var html = template({data:newList});
                            $('#tjList .item').append(html);

                            $('.detailBtntj').click(function(){
                                var me = $(this);
                                var id = me.data('id');
                                var pageParam = {
                                        id:id
                                }
                                aigovApp.openAppWindow('myHealthyTJ',pageParam);
                            });
                        }
                    }else{
                        aigovApp.nativeFunc.alert("查询失败!");
                    }
                });
            }
            //血糖
            that.queryXT = function(){

                var idCardNo = that.account.user.idCardNo;
                if (!idCardNo) {
                    var p = $('#xtList').parent();
                    p.find('.noListBtn').show();
                    return;
                }
                var paramsQuery ={
                        healthArchivesNo:idCardNo
                };

                var url=aigovApp.constants.my.MY_HEALTH_XT;
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, paramsQuery, function(d){
                    aigovApp.utils.closeLoading();
                    if(d.code==0){
                        var data = d.data;
                        var p = $('#xtList').parent();
                        if (data == null || data.length == 0) {
                            p.find('.noListBtn').show();
                            return ;
                        }
                        if(data.length>0){
                            var newList = [];
                            var length = data.length;
                            if(length>3){
                                length = 3;
                            }
                            for(var i = 0;i<length;i++){
                                var d = data[i];
                                newList.push({
                                    type:'xt',
                                    id:d.diabetes2FollowupId,
                                    time:d.thisFollowupDateDesc,
                                    data1:d.refertoOrgName,
                                    data2:'空腹血糖值:'+(d.fbg||'')+" 餐后两小时血糖值:"+(d.pbg||'')
                                })
                            }

                            if(newList.length==0){
                                p.find('.noListBtn').show();
                                return ;
                            }else{
                                p.find('.allListBtn').show();
                            }

                            var html = template({data:newList});
                            $('#xtList .item').append(html);

                            $('.detailBtnxt').click(function(){
                                var me = $(this);
                                var id = me.data('id');
                                var pageParam = {
                                        id:id
                                }
                                aigovApp.openAppWindow('myHealthyXT',pageParam);
                            });
                        }
                    }else{
                        aigovApp.nativeFunc.alert("查询失败!");
                    }
                });
            }
            //血压
            that.queryXY = function(){
                var idCardNo = that.account.user.idCardNo;
                if (!idCardNo) {
                    var p = $('#xyList').parent();
                    p.find('.noListBtn').show();
                    return;
                }
                var paramsQuery ={
                        healthArchivesNo:idCardNo
                };

                var url=aigovApp.constants.my.MY_HEALTH_XY;
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, paramsQuery, function(d){
                    aigovApp.utils.closeLoading();
                    if(d.code==0){
                        var data = d.data;
                        var p = $('#xyList').parent();
                        if (data == null) {
                            p.find('.noListBtn').show();
                            return ;
                        }
                        if(data.length>0){
                            var newList = [];
                            var length = data.length;
                            if(length>3){
                                length = 3;
                            }
                            for(var i = 0;i<length;i++){
                                var d = data[i];
                                newList.push({
                                    type:'xy',
                                    id:d.hypertensionFollowupId,
                                    time:d.thisFollowupDateDesc,
                                    data1:d.refertoOrgName,
                                    data2:'收缩压:'+(d.sbp||'')+" 舒张压:"+(d.dbp||'')
                                })
                            }

                            if(newList.length==0){
                                p.find('.noListBtn').show();
                                return ;
                            }else{
                                p.find('.allListBtn').show();
                            }

                            var html = template({data:newList});
                            $('#xyList .item').append(html);

                            $('.detailBtnxy').click(function(){
                                var me = $(this);
                                var id = me.data('id');
                                var pageParam = {
                                        id:id
                                }
                                aigovApp.openAppWindow('myHealthyXY',pageParam);
                            });
                        }
                    }else{
                        aigovApp.nativeFunc.alert("查询失败!");
                    }
                });
            }
            //疫苗
            that.queryYM = function(){
                var idCardNo = that.account.user.idCardNo;
                if (!idCardNo) {
                    var p = $('#ymList').parent();
                    p.find('.noListBtn').show();
                    return;
                }
                var paramsQuery ={
                        healthArchivesNo:idCardNo
                };

                var url=aigovApp.constants.my.MY_HEALTH_YM;
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, paramsQuery, function(d){
                    aigovApp.utils.closeLoading();
                    if(d.code==0){
                        var data = d.data;
                        var p = $('#ymList').parent();
                        if (data == null) {
                            p.find('.noListBtn').show();
                            return ;
                        }
                        if(data.length>0){
                            var newList = [];
                            var length = data.length;
                            if(length>3){
                                length = 3;
                            }
                            for(var i = 0;i<length;i++){
                                var d = data[i];
                                newList.push({
                                    type:'ym',
                                    id:d.vaccRecordId,
                                    time:d.vaccinateDateDesc,
                                    data1:d.vaccineName,
                                    data2:d.vaccinateOrgName
                                })
                            }

                            if(newList.length==0){
                                p.find('.noListBtn').show();
                                return ;
                            }else{
                                p.find('.allListBtn').show();
                            }

                            var html = template({data:newList});
                            $('#ymList .item').append(html);

                            $('.detailBtnym').click(function(){
                                var me = $(this);
                                var id = me.data('id');
                                var pageParam = {
                                        id:id
                                }
                                aigovApp.openAppWindow('myHealthyYM',pageParam);
                            });
                        }
                    }else{
                        aigovApp.nativeFunc.alert("查询失败!");
                    }
                });
            }

            //诊疗
            that.queryZL = function(){

                var idCardNo = that.account.user.idCardNo;
                if (!idCardNo) {
                    var p = $('#zlList').parent();
                    p.find('.noListBtn').show();
                    return;
                }
                var paramsQuery ={
                        healthArchivesNo:idCardNo
                };

                var url=aigovApp.constants.my.MY_HEALTH_ZL;
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, paramsQuery, function(d){
                    aigovApp.utils.closeLoading();
                    if(d.code==0){
                        var data = d.data;
                        var p = $('#zlList').parent();
                        if (data == null) {
                            p.find('.noListBtn').show();
                            return ;
                        }
                        if(data.length>0){
                            var newList = [];
                            var length = data.length;
                            if(length>3){
                                length = 3;
                            }
                            for(var i = 0;i<length;i++){
                                var d = data[i];
                                newList.push({
                                    type:'zl',
                                    id:d.id,
                                    time:d.time,
                                    data1:d.orgName,
                                    //data2:that.nameHid(d.doctorName),
                                    data3:d.diagName,
                                    other:d.flag
                                })
                            }

                            if(newList.length==0){
                                p.find('.noListBtn').show();
                                return ;
                            }else{
                                p.find('.allListBtn').show();
                            }

                            var html = template({data:newList});
                            $('#zlList .item').append(html);

                            $('.detailBtnzl').click(function(){
                                var me = $(this);
                                var id = me.data('id');
                                var flag = me.data('other');
                                var pageParam = {
                                        id:id,
                                        flag:flag
                                }
                                aigovApp.openAppWindow('myHealthyZL',pageParam);
                            });
                        }else{
                            aigovApp.nativeFunc.alert("查询失败!");
                        }
                    }
                });
            }


            //查询
//          queryCRB();
//          queryTJ();
//          queryXT();
//          queryXY();
//          queryYM();
//          queryZL();
        }

    };

    // 获取健康关怀如果存在未坊信息标记小红点
    var healthcare = function(){
        aigovApp.ajax(aigovApp.constants.healthcare.HEALTH_CARE_COUNT_URL, null, function(d){
			if(d.page && d.page.rowCount && d.page.rowCount > 0){
				$("div.health-cricle").addClass("health-cricle1");
				$("div.health-cricle").html(d.page.rowCount);
			}else{
				$("div.health-cricle").removeClass("health-cricle1");
				$("div.health-cricle").html("");
			}
		});
    }

    //模块对外提供的方法
    var exportsMethods = {

    	curWin : null,

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
        onCreate : function(winObj){

            $('#orderAllBtn').hide();
            $('.allListBtn').hide();

            $('.noListBtn').hide();

            this.loading(winObj);

            //进行窗口初始化
            this.curWin = new CurWin(winObj);
            this.curWin.init(winObj);
            healthcare();
        },
        //加载事件
        loading : function(){

        },
        onBack : function(){
        	this.curWin.queryOrder();
        	healthcare();
        }
    };

    module.exports = exportsMethods;

});
