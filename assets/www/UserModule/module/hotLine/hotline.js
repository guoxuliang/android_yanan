/**
 * 互动
 */
; define(function (require, exports, module) {

	var Template = {
		slide: "{{@data}}<div class='swiper-slide' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><img alt='{{=_val.name}}' src='{{=_val.icon}}' /></div>{{/@data}}",
	}

	module.exports = {
		onCreate: function (winObj) {
			var that = this;
			$("#aigov-header-back-btn").hide();
			$('.link').click(function () {
				var me = $(this);
				var tag = me.data('tag');
				if (tag) {
					aigovApp.openAppWindow(tag);
				} else {
					var msg = me.data('msg');
					if (msg) {
						aigovApp.nativeFunc.alert(msg);
					} else {
						var url = me.data('url');
						if (url) {
							window.plugins.webViewPlugin.open(url);
						}
					}
				}
			});

			this.load(winObj);
		},
		load: function (winObj) {
			var url = aigovApp.constants.hotLine.HOT_LINE_SLIDE;
			var params = {};
			aigovApp.utils.openLoading();


			console.log('url:', url)
			aigovApp.ajax(url, params, function (data) {
				aigovApp.utils.closeLoading();
				var result = new t(Template.slide).render(data);
				$("#J-ai-hotline-swiper-wrapper").html(result);
				new Swiper('#J-ai-hotline-swiper', {
					pagination: '.swiper-pagination',
					paginationClickable: true
				});

				
			});
		},
		//退回事件
		onBack: function () {

		}
	};
});
