/**
 * 办事
 */
;define(function(require, exports, module){
    module.exports = {
      onCreate : function(winObj){
        var _this=this;

        if(winObj.intent == null){
          $("#aigov-header-back-btn").hide();
        } else {
          $("#aigov-header-back-btn").show();
        }

        _this.loading(winObj);

      },
      loading: function (winObj) {
        var tabsComponent = winObj.getComponent("workTabs");
        tabsComponent.init({
          datas: [
            { "name": "个人办事", "content": "aiTabs.openContentByWinId('workItem',{'catId':'001','dictId':'work_cat'});" },
            { "name": "企业办事", "content": "aiTabs.openContentByWinId('workItem',{'catId':'002','dictId':'work_cat'});" },
            { "name": "部门办事", "content": "aiTabs.openContentByWinId('workItem',{'catId':'003','dictId':'work_cat'});" }
          ]
        }, function () { });

        $("#aigov-header-back-btn").on("tap", function () {
          aigovApp.back();
        });
      }
    };
  });
  