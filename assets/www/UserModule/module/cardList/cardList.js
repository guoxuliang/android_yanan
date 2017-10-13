/**
 * 卡列表列表
 */
;define(function(require, exports, module){
	
	module.exports = {
		onCreate : function(winObj){
			var _this=this;
			_this.loading();
		},
		//加载
		loading:function(hospitalCode){
			var that = this;
			
			var session = $.parseJSON(window.localStorage.account);
            var cardNo = session.user.cardNum;  //一卡通卡号
            var sfzhm = session.user.idCardNo;  //身份证号码
            if(cardNo){
            	 // 获取一卡通状态
                var params = {"sfzhm":sfzhm};
                var url = PROJECT_URL + "card/searchCardStatus";
                //var url="UserModule/module/cardList/config.json";
                aigovApp.utils.openLoading();
                aigovApp.ajax(url, params, function(data){
                    aigovApp.utils.closeLoading();
                    $('.ai-cardList-msg').hide();
                    if (data.code == "0") {
                        if (data.data.resultCode == "10000") {  //操作成功
                            //获取一卡通卡列表
                            that.queryCardStatus(sfzhm);

                        }else if(data.data.resultCode == "10155") { //办理中
                            $('.ai-cardList-msg').show();
                            $('.ai-cardList-msg').html("您申请的一卡通目前状态：正在办理");
                        }else {
                            aigovApp.nativeFunc.alert();
                        }
                    }else {
                    	 $('.ai-cardList-msg').show();
                         $('.ai-cardList-msg').html(data.message);
                    }
                });
            }else{
            	$('.ai-cardList-msg').show();
                $('.ai-cardList-msg').html("当前用户未认证");
            }
		},
		queryCardStatus:function(idNo){
			var that = this;
            var params = {"idNo":idNo};
            var url = PROJECT_URL + "card/queryCardStatus";
            //var url="UserModule/module/cardList/config2.json";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        that.setCardInfo(data.data.records);
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            },function(){
                aigovApp.utils.closeLoading();
                aigovApp.nativeFunc.alert("查询失败");
            });
		},
		setCardInfo: function(records){
			var xHtml = '';
            for (var i = 0; i < records.record.length; i++) {
                var record = records.record[i];

                xHtml += '<div class="myAccount1 cardInfo2">';
                xHtml += '<div class="padding">';
                xHtml += '<div class="weui_cells">';
                xHtml += '<div class="weui_cell">';
                xHtml += '<div class="weui_cell_bd weui_cell_primary">';
                xHtml += '<p>'+record.masterCardTypeDesc+'</p>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell_ft curCardNo">';
                xHtml += record.cardNo;
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell">';
                xHtml += '<div class="weui_cell_bd weui_cell_primary">';
                xHtml += '<p>状态正常</p>';
                xHtml += '</div>';
                xHtml += '<div class="weui_cell_ft">';
                xHtml += '有效期：'+record.cardValidity;
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '</div>';
                xHtml += '<ul>';
                xHtml += '<a href="javascript:void(0);" onclick="aigovApp.openAppWindow(\'myAccount-jycx\',{\'cardNum\':\''+record.cardNo+'\'});">交易查询</a>';
                xHtml += '</ul>';
                xHtml += '</div>';
            }
            $("#J_hospitaldept_body_Box").html(xHtml);
            $('.ai-cardList-msg').hide();
            iscroll=new IScroll($("#J_hospitaldept_Box")[0]);
		},
		//查询事件
		searchEvent:function(){
			var tbl=$("#J_hospitaldept_tpl").html();
			var url=aigovApp.constants.hospitalProperties.HOSPITAL_DEPT_LIST_URL;
			aigovApp.utils.openLoading();
			var param={"hospitalCode":module.exports.hospitalCode};
			var extraCon=$("#aigov-search-input").val();
			if(extraCon!=""){
				param.extraCon=extraCon;
			}
			$("#J_hospitaldept_body_Box").html("");
			aigovApp.ajax(url,param , function(data){
				aigovApp.utils.closeLoading();
				for(var i=0;i<data.data.length;i++){
					var tempData=data.data[i];
					var result = new t(tbl).render(tempData);
					$("#J_hospitaldept_body_Box").append(result);
				}
				$(".weui_cell").on("tap",function(){
					var _this=$(this);
					var deptCode=_this.attr("data_deptCode");
					var deptName=_this.attr("data_deptName");
					
					var param={
							hospitalId:module.exports.hospitalId,
							hospitalCode:module.exports.hospitalCode,
							hospitalName:module.exports.hospitalName,
							deptCode:deptCode,
							deptName:deptName
					}
					aigovApp.openAppWindow(module.exports.module,param);
				})
				
				iscroll=new IScroll($("#J_hospitaldept_Box")[0]);
				
			});
		},
		
		//退回事件
        onBack:function(){
        	//刷新
        	if(!iscroll){
				iscroll=new IScroll($("#J_hospitaldept_Box")[0]);
			}else{
				iscroll.refresh();
			}
        }
		
	};
});
