//返回上一页
function HistoryBack() {
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE  

        if (history.length > 1) {
            window.history.go(-1);
        } else {
            window.location.href = '/';
        }
    } else { //非IE浏览器  
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0) {
            if (window.history.length > 2) {
                window.history.go(-1);
            } else {
                window.location.href = '/';
            }
        } else {//未知的浏览器  
            if (history.length > 1) {
                window.history.go(-1);
            } else {
                window.location.href = '/';
            }
        }
    }
}
/**
 * 文本框改变事件
 * @param a 文本框对象
 * @param thisvalue 当前值
 * @param defautvalue 默认值
 * @param multiple    倍数
 */
function textchange(a, defautvalue, multiple) {
    var reNum = /^\d*$/;
    if (reNum.test($(a).val())) {
        if (parseInt($(a).val()) > parseInt($(a).attr("name"))) {
            $(a).val($(a).attr("name"));
            return true;
        } else {
            if (parseInt($(a).val()) == 0) {
                $(a).val("");
            }
            return true;
        }
    } else {
        $(a).val("");
        return true;
    }

}

//times
function textchangepzs(a, defautvalue, multiple,time ,times) {
    var reNum = /^\d*$/;

    times = $("#times").val();
    if (parseInt($(a).val()) != "" && !isNaN(parseInt($(a).val()))) {
        $("#money_borrow2").val(parseInt($(a).val()) *parseInt(times));
    } else {
        $("#money_borrow2").val("");
    }


    if (reNum.test($(a).val())) {
        if (parseInt($(a).val()) > parseInt($(a).attr("name"))) {
            $(a).val($(a).attr("name"));

            return true;
        } else {
            if (parseInt($(a).val()) == 0) {
                $(a).val("");
                $("#money_borrow2").val("");
            }
            return true;
        }
    } else {
        $(a).val("");
        $("#money_borrow2").val("");
        return true;
    }


}

function textchangepz(a, defautvalue, multiple, times) {
    var reNum = /^\d*$/;
  
    if (parseInt($(a).val()) != "" && !isNaN(parseInt($(a).val()))) {
        $("#money_borrow2").val(parseInt($(a).val()) * times);
    } else {
        $("#money_borrow2").val("");
    }
   
   
    if (reNum.test($(a).val())) {
        if (parseInt($(a).val()) > parseInt($(a).attr("name"))) {
            $(a).val($(a).attr("name"));
         
            return true;
        } else {
            if (parseInt($(a).val()) == 0) {
                $(a).val("");
                $("#money_borrow2").val("");
            }
            return true;
        }
    } else {
        $(a).val("");
        $("#money_borrow2").val("");
        return true;
    }

    
}

/**
 * 格式化金额 大于1万的以 万为单位，大于1千小于1万的用千表示
 * @param number
 */
function fomatNumber(number) {
    var result;

    if (1000 <= parseInt(number) && parseInt(number) < 10000) {
        result = parseInt(number) / 1000 + "千";
    } else if (100 <= parseInt(number) && parseInt(number) < 1000) {
        result = parseInt(number) / 100 + "百";
    }
    else if (10000 <= parseInt(number)) {

        result = parseInt(number) / 10000 + "万";
    }
    else if (100000000 <= parseInt(number)) {
        result = parseInt(number) / 100000000 + "亿";
    }
    else {
        result = number + "元";
    }
    return result;
}


/**
 * url 传参 转换为 form 表达提交
 * @param linkObject
 * @returns {Boolean}
 */
function linkClick(url) {
	var goUrl = "";
	if(DEBUG)console.log('=url===='+url);
    var i = url.indexOf('?');
    var j = url.indexOf('#');
    if (i == -1) {
        goUrl = url;
    } else {
        goUrl = url.substring(0, i);
    }
    if (i >= 0 && url.length >= i + 1) {
        if (j == -1) {
            uri = url.substring(i + 1, url.length);
        } else {
            uri = url.substring(i + 1, j);
        }
    }
    var postData = {};
    
    var sa = uri.split('&');
    for (var i = 0; i < sa.length; i++) {
        var isa = sa[i].split('=');
        if(isa[1] === 'undefined'){
        	postData[isa[0]] = '';
        }else{
        	postData[isa[0]] = isa[1];
        }
    }
    if(DEBUG)console.log('=postData===='+JSON.stringify(postData));
    if(DEBUG)console.log('=goUrl===='+goUrl);
    COM.setStorage(LOCAL_STORAGE.zLinkClickBackId,plus.webview.currentWebview().id);
    COM.setStorage(LOCAL_STORAGE.zLinkClickPostData,JSON.stringify(postData));
    COM.openWindow(goUrl.replace('.html',''),'',true);
}


function utf16to8(str) { //转码 
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

// 加载新闻
function getNews(divId, pageIndex, pageSize, newsType) {
    $.ajax({
        type: "post",
        url: "/news/news!getWebNewsShowViewIndex.action?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&newsType=" + newsType,
        dataType: 'JSON',
        success: function (result) {
            var rs = eval(result)["rows"];
            var resultdiv = "";
            for (var i = 0; i < rs.length; i++) {
                resultdiv += "<div class=\"box\">" +
					"<div class=\"fl imgbox\">" +
					"  <div class=\"img\">" +
					" <a href=\"/news/news!getNewsByid.action?id=" + rs[i].id + "\"><img src=\"" + rs[i].indeximageUrl + "\" /></a>" +
					"   </div>" +
					"</div>" +
					"  <div class=\"fl xin\">" +
					" <a href=\"/news/news!getNewsByid.action?id=" + rs[i].id + "\" class=\"tit\">" + rs[i].newsTitle + "</a>" +
					rs[i].showNum +
					"</div>" +
					"	<span class=\"clear_f\"></span>" +
					"</div>";
            }
            $("#" + divId).html(resultdiv + "<span class=\"clear_f\"></span>");
        }
    });
}

/**
 * 保留2为小数
 * @param {Object} src
 * @param {Object} pos
 * @return {TypeName}
 */
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

/**
 * 日期格式化
 * @param {Object} format
 * @memberOf {TypeName}
 * @return {TypeName}
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
			RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


/**
 * 格式化金额
 * @param money
 */
function moneyFormat(money) {
    var result = "";
    if (parseInt(money) >= 10000) {
        result = parseInt(money) / 10000 + "万";
    } else {
        result = money;
    }
    return result;
}

/**数字全角转半角*/
function DBC2SBC(str) {
    var i;
    var result = '';
    for (i = 0; i < str.length; i++) {
        str1 = str.charCodeAt(i);
        if (str1 < 65296) {
            result += String.fromCharCode(str.charCodeAt(i));
            continue;
        }
        if (str1 < 125 && !flag)
            result += String.fromCharCode(str.charCodeAt(i));
        else
            result += String.fromCharCode(str.charCodeAt(i) - 65248);
    }
    return result;
}

/**
 * 将数值格式化成类金额形式,逗号隔开及小数位
 * @param num 要转换的数值
 * @param n 要保留的小数位数
 * @author byboating
 */
function fMoney(num, n) {
    if (n != 0) {
        n = n > 0 && n <= 20 ? n : 2;
    }
    num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = num.split(".")[0].split("").reverse(), r = num.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    if (n == 0) return t.split("").reverse().join("");
    return t.split("").reverse().join("") + "." + r;
}

/**
 * 还原函数:格式化的金额还原为纯数值
 * @param formattedNum
 * @returns {Number}
 * @author byboating
 */
function rMoney(formattedNum) {
    formattedNum = formattedNum + "";
    return parseFloat(formattedNum.replace(/[^\d\.-]/g, ""));
}

/**
 * 判断金额框是否输入的是合法的数字
 * @returns {boolean}
 */
function validateMoney(a) {
    var reNum = /^(([1-9]\d*)|0)(\.(\d){1,2})?$/;
    if (!reNum.test($(a).val())) {
        $(a).val("");
    } else {
        if (parseFloat($(a).val()) > parseFloat($(a).attr("maxValue"))) {
            $(a).val($(a).attr("maxValue"));
        }
    }
}
function phone(date) {
    window.location.href = 'tel://' + date;
}
var gotourl = function (url) {
    window.location.href = url;
}