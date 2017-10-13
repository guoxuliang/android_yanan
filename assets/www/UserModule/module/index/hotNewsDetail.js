/**
 * 热门新闻资讯详细页
 */
define(function(require, exports, module){
	
	var HotNewsDetail = function(opts){
		var id = opts[0].id;
		var title = opts[1].title;
		this.opts = {
			title : title,
			id : id
		};
		
	}
	
	HotNewsDetail.prototype.init = function(){
		
		var that = this;
		
		var url = aigovApp.constants.indexProperties.NEWS_DETAIL_URL;
		var params = {
			id: that.opts.id
		};
		
		aigovApp.utils.openLoading();	
		
		aigovApp.ajax(url, params, function(data){

			var tpl  =  $("#tpl").html();
			var template = Handlebars.compile(tpl);
			var html = template(data.data);
			$('.ai-body-box').empty().append(html);
			
			aigovApp.utils.closeLoading();
			
		})
		
	}
	
	
	module.exports = {
		onCreate: function(winObj){
			appWindow = winObj;
			var nd = new HotNewsDetail(winObj.intent);
			nd.init();
		}
	};

	
	
});
