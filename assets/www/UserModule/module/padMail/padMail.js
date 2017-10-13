/**
 * 掌上信访
 */
;define(function(require, exports, module){

	var submit = function(){
		var hotMailTitle = $('#hotMailTitle').val();
		var hotMailContent = $('#hotMailContent').val();
		var hotMailAim = $('#hotMailAim').val();
		var hotMailFeedback = $('#hotMailFeedback').val();
		var hotMailInfo = $('#hotMailInfo').val();
		var checkCode = $('#checkCode').val();
		var modelId = 9;
		var params ={
				"hotMailTitle":hotMailTitle,
				"hotMailContent":hotMailContent,
				"modelId":modelId,
				"hotMailAim":hotMailAim,
				"hotMailFeedback":hotMailFeedback,
				"hotMailInfo":hotMailInfo,
				"code":checkCode
		};
		var url=aigovApp.constants.hotLine.HOT_LINE_SAVE;
    	aigovApp.utils.openLoading();
		aigovApp.ajax(url, params, function(data){
			aigovApp.utils.closeLoading();
//			aigovApp.nativeFunc.alert(data.message);
//			aigovApp.openAppWindow('mayorMail');
			if(data.code==0){
				var paramInfo = {
					"icon": "weui_icon_success",
					"title": "操作成功",
					"desc": "您的信件已经提交，我们会立即给您回复，您可以在 [我的沟通] 中查看回复信息",
					"btnPrimaryName" : "确定",
					"btnDefaultName" : "",
					"btnPrimaryUrl" : 'aigovApp.back();',
					"btnDefaultUrl" : "aiMenu.openModule('padMail')",

				};
				aigovApp.openAppWindow("resultPage", paramInfo);
			}else{
				aigovApp.nativeFunc.alert(data.message);
			}
		});

	};

	var validate = function(){
		var hotMailTitle = $('#hotMailTitle').val();
		var hotMailContent = $('#hotMailContent').val();
		var checkCode = $('#checkCode').val();
		if("" == hotMailTitle){
			aigovApp.nativeFunc.alert("主题不能为空！");
			return false;
		} else if("" == hotMailContent){
			aigovApp.nativeFunc.alert("信件内容不能为空！");
			return false;
		} else if("" == checkCode){
			aigovApp.nativeFunc.alert("验证码不能为空！");
			return false;
		} else {
			return true;
		}

	}

	module.exports = {
		onCreate : function(winObj){

			$('#checkCodeImg').attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            $('#checkCodeImg').on('tap', function(event) {
                $(this).attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            });

			$("#saveMailBtn").on("tap", function(){

                //提交
                if (validate()) {
                	submit();
                }

            });
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }

	};
});
