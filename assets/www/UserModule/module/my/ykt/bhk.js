/**
 * 我的账户-补换卡
 * @author chenyp
 */
;define(function(require, exports, module){

    var $ = jQuery;

    //定义工具类
    var CurWin = function(){};
    //对象私有方法
    CurWin.prototype = {

        init:function(){

            var that = this;

            $('#aigov-header-title').html("补换卡");

            $('#checkCodeImg').attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            $('#checkCodeImg').on('tap', function(event) {
                $(this).attr("src",PROJECT_URL + "imageServlet?t="+_get_time());
            });

            //个人申领
            $("#submitBtn").on("tap", function(){

                //提交
                if (that.validate()) {
                    that.submit();
                }

            });
            var params = {
					"cardType":"CARD_APPLY_TYPE",
    				"cardSex":"CARD_SEX",
    				"ObtainCardtype":"OBTAIN_CARD_TYPE",
    				"CensusRegister":"CENSUS_TYPE",
    				"ObtainCardnet1":"OBTAIN_CARD_NET1",
    				"ObtainCardnet2":"OBTAIN_CARD_NET2",
    				"PayType":"CARD_APPLY_PAY_TYPE",
    				"nation":"CARD_NATION"
    				
    			};
            
             var url2= PROJECT_URL + "card/getDictItemCondition";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url2, params, function(data){
   					 aigovApp.utils.closeLoading();
                if (data.code == "0") {
                    if (data.data.cardType!=null) {
                    	 for (var i=0;i<data.data.cardType.length;i++){
                    		 $("#cardType").append( "<option value=\""+data.data.cardType[i].itemno+"\">"+data.data.cardType[i].itemdesc+"</option>" );
                    		 
                    	 }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                     }
                    if(data.data.cardSex!=null){
                          for (var i=0;i<data.data.cardSex.length;i++){
                           $("#sex").append( "<option value=\""+data.data.cardSex[i].itemno+"\">"+data.data.cardSex[i].itemdesc+"</option>" );
                          }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    if(data.data.ObtainCardtype!=null){
                          for (var i=0;i<data.data.ObtainCardtype.length;i++){
                           $("#obtainCardtype").append( "<option value=\""+data.data.ObtainCardtype[i].itemno+"\">"+data.data.ObtainCardtype[i].itemdesc+"</option>" );
                        }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    if(data.data.CensusRegister!=null){
                          for (var i=0;i<data.data.CensusRegister.length;i++){
                           $("#censusRegister").append( "<option value=\""+data.data.CensusRegister[i].itemno+"\">"+data.data.CensusRegister[i].itemdesc+"</option>" );
                        }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    if(data.data.ObtainCardnet1!=null){
                          for (var i=0;i<data.data.CensusRegister.length;i++){
                           $("#obtainCardnet1").append( "<option value=\""+data.data.ObtainCardnet1[i].itemno+"\">"+data.data.ObtainCardnet1[i].itemdesc+"</option>" );
                        }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    if(data.data.ObtainCardnet2!=null){
                          for (var i=0;i<data.data.CensusRegister.length;i++){
                           $("#obtainCardnet2").append( "<option value=\""+data.data.ObtainCardnet2[i].itemno+"\">"+data.data.ObtainCardnet2[i].itemdesc+"</option>" );
                        }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    if(data.data.PayType!=null){
                          for (var i=0;i<data.data.CensusRegister.length;i++){
                           $("#payType").append( "<option value=\""+data.data.PayType[i].itemno+"\">"+data.data.PayType[i].itemdesc+"</option>" );
                        }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    if(data.data.nation!=null){
                          for (var i=0;i<data.data.nation.length;i++){
                           $("#nation").append( "<option value=\""+data.data.nation[i].itemno+"\">"+data.data.nation[i].itemdesc+"</option>" );
                        }
                     }else{
                         aigovApp.nativeFunc.alert(data.data.errMsg);
                    }
                    
    
                }else {
                    aigovApp.nativeFunc.alert(data.message);
                }
            },function(){
  					 aigovApp.nativeFunc.alert("查询失败");
            });


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
            var params = $('#czsForm').serialize();

            var url = PROJECT_URL + "card/updatePadSmppCard";
            aigovApp.utils.openLoading();
            aigovApp.ajax(url, params, function(data){
                aigovApp.utils.closeLoading();
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

        },
        //加载事件
        loading : function(){

        }
    };

    module.exports = exportsMethods;

});

//验证
function checkMonotor(index){
	debugger;
	var session = $.parseJSON(window.localStorage.account);
	var cardName = session.user.realName;
	var cardNo = session.user.idCardNo;
    if (index == "1") {
        $('#cardNameSpan').html(cardName);
        $('#cardNoSpan').html(cardNo);
        $('#cardNameSpan2').html(cardName);
        $('#cardNoSpan2').html(cardNo);
        
    }else if(index == "2"){
        var sex =$("#sex").find("option:selected").text();
        var censusRegister = $("#censusRegister").find("option:selected").text();
        var censusRegisteraddr = $('#censusRegisteraddr').val();
        var contractPhone = $('#contractPhone').val();
        var obtainCardtype = $("#obtainCardtype").find("option:selected").text();
        var mailAddr = $('#mailAddr').val();
        var obtainCardnet1 =  $("#obtainCardnet1").find("option:selected").text();
        var obtainCardnet2 = $("#obtainCardnet2").find("option:selected").text();
        var payType = $("#payType").find("option:selected").text();
        var nation=$("#nation").find("option:selected").text();
        
        if (sex == "") {
            aigovApp.nativeFunc.alert("性别不能为空！");
            return false;
        }else if (censusRegister == "") {
            aigovApp.nativeFunc.alert("户籍类别不能为空！");
            return false;
        }else if (censusRegisteraddr == "") {
            aigovApp.nativeFunc.alert("户籍地址不能为空！");
            return false;
        }else if (contractPhone == "") {
            aigovApp.nativeFunc.alert("联系方式不能为空！");
            return false;
        }else if (obtainCardtype == "") {
            aigovApp.nativeFunc.alert("领卡方式不能为空！");
            return false;
        }else if (mailAddr == "") {
            aigovApp.nativeFunc.alert("邮寄地址不能为空！");
            return false;
        }else if (obtainCardnet1 == "" || obtainCardnet2 == "") {
            aigovApp.nativeFunc.alert("领卡网点不能为空！");
            return false;
        }else if (payType == "") {
            aigovApp.nativeFunc.alert("支付方式不能为空！");
            return false;
        }else {

            $('#sexSpan').html(sex);
            $('#censusRegisterSpan').html(censusRegister);
            $('#censusRegisteraddrSpan').html(censusRegisteraddr);
            $('#contractPhoneSpan').html(contractPhone);
            $('#obtainCardtypeSpan').html(obtainCardtype);
            $('#mailAddrSpan').html(mailAddr);
            $('#obtainCardnetSpan').html(obtainCardnet1 + obtainCardnet2);
            $('#obtainCardnet').val(obtainCardnet1 + obtainCardnet2);
            $('#payTypeSpan').html(payType);
            $('#nationSpan').html(nation);
        }
    }
    return true;
}

