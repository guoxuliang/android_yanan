/**
 * 医院信息页面
 * @author keyz@asiainfo.com
 */
;define(function(require, exports, module){
	
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
	
	//模块对外提供的方法
	var exportsMethods = {
	   
        /**
         *登陆页面的初始化 
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			var hospitalCode=appWindow.intent.hospitalCode;
			var hospitalName=appWindow.intent.hospitalName;
			$("#J_ai-hospitalInfo-title").html(hospitalName);
			this.loading(hospitalCode);
			this.loadAction();
		},
		onBack:function(){
		},
		//加载事件
		loading : function(hospitalCode){
			var url=aigovApp.constants.hospitalProperties.HOSPITAL_INFO_URL;
			aigovApp.utils.openLoading();
			aigovApp.ajax(url, {"hospitalCode":hospitalCode}, function(data){
				aigovApp.utils.closeLoading();
				if(data.code=="0"){
					var tbl=$("#J_panel_l_tpl").html();
					var result = new t(tbl).render(data.data);
					$("#J_panel_l").html(result);
					if(data.data.hospital_TelPhone == null || data.data.hospital_TelPhone == ""){
						$(".weui_btn_area").hide();
					} else {
						$(".weui_btn_area").show();
					}
					
					tbl=$("#J_panel_r_tpl").html();
					result = new t(tbl).render(data.data);
					$("#J_panel_r").html(result);
					$("#J_open_map").on("click",function(){
						var _this=$(this);
						var title=_this.attr("data_title");
						var address=_this.attr("data_address");
						//经度
						var lng=_this.attr("data_lng");
						//纬度
						var lat=_this.attr("data_lat");
						var param={
							title:title,
							address:address,
							lng:lng,
							lat:lat
						}
						aigovApp.openAppWindow("hopitalMap",param);
						
					});
				}
				
			});
		},
		//加载事件
		loadAction:function(){
			$("#aigov-header-back-btn").on("tap",function(){
				aigovApp.back();
			});
			
			$("#J_open_map").on("click",function(){
				var _this=$(this);
			})
			$(".J_hospitalInfo_btn").on("click",function(){
				var _this=$(this);
				var type=_this.attr("data_type");
				
				if(type=="0"){
					$(".ai-hospitalInfo-button-l").addClass("cur");
					$(".ai-hospitalInfo-button-r").removeClass("cur");
					$("#J_ai-hospitalInfo-box-l").show();
					$("#J_ai-hospitalInfo-box-r").hide();
					
				}else{
					$(".ai-hospitalInfo-button-r").addClass("cur");
					$(".ai-hospitalInfo-button-l").removeClass("cur");
					$("#J_ai-hospitalInfo-box-l").hide();
					$("#J_ai-hospitalInfo-box-r").show();
				}
			});
			
		}
	};
	
	module.exports = exportsMethods;

});