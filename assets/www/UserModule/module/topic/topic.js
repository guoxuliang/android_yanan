/**
 * 城市声音
 */
;define(function(require, exports, module){

    //ajax模块，用来处理ajax请求
    var ajax = require("ajax");
    var appWindow;
    var aiAppAction=require("aiAppAction");

    var photoSwipe = function(o){
        var $this = o;
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var items = [];
        aigovApp.utils.openLoading();
        $("<img/>").attr("src", $this.attr("maxSrc")).load(function() {
            aigovApp.utils.closeLoading();
            var pic_real_width, pic_real_height;
            pic_real_width = this.width;
            pic_real_height = this.height;
            var item = {
                src: $this.attr("maxSrc"),
                w: pic_real_width,
                h:pic_real_height
            }
            items.push(item);
            var options = {
                index: 0 // start at first slide
            };
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        });


    }

    var load = function(winObj){
        var url = aigovApp.constants.hotLine.TOPIC_LIST;
//		aigovApp.ajax(url, null, function(d){
//			//cellLoad(d.data);
//			//panelLoad(d.data);
//
//			var tpl   =  $("#tpl").html();
//			var template = Handlebars.compile(tpl);
//			var html = template(d);
//			$('#cityVoiceList').append(html);
//			bindEvent();
//		});

        var _this=this;
        _this.appWindow=winObj;


        //得到模板
        var windowConfig = aigovApp.config.appWindows[winObj.id];
        var componentPath=windowConfig.js.slice(0,windowConfig.js.lastIndexOf("/"))+"/";

        var documentList = winObj.getComponent('cityVoiceList');// html中定义
        // this.intent=winObj.intent;
        //this.module=winObj.intent.module;
        var photoSwipeAction=function(){
            photoSwipe($(this));
        }
        var options = {
            datasUrl   : url,
            pageCount  : 15,
            hasSearch  : false,// 不显示搜索框
            recordEvents : [{
                'type':'tap',
                'handle':openFrom
            }],
            pullupAction:function(){
                documentList.getDatas(true,function(content){
                    documentList.getComp('list').renderData(content,true);
                    $("ul img").off("tap").on("tap",photoSwipeAction);
                    del(winObj);
                })
            }
        };

        documentList._loadHtml(componentPath + 'template/topicList.html',function(tplHtml){
            options.recordTpl = tplHtml;
            documentList._loadHtml(componentPath + 'template/topicList.html',function(tplHtml){
                options.recordTpl = tplHtml;
                documentList.init(options, function(){
                    $("ul img").off("tap").on("tap",photoSwipeAction);
                    del(winObj);
                });
            });
        });
    }

    var del = function(winObj){
        if(aigovApp.session.getSession().user){
            $('.del').show();
            $('.cityVoiceList').each(function(){
                var createId = $(this).data('createId');
                var cityVoiceId = $(this).data('cityVoiceId');
                var userId = aigovApp.session.getSession().user.userId;
                if(createId == userId){
                    //$(this).find('a.del').tap(function(){	del_click(cityVoiceId, winObj); })
                }else{
                    $(this).find('a.del').hide();
                }
            })
        }else{
            $('.del').hide();
        }
    }

    var del_click = function(cityVoiceId, winObj){
        var _this = this;
        $('#ifOut').show();
        $('#cancelBtn').on('click', no);
        $('#sureBtn').on('click', function(){ yes(cityVoiceId, winObj) });
    }

    //取消
    var no = function() {
        $('#ifOut').hide();
    }

    //确认
    var yes = function(cityVoiceId, winObj) {
        var _this = this;
        $('#ifOut').hide();
        var param = {
            cityVoiceId: cityVoiceId
        };
        aigovApp.ajax(aigovApp.constants.hotLine.CITY_VOICE_DEL, param, function(d){
            try{
                if(d.code!=0){
                    aigovApp.nativeFunc.alert("删除异常："+ d.message);
                }else{
                    //load(winObj);
                    _this.appWindow.getComponent('cityVoiceList').refresh();
                }
            }catch(e){
                aigovApp.nativeFunc.alert("删除异常！"+e);
            }
        });
    }

    var openFrom = function($record){
        var cityVoiceId=$record.attr("cityVoiceId");
        var type=$record.attr("type");

        if(type=='like'){
            window.MacAddress.getMacAddress(function(macAddress) {
                    var me = $record;
                    var url = aigovApp.constants.hotLine.CITY_VOICE_LIKE;
                    var params = {
                        cityVoiceId : me.data('id'),
                        mac:macAddress
                    };
                    aigovApp.ajax(url, params, function(d){
                        if(d.code==0){
                            var iTag = me.find('i');
                            var likeNum = parseInt(iTag.html()||'0')+1;
                            iTag.html(likeNum);
                        }else{
                            aigovApp.nativeFunc.alert(d.message);
                        }
                    });
                },
                function(fail) {
                    aigovApp.nativeFunc.alert(fail);
                })



        }else if(type=='message'){
            var params = {
                id:cityVoiceId
            };
            aigovApp.openAppWindow('cityVoiceReply',params);
        }else if(type=='del'){
            del_click(cityVoiceId, appWindow);
        }
    }

    var bindEvent = function(){
        $('.messageTag').click(function(e){
            var me = $(this);
            var params = {
                id:me.data('id')
            };
            aigovApp.openAppWindow('cityVoiceReply',params);
        });

        $('.likeTag').click(function(e){
            var me = $(this);
            var iTag = me.find('i');
            var likeNum = parseInt(iTag.html()||'0')+1;
            iTag.html(likeNum);

            var url = aigovApp.constants.hotLine.CITY_VOICE_LIKE;
            var params = {
                cityVoiceId : me.data('id')
            };
            aigovApp.ajax(url, params, function(d){

            });
        });
    }

    module.exports = {
        appWindow:null,
        onCreate : function(winObj){
            this.appWindow=winObj;
            $('#aigov-header-login').hide();
//            var btnHtml = '<a href="javascript:void(0);" id="factBtn" onclick="aigovApp.openAppWindow(\'fact\');"></a>'
//            $('#aigov-header-button').html(btnHtml);

            load(winObj);
        },
        //退回事件
        onBack:function(fn){
            this.appWindow.getComponent('cityVoiceList').refresh();
        }

    };
});