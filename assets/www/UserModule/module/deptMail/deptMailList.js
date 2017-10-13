/**
 * 部门信箱
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var CurWin = function(){};
	//对象私有方法
	CurWin.prototype = {
		account:null,
		init:function(winObj){
            var that = this;
            that.account = $.parseJSON(window.localStorage.account);
            that.load(winObj);
		},

		load : function(winObj){
			var url = PROJECT_URL+"hotMail/getHotMailList";
			//var url = aigovApp.constants.my.MY_RELATE_LIST;
			var _this=this;
			_this.appWindow=winObj;

			//得到模板
			var windowConfig = aigovApp.config.appWindows[winObj.id];
			var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";

		    var documentList = winObj.getComponent('mailList');// html中定义
		   // this.intent=winObj.intent;
		    //this.module=winObj.intent.module;
		    var options = {
					datasUrl   : url,
					dataParam : {
						//userId:_this.account.user.userId,
						modelId:"4"
					},
					pageCount  : 15,
					hasSearch  : false// 不显示搜索框
					,recordEvents : [{
						'type':'tap',
						'handle':_this.openFrom
					}]
				};

		    documentList._loadHtml(componentPath + 'template/mailList.html',function(tplHtml){
				options.recordTpl = tplHtml;
				documentList.init(options);

			});

		},

		openFrom:function($record){
			var id = $record.data('id');
			 aigovApp.openAppWindow('myRelateDetail',{"id":id, "modelId":"4"});
		},

		bindEvent:function(){
			$('.relates').on('tap', function(event) {
                aigovApp.openAppWindow('myRelateDetail',{"id":$(this).data("id")});
            });
		}

	};

	//模块对外提供的方法
	var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){

			$('#aigov-header-login').hide();
			var btnHtml = '<a href="javascript:void(0);" id="factBtn" onclick="aigovApp.openAppWindow(\'deptMail\');">我要写信</a>';
			$('#aigov-header-button').html(btnHtml);

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
