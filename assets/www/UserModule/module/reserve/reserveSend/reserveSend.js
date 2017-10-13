/**
 * 预约挂号确认
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){
	
	//窗口模块
	var appWindow = require("appWindow");
	
	module.exports = {
		onCreate : function(winObj){
			var phoneNo=aigovApp.session.getSession().user.phoneNo;
			$("#phoneNo").val(phoneNo);
			$("#phoneNo_msg").text("已经向"+winObj.intent.phoneNum+"了发送了短信验证");
			this.loading();
			$("#button_submit").on("click",function(){
				var intent=winObj.intent;
				var url ="";
				var param={
					patientId:intent.patientId,
					hisPatientId:intent.hisPatientId,
					userId:aigovApp.session.getSession().user.userId,
					officeId:"",
					officeCode:intent.deptCode,
					deptName:intent.deptName,
					hospitalId:intent.hospitalId,
					hospitalCode:intent.hospitalCode,
					regDate:intent.hb_Date,
					doctorId:intent.doctor_Id,
					doctorName:intent.doctor_Name,
					doctorCode:intent.doctor_Code,
					medicalCard:intent.cardNum,
					regFee:intent.regFee,
					paymentMode:"0",
					hid:intent.Hid,
					hbTime:intent.hb_Time,
					amPm:intent.am_Pm,
					markType:"",
					sourceType:"1",
					patientName:intent.patientName,
					patientCertNo:intent.patientCertNo,
					optionFlag:"1",
					phone_Num:intent.phoneNum,
					sms_Code:$("#sms_Code").val()
				};
				if(new Date().format("yyyy-MM-dd")==param.regDate){
					aigovApp.nativeFunc.alert("当前不能挂号");
					return;
					param.optionFlag='1';
					url=aigovApp.constants.reserveProperties.OPREGIST_URL;
				}else{
					param.optionFlag='0';
					url=aigovApp.constants.reserveProperties.OPAPPOINT_URL;
				}
				
				aigovApp.utils.openLoading();
				aigovApp.ajax(url, param, function(data){
					aigovApp.utils.closeLoading();
					if(data.code=='0' && data.data ){
						if(data.data.result_Code!="0000"){
							aigovApp.nativeFunc.alert(data.data.error_Msg)
							return;
						}
						var alipay_Url=data.data.alipay_Url;
						appWindow.cleanHistory();
						if(alipay_Url && param.optionFlag=='1' && param.regFee!='0'){
							aigovApp.openAppWindow("openUrl",{title:"支付",url:alipay_Url},false);
						}else{
							aigovApp.openAppWindow("reserveSuccess",data.data.orderId,false);
						}
						
					}else{
						aigovApp.nativeFunc.alert(data.message)
					}
				});
			})
		},
		loading:function(){
			 //设置倒计时时间
			smsTimer.setSecond(60);
	    	 //初始化
			smsTimer.init = "$('#timer').css('display','none');$('#timer').html('<font id=\"colockId\"></font>秒后，可重新获取验证码');$('#msg').css('display','block');$('#msg').html('');";
	    	 //设置开始发送时的提示信息
			smsTimer.startSendTip = "$(\"#msg\").html(\"正在发送..\");";
	    	 //设置开始发送成功时的提示信息
			smsTimer.endSendTip = "$(\"#msg\").html(\"验证码已发送\");";
	    	 //设置计时开始之后做的事情
			smsTimer.startDo = "$('#timer').css('display','block');$('#msg').css('display','none');";
	    	 //设置计时结束之后做的事情
	    	smsTimer.endDo = "$('#timer').html('<a id=\"reSend\"><font color=\"green\">重新获取</font></a>');$(\"#reSend\").on(\"click\",function(){smsTimer.send($(\"#phoneNo\").val(), \"phoneApp\")});";
	    	 //验证码发送失败提示信息
	    	smsTimer.errorMsg = "$(\"#msg\").html(\"验证码发送失败\");";
	    	 //设置计时器ID
	    	smsTimer.clockId = "colockId";
	    	//发送验证码
	    	smsTimer.stop();
	    	var code = smsTimer.send($("#phoneNo").val());
	    	 
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }
		
	};
	
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02
	// 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	Date.prototype.format = function(fmt){
	  var o = { 
	    "M+" : this.getMonth()+1,                 // 月份
	    "d+" : this.getDate(),                    // 日
	    "h+" : this.getHours(),                   // 小时
	    "m+" : this.getMinutes(),                 // 分
	    "s+" : this.getSeconds(),                 // 秒
	    "q+" : Math.floor((this.getMonth()+3)/3), // 季度
	    "S"  : this.getMilliseconds()             // 毫秒
	  }; 
	  if(/(y+)/.test(fmt)) 
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	  for(var k in o) 
	    if(new RegExp("("+ k +")").test(fmt)) 
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	  return fmt; 
	}
	
	window.smsTimer = require("aiSmsTimer");

});
