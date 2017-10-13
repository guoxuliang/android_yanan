/**
 * 预约挂号清单
 */
;define(function(require, exports, module){

	var queryOrder = function(){

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

        Handlebars.registerHelper("dateLast",function(date){
         	var s = (new Date(date)).getTime() - (new Date()).getTime();
         	var day = s/1000/60/60/24
         	return Math.ceil(day);
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

		var account = $.parseJSON(window.localStorage.account);
    	var params ={
			userId:account.user.userId
		};

    	var that = this;

		var url=aigovApp.constants.my.MY_HEALTH_ORDER;
    	aigovApp.utils.openLoading();
		aigovApp.ajax(url, params, function(d){
			aigovApp.utils.closeLoading();
			if(d.code == "0" && d.data != null){
				var tpl   =  $("#tplAppointOrder").html();
				var template = Handlebars.compile(tpl);
				var html = template({data:d.data});

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
                                                        }else {
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
    }

	module.exports = {

		onCreate : function(winObj){
			queryOrder();
		},
        onBack : function(){
        	queryOrder();
        }

	};

});
