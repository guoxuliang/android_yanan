/**
 * 我的账户-个人申领
 * @author chenyp
 */
;define(function(require, exports, module){

	var $ = jQuery;

	//定义工具类
	var CurWin = function(){};
	var cardFront = "UserModule/module/my/ykt/style/images/idcard_front.jpg";
	var cardBack = "UserModule/module/my/ykt/style/images/idcard_back.jpg";
	var cardHand = "UserModule/module/my/ykt/style/images/idcard_hand.jpg";
	//对象私有方法
	CurWin.prototype = {

		init:function(){
            var that = this;

            $('#aigov-header-title').html("个人申领");
            $('.grsl').removeClass('hidden2');

            $('#checkCodeImg').attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            $('#checkCodeImg').on('tap', function(event) {
                $(this).attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            });

            $('#cardType').change(function(event) {
                if ($(this).val() == "0") {
                    $('.grsl1').removeClass('hidden2');
                    $('.grsl2').addClass('hidden2');
                }else {
                    $('.grsl1').addClass('hidden2');
                    $('.grsl2').removeClass('hidden2');
                }
            });
            
            $('#obtainCardtype').change(function(event) {
            	//自取
            	if ($(this).val() == "1") {
            		$("#mailAddr").val("");
            		$("#mailAddr").attr("disabled", "disabled");
            		$("#obtainCardnet1").removeAttr("disabled");
            		$("#obtainCardnet2").removeAttr("disabled");
            		$("#payType").val("1");
            	}else {
            		$("#mailAddr").removeAttr("disabled");
            		$("#obtainCardnet1").attr("disabled", "disabled");
            		$("#obtainCardnet2").attr("disabled", "disabled");
            		$("#payType").val("0");
            	}
            });

            //个人申领
            $("#submitBtn").on("tap", function(){

                //提交
                if (that.validate()) {
                    that.submit();
                }

            });

            //身份证图片选择
            $("input:file").change( function() {
            	var $file = $(this);//文件控件
				var $input = $(this).parent().prev();//文件数据
				var $exampleImg = $(this).prev();	//样例图片
				var $btn = $(this).next().find("dl");//点击按钮
				var freader = new FileReader();
				freader.readAsDataURL(this.files[0]);
				aigovApp.utils.openLoading();
				freader.onload = function(e){
					aigovApp.utils.closeLoading();
					var base64 = this.result;
					$input.val(base64.split(",")[1]);//修改文件数据
					$exampleImg.attr("src", base64);//替换样例图片
					$btn.css("z-index","-1");//隐藏按钮
				}
			});
            //加载字典
            loadDict();

            //加载测试数据
            initTestDatas();
		},

		/**
		 * 提交
		 * @param password String 密码
		 */
		submit : function(type){
            var cardType = $('#cardType').val();
            var cardNo = $('#cardNo').val();
            var cardName = $('#cardName').val();
            var code = $('#code').val();
            var session = $.parseJSON(window.localStorage.account);
			var params = {
					loginName:session.user.phoneNo
			};

			var url = PROJECT_URL + "card/cardApply";
			aigovApp.utils.openLoading();
			$("#obtainCardnet1").attr("disabled",false);
			$("#obtainCardnet2").attr("disabled",false);
			$("#payType").attr("disabled",false);
			aigovApp.ajaxForm("czsForm", url, params, function(data){
                aigovApp.utils.closeLoading();
                $("#obtainCardnet1").attr("disabled",true);
    			$("#obtainCardnet2").attr("disabled",true);
    			$("#payType").attr("disabled",true);
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {
                        aigovApp.nativeFunc.alert("提交成功");
                        aigovApp.openAppWindow('myAccount');
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            },function(){
                aigovApp.nativeFunc.alert("查询失败");
            });
		},

		validate : function(type){
            return true;
		}

	};

	//模块对外提供的方法
	var exportsMethods = {

        /**
         *登陆页面的初始化
         * @param {Object} appWindow  传入的窗口对象
         */
		onCreate : function(appWindow){
			this.loading();

            //进行窗口初始化
            var curWin = new CurWin(appWindow);
            curWin.init();
            //修改回退按钮事件
            updateBaclBtnClick();
		},
		//加载事件
		loading : function(){

		}
	};

	module.exports = exportsMethods;

});

//验证
function checkMonotor(index){
    if (index == "1") {
        var cardNo = $('#cardNo').val();
        var cardName = $('#cardName').val();
        var code = $('#code').val();
        var error;
        if (cardNo == "") {
            aigovApp.nativeFunc.alert("身份证号不能为空！");
            return false;
        }else if (!((error = checkIdcard(cardNo)) == "验证通过!")) {
        	aigovApp.nativeFunc.alert(error);
            return false;
        }else if (cardName == "") {
            aigovApp.nativeFunc.alert("姓名不能为空！");
            return false;
        }else if (code == "") {
            aigovApp.nativeFunc.alert("验证码不能为空！");
            return false;
        }else {
        	 //根据身份证号获取性别
            var sex = getSex($('#cardNo').val());
            if(sex!=null){
            	$("#sex option").each(function(){
            		var text = $(this).text();
            		if(text==sex){
                    	$("#sex").val($(this).val());
                    	return;
            		}
            	})
            }

        	var flag = true;
            var params = $('#czsForm').serialize();
            var url = PROJECT_URL + "card/checkPersonalCard";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.resultCode == "0") {  // 卡未被申领
                        $('#cardNameSpan').html(cardName);
                        $('#cardNoSpan').html(cardNo);
                        $('#cardNameSpan2').html(cardName);
                        $('#cardNoSpan2').html(cardNo);
                    }else {
                        aigovApp.nativeFunc.alert(data.data.errMsg);
                        flag = false;
                    }
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                    flag = false;
                }
            },{"async":false});
            return flag;
        }
    }
    else if(index == "2"){
        var sex = $('#sex').val();
        var censusRegister = $('#censusRegister').val();
        var censusRegisteraddr = $('#censusRegisterAddr').val();
        var contractPhone = $('#contractPhone').val();
        var obtainCardtype = $('#obtainCardtype').val();
        var mailAddr = $('#mailAddr').val();
        var obtainCardnet1 = $('#obtainCardnet1').val();
        var obtainCardnet2 = $('#obtainCardnet2').val();
        var payType = $('#payType').val();
        if (sex == "") {
            aigovApp.nativeFunc.alert("性别不能为空！");
            return false;
        }
        else if ($("#nation").val() == "") {
        	aigovApp.nativeFunc.alert("民族不能为空！");
        	return false;
        }
        else if (censusRegister == "") {
            aigovApp.nativeFunc.alert("户籍类别不能为空！");
            return false;
        }
        else if (censusRegisteraddr == "") {
            aigovApp.nativeFunc.alert("户籍地址不能为空！");
            return false;
        }
        else if (contractPhone == "") {
            aigovApp.nativeFunc.alert("申领人电话不能为空！");
            return false;
        }
        else if (!(/^\d{11}$/.test(contractPhone))) {
        	aigovApp.nativeFunc.alert("申领人电话必须为11位数字！");
        	return false;
        }
        else if ($("#expiryDateStart").val() == "") {
        	aigovApp.nativeFunc.alert("身份证有效期起不能为空！");
        	return false;
        }
        else if ($("#expiryDateEnd").val() == "") {
        	aigovApp.nativeFunc.alert("身份证有效期至不能为空！");
        	return false;
        }
        else if (obtainCardtype == "") {
            aigovApp.nativeFunc.alert("领卡方式不能为空！");
            return false;
        }
        else if (obtainCardtype=="0" && mailAddr == "") {
            aigovApp.nativeFunc.alert("邮寄地址不能为空！");
            return false;
        }
        else if (obtainCardtype=="1" && (obtainCardnet1 == "" || obtainCardnet2 == "")) {
            aigovApp.nativeFunc.alert("领卡网点不能为空！");
            return false;
        }
        else if (payType == "") {
            aigovApp.nativeFunc.alert("支付方式不能为空！");
            return false;
        }

    }
    else if(index == "3"){
    	if ($("#idFront").val() == "") {
        	aigovApp.nativeFunc.alert("请上传身份证正面照！");
        	return false;
        }
        else if ($("#idBack").val() == "") {
        	aigovApp.nativeFunc.alert("请上传身份证反面照！");
        	return false;
        }
        else if ($("#idHand").val() == "") {
        	aigovApp.nativeFunc.alert("请上传身份证手持照！");
        	return false;
        }
        else {
            $('#sexSpan').html($("#sex>option:selected").text());
            $('#nationSpan').html($("#nation>option:selected").text());
            $('#censusRegisterSpan').html($("#censusRegister>option:selected").text());
            $('#censusRegisterAddrSpan').html($('#censusRegisterAddr').val());
            $('#contractPhoneSpan').html($('#contractPhone').val());
            $('#expiryDateStartSpan').html($("#expiryDateStart").val());
            $('#expiryDateEndSpan').html($("#expiryDateEnd").val());
            $('#obtainCardtypeSpan').html($("#obtainCardtype>option:selected").text());
            $('#mailAddrSpan').html($('#mailAddr').val());
            $('#obtainCardnetSpan').html($('#obtainCardnet1').val() + $('#obtainCardnet2').val());
            $('#obtainCardnet').val($('#obtainCardnet1').val() + $('#obtainCardnet2').val());
            $('#payTypeSpan').html($("#payType>option:selected").text());
            $('#idFrontReview').attr("src",$('#idFront').next().children(":first").attr("src"));
            $('#idBackReview').attr("src",$('#idBack').next().children(":first").attr("src"));
            $('#idHandReview').attr("src",$('#idHand').next().children(":first").attr("src"));
        }

    }
    return true;
}

function addOption(selectId,dictDatas){
	if(dictDatas!=null && dictDatas.length>0){
		for(i in dictDatas){
			$("#"+selectId).append("<option value='"+dictDatas[i].itemno+"' >"+dictDatas[i].itemname+"</option>");
		}
	}
}

function loadDict(){
	var params = {};
    //字典加载
    $("select[dictId]").each(function(){
    	var id = $(this).attr('id');
    	var dictId = $(this).attr('dictId');
    	params[id] = dictId;
	})
	aigovApp.utils.openLoading();
    aigovApp.ajax(PROJECT_URL + "card/getDictItemCondition", params, function(result){
    	aigovApp.utils.closeLoading();
    	if (result.code == "0") {
    		if(result.data != null){
    			for(key in result.data){
          			var selectId = key;
          			var dictDatas = result.data[key];
          			addOption(selectId,dictDatas);
          		}
    		}else{
                  aigovApp.nativeFunc.alert(data.message);
            }

    		//加载字典完处理

    		//以下select的option的value值取text值
            $("#obtainCardnet1 option").each(function(){
            	$(this).val($(this).text());
            })
            $("#obtainCardnet2 option").each(function(){
            	$(this).val($(this).text());
            })

        }
    });
}
//初始化测试数据
function initTestDatas(){
	if(false){
    	$("#cardNo").val("141101199410026591");
    	$("#cardName").val("水堂诞");
    	$("#censusRegisterAddr").val("咸阳某户籍地址");
    	$("#contractPhone").val("18790922011");
    	$("#expiryDateStart").val("2016-01-01");
    	$("#expiryDateEnd").val("2016-11-01");
    	$("#mailAddr").val("咸阳某邮寄地址");
    }
}
//修改回退按钮事件
function updateBaclBtnClick(){
	$('#aigov-header-back-btn').off('click').click(function(){
		var $active = $(".czs-wizard-steps").find(".active");
		if($active.data("step")==1){
			aigovApp.back();
		}
		if($active != null){
			var $prev = $active.prev("li");
			if($prev.length > 0){
				var preStep = $prev.data("step");
				$active.removeClass('active');
				$prev.removeClass('complete').addClass('active');
				$(".czs-step-pane").removeClass('active');
				$(".czs-step-pane").each(function() {
					if($(this).data("step") == preStep){
						$(this).addClass('active').removeClass('am-animation-slide-right').addClass('am-animation-slide-left');
					}
				});
			}
			if($(".czs-wizard-next").is(":hidden")){
				$(".czs-wizard-next").removeClass(czsHidden).addClass(czsShow);
				$(".czs-wizard-finish").removeClass(czsShow).addClass(czsHidden);
			}
			if($(".czs-wizard-steps li.complete").length == 0){
				//$(this).addClass('am-disabled');
				//$(this).addClass(czsHidden);
			}
		}
	})
}
