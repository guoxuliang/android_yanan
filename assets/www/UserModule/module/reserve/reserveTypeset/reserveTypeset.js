/**
 * 预约挂号
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){
	//得到天数
	var myDate={
		date1:null,
		date2:null,
		date3:null,
		date4:null,
		date5:null,
		date6:null,
		date7:null
	};
	
	//模块对外提供的方法
	var exportsMethods = {
		hospitalId:null,
		deptCode:null,
		deptName:null,
		hospitalName:null,
        /**
         *登陆页面的初始化 
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.hospitalId=appWindow.intent.hospitalId;
			this.deptCode=appWindow.intent.deptCode;
			this.deptName=appWindow.intent.deptName;
			this.hospitalName=appWindow.intent.hospitalName;
			//加载我的天数
			this.loadMyData();
			//加载面页
			this.loading();
		},
		onBack:function(){
		},
		//加载本周后所属天
		loadMyData:function(){
			var newDate=new Date();
			var date1=getFirstDateOfWeek();
			myDate.date1=date1;
			myDate.date2=new Date(getFirstDateOfWeek().setDate(date1.getDate()+1));
			myDate.date3=new Date(getFirstDateOfWeek().setDate(date1.getDate()+2));
			myDate.date4=new Date(getFirstDateOfWeek().setDate(date1.getDate()+3));
			myDate.date5=new Date(getFirstDateOfWeek().setDate(date1.getDate()+4));
			myDate.date6=new Date(getFirstDateOfWeek().setDate(date1.getDate()+5));
			myDate.date7=new Date(getFirstDateOfWeek().setDate(date1.getDate()+6));
		},
		//加载事件
		loading : function(){
			var _this=this;
			var url=aigovApp.constants.reserveProperties.RESERVE_LIST_URL;
			var param={
				deptCode:_this.deptCode,
				deptName:_this.deptName,
				hospitalId:_this.hospitalId,
				hospitalName:_this.hospitalName,
				startDate:myDate.date1.format("yyyy-MM-dd"),
				endDate:myDate.date7.format("yyyy-MM-dd")
			};
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, param, function(data){
				aigovApp.utils.closeLoading();
				var tpl=$("#J_reserve_tpl").html();
				var tplTime=$("#J_reserve_time_tpl").html();
				if(data.code=="0"){
					var tptDate={
						date1:myDate.date1.format("MM/dd"),
						date1_T:myDate.date1.format("yyyy-MM-dd"),
						date2:myDate.date2.format("MM/dd"),
						date2_T:myDate.date2.format("yyyy-MM-dd"),
						date3:myDate.date3.format("MM/dd"),
						date3_T:myDate.date3.format("yyyy-MM-dd"),
						date4:myDate.date4.format("MM/dd"),
						date4_T:myDate.date4.format("yyyy-MM-dd"),
						date5:myDate.date5.format("MM/dd"),
						date5_T:myDate.date5.format("yyyy-MM-dd"),
						date6:myDate.date6.format("MM/dd"),
						date6_T:myDate.date6.format("yyyy-MM-dd"),
						date7:myDate.date7.format("MM/dd"),
						date7_T:myDate.date7.format("yyyy-MM-dd")
					};
					
					//按时间
					var timeBox=$(new t(tplTime).render(tptDate));;
					
					//得到预约信息
					var result =null;
					for(var i=0;i<data.data.length;i++){
						//标记用户是否可预约
						var flag=false;
						var myData=data.data[i]
						myData.tptDate=tptDate;
						result = $(new t(tpl).render(myData));
						var registList=myData.regist_List;
						for(var i=0;i<registList.length;i++){
							var o=result.find("[data_time='"+registList[i].hb_Date+"'][data_time_type='"+registList[i].am_Pm+"']");
							if(o[0]){
								var flagAvailable=registList[i].flag_Available;
								var doctorName=myData.doctor_Name;
								if(flagAvailable=="0" || flagAvailable=="1"){
									flag=true;
									var a=$("<a class='j_open'>"+doctorName+"</a>");
									o.addClass("green j_open");
									o.attr("data_hospitalId",_this.hospitalId);
									a.attr("data_hospitalId",_this.hospitalId);
									o.attr("data_deptCode",_this.deptCode);
									a.attr("data_deptCode",_this.deptCode);
									o.attr("data_deptName",_this.deptName);
									a.attr("data_deptName",_this.deptName);
									o.attr("data_hospitalName",_this.hospitalName);
									a.attr("data_hospitalName",_this.hospitalName);
									o.attr("data_doctor_Name",myData.doctor_Name);
									a.attr("data_doctor_Name",myData.doctor_Name);
									o.attr("data_doctor_Code",myData.doctor_Code);
									a.attr("data_doctor_Code",myData.doctor_Code);
									o.attr("data_mark_Type",myData.mark_Type);
									a.attr("data_mark_Type",myData.mark_Type);
									o.attr("data_am_Pm",registList[i].am_Pm);
									a.attr("data_am_Pm",registList[i].am_Pm);
									o.attr("data_hb_Date",registList[i].hb_Date);
									a.attr("data_hb_Date",registList[i].hb_Date);
									
									o.html(o.attr("data_time_type"));
									var o2=timeBox.find("[data_time='"+registList[i].hb_Date+"'][data_time_type='"+registList[i].am_Pm+"']");
									
									o2.append(a);
								}else if(flagAvailable=="2"){
									o.addClass("grey");
									o.html(o.attr("data_time_type")+"<br/>(已停诊)");
								}else if(flagAvailable=="3"){
									o.addClass("orange");
									o.html(o.attr("data_time_type")+"<br/>(已满)");
								}
							}
						};
						
						//判断是否还有号
						if(flag){
							result.find(".J_flag").html("有号");
						}else{
							result.find(".J_flag").html("无号");
						}
						
						//判断用户是否已经关注
						var isAttention=myData.is_Attention;
						if(isAttention==true){
							result.find(".J_button_attention").text("取消关注");
						}else{
							result.find(".J_button_attention").text("关注");
						}
						
						$("#J-ai-hospitalInfo-l").append(result);
						
					}
					$("#J-ai-hospitalInfo-r").append(timeBox);
					exportsMethods.loadAction();
				}
			});
		},
		
		//加载事件
		loadAction:function(){
			//退回事件
			$("#aigov-header-back-btn").on("tap",function(){
				aigovApp.back();
			});
			
			//切换事件
			$(".J_hospitalInfo_btn").on("click",function(){
				var _this=$(this);
				var type=_this.attr("data_type");
				
				if(type=="0"){
					$(".ai-hospitalInfo-button-l").addClass("cur");
					$(".ai-hospitalInfo-button-r").removeClass("cur");
					$("#J-ai-hospitalInfo-l").show();
					$("#J-ai-hospitalInfo-r").hide();
				}else{
					$(".ai-hospitalInfo-button-r").addClass("cur");
					$(".ai-hospitalInfo-button-l").removeClass("cur");
					$("#J-ai-hospitalInfo-l").hide();
					$("#J-ai-hospitalInfo-r").show();
				}
			});
			
			//关注事件
			$(".J_button_attention").on("click",function(){
				var _this=$(this);
				var doctorCode=_this.attr("data_doctor_Code");
				var type=_this.text();
				var url=null;
				var text="取消关注";
				if(type=="关注"){
					url=aigovApp.constants.attentionProperties.ATTENTION_USER_OK_URL;
				}else{
					text="关注";
					url=aigovApp.constants.attentionProperties.ATTENTION_USER_CANCEL_URL;
				}
				var param={
					doctorId:doctorCode
				}
				aigovApp.ajax(url, param, function(data){
					if(data.code=="0"){
						_this.text(text);
					}else{
						aigovApp.nativeFunc.alert(data.message);
					}
				});
			})
			
			//点击预约事件
			$(".j_open").on("click",function(){
				var _this=$(this);
				var hospitalId=_this.attr("data_hospitalId");
				var deptCode=_this.attr("data_deptCode");
				var deptName=_this.attr("data_deptName");
				var hospitalName=_this.attr("data_hospitalName");
				var doctor_Name=_this.attr("data_doctor_Name");
				var doctor_Code=_this.attr("data_doctor_Code");
				var mark_Type=_this.attr("data_mark_Type");
				var am_Pm=_this.attr("data_am_Pm");
				var hb_Date=_this.attr("data_hb_Date");
				var param={
						hospitalId:hospitalId,
						deptCode:deptCode,
						deptName:deptName,
						hospitalName:hospitalName,
						doctor_Name:doctor_Name,
						doctor_Code:doctor_Code,
						mark_Type:mark_Type,
						am_Pm:am_Pm,
						hb_Date:hb_Date
				}
				aigovApp.openAppWindow("reserveConfirm",param);
			})
			
		}
	};
	
	module.exports = exportsMethods;
	
	//得到每周的第一天(周一)
	function getFirstDateOfWeek(){
		var Nowdate=new Date();
		var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
		return WeekFirstDay; 
	}
	
	//得到每周的最后一天(周日)  
	function getLastDateOfWeek(){  
		var Nowdate=new Date();
		var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
		var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
		return WeekLastDay;   
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