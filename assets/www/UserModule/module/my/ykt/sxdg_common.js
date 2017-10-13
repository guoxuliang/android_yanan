
//是否IE浏览器
function isIE(){
	return navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all;
}

//是否微信浏览器登陆
function isWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

//判断是IOS登录还是ANDROID登录
function iosorAndroid(){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return "ios";
    } else if (/(Android)/i.test(navigator.userAgent)) {
        return "android";
    } else {
        return "";
    }
}

//获取html参数(key:参数名,若无这参数则返回null)
function getParam(key){
	var urlinfo=window.location.href;
	var len=urlinfo.length;
	var offset=urlinfo.indexOf("?");
	var newsidinfo=urlinfo.substr(offset+1,len);
    var newsids = newsidinfo.split("&");
    var val = "";
    for(var i=0;i<newsids.length;i++){
        var newsid = newsids[i].split("=");
        if(key == newsid[0]){
            val = newsid[1];
            break;
        }
    }
    return val;
}

//获取要上传的文件大小
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;	//是否IE
function fileChange(target) {
    var fileSize = 0;
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile (filePath);
        if(file == null) return -1;
        fileSize = file.Size;
    } else {
    	if(target.files[0] == null) return -1;
        fileSize = target.files[0].size;
    }
    return fileSize;
}

//替换所有
String.prototype.replaceAll = function (oldStr, newStr) {
    return this.replace(new RegExp(oldStr, "gm"), newStr);
};

//去除左右空格
$.fn.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 校验是否联通号码
 */
var validlt = /^(13[0|1|2]|15[5|6]|186|185|145|176)\d{8}$/;

//关闭弹出层
function closeFloatBox(closeId){
	$(".thickdiv").hide();
	$("#"+closeId).hide();
}

