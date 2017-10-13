/**
 * 部门信息
 */
;define(function(require, exports, module){
	
	var parentId = '';
	var index = 0;

	var photoSwipe = function(o){
		var $this = o;
		var pswpElement = document.querySelectorAll('.pswp')[0];

		// build items array
		var items = [];
		
		$("<img/>").attr("src", $this.attr("src")).load(function() {
			 var pic_real_width, pic_real_height;
			 pic_real_width = this.width;
			 pic_real_height = this.height;
			 var item = {
		        src: $this.attr("src"),
		        w: pic_real_width,
		        h:pic_real_height
		    }
			 items.push(item);
			 var options = {
			    index: 0 // start at first slide
			 };
			 var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			 gallery.init();
		 });
		
		
	}	
	
	var load = function(op){	
		var handleHelper = Handlebars.registerHelper("reverseIndex",function(index,length){
			//返回+1之后的结果
			return length-index;
		});
		
		parentId = op.id;
		var url = aigovApp.constants.hotLine.CITY_VOICE_REPLY_LIST;
		var params = {
				parentId:op.id
		};
		aigovApp.ajax(url, params, function(d){
			//cellLoad(d.data);
			//panelLoad(d.data);
			
			if(d.code==0){
				var userInfo = account.user;
				d.data.userInfo = userInfo;
				var tpl   =  $("#tpl").html();
				var template = Handlebars.compile(tpl);
				var html = template(d.data);
				index = d.data.replylist.length+1;
				$('#replyContent').append(html);
				bindEvent();
			}else{
				aigovApp.nativeFunc.alert(d.message);
			}
			
		});
	}
	
	var bindEvent = function(){
		$('.delReplyBtn').click(delConfirm);
		
		$("ul img").on("tap",function(){
			photoSwipe($(this));
		})
	};
	
	var submit = function(){
		var replyInput = $('#replyInput').val();
		var params ={
				"factContent":replyInput,
				parentId:parentId,
				type:1
		};
		var url=aigovApp.constants.hotLine.CITY_VOICE_REPLY_SAVE;
    	aigovApp.utils.openLoading();
		aigovApp.ajax(url, params, function(data){
			aigovApp.utils.closeLoading();
//			aigovApp.nativeFunc.alert(data.message);
//			aigovApp.openAppWindow('mayorMail');
			if(data.code==0){
//				var paramInfo = {
//					"icon": "weui_icon_success",
//					"title": "操作成功",
//					"desc": "",
//					"btnPrimaryName" : "确定",
//					"btnDefaultName" : "",
//					"btnPrimaryUrl" : 'aigovApp.back();',
//					"btnDefaultUrl" : "aiMenu.openModule('cityVoice')",
//						
//				};
//				aigovApp.openAppWindow("resultPage", paramInfo);
				aigovApp.nativeFunc.alert("提交成功！");
				addReply(data.data);
			}else{
				aigovApp.nativeFunc.alert("提交失败！");	
			}
		});
		
	};
	
	var delConfirm = function(){
		var me = $(this);
		delObj = me;
		$('#ifOut').show();
	}
	
	var delObj = null;
	
	var delReply = function(obj){
		if(obj==null){
			return false;
		}
		var me = obj;
		var id = me.data('id');
		var replyInput = $('#replyInput').val();
		var params ={
				userId:account.user.userId,
				cityVoiceId:id
		};
		var url=aigovApp.constants.hotLine.CITY_VOICE_REPLY_DEL;
    	aigovApp.utils.openLoading();
		aigovApp.ajax(url, params, function(data){
			aigovApp.utils.closeLoading();
			if(data.code==0){
				aigovApp.nativeFunc.alert("撤销成功！");
				me.closest('.cityVoiceList').remove();
			}else{
				aigovApp.nativeFunc.alert("撤销失败！");	
			}
		});
	};
	
	var validate = function(){
		var replyContent = $('#replyContent').val();
		if("" == replyContent){
			aigovApp.nativeFunc.alert("评论不能为空！");
			return false;
		} else {
			return true;
		}

	}
	
	var addReply = function(id){
		var replyInput = $('#replyInput').val();
		var phoneNo = account.user.phoneNo.substr(0,3) + "****" + account.user.phoneNo.substr(7)
		var htmlStr = '';
		
		htmlStr += '<div class="cityVoiceList">';
		htmlStr += '<dl>';
		htmlStr += '<dt><a><img src="UserModule/module/cityVoice/images/city/pic.png" width="50"  /> </a> </dt>';
		htmlStr += '<dd>';
		htmlStr += '<strong>'+phoneNo+'</strong>'+(index++)+'楼 ' +(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
		htmlStr += '</dd>';
		htmlStr += '<div style="float: right;"><a data-id="'+id+'" href="javascript:void(0);" class="delReplyBtn"><i class="reply-icon1">&nbsp;&nbsp;&nbsp;</i></a></div>';
		htmlStr += '<div class="clear"></div>';
		htmlStr += '</dl>';
		htmlStr += '<ol style="padding-left:80px;font-size: 0.8em;">'+replyInput+'</ol>';
		htmlStr += '</div>';
		htmlStr += '';
		$('#replyList').prepend(htmlStr);
		
		$('.delReplyBtn').click(delConfirm);
		$('#replyInput').val('');
	}
	
	var account = null;
	
	module.exports = {
		onCreate : function(winObj){
			index = 0;
			parentId = '';
			
			account = $.parseJSON(window.localStorage.account);
			
			//****弹出框
			//取消
			 $('#cancelBtn').on('tap', function(event) {
	                $('#ifOut').hide();
	         });
			 
			//确认
            $('#sureBtn').on('tap', function(event) {
            	$('#ifOut').hide();
            	delReply(delObj);
            });
          //****弹出框
			
			$('#aigov-header-login').hide();
			var btnHtml = '<a href="javascript:void(0);" style="display: none;" id="factBtn" onclick="aigovApp.openAppWindow(\'fact\');">我要爆料</a>'
			$('#aigov-header-button').html(btnHtml);
			
			load(winObj.intent);
			
			$("#saveReplyBtn").on("tap", function(){
				
				var replyInput = $('#replyInput').val();
				if(replyInput){
					submit();
					
					
//					console.log(account)
					
					
				}
//                //提交
//                if (validate()) {
//                	submit();
//                }

            });
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }
		
	};
});