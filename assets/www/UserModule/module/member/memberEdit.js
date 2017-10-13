/*
 * 编辑就诊人信息
 */
define(function(require, exports, module){

	var appWindow;
	var userId, name, sex, phone, birthday, age, idNo, cardNo, isDefault, memberId, hospitalMemberId, hospitalId, hospitalCode, hospitalName;
	
	var init = function(){
		debugger;
		memberId = "";
				
		if(appWindow.intent && appWindow.intent.memberId){
			// 编辑
			memberId = appWindow.intent.memberId;
			loadEdit();
			$('#divHospital').attr('style', 'display:none');
			$('#divCard').attr('style', 'display:none');
		}else{
			// 新增
			if(appWindow.intent){
				hospitalCode = appWindow.intent.hospitalCode;
				hospitalId = appWindow.intent.hospitalId;
				hospitalName = appWindow.intent.hospitalName;
			}
		}
	
		loadhospital();
		$('#btnCard').on('click', card_click);
		$('#btnSubmit').on('click', submit_click);
		$('#idNo').on('keyup', function() {
			var birDayCode;
			if($(this).val().length == 15)
				birDayCode = $(this).val().substring(6,12);
			else if($(this).val().length == 18)
				birDayCode = $(this).val().substring(6,14);
			else
				return;
			var yyyy = birDayCode.substring(0,4);
			var mm = birDayCode.substring(4,6);
			var dd = birDayCode.substring(6);
		    $('#birthday').val(yyyy+"-"+mm+"-"+dd);
		});
	}
	
	var loadEdit = function(){
		var param = {
				paitentId: memberId,
		}
		aigovApp.utils.openLoading();
		aigovApp.ajax(aigovApp.constants.member.MEMBER_DETAIL_URL, param, function(d){
			try{
				if(d.code==0){
					if(d.data){
						$('#name').val(d.data.patientName);
						$('#sex').val(d.data.sex == '男' ? "0" : "1");
						$('#phone').val(d.data.phoneNum);
						$('#birthday').val(d.data.birthDate);
						$('#idNo').val(d.data.certCode);
						$('#isDefault').val(d.data.defaultFlag);
					}
				}else{
					aigovApp.nativeFunc.alert("加载就诊人信息异常："+ d.message);	
				}
			}catch(e){
				aigovApp.nativeFunc.alert("加载就诊人信息异常！"+e);
			}finally {
				aigovApp.utils.closeLoading();
			}
		});
	}
	
	var loadhospital = function(){
		if(memberId){
			// 编辑不加载医院
			return;
		}
		
		if(hospitalCode && hospitalId && hospitalName){
			// 有传入医院参数时只显示该医院
			var list = [];
			var item = {};
			item.hospitalId = hospitalId;
			item.hospitalCode = hospitalCode;
			item.hospitalName = hospitalName;
			list.push(item);
			var tpl = $("#tpl").html();
			var template = Handlebars.compile(tpl);
			var html = template(list);
			$('#hospital').append(html);
			return;
		}
		
		var param = {
			pageCount: 100,
			curPageNum: 1,
		}
		aigovApp.utils.openLoading();
		aigovApp.ajax(aigovApp.constants.hospitalProperties.HOSPITAL_LIST_URL, param, function(d){
			try{
				if(d.code==0){
					if(d.data){
						var tpl = $("#tpl").html();
						var template = Handlebars.compile(tpl);
						var html = template(d.data);
						$('#hospital').append(html);
						if(hospitalId && hospitalCode)
							$('#hospital').val(hospitalId+"_"+hospitalCode);
						
					}
				}else{
					aigovApp.nativeFunc.alert("加载医院异常："+ d.message);	
				}
			}catch(e){
				aigovApp.nativeFunc.alert("加载医院异常！"+e);
			}finally {
				aigovApp.utils.closeLoading();
			}
		});
	}
	
	var card_click = function(){
			var idCode = $( "#hospitalId option:selected" ).val();
			
			if(!idCode || idCode == ""){
				aigovApp.nativeFunc.alert("医院编码不能为空！");
				return;
			}
			if(!$('#name').val() || $('#name').val() == ""){
				aigovApp.nativeFunc.alert("姓名不能为空！");
				return;
			}
			if(!$('#idNo').val() || $('#idNo').val() == ""){
				aigovApp.nativeFunc.alert("身份证不能为空！");
				return;
			}
			if(!idCardNoUtil.checkIdCardNo($('#idNo').val())){
				aigovApp.nativeFunc.alert("身份证不正确！");
				return;
			}
			if(!$("#sex option:selected").val() || $("#sex option:selected").val() == ""){
				aigovApp.nativeFunc.alert("性别不能为空！");
				return;
			}
			if(!$('#birthday').val() || $('#birthday').val() == ""){
				aigovApp.nativeFunc.alert("生日不能为空！");
				return;
			}
			var yyyy = parseInt($('#birthday').val().substring(0,4),10);
			var mm = parseInt($('#birthday').val().substring(5,7),10);
			var dd = parseInt($('#birthday').val().substring(8),10);
			var xdata = new Date(yyyy,mm-1,dd);
			if(xdata > new Date()){
				aigovApp.nativeFunc.alert("生日不正确！");
				return;
			}
			
			hospitalId = idCode.split('_')[0];
			hospitalCode = idCode.split('_')[1];
			name = $('#name').val();
			idNo = $('#idNo').val();
			sex = $("#sex option:selected").val();
			birthday = $('#birthday').val();
			var d = new Date();
			var y = d.getFullYear();
			var brithy = birthday.substr(0,4);
			age = y-brithy-1;
			
			var param = {
					hospital_Mark: hospitalCode,
					patient_Name:  name,
					id_No:         idNo,
					sex:           sex == "0" ? "1" :"2",
					birthdate:     birthday,
					age:           age
			}
			aigovApp.utils.openLoading();
			aigovApp.ajax(aigovApp.constants.member.MEMBER_CARD_URL, param, function(d){
				try{
					if(d.code==0){
						if(d.data){	
							$('#card').html('');
							var tpl = $("#tpl2").html();
							var template = Handlebars.compile(tpl);
							var html = template(d.data);
							$('#card').append(html);
							aigovApp.utils.closeLoading();
						}
					}else{
						aigovApp.nativeFunc.alert("查询就诊卡异常："+ d.message);	
					}
				}catch(e){
					aigovApp.nativeFunc.alert("查询就诊卡异常！"+e);
				}finally {
					aigovApp.utils.closeLoading();
				}
			});
			

	}
	
	var submit_click = function(){
		userId = aigovApp.session.getSession().user.userId;
		cardNo = $("#cardNo option:selected").val();
		hospitalMemberId = $("#cardNo option:selected").data('patientId');
		if(!memberId){
			// 新增
			if(!userId || userId == ""){
				aigovApp.nativeFunc.alert("登录用户不能为空！");
				return;
			}
			if(!cardNo || cardNo == "" || !hospitalMemberId || hospitalMemberId == ""){
				aigovApp.nativeFunc.alert("请选择就诊卡！");
				return;
			}
			var idCode = $( "#hospitalId option:selected" ).val();
			hospitalId = idCode.split('_')[0];
			hospitalCode = idCode.split('_')[1];
			if(!hospitalId || hospitalId == ""){
				aigovApp.nativeFunc.alert("医院ID不能为空！");
				return;
			}
			if(!hospitalCode || hospitalCode == ""){
				aigovApp.nativeFunc.alert("医院编码不能为空！");
				return;
			}
			if(!$('#name').val() || $('#name').val() == ""){
				aigovApp.nativeFunc.alert("姓名不能为空！");
				return;
			}
			if(!$('#idNo').val() || $('#idNo').val() == ""){
				aigovApp.nativeFunc.alert("身份证不能为空！");
				return;
			}
			if(!idCardNoUtil.checkIdCardNo($('#idNo').val())){
				aigovApp.nativeFunc.alert("身份证不正确！");
				return;
			}
			if(!$("#sex option:selected").val() || $("#sex option:selected").val() == ""){
				aigovApp.nativeFunc.alert("性别不能为空！");
				return;
			}
			if(!$('#birthday').val() || $('#birthday').val() == ""){
				aigovApp.nativeFunc.alert("生日不能为空！");
				return;
			}
			var yyyy = parseInt($('#birthday').val().substring(0,4),10);
			var mm = parseInt($('#birthday').val().substring(5,7),10);
			var dd = parseInt($('#birthday').val().substring(8),10);
			var xdata = new Date(yyyy,mm-1,dd);
			if(xdata > new Date()){
				aigovApp.nativeFunc.alert("生日不正确！");
				return;
			}
			if(!$('#phone').val() || $('#phone').val() == ""){
				aigovApp.nativeFunc.alert("联系电话不能为空！");
				return;
			}
			
			name = $('#name').val();
			idNo = $('#idNo').val();
			sex = $("#sex option:selected").val();
			birthday = $('#birthday').val();
			var d = new Date();
			var y = d.getFullYear();
			var brithy = birthday.substr(0,4);
			age = y-brithy-1;
			phone = $("#phone").val();
			cardNo = $("#cardNo").val();
			isDefault = $("#isDefault option:selected").val();

			var param = {
					userId : 	   	userId,
					patientName: 	name,
					sex:			sex,
					phoneNum:  		phone,
					birthDate:      birthday,
					age:			age,
					certCode:		idNo,
					hosId:       	hospitalId,
					cardNum:        cardNo,
					defaultFlag:	isDefault,
					hisPatientId:   hospitalMemberId,
					hosCode:		hospitalCode,
					operId:			userId
			}
			aigovApp.utils.openLoading();
			aigovApp.ajax(aigovApp.constants.member.MEMBER_ADD_URL, param, function(d){
				try{
					if(d.code==0){
						if(d.data.result_Code == "0000"){	
							var param = appWindow.intent;
							aigovApp.openAppWindow("memberList", param);
						}else{
							aigovApp.nativeFunc.alert("新增就诊人信息异常："+ d.data.error_Msg);	
						}
					}else{
						aigovApp.nativeFunc.alert("新增就诊人信息异常："+ d.message);	
					}
				}catch(e){
					aigovApp.nativeFunc.alert("新增就诊人信息异常！"+e);
				}finally {
					/*var param = {
							hospitalCode: hospitalCode,
							hospitalId: hospitalId,
						};
						aigovApp.openAppWindow("memberList", param);*/
					aigovApp.utils.closeLoading();
				}
			});
		}else{
			// 修改
			if(!memberId || memberId == ""){
				aigovApp.nativeFunc.alert("就诊人标识不能为空！");
				return;
			}			
			if(!userId || userId == ""){
				aigovApp.nativeFunc.alert("用户标识不能为空！");
				return;
			}
			if(!$('#idNo').val() || $('#idNo').val() == ""){
				aigovApp.nativeFunc.alert("身份证不能为空！");
				return;
			}
			if(!idCardNoUtil.checkIdCardNo($('#idNo').val())){
				aigovApp.nativeFunc.alert("身份证不正确！");
				return;
			}
			if(!$('#birthday').val() || $('#birthday').val() == ""){
				aigovApp.nativeFunc.alert("生日不能为空！");
				return;
			}
			var yyyy = parseInt($('#birthday').val().substring(0,4),10);
			var mm = parseInt($('#birthday').val().substring(5,7),10);
			var dd = parseInt($('#birthday').val().substring(8),10);
			var xdata = new Date(yyyy,mm-1,dd);
			if(xdata > new Date()){
				aigovApp.nativeFunc.alert("生日不正确！");
				return;
			}
			
			name = $('#name').val();
			sex = $("#sex option:selected").val();
			phone = $("#phone").val();
			birthday = $('#birthday').val();
			var d = new Date();
			var y = d.getFullYear();
			var brithy = birthday.substr(0,4);
			age = y-brithy-1; 
			idNo = $('#idNo').val();
			isDefault = $("#isDefault option:selected").val();
			
			var param = {
					patientId:		memberId,
					userId: 		userId,
					patientName:  	name,
					sex:      		sex,
					phoneNum:       phone,
					birthDate:      birthday,
					certCode:   	idNo,
					defaultFlag:	isDefault
			}
			aigovApp.utils.openLoading();
			aigovApp.ajax(aigovApp.constants.member.MEMBER_MOD_URL, param, function(d){
				try{
					if(d.code==0){
						if(d.data.result_Code == "0000"){	
							var param = appWindow.intent;
							aigovApp.openAppWindow("memberList", param);
						}else{
							aigovApp.nativeFunc.alert("修改就诊人信息异常："+ d.data.error_Msg);	
						}
					}else{
						aigovApp.nativeFunc.alert("修改就诊人信息异常："+ d.message);	
					}
				}catch(e){
					aigovApp.nativeFunc.alert("修改就诊人信息异常！"+e);
				}finally {
					/*var param = {
							hospitalCode: hospitalCode,
							hospitalId: hospitalId,
						};
						aigovApp.openAppWindow("memberList", param);*/
					aigovApp.utils.closeLoading();
				}
			});
		}
	}

	module.exports = {
		onCreate : function(winObj){
			appWindow = winObj;
			init();
		}
	};

});