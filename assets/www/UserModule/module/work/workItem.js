/*
 * 办事子项
 */
define(function (require, exports, module) {
    var aiAppAction=require("aiAppAction");

    module.exports = {
      onCreate: function (winObj) {
        //办事
        var workMain;
        //内容
        var $content = null;
  
        aigovApp.utils.openLoading();
  
        // 分类导航单击事件
        var workList = function (o) {
          var that = o;
          var url = aigovApp.constants.serviceProperties.TYPE_URL;
          var params = {
            type: that.opts.catId,
            pageIndex: 1,
            pageSize: 100
          }
          aigovApp.ajax(url, params, function (d) {
            if (d.data != null) {
              aigovApp.utils.closeLoading();
              if (params.type == "001") {
                var tpl   =  $("#tpl1",workMain.dom).html();
                var template = Handlebars.compile(tpl);
                var result = template({ data: d.data.results, thingsType: "001"});
                $content.html(result);
              } else if (params.type == "002") {
                var tpl   =  $("#tpl1",workMain.dom).html();
                var template = Handlebars.compile(tpl);
                var result = template({ data: d.data.results, thingsType: "002"});
                $content.html(result);
              } else if (params.type == "003") {
                var tpl   =  $("#tpl2",workMain.dom).html();
                var template = Handlebars.compile(tpl);
                var result = template({ data: d.data.results, thingsType: "003"});
                $content.html(result);
              }
              aiAppAction.bindAction(".grid-item-contain");
            } else {
              aigovApp.nativeFunc.alert("请先订阅服务！");
            }
          });
        }
  
        var work = function (opts, dom) {
          this.opts = opts;
          this.dom = dom;
        }
  
        work.prototype.load = function () {
          workList(this);
        }
  
        workMain = new work(winObj.intent, winObj.$dom);
  
        aigovApp.workMain = workMain;
  
        //内容
        $content = $('#J-work-list', winObj.$dom);
  
        workMain.load();
      },
      onBack: function (intent) {
  
      }
    };
  });
  