/**
 * 我的办事
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var CurWin = function(){};
	//对象私有方法
	CurWin.prototype = {
		account:null,
		init:function(appWindow){
			var that = this;
			that.account = $.parseJSON(window.localStorage.account);

			var handleHelper = Handlebars.registerHelper("dateDayFormat",function(date){
            	return moment(date).format('YYYY-MM-DD');
			});
			
            that.load(appWindow);

		},

//		load : function(){		
//			var that = this;
//			var url = aigovApp.constants.my.MY_WORK_LIST;
//			var params = {
//					idCard:that.account.user.idCardNo
//			};
//			aigovApp.utils.openLoading();
//			aigovApp.ajax(url, params, function(d){
//				aigovApp.utils.closeLoading();
//				//cellLoad(d.data);
//				//panelLoad(d.data);
//				//console.log(d)
//				if(d.data&&d.data.caseBaseInfo.length>0){
//					var tpl   =  $("#tpl").html();
//					var template = Handlebars.compile(tpl);
//					var html = template(d);
//					$('#myWorkListDiv').append(html);
//					that.bindEvent();
//				}else{
//					$('#myWorkListDiv').append('查无记录');
//				}
//				
//				
//			});
//		},
		
		load : function(winObj){		
			var url = aigovApp.constants.my.MY_WORK_LIST;
			var _this=this;
			_this.appWindow=winObj;
			
			
			//得到模板
			var windowConfig = aigovApp.config.appWindows[winObj.id];
			var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";
			
		    var documentList = winObj.getComponent('workList');// html中定义
		   // this.intent=winObj.intent;
		    //this.module=winObj.intent.module;
		    //_this.account.user.idCardNo = 610431196906253838;
		    var options = {
					datasUrl   : url,
					dataParam : {
		    			mobile:_this.account.user.phoneNo
					},
					pageCount  : 15,
					hasSearch  : false// 不显示搜索框
					,recordEvents : [{
						'type':'tap',
						'handle':_this.openFrom
					}]
				};
		    
		    documentList._loadHtml(componentPath + 'template/workList.html',function(tplHtml){
				options.recordTpl = tplHtml;
				documentList.init(options);
				
			});

		},
		
		openFrom:function($record){
			
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
