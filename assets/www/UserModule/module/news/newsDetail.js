/**
 * 新闻资讯详细页
 */
define(function(require, exports, module){
	
	var NewsDetail = function(opts){
		this.opts = {
			title : opts.title,
			id : opts.id
		};
		
	}
	
	NewsDetail.prototype.init = function(){
		
		var that = this;
		var url = aigovApp.constants.news.NEWS_DETAIL_URL;
		var params = {
				infoId:that.opts.id
		};
		
		aigovApp.utils.openLoading();	
		
		aigovApp.ajax(url, params, function(d){
			var tpl  =  $("#tpl").html();
			var template = Handlebars.compile(tpl);
			var html = template(d.data);
			$('.ai-body-box').empty().append(html);
			
			aigovApp.utils.closeLoading();
			
			$('#player').click(function(){
				var url=$(this).data('url');
				url=url.replace(/(^\s*)|(\s*$)/g,'');
				window.plugins.VideoPlugin.PlayVideo(encodeURI(url));
				aigovApp.openVideoFlag = true;
			})
		})
		
	}
	
	
	module.exports = {
		onCreate: function(winObj){ // 对外提供onCreate方法
			appWindow = winObj;
			
			var dictId = winObj.intent.dictId;
			var obj = winObj.getComponent('header');
			if(dictId == "news_cat"){
				obj.setTitle("资讯");
			} else if(dictId == "invest_cat"){
				obj.setTitle("投资");
			} else if(dictId == "tour_cat"){
				obj.setTitle("旅游");
			}
			
			var nd = new NewsDetail(winObj.intent);
			nd.init();
		}
	};

	
	
});
