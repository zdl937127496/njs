//cookie  增加删除修改
/**
 * 添加一个Cookie
 * @param {Object} name 值 时间
 */
function addCookie(name, value, expires) {
	var cookieString = name + "=" + escape(value);
	//判断是否设置过期时间 
	if (expires > 0) {
		var date = new Date();
		//date.setTime(date.getTime+expiresHours*60*60*1000); 
		date.setTime(date.getTime() + expires * 60 * 1000);
		cookieString = cookieString + "; expires=" + date.toGMTString()+";path=/";
		//expires ="+ expiration.toGMTString()+";path=/;domain=local host; secure"; 
	}
	document.cookie = cookieString;
}	 
/**
 * 删除指定的Cookie
 * @param {Object} name
 */
function deleteCookie(name) {
	var expdate = new Date(); 
    expdate.setTime(expdate.getTime() - 1); 
    addCookie(name, "", expdate); 
}

function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
    var cval = GetCookieValue(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function GetCookieValue(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            //PYYH=USERNAME=steven&PASSWORD=111111&UserID=1&UserType=1
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                //USERNAME=steven&PASSWORD=111111&UserID=1&UserType=1
                break;
            }
        }
    }
    return cookieValue;
}


/**
 * 获取指定的Cookie
 * @param {Object} name
 * @return {TypeName} 
 */
function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
		for ( var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name)
		return arr[1];
	}
	return "";
}
//设置主页


/**
 * 获取 url 中的参数  保存在ccookiesz 中
 * @param parametername 参数名称
 * @returns {Object}
 */
function getParameterFromUrl(parametername)
{
	var url = location.search;
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) 
	{ 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) 
		{ 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	}
	if(theRequest[parametername]!= "" && theRequest[parametername] != undefined)
	{
		addCookie(parametername,theRequest[parametername],30);
	}
	return theRequest;
}

function getFromUrl()
{
	var url = location.host;
	/*console.info(url+"=====================");*/
	addCookie("fromUrl",url,30);
	return url;
}
/**
 * 页面加载执行
 */
$(function(){
	getFromUrl();
	getParameterFromUrl("fromWay");
	getParameterFromUrl("refid");
	getParameterFromUrl("agent");
});

