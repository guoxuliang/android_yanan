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

            $('#mashDIV').click(function(){

            });

        }
    };

    var serviceType = '';   //家政服务
    var serviceScope = '';  //地区
    var serviceName = '';   //关键字
    var sort = '';          //排序
    var pageCount = 10;     //每页记录数

    //选择子类
    var changeDropDown = function(){
        var itemId = $(this).data("itemId");
        var itemDid = $(this).data("itemDid");
        var itemName = $(this).data("itemName");
        $('.changeDropDown').each(function(index, el) {
            if ($(this).data("itemDid") == itemDid) {
                $(this).removeClass('current');
                $(this).find("span").addClass('hidden');
            }
        });
        $(this).addClass('current');
        $(this).find('span').removeClass('hidden');
        if (itemDid == "57") {
            serviceType = itemId;
        }else if(itemDid == "54"){
            serviceScope = itemId;
        }else if(itemDid == "3"){
            sort = itemId;
        }
        $('.dropDownMenuName').find('li').each(function(index, el) {
            if ($(this).data("id") == itemDid) {
                $(this).trigger('click');
                $(this).children('a').children('span').html(itemName);
            }
        });
        serviceName = '';
        loadData();
    }

    //查看详情
    var openFrom = function($record){
        var serviceId=$record.data("serviceId");
        var param={
            serviceId:serviceId
        }
        aigovApp.openAppWindow("homeServiceDetail", param);
    }

    var loadData = function(){
        appWindow.intent.serviceType=serviceType;
        appWindow.intent.serviceScope=serviceScope;
        appWindow.intent.serviceName=serviceName;
        appWindow.intent.sort=sort;

        //得到模板
        var windowConfig = aigovApp.config.appWindows[appWindow.id];
        var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";

        var documentList = appWindow.getComponent('lifeService');// html中定义
        var options = {
                datasUrl   : PROJECT_URL + "/lifeSVC/getServiceList",
                pageCount  : pageCount,
                hasSearch  : false,// 不显示搜索框
                recordEvents : [{
                    'type':'tap',
                    'handle':openFrom
                }],
                dataParam : appWindow.intent
            };

        documentList._loadHtml(componentPath + 'template/homeServiceList.html',function(tplHtml){
            options.recordTpl = tplHtml;
            documentList.init(options);
        });

    }

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
            serviceType = '';   //家政服务
            serviceScope = '';  //地区
            serviceName = '';   //关键字
            sort = '';          //排序
            serviceName = winObj.intent.serviceName;

            $('#aigov-header-login').hide();
            //var btnHtml = '<a href="javascript:void(0);" id="factBtn" onclick="aigovApp.openAppWindow(\'homeServiceSearch\');"><img src="UserModule/module/my/account/style/images/edit-icon2.png" /></a>'
            var btnHtml = '<a href="javascript:void(0);" id="factBtn" onclick="aigovApp.openAppWindow(\'homeServiceSearch\');">搜索</a>'
            $('#aigov-header-button').html(btnHtml);

            loadData();

        },
        //加载事件
        loading : function(){

            $('.dropDownMenuName').find('li').click(function(event) {
                var selId = $(this).data("id");
                var $drop = $(this).parents("dt").next("dd").children('div.dropDownMenuList');
                var that = $(this);
                $drop.each(function(index, el) {
                    if ($(this).data("id") == selId) {
                        if($(this).is(":hidden")) {
                            that.find('img').attr("src","UserModule/module/homeService/style/images/lifeService_Icon02_hover.png");
                            $(this).show();
                            $('#mashDIV').show();
                        }else{
                            $(this).hide();
                            $('#mashDIV').hide();
                            that.find('img').attr("src","UserModule/module/homeService/style/images/lifeService_Icon02.png");
                        }
                    }else{
                        $(this).hide();
                    }
                });
                $(this).parent("ul").find('li').each(function(index, el) {
                    if ($(this).data("id") != selId) {
                        $(this).find('img').attr("src","UserModule/module/homeService/style/images/lifeService_Icon02.png");
                    }
                });
            });

            //家政服务
            $.ajax({
                type: "POST",
                data: {'itemDid':'57'},
                url: PROJECT_URL + "/lifeSVC/getDataitem",
                success: function(data){
                    if (data.code == 0) {
                        var tpl = $("#menuTpl").html();
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $('#dropDown1').html(html);
                    }else{
                        console.log(data.message);
                    }
                },
                error: function() {
                    console.log("加载数据失败");
                }
            });

            //地区
            $.ajax({
                type: "POST",
                data: {'itemDid':'54'},
                url: PROJECT_URL + "/lifeSVC/getDataitem",
                success: function(data){
                    if (data.code == 0) {
                        var tpl = $("#menuTpl").html();
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $('#dropDown2').html(html);
                    }else{
                        console.log(data.message);
                    }
                },
                error: function() {
                    console.log("加载数据失败");
                }
            });

            $('#homeServiceDIV').on('click','.changeDropDown', changeDropDown);
        }

    };

    module.exports = exportsMethods;

});
