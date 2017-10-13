/**
 * 结果页
 */
define(function(require, exports, module){
	
	//ajax模块，用来处理ajax请求
	var ajax = require("ajax");
	//var appWindow, icon, title, desc, btn_primary, btn_default;
	
	var ResultPage = function(opts){
		this.opts = {
			icon : opts.icon,
			title : opts.title,
			desc : opts.desc,
			btnPrimaryName : opts.btnPrimaryName,
			btnDefaultName : opts.btnDefaultName,
			btnPrimaryUrl : opts.btnPrimaryUrl,
			btnDefaultUrl : opts.btnDefaultUrl,
		};
		
	}
	
	ResultPage.prototype.init = function(){		
		var tpl   =  $("#tpl").html();
		var template = Handlebars.compile(tpl);
		var html = template(this.opts);
		$('.ai-service-scroll').empty().append(html);
	}
	
	
	module.exports = {
		onCreate: function(winObj){ // 对外提供onCreate方法
			//appWindow = winObj;
			var rp = new ResultPage(winObj.intent);
			rp.init();
		}
	};

	
	
});
