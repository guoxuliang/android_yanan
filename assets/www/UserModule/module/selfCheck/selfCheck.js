/**
 * 自我诊断
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){
	
	//模块对外提供的方法
	var exportsMethods = {
		symptomScroll:null,
		symConSccroll:null,
		symBodySccroll:null,
        /**
         *登陆页面的初始化 
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loading();
			this.loadAction();
		},
		onBack:function(){
		},
		//加载事件
		loading : function(){
			this.symptomScroll=new IScroll($("#symptom_app")[0]);
			this.symConSccroll=new IScroll($("#symCon_second")[0]);
			this.symBodySccroll=new IScroll($("#symBody")[0]);
			this.loadData();
		},
		
		//加载页面信息
		loadData:function(){
			
			//得到性别
			var type=$("#J-aigov-sex-switch")
			
		},
		
		//加载事件
		loadAction:function(){
			var __this=this;
			$("#aigov-header-back-btn").on("click",function(){
				aigovApp.back();
			});
			
			$("#J_open_map").on("tap",function(){
				var _this=$(this);
			})
			$(".J_hospitalInfo_btn").on("click",function(){
				var _this=$(this);
				var type=_this.attr("data_type");
				
				if(type=="0"){
					$(".ai-hospitalInfo-button-l").addClass("cur");
					$(".ai-hospitalInfo-button-r").removeClass("cur");
					$("#J_ai-hospitalInfo-box-l").show();
					$("#J_ai-hospitalInfo-box-r").hide();
					
				}else{
					$(".ai-hospitalInfo-button-r").addClass("cur");
					$(".ai-hospitalInfo-button-l").removeClass("cur");
					$("#J_ai-hospitalInfo-box-l").hide();
					$("#J_ai-hospitalInfo-box-r").show();
				}
				__this.symptomScroll.refresh();
				__this.symConSccroll.refresh();
				__this.symBodySccroll.refresh();
			});
			
			//性别切换
			$("#J-aigov-sex").on("tap",sexSwitch);
			$("#J_frontOrBack").on("tap",frontOrBackSwitch);
			
			$(".J_user a").on("tap",function(){
				var _this=$(this);
				var vid=_this.attr("vid");
				var o=$("#symList a[vid='"+vid+"']");
				o.trigger("click");
				$(".J_hospitalInfo_btn[data_type='1']")[0].click();
			});
			
			//加载症状
			$("#symList a").on("click",function(){
				var _this=$(this);
				var partId=_this.attr("vid");
				var subBodyList=$("#subBodyList");
				var symBody=$("#symBody");
				
				$("#symList a.select").removeClass("select");
				_this.addClass("select");
				var url=aigovApp.constants.selfCheckProperties.PART_URL;
				
				aigovApp.utils.openLoading();
				aigovApp.ajax(url,{partId:partId} , function(data){
					aigovApp.utils.closeLoading();
					var tdata=data.data;
					if(data.code=='0' && tdata && tdata.length!=0){
						subBodyList.html("");
						if(tdata && tdata.length!=0){
							subBodyList.parent().show();
							for(var i=0;i<tdata.length;i++){
								subBodyList.append("<li><a vid='"+tdata[i].part_id+"'>"+tdata[i].part_name+"</a></li>");
							}
							//点击事件
							subBodyList.find("a").on("click",function(){
								var _this=$(this);
								var vid=_this.attr("vid");
								$("#subBodyList a.select").removeClass("select");
								_this.addClass("select");
								showZhuangTai(vid);
							})
							symBody.css("width","40%");
							showZhuangTai(partId);
							return;
						}
					}
					subBodyList.parent().hide();
					symBody.hide();
					symBody.width("70%");
					showZhuangTai(partId);
				});
				
			})
		}
	};
	
	/**
	 * 显示状态
	 */
	var showZhuangTai=function(vid){
		var _this=$(this);
		var url=aigovApp.constants.selfCheckProperties.SYMPTOM_INFO_URL;
		aigovApp.utils.openLoading();
		var sex=$("#J-aigov-sex").attr("data_sex");
		aigovApp.ajax(url,{partId:vid,sex:sex} , function(data){
			aigovApp.utils.closeLoading();
			var tdata=data.data;
			$("#allBodySymList").html("");
			if(data.code=="0" && tdata && tdata.length!=0){
				$("#symBody").show();
				for(var i=0;i<tdata.length;i++){
					$("#allBodySymList").append("<li><a sid='"+tdata[i].symptomId+"'>"+tdata[i].name+"</a></li>");
				}
				$("#allBodySymList a").on("tap",function(){
					var _this=$(this);
					var sid=_this.attr("sid");
					aigovApp.openAppWindow("relSymptomInfo",{symptomId:sid});
				});
			}

		});
	}
	
	/**
	 * 性别切换事件
	 */
	var sexSwitch =function(e){
		var _this=$(this);
		var type=_this.attr("data_sex");
		var frontOrBack=$("#J_frontOrBack");
		var tempStr="";
		if(type=="1"){
			_this.text("男性");
			_this.attr("data_sex","0");
			tempStr="femaleMap";
			$("#symList a[vid='24']").parent().show();
			$("#symList a[vid='18']").parent().hide();
		}else{
			_this.text("女性");
			_this.attr("data_sex","1");
			tempStr="maleMap";
			$("#symList a[vid='18']").parent().show();
			$("#symList a[vid='24']").parent().hide();
		}
		$(".J_user").hide();
		//判断是正背面
		if(frontOrBack.text()=="正面"){
			$("#"+tempStr+"Back").show();
		}else{
			$("#"+tempStr+"Front").show();
		}
		
		//清除选中
		$(".select").removeClass("select");
		$("#symCon_second").hide();
		$("#symBody").hide();
		
	}
	
	/**
	 * 正背面切换
	 */
	var frontOrBackSwitch=function(){
		var _this=$(this);
		var type=$("#J-aigov-sex").attr("data_sex");
		var frontOrBack=$("#J_frontOrBack");
		if(type=="1"){
			tempStr="maleMap";
		}else{
			tempStr="femaleMap";
		}
		$(".J_user").hide();
		//判断是正背面
		if(frontOrBack.text()=="正面"){
			$("#"+tempStr+"Front").show();
			frontOrBack.text("背面");
		}else{
			$("#"+tempStr+"Back").show();
			frontOrBack.text("正面");
		}
		
	}
	
	module.exports = exportsMethods;

});