/**
 * 我的沟通-详情
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var CurWin = function(){};
	//对象私有方法
	CurWin.prototype = {
		id:null,
		modelId:null,
		init:function(appWindow){

            var that = this;
            that.id = appWindow.intent.id;
            that.modelId = appWindow.intent.modelId;
            //$('#detail'+id).show();
            that.load();
		},
		load : function(){
			var that = this;

			Handlebars.registerHelper("showReply",function(sq_status,options){
                if(sq_status == 3){
                    return options.fn(this);
                }else{
                    return options.inverse(this);
                }
            });

            Handlebars.registerHelper("modelName",function(model_cname){
            	var sname = model_cname.split("-");
            	if (sname.length > 1) {
            		return sname[1];
            	}else{
            		return model_cname;
            	}
            });

			//市长信箱，信访，部门信箱
			if (that.modelId == "1" || that.modelId == "4" || that.modelId == "9") {
				var url = PROJECT_URL+"hotMail/getHotMailInfo";
				var params = {
					sqId:that.id
				}
				aigovApp.utils.openLoading();
				aigovApp.ajax(url, params, function(d){
					aigovApp.utils.closeLoading();
					if(d.code==0){
						var tpl   =  $("#tpl2").html();
						var template = Handlebars.compile(tpl);
						var html = template(d.data);
						$('#detailDiv').append(html);
						that.bindEvent();
					}else{
						aigovApp.nativeFunc.alert(d.message);
					}

				});
			}else{
				var url = aigovApp.constants.my.MY_RELATE_DETAIL;
				var params = {
						id:that.id,
						source:that.modelId
				};
				aigovApp.utils.openLoading();
				aigovApp.ajax(url, params, function(d){
					aigovApp.utils.closeLoading();
					//cellLoad(d.data);
					//panelLoad(d.data);
					if(d.code==0){
						var tpl   =  $("#tpl").html();
						var template = Handlebars.compile(tpl);
						var html = template(d.data);
						$('#detailDiv').append(html);
						that.bindEvent();
					}else{
						aigovApp.nativeFunc.alert(d.message);
					}

				});
			}
		},
		bindEvent:function(){

		}


	};

	//模块对外提供的方法
	var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loading();

            //进行窗口初始化
            var curWin = new CurWin(appWindow);
            curWin.init(appWindow);

		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});
