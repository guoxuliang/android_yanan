/**
 * 问卷调查
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	var starOn = "UserModule/module/my/doctor/style/images/star-on.png";
	var starOff = "UserModule/module/my/doctor/style/images/star-off.png";

	function calTotal(score, evt) {
		var question1Val = $("#question1Val").val();
		var question2Val = $("#question2Val").val();
		var question3Val = $("#question3Val").val();
		var question4Val = $("#question4Val").val();
		var score = Math.round((Number(question1Val)+Number(question2Val)+Number(question3Val)+Number(question4Val))/4);
		//console.log("score="+score);
		$('#question5').raty({score:score,target:'#question5Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
	}

	function calTotal2(score, evt) {
		var question1Val2 = $("#question1Val2").val();
		var question2Val2 = $("#question2Val2").val();
		var question3Val2 = $("#question3Val2").val();
		var question4Val2 = $("#question4Val2").val();
		var score = Math.round((Number(question1Val2)+Number(question2Val2)+Number(question3Val2)+Number(question4Val2))/4);
		//console.log("score="+score);
		$('#question52').raty({score:score,target:'#question5Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
	}

	function showEvaluate(record){
		//$('#evaluate').removeClass('hidden');
		if (record) {
			var question1 = record.question1;
			$('#question1').raty({score:question1,target:'#question1Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
			var question2 = record.question2;
			$('#question2').raty({score:question2,target:'#question2Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
			var question3 = record.question3;
			$('#question3').raty({score:question3,target:'#question3Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
			var question4 = record.question4;
			$('#question4').raty({score:question4,target:'#question4Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
			var question5 = record.question5;
			$('#question5').raty({score:question5,target:'#question5Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
		}
	}

	//定义工具类
	var CurWin = function(){};
	//对象私有方法
	CurWin.prototype = {

		init:function(winObj){

            var that =this;

            //提交
            $("#submitBtn").on("tap", function(){
            	that.submit(winObj);
            });

		},

		/**
		 * 提交
		 */
		submit : function(winObj){
			var userId = aigovApp.session.getSession().user.userId;
			var orderId = winObj.intent.orderId;
			var doctorCode = winObj.intent.doctorName;//caorj要求使用doctorName代替doctorCode
			var officeCode = winObj.intent.officeCode;
			var hospitalCode = winObj.intent.hospitalCode;
			var patientName = winObj.intent.patientName;
			var treatmentTime = winObj.intent.treatmentTime;
			var question1 = $('#question1Val').val();
			var question2 = $('#question2Val').val();
			var question3 = $('#question3Val').val();
			var question4 = $('#question4Val').val();
			var question5 = $('#question5Val').val();
			var question12 = $('#question1Val2').val();
			var question22 = $('#question2Val2').val();
			var question32 = $('#question3Val2').val();
			var question42 = $('#question4Val2').val();
			var question52 = $('#question5Val2').val();
			question1 = question1 == "" ? "0" : question1;
			question2 = question2 == "" ? "0" : question2;
			question3 = question3 == "" ? "0" : question3;
			question4 = question4 == "" ? "0" : question4;
			question5 = question5 == "" ? "0" : question5;
			question12 = question12 == "" ? "0" : question12;
			question22 = question22 == "" ? "0" : question22;
			question32 = question32 == "" ? "0" : question32;
			question42 = question42 == "" ? "0" : question42;
			question52 = question52 == "" ? "0" : question52;
			var question6 = question12 + question22 + question32 + question42 + question52;
			var question7 = $('#q7').val();
			if(question7.length == 0){
				aigovApp.nativeFunc.alert("请填写你对医生的建议");
				return false;
			}
			if(getFontCount(question7, 200, 'des7')){
				aigovApp.nativeFunc.alert("建议长度不能超过200");
				return false;
			}
			var params ={
				id: $("#id").val(),
				userId: userId,
				orderId: orderId,
				doctorCode: doctorCode,
				officeCode: officeCode,
				hospatilCode: hospitalCode,
				patientName: patientName,
				treatmentTime: treatmentTime,
				paitentCertNo:aigovApp.session.getSession().user.idCardNo,
				question1: question1,
				question2: question2,
				question3: question3,
				question4: question4,
				question5: question5,
				question6: question6,
				question7: question7
			};
			if($("#id").val()!=''){
				var question8 = $('#q8').val();
				if(question8.length == 0){
					aigovApp.nativeFunc.alert("请填写你对医生的建议");
					return false;
				}
				if(getFontCount(question8, 200, 'des8')){
					aigovApp.nativeFunc.alert("建议长度不能超过200");
					return false;
				}
				params.question8 = question8;
			}
			aigovApp.utils.openLoading();
			var url=aigovApp.constants.my.MY_HEALTH_SAVE_QUESTIONNAIRE;
			aigovApp.ajax(url, params, function(data){
				aigovApp.utils.closeLoading();
				if(data.code == 0){
					if(data.data.result_Code == "0000"){
						aigovApp.nativeFunc.alert("谢谢你的关注");
						aigovApp.back();
					} else {
						aigovApp.nativeFunc.alert(data.data.error_Msg);
					}
				} else {
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
		onCreate : function(winObj){
			this.loading(winObj);

            //进行窗口初始化
            var curWin = new CurWin();
            curWin.init(winObj);

		},
		//加载事件
		loading : function(winObj){




			var orderId = winObj.intent.orderId;
			//var doctorCode = winObj.intent.doctorCode;
			var doctorName = winObj.intent.doctorName;
			var officeCode = winObj.intent.officeCode;
			var officeName = winObj.intent.officeName;
			//var hospitalCode = winObj.intent.hospitalCode;
			var hospitalName = winObj.intent.hospitalName;
			var patientName = winObj.intent.patientName;
			var treatmentTime = winObj.intent.treatmentTime;
			//var amPm = winObj.intent.amPm;
			var evaluateStatus = winObj.intent.evaluateStatus;
			var orderTime = winObj.intent.orderTime;
			$("#doctorName").html(doctorName+"医生");
			var html = "就诊医院：" + hospitalName + "<br />";
			html += "就诊科室：" + officeName + "<br />";
			//html += "就诊时间：" + treatmentTime.substring(0, 10) + " " + amPm.replace("门诊", "") + "<br />";
			html += "就诊时间：" + treatmentTime.substring(0, 10) + " " + "<br />";
			html += "就诊人：" + patientName + "<br />";
			$("#details").html(html);
			var status = evaluateStatus == '2' ? '1' : '0';
			var userId = aigovApp.session.getSession().user.userId;
			var params ={
				orderId: orderId,
				userId: userId,
				status: status,
				paitentCertNo:aigovApp.session.getSession().user.idCardNo
//				,doctorCode: doctorName//caorj要求使用doctorName代替doctorCode
//				,hospatilCode: hospitalCode
			};
			aigovApp.utils.openLoading();
			var url=aigovApp.constants.my.MY_HEALTH_QUERY_QUESTIONNAIRE;
			aigovApp.ajax(url, params, function(result){
				aigovApp.utils.closeLoading();

				$('#question1').raty({target:'#question1Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal});
				$('#question2').raty({target:'#question2Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal});
				$('#question3').raty({target:'#question3Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal});
				$('#question4').raty({target:'#question4Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal});
				$('#question5').raty({target:'#question5Val',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal});

				$('#question12').raty({target:'#question1Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal2});
				$('#question22').raty({target:'#question2Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal2});
				$('#question32').raty({target:'#question3Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal2});
				$('#question42').raty({target:'#question4Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal2});
				$('#question52').raty({target:'#question5Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,width:'100%',click: calTotal2});
				//alert("result.code="+result.code);
				if(result.code == 0){
					//已经评价
					//alert("result.data.length="+result.data.length);
					if(result.data!=null && result.data.length > 0){
						var record = result.data[0];
						//alert("record.id="+record.id);
						$("#id").val(record.id);

						//$("input:radio").remove("checked");
						//$("input:radio").attr("disabled","disabled");

						/*var question1 = record.question1;
						$("#q1 input:radio[value="+question1+"]").attr("checked","checked");

						var question2 = record.question2;
						$("#q2 input:radio[value="+question2+"]").attr("checked","checked");

						var question3 = record.question3;
						$("#q3 input:radio[value="+question3+"]").attr("checked","checked");

						var question4 = record.question4;
						$("#q4 input:radio[value="+question4+"]").attr("checked","checked");

						var question5 = record.question5;
						$("#q5 input:radio[value="+question5+"]").attr("checked","checked");

						var question6 = record.question6;
						$("#q6 input:radio[value="+question6+"]").attr("checked","checked");
						*/
						showEvaluate(record);

						var question7 = record.question7;
						$("#q7").val(question7);
						$("#q7").attr("disabled","disabled");
						$("#des7").remove();

						//$("#q8Div").show();
						//第二次平价
						var question8 = record.question8;
						if(question8!=null){
							$("#q8").val(question8);
							$("#q8").attr("disabled","disabled");
							$("#des8").remove();
							$("#submitBtn").remove();

							if (record.question6 != null) {
								$('#evaluate2').removeClass('hidden');
								var questions = record.question6;
								for (var i = 1; i <= questions.length; i++) {
									var score = questions.substring(i-1,i);
									$('#question'+i+'2').raty({score:score,target:'#question'+i+'Val2',targetType:'number',targetKeep:true,starOn:starOn,starOff:starOff,readOnly: true,width:'100%'});
								}
							}
						}else{
							$('#evaluate2').removeClass('hidden');
						}
					}
				}

				//超过一个月不能评价
				var lastMonthDate = dateAdd(new Date(),"month",-1);//上个月当前日期
				var lastMonthDateStr = lastMonthDate.format("yyyy-MM-dd");
				if(orderTime!=null && orderTime.length>10){
					var dt = orderTime.substring(0,10);
					if(dt<lastMonthDateStr){
						//$("input:radio").attr("disabled","disabled");
						$("#q7").attr("disabled","disabled");
						$("#q8").attr("disabled","disabled");
						$("#submitBtn").remove();

						if(evaluateStatus==""){
							aigovApp.nativeFunc.alert("超过一个月不能再评价！");
						}
					}
				}
			});
		}
	};

	module.exports = exportsMethods;

});


