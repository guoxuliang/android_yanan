/**
 * 预约挂号确认
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){
	
	
	
	module.exports = {
		intent:null,
		onCreate : function(winObj){
			//winObj.intent={"hospitalId":"910009","hospitalCode":"435631450","deptCode":"0169000001","deptName":"便民门诊","hospitalName":"陕西省核工业二一五医院","doctor_Name":"张桂珍","doctor_Code":"00000684","mark_Type":"主治医师","am_Pm":"门诊上午","hb_Date":"2016-08-26","regFee":1,"doctor_Id":"5212"}

			this.intent=winObj.intent;
			this.loading();
			this.loadAction();
			loadQuerypatientList(this.intent);
			loadHY(this.intent);
		},
		loading:function(){
			var _this=this;
			var userName=aigovApp.session.getSession().user.realName;
			var d=new Date();
			var newDate=d.format("yyyy-MM-dd");
			$("#am_Pm").val(this.intent.am_Pm);
			$(".j_deptCode").text(this.intent.deptCode);
			$(".j_deptName").text(this.intent.deptName);
			$(".j_hospitalName").text(this.intent.hospitalName);
			$(".j_doctor_Name").text(nameHid(this.intent.doctor_Name));
			$(".j_mark_Type").text(this.intent.mark_Type);
			if(_this.intent.hb_Date!=newDate){
				this.intent.regFee=0;
			}
			$("#J_fee").text(this.intent.regFee+"元");
			$(".j_hb_Date").text(this.intent.hb_Date);
			
		},
		loadAction:function(){
			var _this=this;
			$("#button").on("click",function(){
				var selectUser=$("#J_userName")
				_this.intent.am_Pm=$("#am_Pm option:selected").text();
				_this.intent.Hid=$("#am_Pm").val();
				_this.intent.patientId=selectUser.attr("patientId");
				_this.intent.hisPatientId=selectUser.attr("hisPatientId");
				_this.intent.patientCertNo=selectUser.attr("certCode");
				_this.intent.patientName=selectUser.attr("patientName");
				_this.intent.phoneNum=aigovApp.session.getSession().user.phoneNo;
				_this.intent.cardNum=selectUser.attr("cardNum");
				_this.intent.hb_Time=$("#am_Pm option:selected").attr("hb_Time");
				if(new Date().format("yyyy-MM-dd")==_this.intent.hb_Date &&(!_this.intent.cardNum || _this.intent.cardNum=='')){
					aigovApp.nativeFunc.alert("有卡的可以挂号预约,无卡的只能预约不能挂号");
					return;
				}
				if(!_this.intent.patientName || _this.intent.patientName==""){
					aigovApp.nativeFunc.alert("请选择就诊人");
					return;
				}
				aigovApp.openAppWindow("reserveSend",_this.intent);
			});
			
			$('#btnCard').on("click",function(){
				aigovApp.openAppWindow("memberList", _this.intent);
			});
		},
		//退回事件
        onBack:function(o){
        	if(o){
        		if(o.cardNum && o.cardNum!=''){
        			$('#cardNum').text(o.cardNum);
        		}else{
        			$('#cardNum').text("空");
        		}
        		
        		$("#J_userName").val(o.patientName);
        		$("#J_userName").attr("patientId",o.patientId);
        		$("#J_userName").attr("hisPatientId",o.hisPatientId);
        		$("#J_userName").attr("certCode",o.certCode);
        		$("#J_userName").attr("patientName",o.patientName);
        		$("#J_userName").attr("cardNum",o.cardNum);
        		
        	}
        	//刷新
        }
		
	};
	
	/**
	 * 加载就诊人信息
	 */
	var loadQuerypatientList=function(intent){
		aigovApp.utils.openLoading();
		var url =aigovApp.constants.reserveProperties.QUERYPATIENTLIST_URL;
		var param={
			hospitalCode:intent.hospitalCode,
			hospitalId:intent.hospitalId,
			userId:aigovApp.session.getSession().user.userId
		};
		aigovApp.ajax(url, param, function(data){
			aigovApp.utils.closeLoading();
			if(data.code=="0"){
				if(!data.data || data.data.length==0){
					aigovApp.back();
					aigovApp.nativeFunc.alert("当前用户未注册就诊人");
				}else{
					var mydata=data.data;
					/*for(var i=0;i<mydata.length;i++){
						var tmp=""
						if(i==0){
							tmp="selected";
							$("#cardNum").text(mydata[i].cardNum?mydata[i].cardNum:"");
						}
						$("#J_userName").append("<option value='"+mydata[i].patientId+"' phoneNum='"+
								(mydata[i].phoneNum?mydata[i].phoneNum:"")+"' patientName='"+
								(mydata[i].patientName?mydata[i].patientName:"")+"' patientId='"+
								(mydata[i].patientId?mydata[i].patientId:"")+"' certCode='"+
								(mydata[i].certCode?mydata[i].certCode:"")+"' cardNum='"+
								(mydata[i].cardNum?mydata[i].cardNum:"")+"' hisPatientId='"+
								(mydata[i].hisPatientId?mydata[i].hisPatientId:"")+"' phoneNum='"+
								(mydata[i].phoneNum?mydata[i].phoneNum:"")+"' "+tmp+">"+mydata[i].patientName+"</option>");
						
					}*/
					$("#cardNum").text(mydata[0].cardNum?mydata[0].cardNum:"");
					$("#J_userName").val(mydata[0].patientName);
	        		$("#J_userName").attr("patientId",mydata[0].patientId);
	        		$("#J_userName").attr("hisPatientId",mydata[0].hisPatientId);
	        		$("#J_userName").attr("certCode",mydata[0].certCode);
	        		$("#J_userName").attr("patientName",mydata[0].patientName);
	        		$("#J_userName").attr("cardNum",mydata[0].cardNum);
					//loadHY(intent);
				}
			}else{
				aigovApp.back();
				aigovApp.nativeFunc.alert("当前用户未注册就诊人");
			}
		});
	}
	var nameHid=function(name){
		if(name==null||name==undefined||name==''){
			return '';
		}
		var newName = '';
    	if(name.length==1){
    		newName = name;
    	}else if(name.length==2){
    		newName = name.substring(0,1)+'*';
    	}else{
    		newName = name.substring(0,1)+'**';
    	}
    	return newName;
	}
	/**
	 * 号源
	 */
	var loadHY=function(intent){
		var url =aigovApp.constants.reserveProperties.REGISTHID_URL;
		var param={
			hospitalCode:intent.hospitalCode,
			deptCode:intent.deptCode,
			deptName:intent.deptName,
			doctorCode:intent.doctor_Code,
			hbDate:intent.hb_Date,
			amPm:"门诊上午"
		};
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, param, function(data){
			param.amPm="门诊下午";
			if(data.code==0 && data.data && data.data.length!=0){
				var mydata=data.data[0]
				$("#am_Pm").append("<option value='"+mydata.hid+"' hb_Time='"+mydata.hb_Time+"' "+(intent.am_Pm==param.amPm?"selected":"")+">"+mydata.am_Pm+"</option>");
			}
			aigovApp.ajax(url, param, function(data){
				aigovApp.utils.closeLoading();
				if(data.code==0 && data.data && data.data.length!=0){
					var mydata=data.data[0]
					$("#am_Pm").append("<option value='"+mydata.hid+"' hb_Time='"+mydata.hb_Time+"' "+(intent.am_Pm==param.amPm?"selected":"")+">"+mydata.am_Pm+"</option>");
				}
			});
			
		});
	}
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
});
