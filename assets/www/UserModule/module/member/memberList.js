/*
 * 就诊人列表
 */
define(function(require, exports, module){

	var appWindow;
	var hospitalCode, hospitalId;
	
	var load = function(){
		if(appWindow.intent){
			hospitalCode = appWindow.intent.hospitalCode;
		}
		var param = {
			userId: aigovApp.session.getSession().user.userId,
			hospitalCode: !hospitalCode ? "" : hospitalCode
		}
		aigovApp.utils.openLoading();
		aigovApp.ajax(aigovApp.constants.member.MEMBER_LIST_URL, param, function(d){
			try{
				if(d.code==0){
					if(d.data){
						var tpl = $("#tpl").html();
						var template = Handlebars.compile(tpl);
						var html = template(d.data);
						$('.ai-body-box').append(html);
					}
					$('#addMember').on('click', add_click);
					$('.modMember').on('click', mod_click);
					$('.delMember').on('click', del_click);
					
					if(appWindow.intent){
						hospitalCode = appWindow.intent.hospitalCode;
						hospitalId = appWindow.intent.hospitalId;
					}
					if(hospitalCode && hospitalId)
						$('.selMember').on('click', sel_click);
				}else{
					aigovApp.nativeFunc.alert("加载列表异常："+ d.message);	
				}
			}catch(e){
				aigovApp.nativeFunc.alert("加载列表异常！"+e);
			}finally {
				//var s = '{"code":0,"message":"操作成功！","data":[{"valid":true,"patientId":"441","birthDate":"34","certCode":"320382198205030441","sex":"0","cardNum":null,"hospitalName":null,"defaultFlag":"0","patientName":"曹瑞杰"},{"valid":true,"patientId":"440","birthDate":"30","certCode":"622723198511130410","sex":"0","cardNum":"42300000000000001","hospitalName":"三原县医院","defaultFlag":"1","patientName":"曹瑞杰"}]}';
				//d = eval("("+s+")"); 
				aigovApp.utils.closeLoading();
			}
		});
	}
	
	var init = function(){
		load();
	}
	
	// 新增就诊人
	var add_click = function(){
		if(!appWindow.intent){
			appWindow.intent = {};
		}
		appWindow.intent.memberId = "";
		aigovApp.openAppWindow("memberEdit", appWindow.intent);
		
	};
	
	// 编辑就诊人
	var mod_click = function(){
		if(!appWindow.intent){
			appWindow.intent = {};
		}
		appWindow.intent.memberId = $(this).data('patientId');
		aigovApp.openAppWindow("memberEdit", appWindow.intent);
	}
	
	var del_click = function(){
		var _this = this;
		$('#ifOut').show();
		$('#cancelBtn').on('click', no);
		$('#sureBtn').on('click', function(){ yes(_this) });
	}
	
	 //取消
    var no = function() {
        $('#ifOut').hide();
    }

    //确认
    var yes = function(e) {
    	var param = {
				patientId: $(e).data('patientId')
			}
			aigovApp.ajax(aigovApp.constants.member.MEMBER_DEL_URL, param, function(d){
				if(d.code==0){
					if(d.data.result_Code == "0000"){	
						aigovApp.openAppWindow("memberList", appWindow.intent);
					}else{
						aigovApp.nativeFunc.alert("删除异常："+ d.data.error_Msg);	
					}
				}else{
					aigovApp.nativeFunc.alert("删除异常："+ d.message);	
				}
			});
    }
	
	var sel_click = function(){
		var param = appWindow.intent;
		param.patientId = $(this).data('patientId');
		param.patientName = $(this).data('patientName');
		param.certCode = $(this).data('certCode');
		param.hisPatientId=$(this).data('hisPatientId');
		param.cardNum= $(this).data('cardNum');
		aigovApp.back(param);
	}

	module.exports = {
		onCreate : function(winObj){
			appWindow = winObj;
			debugger;
			init();
		},
		
	};

});