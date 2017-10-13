/**
 * 重置密码
 * @author chenyp
 */
;define(function(require, exports, module){

    var $ = jQuery;
    var appWindow;

    //定义工具类
    var My = function(){};
    //对象私有方法
    My.prototype = {
        init:function(){
            var that =this;

        }
    };

    var serviceType = '';   //家政服务
    var serviceScope = '';  //地区
    var serviceName = '';  //地区
    var sort = '';          //排序
    var pageCount = 10;     //每页记录数


    //模块对外提供的方法
    var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} winObj  传入的窗口对象
         */
        onCreate : function(winObj){
            this.loading();

            //进行窗口初始化
            var my = new My(winObj);
            my.init();
            if(!winObj.intent) winObj.intent = {};
            appWindow = winObj;

            $('#searchBtn').click(function(event) {
                var serviceName = $('#serviceName').val();
                aigovApp.openAppWindow('homeService',{"serviceName":serviceName});
            });

        },
        //加载事件
        loading : function(){

        }

    };

    module.exports = exportsMethods;

});
