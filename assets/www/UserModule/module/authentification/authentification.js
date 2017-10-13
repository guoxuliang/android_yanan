/**
 * 实名认证
 */
;define(function(require, exports, module){

	module.exports = {
		onCreate : function(winObj){
			var userId=aigovApp.session.getSession().user.userId;
			var idCardNo=aigovApp.session.getSession().user.idCardNo;
			var phoneNo=aigovApp.session.getSession().user.phoneNo;
			$("#userId").val(userId);
			$("#idCardNo").val(idCardNo);
			$("#phoneNo").val(phoneNo);
			this.loadActin();
		},
		//加载事件
		loadActin:function(){
        	var session = aigovApp.session.getSession();
			var url=aigovApp.constants.authentification.GET_URL;
			var isAuth= session.user.isAuth
			if(isAuth=='3' || isAuth=='03'){
				aigovApp.utils.openLoading();
				aigovApp.ajax(url, {"userId":session.user.userId},function(rs){
	                 aigovApp.utils.closeLoading();
	                 if (rs.code == "0") {
	                	 if(rs.data && (rs.data.authStatus=='3' || rs.data.authStatus=='03') && rs.data.rejectReason && rs.data.rejectReason!='' ){
	                		 $("#J_rejectReason").show();
	                		 $("#J_rejectReason").append(rs.data.rejectReason);
	                	 }
	                 }else {
	                     aigovApp.nativeFunc.alert(rs.message);
	                 }
	        	});
			}
        	
			var iscroll=new IScroll($("#J_authentification_Box")[0]);
			$("#idFrontImage_file").change(function(e) {
				var freader = new FileReader();
				freader.readAsDataURL(this.files[0]);
				freader.onload=function(e){
					var base64=this.result
					var args=base64.split(",");
					var dataImage=args[0].split("/");
					if(dataImage=="data:image"){
						aigovApp.nativeFunc.alert("请选择图片");
						return;
					}
					$("#idFrontImage_img").attr("src",base64);
					$("#idFrontImage").val(args[1]);
					iscroll.refresh();
				}
			});
			$("#idBackImage_file").change(function(e) {
				var freader = new FileReader();
				freader.readAsDataURL(this.files[0]);
				freader.onload=function(e){
					var base64=this.result
					var args=base64.split(",")
					var dataImage=args[0].split("/");
					if(dataImage=="data:image"){
						aigovApp.nativeFunc.alert("请选择图片");
						return;
					}
					$("#idBackImage_img").attr("src",base64);
					$("#idBackImage").val(args[1]);
					iscroll.refresh();
				}
			});
			$("#idHandImage_file").change(function(e) {
				var freader = new FileReader();
				freader.readAsDataURL(this.files[0]);
				freader.onload=function(e){
					var base64=this.result
					var args=base64.split(",");
					var dataImage=args[0].split("/");
					if(dataImage=="data:image"){
						aigovApp.nativeFunc.alert("请选择图片");
						return;
					}
					$("#idHandImage_img").attr("src",base64);
					$("#idHandImage").val(args[1]);
					
					iscroll.refresh();
				}
			});
			
			$("#sendFactBtn").on("click",function(){
				var userName=$("#userName").val();
				var idCardNo=$("#idCardNo").val();
				var idFrontImage=$("#idFrontImage").val();
				var idBackImage=$("#idBackImage").val();
				var idHandImage=$("#idHandImage").val();
				
				if(userName==''){
					aigovApp.nativeFunc.alert("请填写姓名");	
					return ;
				}else if(idCardNo==''){
					aigovApp.nativeFunc.alert("请填写身份证号");
					return ;
				}else if(idFrontImage==''){
					aigovApp.nativeFunc.alert("请选择身份证正面照");
					return ;
				}else if(idBackImage==''){
					aigovApp.nativeFunc.alert("请选择身份证反面照");
					return ;
				}else if(idHandImage==''){
					aigovApp.nativeFunc.alert("请选择身份证手持照");
					return ;
				}
				
				idCardNo=idCardNo.replace(/^\s+|\s+$/g,"");//去除字符串的前后空格，允许用户不小心输入前后空格
		        if (idCardNo.match(/^\d{14,17}(\d|X)$/gi)==null) {//判断是否全为18或15位数字，最后一位可以是大小写字母X
		        	aigovApp.nativeFunc.alert("身份证号码须为18位或15位数字");      //允许用户输入大小写X代替罗马数字的Ⅹ
		        	return ;
		        }

				
				var url=aigovApp.constants.authentification.SAVE_URL;
				aigovApp.utils.openLoading();
				aigovApp.ajaxForm("J_user",url, null, function(data){
					aigovApp.utils.closeLoading();
					if(data.code==0){
						
						aigovApp.rLogin(function(user){
							aigovApp.nativeFunc.alert("提交成功！我们会尽快审核你的资料，请等待...");	
							aigovApp.back("refresh_user")
						})
					}else{
						aigovApp.nativeFunc.alert(data.message);	
					}
					
				});
			})
		},
		//退回事件
        onBack:function(){
        	
        }

	};
});
