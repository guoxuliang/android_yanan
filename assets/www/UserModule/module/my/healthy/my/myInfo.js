/**
 * 我的信息
 */
;define(function(require, exports, module){

	var submit = function(){


	};

	var validate = function(){


	}
	var account = null;
	var load = function(op){

		Handlebars.registerHelper("dateDayFormat",function(date){
         	return moment(date).format('YYYY-MM-DD');
		});

		account = $.parseJSON(window.localStorage.account);

		var idCardNo = account.user.idCardNo;
		if (!idCardNo) {
			$('#content').append("暂无数据");
			return;
		}
		var paramsQuery ={
			healthArchivesNo:idCardNo
		};

		var url=aigovApp.constants.my.MY_HEALTH_MY_INFO;
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, paramsQuery, function(d){
			aigovApp.utils.closeLoading();
			if(d.code==0&&d.data.result_Code=='0000'){
				var tpl   =  $("#tpl").html();
				var template = Handlebars.compile(tpl);

				var html = template(d.data.record);
				$('#content').append(html);

				$('#item1').show();

				// tab
			    $('.weui_tab .weui_navbar_item').click(function(){
			    	var me = $(this);
			    	var id = me.data('id');
			    	$('.weui_tab_bd_item').hide();
			    	$('#item'+id).show();
			    });
			}else{
				aigovApp.nativeFunc.alert("请求失败！");
			}
		});
	}

	module.exports = {
		onCreate : function(winObj){
			load(winObj.intent);
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }

	};
});
