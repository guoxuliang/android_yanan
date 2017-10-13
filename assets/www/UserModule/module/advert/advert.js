/**
 * 广告
 */
;define(function(require, exports, module){

	var second=6;
	function change(){
		second--;
		if(second>-1){
			document.getElementById("second").innerHTML=second;
			timer = setTimeout(change,1000);//调用自身实现
		}else if(second==-1){
			clearTimeout(timer);
			aigovApp.cleanHistory();
			aigovApp.openAppWindow("mainPage")
		}
	}

	module.exports = {
		onCreate : function(winObj){
		    new IScroll($(".advert_box")[0]);
			$("#myJ").on("tap",function(){
				second=-2;
				clearTimeout(change);
				aigovApp.cleanHistory();
				aigovApp.openAppWindow("mainPage");
			});
			var aiAppAction=require("aiAppAction");
			var rs=winObj.intent;
			var type=rs.data[0].child[0].type;
            var content=rs.data[0].child[0].content;
            var param=rs.data[0].child[0].param;
            var name=rs.data[0].child[0].name;
            $(".my_index_advert").attr("data_type",type);
            $(".my_index_advert").attr("data_content",content);
            $(".my_index_advert").attr("data_param",param);
            $(".my_index_advert").attr("data_name",name);
            aiAppAction.bindAction(".my_index_advert","tap");
            change();

		},
		//退回事件
        onBack:function(){
        	
        }

	};
});
