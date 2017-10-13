/*
 * 办事
 */
define(function(require, exports, module){

	$.fn.ImgZoomIn = function () {
		var pswpElement = document.querySelectorAll('.pswp')[0];

		// build items array
		var items = [
		    {
		        src: $(this).attr("src"),
		        w: 600,
		        h: 400
		    }
		];

		// define options (if needed)
		var options = {
		    // optionName: 'option value'
		    // for example:
		    index: 0 // start at first slide
		};

		// Initializes and opens PhotoSwipe
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};
	
	var appWindow;
	
	var load = function(){
		aigovApp.utils.openLoading();
		var url=aigovApp.constants.thingsProperties.WORK_GUIDE_URL;
		var param={
				workCode:appWindow.intent[0].workCode
		}
		aigovApp.ajax(url, param, function(d){
			
			for(var i=0;i<d.data.otherinfo.length;i++){
				if(d.data.otherinfo[i].items[0]!=null&&d.data.otherinfo[i].type!='img'){
					var str=JSON.stringify(d.data.otherinfo[i].items[0].value);
					str=str.replace(/<br>/g,"").replace(/"/g,"");
					d.data.otherinfo[i].items[0].value=str;
				}
			}
			
			var tpl   =  $("#tpl").html();
			var template = Handlebars.compile(tpl);
			var html = template(d.data);
			$('.ai-body-box').append(html);
			zxsb();
			zxzx(d.data);
			aigovApp.utils.closeLoading();
		});
	}

	// 在线申报
	var zxsb = function(){
		$('#zxsb').on('tap',function(){
			var code = '';
			$('.weui_label').each(function(index, el) {
				var label = $(this).html();
				if (label == "事项编号") {
					code = $(this).parent("div.weui_cell_hd").next("div").html().replace(/[\r\n]/g,"").trim();
				}
			});

			var param={"code":code};
			aigovApp.openAppWindow("thingsSb",param);
		})
	}
	//在线咨询
	var zxzx = function(data){
		var deptCode = "";
		var deptName = "";
		for(i in data.baseinfo){
			var obj = data.baseinfo[i];
			if(obj.label=='事项编号'){
				deptCode = obj.value;
			}
			if(obj.label=='事项名称'){
				deptName = obj.value;
			}
		}
		$('#zxzx').on('tap',function(){
			var param={
					"hotMailAim" : "2"//咨询
					,"deptCode" : deptCode
					,"deptName" : deptName
			};
			//alert(deptCode+":"+deptName);
			aigovApp.openAppWindow("thingsHelp",param);
		})
	}
	/**
	 * 设置标题
	 */
	var setTitle=function(title){
		var that = this;
		var titleBox=that.$dom.find("#aigov-header-title");
		titleBox.text(title);
	};


	module.exports = {
		onCreate: function(winObj){ // 对外提供onCreate方法
			appWindow = winObj;
			load();
		}
	};



});
