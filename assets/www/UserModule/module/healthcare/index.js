    
    /*
     * 编辑就诊人信息
     */
    define(function(require, exports, module){

    	var appWindow;
    	
    	/*var init = function(){
    		var source;
            if (!!window.EventSource) {
                 source = new EventSource(aigovApp.constants.healthcare.HEALTH_CARE_URL);
            }
            source.onmessage = function(e){
            	$('.ai-body-box').append(e.data+"<br>");
            }
    	}*/
    	
    	var load = function(){
    		var param = {};
    		
    		aigovApp.utils.openLoading();
    		aigovApp.ajax(aigovApp.constants.healthcare.HEALTH_CARE_URL, param, function(d){
    			try{
    				if(d.results){
    					if(d.results.length > 0){
    						var tpl = $("#tpl").html();
    						var template = Handlebars.compile(tpl);
    						var html = template(d.results);
    						$('.ai-body-box').append(html);
    						read();
    					}else{
    						aigovApp.nativeFunc.alert("暂无内容");	
    					}
    				}else{
    					aigovApp.nativeFunc.alert("加载列表异常："+ d.message);	
    				}
    			}catch(e){
    				aigovApp.nativeFunc.alert("加载列表异常！"+e);
    			}finally {
    				aigovApp.utils.closeLoading();
    			}
    		});
    	}
    	
    	var read = function(){
    		var param = {
    			ids: ''
    		};
    		$('.list').each(function(){
    			param.ids += $(this).data('id') + ',';
    		});
    		
    		aigovApp.utils.openLoading();
    		aigovApp.ajax(aigovApp.constants.healthcare.HEALTH_CARE_READ_URL, param, function(d){
    			try{
    				if(d.code!=0){
						aigovApp.nativeFunc.alert("更新标识异常："+ d.message);	
					}
    			}catch(e){
    				aigovApp.nativeFunc.alert("更新标识异常！"+e);
    			}finally {
    				aigovApp.utils.closeLoading();
    			}
    		});
    	}

    	module.exports = {
    		onCreate : function(winObj){
    			appWindow = winObj;
    			load();
    		}
    	};

    });