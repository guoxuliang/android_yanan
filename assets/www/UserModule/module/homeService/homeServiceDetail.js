;define(function(require, exports, module){

    var $ = jQuery;

    //定义工具类
    var My = function(){};
    //对象私有方法
    My.prototype = {

        init:function(winObj){
    		var url = PROJECT_URL + "lifeSVC/getServiceInfo";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, winObj.intent, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if(data.data != null) {
                    	var html = $("#tpl").html();
                    	$("#lifeServiceDetail").html(html);
                    	if(data.data.serviceLogo != null && data.data.serviceLogo != ""){
                    		$("#serviceLogo").attr("src", data.data.serviceLogoPrefix + "/" + data.data.serviceLogo);
                    	} else {
                    		$("#serviceLogo").attr("src", "UserModule/module/homeService/style/images/service.jpg");
                    	}
                    	$("#serviceName").html(data.data.serviceName);
                    	if(data.data.servicePrice != null && data.data.servicePrice != ""){
                    		if(isNaN(data.data.servicePrice)){
                    			$("#servicePrice").html(data.data.servicePrice);
                    		} else {
                    			if(parseFloat(data.data.servicePrice) > 0){
                    				$("#servicePrice").html("<span>￥</span>" + data.data.servicePrice);
                    			} else {
                    				$("#servicePrice").html("面谈");
                    			}
                    		}
                    	} else {
                    		$("#servicePrice").html("面谈");
                    	}
                    	$("#serviceChecknum").html(data.data.serviceChecknum);
                    	$("#serviceTypeName").html(data.data.serviceTypeName);
                    	if(data.data.serviceTwoTypeName != null && data.data.serviceTwoTypeName != ""){
                    		$("#serviceTwoTypeName").html(data.data.serviceTwoTypeName);
                    	} else {
                    		$("#serviceTwoTypeName").html(data.data.serviceTypeName);
                    	}
                    	$("#serviceScopeName").html(data.data.serviceScopeName);
                    	if(data.data.entName != null && data.data.entName != ""){
                    		$("#entName").html(data.data.entName);
                    	} else {
                    		$("#entName").html("无");
                    	}
                    	if(data.data.serviceHoursDate != null && data.data.serviceHoursDate != ""){
                    		$("#serviceHoursDate").html(data.data.serviceHoursDate);
                    	} else {
                    		$("#serviceHoursDate").html("不限");
                    	}
                    	if(data.data.servicePhone != null && data.data.servicePhone != ""){
                    		$("#servicePhone").html(data.data.servicePhone);
                    	} else {
                    		$("#servicePhone").html("无");
                    	}
                    	if(data.data.serviceLinkman != null && data.data.serviceLinkman != ""){
                    		$("#serviceLinkman").html(data.data.serviceLinkman);
                    	} else {
                    		$("#serviceLinkman").html("无");
                    	}
                    	var html2 = $("#tpl2").html();
                    	$("#lifeServiceDetail2").html(html2);
                    	if(data.data.serviceAbstract != null && data.data.serviceAbstract != ""){
                    		$("#lifeServiceDetail2>p").append(data.data.serviceAbstract + "<br/>");
                    	}
                    	$("#lifeServiceDetail2>p").append(data.data.serviceInfo);
                    	if(data.data.commentList.length > 0){
                    		var xHtml = '';
                    		for(var i = 0;i < data.data.commentList.length;i++){
                    			var comment = data.data.commentList[i];
                    			xHtml += '<div class="interactiveTopic">';
                    			xHtml += '<div class="m-t-10"></div>';
                    			if(comment.perImg != null && comment.perImg != ""){
                    				xHtml += '<div class="interactiveTopicImg fl"><img src="'+data.data.serviceLogoPrefix + "/" + comment.perImg +'"/></div>';
                    			} else {
                    				xHtml += '<div class="interactiveTopicImg fl"><img src="UserModule/module/homeService/style/images/lifeService_Img03.png"/></div>';	
                    			}
                    			xHtml += '<div class="interactiveTopicMain fl m-l-10 w-b-72">';
                    			if(comment.perName != null && comment.perName != ""){
                    				xHtml += '<h5>'+comment.perName+'<span class="fr">'+comment.createDate+'</span></h5>';
                    			} else {
                    				xHtml += '<h5>'+comment.memberLoginName+'<span class="fr">'+comment.createDate+'</span></h5>';
                    			}
                    			xHtml += '<div class="clear"></div>';
                    			xHtml += '<p>'+comment.commentTxt+'</p>';
                    			xHtml += '<div class="clear"></div>';
                    			xHtml += '</div>';
                    			xHtml += '<div class="clear"></div>';
                    			xHtml += '</div>';
                    			if(comment.replyTxt != null && comment.replyTxt != ""){
                    				xHtml += '<div class="interactiveTopicReply">';
                    				xHtml += '<div class="m-t-5"></div>';
                    				xHtml += '<div class="interactiveTopicReplyMain fl m-l-10 w-b-90">';
                    				xHtml += '<div class="m-t-10"></div>';
                    				xHtml += '<h5>商家<em>回复</em><span class="fr">'+comment.replyDate+'</span></h5>';
                    				xHtml += '<div class="clear"></div>';
                    				xHtml += '<p>'+comment.replyTxt+'</p>';
                    				xHtml += '</div>';
                    				xHtml += '<div class="clear"></div>';
                    				xHtml += '</div>';
                    				xHtml += '<div class="m-t-20"></div>';
                    			}
                    		}
                    		$(".t2").html(xHtml);
                    	} else {
                    		$(".t2").html('<div style="text-align: center;">暂无评价</div>');
                    	}
                    }else {
                    	aigovApp.nativeFunc.alert("操作失败！");
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            });
        	
        	$(".lifeServiceDetailTab>ul>li>a").click(function(){
        		$(".lifeServiceDetailTab>ul>li>a").removeClass("current");
        		$(this).addClass("current");
        		var item = $(this).attr("data-item");
        		if(item == '1'){
        			$(".t1").show();
        			$(".t2").hide();
        		} else {
        			$(".t2").show();
        			$(".t1").hide();
        		}
        	});
        }
        
    };

    //模块对外提供的方法
    var exportsMethods = {

        onCreate : function(appWindow){
            //进行窗口初始化
            var my = new My();
            my.init(appWindow);
        }

    };

    module.exports = exportsMethods;

});
