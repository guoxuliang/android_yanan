/**
 * 医院信息页面
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){
	
	//模块对外提供的方法
	var exportsMethods = {
		param:{},
        /**
         *登陆页面的初始化 
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loadAction();
			
			this.param.hospital_Mark=appWindow.intent.hospitalCode;
			this.param.hospitalCode=appWindow.intent.hospitalCode;
			
			$("#weekCheck").attr("data_time",getFirstDateOfWeek().format("yyyy-MM-dd 00:00:00"));
			$("#monthCheck").attr("data_time",getCurrentMonthFirst().format("yyyy-MM-dd 00:00:00"));
			$("#allCheck").attr("data_time",(new Date().format("yyyy")-1)+"-01-01 00:00:00");
			$("[name='checkType']").on("click",this.clickAction);
			$(".curTime")[0].click();
		},
		onBack:function(){
		},
		//加载事件
		clickAction : function(){
			$("[name='checkType']").removeClass("curTime");
			$(this).addClass("curTime");
			
			exportsMethods.param.apply_Date_Time=$(".curTime").attr("data_time");
			
			var type=$(".cur").attr("data_type");
			if(type=="0"){
				exportsMethods.showListMaster()
			}else{
				exportsMethods.showExamMaster();
			}
			
			
		},
		//显示详细信息
		showInfo:function(){
			var _this=$(this);
			var testNo=_this.attr("data_test_No");
			exportsMethods.param.testNo=testNo;
			_this.find("#fa-caret");
			var url=aigovApp.constants.myReportProperties.MYREPORT_INFO_URL;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url,exportsMethods.param , function(data){
				aigovApp.utils.closeLoading();
				var tpl=$("#J_panel_info").html();
				var result = $(new t(tpl).render(data));
				$("[data_box='box_"+testNo+"']").html(result);
			});
		},
		//显示检验单
		showListMaster:function(){
			var session = aigovApp.session.getSession();
			exportsMethods.param.phone_Number=session.user.phoneNo;
			var url=aigovApp.constants.myReportProperties.MYREPORT_URL;
			aigovApp.utils.openLoading();
			aigovApp.ajax(aigovApp.constants.myReportProperties.QUERY_PATIENTS,{userId:session.user.userId,hospitalCode:exportsMethods.param.hospitalCode},function(rs){
				var o=0;
				if(rs.code==0){
					for(var i in rs.data){
						if(rs.data[i].certCode==session.user.idCardNo && rs.data[i].hospitalCode==exportsMethods.param.hospitalCode){
							o++;
							exportsMethods.param.patient_Id=rs.data[i].hisPatientId
							exportsMethods.param.id_No=rs.data[i].certCode;
							
							aigovApp.ajax(url,exportsMethods.param , function(data){
								aigovApp.utils.closeLoading();
								if(data.code=='0' && data.data && data.data.length!=0){
									var tpl=$("#J_panel_list").html();
									var result = $(new t(tpl).render(data));
									$("#J_panel_l").html(result);
									result.find(".J_button").on("click",exportsMethods.showInfo);
								}else{
									$("#J_panel_l").html("<div class='ai-myReport-not-data'>暂无相关记录</div>");
								}
							});
							return;
						}
					}
					if(o==0){
						aigovApp.utils.closeLoading();
						$("#J_panel_l").html("<div class='ai-myReport-not-data'>您还未绑定就诊卡或绑定的就诊卡不是您本人的</div>");
					}
				}else{
					aigovApp.utils.closeLoading();
					aigovApp.nativeFunc.alert(rs.message);
				}
			})
		},
		//显示检查单
		showExamMaster:function(){
			var session = aigovApp.session.getSession();
			exportsMethods.param.phone_Number=session.user.phoneNo;
			var url=aigovApp.constants.myReportProperties.EXAMMASTER_URL;
			exportsMethods.param.apply_Date_Time=$(".curTime").attr("data_time");
			aigovApp.utils.openLoading();
			aigovApp.ajax(aigovApp.constants.myReportProperties.QUERY_PATIENTS,{userId:session.user.userId,hospitalCode:exportsMethods.param.hospitalCode},function(rs){
				var o=0;
				if(rs.code==0){
					for(var i in rs.data){
						if(rs.data[i].certCode==session.user.idCardNo && rs.data[i].hospitalCode==exportsMethods.param.hospitalCode){
							o++;
							exportsMethods.param.patient_Id=rs.data[i].hisPatientId
							exportsMethods.param.id_No=rs.data[i].certCode;
							
							aigovApp.ajax(url,exportsMethods.param , function(data){
								aigovApp.utils.closeLoading();
								if(data.code=='0' && data.data && data.data.length!=0){
									var tpl=$("#J_showExam_info").html();
									var result = $(new t(tpl).render(data));
									$("#J_panel_r").html(result);
								}else{
									$("#J_panel_r").html("<div class='ai-myReport-not-data'>暂无记录</div>");
								}
							});
							return;
						}
					}
					if(o==0){
						aigovApp.utils.closeLoading();
						$("#J_panel_r").html("<div class='ai-myReport-not-data'>您还未绑定就诊卡或绑定的就诊卡不是您本人的</div>");
					}
				}else{
					aigovApp.utils.closeLoading();
					aigovApp.nativeFunc.alert(rs.message);
				}
			})
		},
		//加载事件
		loadAction:function(){
			$("#aigov-header-back-btn").on("tap",function(){
				aigovApp.back();
			});
			
			$("#J_open_map").on("click",function(){
				var _this=$(this);
			})
			
			
			$(".J_hospitalInfo_btn").on("click",function(){
				var _this=$(this);
				var type=_this.attr("data_type");
				
				if(type=="0"){
					$(".ai-hospitalInfo-button-l").addClass("cur");
					$(".ai-hospitalInfo-button-r").removeClass("cur");
					$("#J_panel_l").show();
					$("#J_panel_r").hide();
					exportsMethods.showListMaster();
				}else{
					$(".ai-hospitalInfo-button-r").addClass("cur");
					$(".ai-hospitalInfo-button-l").removeClass("cur");
					$("#J_panel_l").hide();
					$("#J_panel_r").show();
					exportsMethods.showExamMaster();
				}
			});
		}
	};
	
	
	//获取当前月的第一天
	function getCurrentMonthFirst() {
		var date = new Date();
		date.setDate(1);
		return date;
	}
	
	//得到每周的第一天(周一)
	function getFirstDateOfWeek(){
		var Nowdate=new Date();
		Nowdate.setDate(Nowdate.getDate() - Nowdate.getDay() + 1);
		return Nowdate; 
	}
	
	//得到每周的最后一天(周日)  
	function getLastDateOfWeek(){  
		var Nowdate=new Date();
		Nowdate.setDate(Nowdate.getDate() + 6);
		return Nowdate;
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
	module.exports = exportsMethods;

});