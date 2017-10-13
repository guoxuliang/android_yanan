/**
 * 更多车辆二级页面
 *
 * **/

;define(function(require, exports, module){
    var ajax = require("ajax");

    module.exports = {
        onCreate : function(winObj){
            appWindow = winObj;
            getStationRouteData(winObj.intent);
            getMoreSameRouteData();

        }
    }

    function getStationRouteData(intent) {
		aigovApp.ajax(aigovApp.constants.busProperties.BUS_URL+"getBusLineInfoByLineName?lineName="+intent,null,function(data){
            var template_html = $('#station_route_template').html();
            var template = Handlebars.compile(template_html);
            var result_html = template(data);
            $('#staion_route').html(result_html);
        });
    }

    function getMoreSameRouteData() {
        aigovApp.ajax("UserModule/module/busMore/busMore.json",null,function(data){
            var template_html = $('#same_bus_more_template').html();
            var template = Handlebars.compile(template_html);
            var result_html = template(data);
            $('#same_bus_more').html(result_html);
        });
    }
});