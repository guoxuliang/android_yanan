/**
 * 我要爆料
 */
;define(function(require, exports, module){

	var fileObj = [];
	var convertImgToBase64 =function(url, callback, outputFormat){ 
		var canvas = document.createElement('CANVAS'); 
		var ctx = canvas.getContext('2d'); 
		var img = new Image();
		img.src=url;
		img.crossOrigin = 'Anonymous'; 
		img.onload = function(){ 
			canvas.height = img.height; 
			canvas.width = img.width; 
			ctx.drawImage(img,0,0); 
			var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg'); 
			callback.call(this, dataURL); 
			canvas = null; 
		};
		return url;
	};
	var getLocation = function () {
		window.plugins.PositionPlugin.getCurrentPosition(function(data){
			var $addr = $('#mapAddr');
			var addr = data.AddrStr;
			$addr.html(addr);
			$addr.attr("data-lng",data.coords.longitude).attr("data-lat",data.coords.latitude);
		},function(data){
			aigovApp.nativeFunc.alert(data.message);
		})
	}

		
	var GetExtensionFileName=function(pathfilename) {
		var reg = /(\\+)/g;
		var pfn = pathfilename.replace(reg, "#");
		var arrpfn = pfn.split("#");
		var fn = arrpfn[arrpfn.length - 1];
		var arrfn = fn.split(".");
		return arrfn[arrfn.length - 1];
	}
	
	module.exports = {
		onCreate : function(winObj){
			fileObj = [];
			$("input:file").change(function(e) {
			      
				if(fileObj.length >= 6){
					aigovApp.nativeFunc.alert("最多只能上传6张照片!");
					return false;
				}
				
				aigovApp.utils.openLoading();
				var freader = new FileReader();
				freader.readAsDataURL(this.files[0]);
				freader.onload=function(e){
					aigovApp.utils.closeLoading();
					var base64=this.result
					fileObj.push({
		        		file64:base64
		        	})
					$("#files_1").append('<li class="weui_uploader_file" style="background-image: url('+base64+')"></li>');
					var photoNum = parseInt($('#photoNum').html()||'0');
	        		$('#photoNum').html((photoNum+1));
				}
				
			})
			for(var i=0;i<fileObj.length;i++){
				fileObj[i]=i; 
				$('fileObj[i]').ready(function(){
					$("fileObj[i]").click(function(){
						$("fileObj[i]").remove();
					});
				});
			}
			$('.quickInfo').click(function(e){
				var me = $(this);
				var text = me.html();
				var infoText = $("textarea#infoText").val();
				console.log(infoText);
				console.log(text);
				infoText = infoText.substring(1,infoText.length);
				infoText = infoText.substring(infoText.indexOf("#")+1,infoText.length);
				$("textarea#infoText").val(text+infoText);
			});

			$('#sendFactBtn').click(function(e){
				var infoText = $('#infoText').val();
				if("" == infoText){
					aigovApp.nativeFunc.alert("内容不能为空！");
					return false;
				}
				aigovApp.utils.openLoading();
				window.plugins.PositionPlugin.getCurrentPosition(function(data){
					var params ={
							"factContent":infoText,
							files:JSON.stringify(fileObj),
							address:data.AddrStr,
							lng:data.coords.longitude,
							lat:data.coords.latitude,
					};
					var url=aigovApp.constants.hotLine.FACT_SAVE;
					aigovApp.ajaxForm("J_fact_form",url, params, function(data){
						aigovApp.utils.closeLoading();
						if(data.code==0){
							aigovApp.back("refresh");
						}else{
							aigovApp.nativeFunc.alert("保存失败！");	
						}
						
					});
				},function(data){
					aigovApp.nativeFunc.alert(data.message);
					aigovApp.utils.closeLoading();
				})
			});

			var date = new Date();
			$(".weui_cells>.weui_cell>span").html(date.format("yyyy-MM-dd hh:mm:ss"));
			
			getLocation();//定位当前位置
		},
		//退回事件
        onBack:function(){
        	//刷新
        	//this.appWindow.getComponent('serviceDatalist').refresh();
        }

	};
});
