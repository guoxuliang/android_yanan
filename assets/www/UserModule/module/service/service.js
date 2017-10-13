/**
 * 主界面的js
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){

	var aiAppAction=require("aiAppAction");
	
	//类型
	var Type={
		//生活
		TYPE_LIVES:0,
		//个人办事
		TYPE_PERSONAL:1,
		//法人办事
		TYPE_LAW:2,
		//部门办画
		TYPE_DEPT:3
	}
	
	var thingsType;

	//所有模板
	var Template={
		app1:"<div class='ai-service-box-title'><div class='title'>{{=name}}</div></div><div class='ai-service-h-grids'>{{@child}}"+
				"<a class='ai-service-h-app' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><div class='ai-service-h-a-img'><img src='{{=_val.icon}}'>"+
	    		"</div><p class='ai-service-h-a-t'>{{=_val.name}}</p></a>{{/@child}}</div>",
        app2:"<div class='ai-service-box-title'><div class='title'>{{=name}}</div></div><div class='ai-service-app-grids'>{{@child}}<a class='ai-service-app-grid' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><div class='icon'><img src='{{=_val.icon}}'></div><div class='txt'>{{=_val.name}}</div></a>{{/@child}}</div>",
		//app2:"<div class='ai-service-box-title'><div class='title'>{{=name}}</div><div class='all' data_type='{{=type}}' data_content='{{=content}}' data_param='{{=param}}' data_name='{{=name}}'>全部</div></div><div class='ai-service-app-grids'>{{@child}}<a class='ai-service-app-grid' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><div class='icon'><img src='{{=_val.icon}}'></div><div class='txt'>{{=_val.name}}</div></a>{{/@child}}</div>"
	
    	app3:"<div class='ai-service-box-title'><div class='title'>{{=head}}</div><div class='all' data_type='1' data_content='thingsAll' data_param='[{\"id\":\"{{=id}}\"},{\"type\":\"#thingsType\"}]' data_name=''>全部</div></div><div class='ai-service-app-grids'>{{@items}}<a class='ai-service-app-grid' data_type='1' data_content='things' data_param='[{\"workCode\":\"{{=_val.id}}\"}]' data_name=''><div class='icon'><img src='UserModule/module/service/style/images/inner_icon05.png'></div><div class='txt'>{{=_val.label}}</div></a>{{/@items}}</div>"
	
	}
	
	//模块对外提供的方法
	var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			var _this=this;
			if(!appWindow.intent){
				$("#aigov-header-back-btn").hide();
			}
			_this.loading();
			
		},
		//加载事件
		loading : function(){
			$("#J_service_btn_r").on("click",this.btn_r_action);
			$("#J_service_dept").on("click",this.btnAction);
			$("#J_service_law").on("click",this.btnAction);
			$("#J_service_personal").on("click",this.btnAction);
			$("#J_service_lives").on("click",this.btnAction);

			this.loadingData(Type.TYPE_LIVES);
			
			$("#aigov-header-back-btn").on("tap",function(){
				aigovApp.back();
			});

		},
		//按钮加载事件
		btnAction:function(){
			var _this=$(this);
			
			var type=_this.attr("data_type");
			if(type==Type.TYPE_LIVES){
				$("#J_service_lives").parent().addClass("cur");
				$("#J_service_btn_r").parent().removeClass("cur");
			}else{
				$("#J_service_lives").parent().removeClass("cur");
				$("#J_service_btn_r").parent().addClass("cur");
			}
			exportsMethods.loadingData(type);
		},
		//加载数据
		loadingData:function(type){
			var url=null;
			var param = {};
			if(Type.TYPE_PERSONAL==type){
				url=aigovApp.constants.serviceProperties.TYPE_URL;
				param = {
						type : "001",
						pageIndex: 1,
						pageSize: 100		
					}
				thingsType = "001";
			}else if(Type.TYPE_LAW==type){
				url=aigovApp.constants.serviceProperties.TYPE_URL;
				param = {
						type : "002",
						pageIndex: 1,
						pageSize: 100		
					}
				thingsType = "002";
			}else if(Type.TYPE_DEPT==type){
				url=aigovApp.constants.serviceProperties.TYPE_URL;
				param = {
						type : "003",
						pageIndex: 1,
						pageSize: 100		
					}
				thingsType = "003";
			}else{
				url=aigovApp.constants.serviceProperties.TYPE_LIVES_URL;
			}
			
			
        	aigovApp.utils.openLoading();

			$("#J-ai-service-app-box").html("");
        	aigovApp.ajax(url, param, function(data){
        		aigovApp.utils.closeLoading();
        		//如果是生活 热门服务放大
        		if(Type.TYPE_LIVES==type){
        			var d=data.data[0];
	        		var result = new t(Template.app1).render(d);
					$("#J-ai-service-app-box").append(result);
					for(var i=1;i<data.data.length;i++){
						result = new t(Template.app2).render(data.data[i]);
						$("#J-ai-service-app-box").append(result);
					}
        		}else{
        			for(var i=0;i<data.data.results.length;i++){
        				var html = Template.app3.replace("#thingsType",thingsType);
						result = new t(html).render(data.data.results[i]);
						$("#J-ai-service-app-box").append(result);
					}
        		}

        		aiAppAction.bindAction(".all");
				aiAppAction.bindAction(".ai-service-h-app");
				aiAppAction.bindAction(".ai-service-app-grid");
				
        	});
		},
		btn_r_action:function(){
			var hideActionSheet=function(weuiActionsheet, mask) {
		        weuiActionsheet.removeClass('weui_actionsheet_toggle');
		        mask.hide();
		    }
			var mask = $('#mask');
			var weuiActionsheet = $('#weui_actionsheet');
			weuiActionsheet.addClass('weui_actionsheet_toggle');
			mask.show().one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });

			$('.my_weui_actionsheet_cell').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
		}
	};

	module.exports = exportsMethods;

});
