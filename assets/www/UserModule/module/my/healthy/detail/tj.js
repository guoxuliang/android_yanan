/**
 * 体检详细
 */
;define(function(require, exports, module){

	var submit = function(){


	};

	var validate = function(){


	}

	var load = function(op){

		Handlebars.registerHelper("dateDayFormat",function(date){
         	return moment(date).format('YYYY-MM-DD');
		});

		Handlebars.registerHelper("nameHidden",function(name){
        	if(name==null||name==undefined||name==''){
				return '';
			}
        	var newName = '';
        	if(name.length==1){
        		newName = name+'医生';
        	}else if(name.length==2){
        		newName = name.substring(0,1)+'*医生';
        	}else{
        		newName = name.substring(0,1)+'**医生';
        	}
        	return newName;
		});


		var paramsQuery ={
				healthExamId:op.id
		};

		var url=aigovApp.constants.my.MY_HEALTH_TJ_DETAIL;
		aigovApp.utils.openLoading();
		aigovApp.ajax(url, paramsQuery, function(d){
			aigovApp.utils.closeLoading();
			if(d.code==0){
				var tpl = $("#tpl").html();
				var template = Handlebars.compile(tpl);
				var html = template(d);
				$('#info').append(html);
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
