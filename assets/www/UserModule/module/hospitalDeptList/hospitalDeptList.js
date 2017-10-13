/**
 * 事项列表
 */
;define(function(require, exports, module){
	
	var dataParam=null;
	var iscroll=null;
	module.exports = {
		appWindow:null,
		hospitalId:null,
		hospitalCode:null,
		module:null,
		onCreate : function(winObj){
			
			var _this=this;
			_this.hospitalCode=winObj.intent.hospitalCode;
			_this.hospitalName=winObj.intent.hospitalName;
			_this.hospitalId=winObj.intent.hospitalId;
			_this.module=winObj.intent.module;
			_this.appWindow=winObj;
			_this.loading();
			_this.searchEvent();
			var obj = winObj.getComponent('hospitallHeaderBack');
			obj.setTitle(_this.hospitalName);
		},
		//加载
		loading:function(hospitalCode){
			var _this=this;
			var options = {
				searchEvent : _this.searchEvent,
				columns     : null,
				placeholder : "请输入科室名称",
				autoSearch  : false,
				extraCon:""
			};
			var searchObj = this.appWindow.getComponent('J_hospital_dept_search');
			searchObj.init(options);
		},
		//查询事件
		searchEvent:function(){
			var tbl=$("#J_hospitaldept_tpl").html();
			var url=aigovApp.constants.hospitalProperties.HOSPITAL_DEPT_LIST_URL;
			aigovApp.utils.openLoading();
			var param={"hospitalCode":module.exports.hospitalCode};
			var extraCon=$("#aigov-search-input").val();
			if(extraCon!=""){
				param.extraCon=extraCon;
			}
			$("#J_hospitaldept_body_Box").html("");
			aigovApp.ajax(url,param , function(data){
				aigovApp.utils.closeLoading();
				for(var i=0;i<data.data.length;i++){
					var tempData=data.data[i];
					var result = new t(tbl).render(tempData);
					$("#J_hospitaldept_body_Box").append(result);
				}
				$(".weui_cell").on("tap",function(){
					var _this=$(this);
					var deptCode=_this.attr("data_deptCode");
					var deptName=_this.attr("data_deptName");
					
					var param={
							hospitalId:module.exports.hospitalId,
							hospitalCode:module.exports.hospitalCode,
							hospitalName:module.exports.hospitalName,
							deptCode:deptCode,
							deptName:deptName
					}
					aigovApp.openAppWindow(module.exports.module,param);
				})
				
				iscroll=new IScroll($("#J_hospitaldept_Box")[0]);
				
			});
		},
		
		//退回事件
        onBack:function(){
        	//刷新
        	if(!iscroll){
				iscroll=new IScroll($("#J_hospitaldept_Box")[0]);
			}else{
				iscroll.refresh();
			}
        }
		
	};
});
