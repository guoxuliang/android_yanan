define(function(require, exports, module) {

  var aiAppAction=require("aiAppAction");
	var Template = {
    app1: "<div class='service-item'><h3 class='service-title'>{{=name}}</h3><ul class='grid'>{{@child}}<li class='grid-item'><a href='javascript:;' class='grid-item-contain' data_type='{{=_val.type}}' data_content='{{=_val.content}}' data_param='{{=_val.param}}' data_name='{{=_val.name}}'><div class='grid-item-icon'><img src='{{=_val.icon}}' alt=''></div><div class='gird-item-text'>{{=_val.name}}</div></a></li>{{/@child}}</ul></div>"
	}
  module.exports = {
    onCreate: function(appWindow) {
			var _this=this;
			_this.loading(aigovApp.constants.appAllProperties.CONFIG_URL);
    },
    // 加载事件
    loading: function(url) {
      aigovApp.utils.openLoading();
			aigovApp.ajax(url, {"zoneName":""}, function(data){
        aigovApp.utils.closeLoading();
        $.each(data.data[0].child,function(i,o){
          result = new t(Template.app1).render(o);
          $("#J_service_list").append(result);
        });

        aiAppAction.bindAction(".grid-item-contain");
      });
    },
  };
});
