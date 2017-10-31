//======================来源网址
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return '/';
}
//==========================验证身份证
function ValidateIdCard(sId) {
	var aCity = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	}
	var iSum = 0;
	var info = "";
	sId = sId.replace(/x$/i, "a");
	if(aCity[parseInt(sId.substr(0, 2))] == null) {
		return false
	};
	sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"))
	if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
		return false
	};
	for(var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
	if(iSum % 11 != 1) {
		return false
	};
	return true;
}
/*判断是否是微信浏览器打开*/
function is_weixn() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}
/*验证银行卡号*/
//银行卡号校验
//Description:  银行卡号Luhm校验
//Luhm校验规则：16位银行卡号（19位通用）:
// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。
function bankcardCheck(bankno) {
	if(bankno.length < 16 || bankno.length > 19) {
		//$("#banknoInfo").html("银行卡号长度必须在16到19之间");
		return false;
	}
	var num = /^\d*$/; //全数字
	if(!num.exec(bankno)) {
		//$("#banknoInfo").html("银行卡号必须全为数字");
		return false;
	}
	//开头6位
	var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
	if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
		//$("#banknoInfo").html("银行卡号开头6位不符合规范");
		return false;
	}

	var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
	var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
	var newArr = new Array();
	for(var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
		newArr.push(first15Num.substr(i, 1));
	}
	var arrJiShu = new Array(); //奇数位*2的积 <9
	var arrJiShu2 = new Array(); //奇数位*2的积 >9
	var arrOuShu = new Array(); //偶数位数组
	for(var j = 0; j < newArr.length; j++) {
		if((j + 1) % 2 == 1) { //奇数位
			if(parseInt(newArr[j]) * 2 < 9)
				arrJiShu.push(parseInt(newArr[j]) * 2);
			else
				arrJiShu2.push(parseInt(newArr[j]) * 2);
		} else //偶数位
			arrOuShu.push(newArr[j]);
	}
	var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
	for(var h = 0; h < arrJiShu2.length; h++) {
		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}
	var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	var sumOuShu = 0; //偶数位数组之和
	var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal = 0;
	for(var m = 0; m < arrJiShu.length; m++) {
		sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}
	for(var n = 0; n < arrOuShu.length; n++) {
		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}
	for(var p = 0; p < jishu_child1.length; p++) {
		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	//计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
	//计算Luhm值
	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	var luhm = 10 - k;
	if(lastNum == luhm) {
		//$("#banknoInfo").html("Luhm验证通过");
		return true;
	} else {
		//$("#banknoInfo").html("银行卡号必须符合Luhm校验");
		return false;
	}
}
//=======================验证手机
function ValidateMobile(mobile) {
	var ismobi = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(mobile);
	if(!ismobi || isNaN(mobile) || mobile.length != 11) {
		return false;
	}
	return true;
}
//======================验证邮箱
function ValidateEmail(email) {
	var isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email);
	if(!isemail) {
		return false;
	}
	return true;
}
//======================验证字符格式
function ValidateChar(str) {
	var isok = /^\w{6,24}$/.test(str); /*字母数字下划线验证*/
	if(!isok || isNaN(isok)) {
		return false;
	}
	return true;
}
//========================刷新消息
function refreshmsg(id, t) {
	if(t > 0) {
		t--;
		addCookie("refreshid", id, 4) //刷新的id
		addCookie("refresht", t, 4) //刷新的时间
		setTimeout("refreshmsg('" + id + "'," + t + ");", 1000);
		$("#" + id).val(t + "秒后重发");
		$("#" + id).attr("disabled", "disabled");
	} else {
		$("#" + id).val("重新发送");
		$("#" + id).removeAttr("disabled");
	}
}

function refreshmsg2(id, t) {
	if(t > 0) {
		t--;
		addCookie("refreshid", id, 4) //刷新的id
		addCookie("refresht", t, 4) //刷新的时间
		setTimeout("refreshmsg2('" + id + "'," + t + ");", 1000);
		$("#" + id).val(t + "秒后重发");
		$("#" + id).attr("disabled", "disabled");
	} else {
		$("#" + id).val("获取验证码");
		$("#" + id).removeAttr("disabled");
	}
}
//=======================登录
function login() {
	var mobile = $("#mobile").val(),
		pwd = $("#pwd").val();
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		$("#mobile").focus();
		layer.msg("请输入正确的手机号码");
		return false;
	}
	if($("#pwd").val() == "") {
		$("#pwd").focus();
		layer.msg("请输入密码");
		return false;
	}

	var ajaxObj = {
		url: 'tools/user_ajax.ashx?act=login',
		data: {
			"mobile": mobile,
			"pwd": pwd
		},
		beforeSend: function(XMLHttpRequest) {
			layer.load(0, {
				shade: false,
				time: 1000
			});
			$("#btnSubmit").attr("disabled", true);
		},
		success: function(data) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(data.status == "y") {
				COM.setStorage(LOCAL_STORAGE.z_login_flag,'3');
				COM.setStorage(LOCAL_STORAGE.z_login_account,mobile);
				COM.setStorage(LOCAL_STORAGE.z_login_pwd,pwd);
				COM.setStorage(LOCAL_STORAGE.z_login_time_stamp,new Date().getTime());
				COM.openWindow('default','default.html',true);		
			} else {
				layer.msg(data.info);
				$("#btnSubmit").attr("disabled", false);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.msg("状态：" + textStatus + "；出错提示：" + errorThrown);
			$("#btnSubmit").attr("disabled", false);
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//======================注册验证码================
function reg_sms() {
	var mobile = $("#mobile").val();
	var code = $("#code").val();
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请输入正确的手机号码");
		$("#mobile").focus();
		return;
	}
	var ajaxObj = {
		url: URL_DATA.https + 'tools/user_ajax.ashx',
		data: {
			act: "smsSendReg",
			mobile: mobile,
			code: code
		},
		type: 'get',
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "n") {
				layer.msg(obj.info);
				return;
			} else if(obj.status == "c") {
				layer.msg(obj.info);
				return;
			} else {
				layer.msg(obj.info);
				refreshmsg("btnOnece", 60);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//======================验证原手机验证码================
function old_sms() {
	var mobile = $("#oldphone").attr("data_phone");
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请输入正确的手机号码");
		$("#oldphone").focus();
		return;
	}
	var ajaxObj = {
		url:'tools/user_ajax.ashx',
		type:'GET',
		data:{
			act: "pwd_mobile_old",
			mobile: mobile
		},
		success:function(obj){
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "n") {
				layer.msg(obj.info);
				return;
			} else if(obj.status == "c") {
				layer.msg(obj.info);
				return;
			} else {
				refreshmsg("btnOnece2", 60);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}

//======================实名认证验证码================
function name_true_sms() {
	var mobile = $("#mobile").val(),
		reg_mobile = $("#reg_mobile").val(),
		code2 = $("#code2").val();
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请输入正确的手机号码");
		$("#mobile").focus();
		return;
	}
	if(mobile != reg_mobile) {
		layer.msg("您输入的手机号码和注册的手机号码不相符");
		$("#mobile").focus();
		return;
	}
	var ajaxObj = {
		url: 'tools/user_ajax.ashx',
		type: 'GET',
		data: {
			act: 'smsSendPwd',
			mobile: mobile,
			code2: code2
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				refreshmsg2("btnOnece", 60);
				layer.msg(obj.info);
				return;
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//======================发送手机验证码================
function sms_send() {
	var mobile = $("#mobile").val();
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请输入正确的手机号码");
		$("#mobile").focus();
		return;
	}
	var ajaxObj = {
		url: 'tools/user_ajax.ashx',
		type: 'GET',
		data: {
			act: 'smsSend',
			mobile: mobile
		},
		beforeSend: function() {
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		error: function(result) {
			layer.msg("验证码发送出现错误");
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				layer.msg(obj.info);
				refreshmsg2("btnOnece", 60);
				return;
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);

}
//======================发送手机验证码================
//function getsmscode_email() {
//    var mobile = $("#mobile").val();
//    $.ajax({
//        type: "GET",
//        url: "/tools/user_ajax.ashx",
//        data: { act: 'smsSend', mobile: mobile },
//        dataType: "text",
//        beforeSend: function () {
//            layer.load(0, { shade: false, time: 1000 });
//        },
//        error: function (result) {
//            layer.msg("验证码发送出现错误"); return;
//        },
//        success: function (data) {
//            var obj = eval('(' + data + ')');
//            if (obj.status == "y") {
//                refreshmsg2("btn_email_mobile", 60);
//                layer.msg(obj.info);
//            }
//            else {
//                layer.msg(obj.info);
//            }
//        }
//    });
//}

//======================发送手机验证码================
function getsmscode_email() {
	var mobile = $("#mobile").val();
	var ajaxObj = {
		url: 'tools/user_ajax.ashx',
		type: 'GET',
		data: {
			act: 'smsSendEmal',
			mobile: mobile
		},
		beforeSend: function() {
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		error: function(result) {
			layer.msg("验证码发送出现错误");
			return;
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				refreshmsg2("btn_email_mobile", 60);
				layer.msg(obj.info);
			} else {
				layer.msg(obj.info);
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}

//======================发送邮箱验证码================
function getemailcode() {
	var email_new = $("#email_new").val();
	/*邮箱验证*/
	if(!ValidateEmail(email_new)) {
		TipMsg.position("请输入正确的邮箱", $("#email_new"), 2000, 0, 0);
		$("#email_new").focus();
		return;
	}
	var ajaxObj = {
		url: 'tools/user_ajax.ashx',
		type: 'GET',
		data: {
			act: 'emailSend',
			email: email_new
		},
		beforeSend: function() {
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		error: function(result) {
			layer.msg("验证码发送出现错误");
			$("#code_email_new").focus();
			return;
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				refreshmsg2("btn_email_new", 60);
				layer.msg(obj.info);
			} else {
				layer.msg(obj.info);
			}
		}
	};
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//======================发送邮箱验证码2================
function getemailcode2() {
	var email_old = $("#email_old").val();
	var ajaxObj = {
		url: 'tools/user_ajax.ashx',
		type: 'get',
		data: {
			act: 'emailSend',
			email: email_old
		},
		beforeSend: function() {
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		error: function(result) {
			layer.msg("验证码发送出现错误");
			$("#email_old_code").focus();
			return;
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				refreshmsg2("btn_email_old", 60);
				layer.msg(obj.info);
			} else {
				layer.msg(obj.info);
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//======================发送邮箱验证码2================
function emailSendPwd() {
	var email = $("#email").val();
	$.ajax({
		type: "GET",
		url: "/tools/user_ajax.ashx",
		data: {
			act: 'emailSendPwd',
			email: email
		},
		dataType: "text",
		beforeSend: function() {
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		error: function(result) {
			layer.msg("验证码发送出现错误");
			return;
		},
		success: function(data) {
			var obj = eval('(' + data + ')');
			if(obj.status == "y") {
				layer.msg(obj.info);
			} else {
				layer.msg(obj.info);
			}
		}
	});
}
//======================注册邮件================
function emailRegSend() {
	var email = $("#mobile").val();
	$.ajax({
		type: "GET",
		url: "/tools/user_ajax.ashx",
		data: {
			act: 'emailRegSend',
			email: email
		},
		dataType: "text",
		beforeSend: function() {
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		error: function(result) {
			layer.msg("验证码发送出现错误");
			return;
		},
		success: function(data) {
			var obj = eval('(' + data + ')');
			if(obj.status == "y") {
				layer.msg(obj.info);
				refreshmsg2("btnOnece", 60);
			} else {
				layer.msg(obj.info);
			}
		}
	});
}
//=======================注册下一步
function reg_next() {
	if(!$('#agree').is(':checked')) {
		layer.msg("请同意注册协议");
		$("#agree").focus();
		return;
	}
	var mobile = $("#mobile").val(),
		code_mobile = $("#code_mobile").val();
	var ajaxObj = {
		url: URL_DATA.https + 'tools/user_ajax.ashx',
		type: 'get',
		data: {
			act: "reg_next",
			mobile: mobile,
			code_mobile: code_mobile
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "n") {
				layer.msg(obj.info);
				return;
			} else {
				$("#step1").hide();
				$("#step2").show();
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================找回密码
function pwd_mobile() {
	var mobile = $("#mobile").val();
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请输入正确的手机号码");
		$("#mobile").focus();
		return;
	}
	var ajaxObj = {
		url: URL_DATA.https + 'tools/user_ajax.ashx?act=pwd_mobile',
		data: {
			act: 'pwd_mobile',
			mobile: mobile
		},
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				layer.msg(obj.info);
				refreshmsg("btnOnece", 60);
				return;
			} else {
				layer.msg(obj.info);
				$("#mobile").focus();
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================找回密码—验证码比较
function pwd_code() {
	var code = $.trim($("#code2").val());
	/*电话验证*/
	if(code.length != 4) {
		layer.msg("请输入正确的验证码！");
		$("#code2").focus();
		return;
	} else {
		var ajaxObj = {
			url: URL_DATA.https + 'tools/user_ajax.ashx?act=pwd_code',
			data: $("#form1").serialize(),
			success: function(obj) {
				if(DEBUG) console.log('==========COM.ajax回调函数');
				if(obj.status == "y") {
					$("#step1").hide();
					$("#step2").show();
					return;
				} else {
					layer.msg(obj.info);
					$("#code2").focus();
					return;
				}
			}
		}
		if(DEBUG) console.log('==========正在执行COM.ajax');
		COM.ajax(ajaxObj);
	}
}
//=======================修改用户信息
function user_opt() {
	$("#hprovince").val($("#provincecode").find("option:selected").text());
	$("#hcity").val($("#citycode").find("option:selected").text());
	var ajaxObj = {
		url:'tools/user_opt_ajax.ashx?act=opt',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				var tmp = plus.webview.getWebviewById('user/userinfo');
				tmp && mui.fire(tmp, 'reload');
				layer.msg(obj.info);
				return;
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================退出登录
function LoginOutAjax() {

	$.ajax({
		url: "/tools/user_ajax.ashx?act=loginout",
		dataType: "text",
		type: "GET",
		timeout: 6000,
		cache: false,
		success: function(data) {
			window.location.href = "/default.html";
			deleteCookie("bs_cookie_user_name");
			deleteCookie("bs_cookie_user_pwd");
			return false;
		}
	});
}
//=======================激活积分
function integralInit(thi) {
	mui.confirm('您确定要激活积分吗', '激活积分', ['确定', '取消'], function(e) {
		if(e.index == 0) {
			layer.load(0, {
				shade: false,
				time: 1000
			});
			$.ajax({
				url: "/tools/user_opt_ajax.ashx?act=integral_init&id=" + $(thi).attr("attr_data") + "&t" + new Date(),
				dataType: "text",
				type: "post",
				timeout: 6000,
				success: function(data) {
					var obj = eval('(' + data + ')');
					if(obj.status == "y") {
						$(thi).html("已激活");
						$(thi).removeAttr("onclick");
						return false;
					} else {
						layer.msg(obj.info);
						return false;
					}
				}
			});
		}
	});
}
//=======================提现密码
var opt_trade_pwd = function() {
	var type_id = $("#type_id").val(),
		act = "trade_pwd";
	if(type_id == 1) {
		act = "trade_pwd_2"
	}
	layer.load(0, {
		shade: false,
		time: 1000
	});
	var ajaxObj = {
		url: "tools/user_opt_ajax.ashx?act=" + act + "&t" + new Date(),
		data: $("#form1").serialize(),
		success: function(obj2) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj2.status == "y") {
				mui.confirm(obj2.info, '设置提现密码', ['确定'], function(e) {
					if(e.index == 0) {
						window.location.reload();
					}
				});
				return false;
			} else {
				layer.msg(obj2.info);
				return false;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================转账回执单
var bankRecharge = function() {
	var bankpayCardId = $("#bankpayCardId").val(),
		bannkrechargemoney = $("#bannkrechargemoney").val(),
		bankrechargeno = $("#bankrechargeno").val(),
		bankremark = $("#bankremark").val();
	if(isNaN(bankpayCardId)) {
		$("#bankpayCardId").focus();
		layer.msg("请选择到账银行");
		return;
	}
	if(bannkrechargemoney == "" || isNaN(bannkrechargemoney)) {
		$("#bannkrechargemoney").focus();
		layer.msg("转账金额只能是数字");
		return;
	}
	//if (!bankcardCheck(bankrechargeno)) {
	//    $("#bankrechargeno").focus();
	//    layer.msg("充值卡号格式不正确");
	//    return;
	//}
	var ajaxObj = {
		url:'tools/user_opt_ajax.ashx?act=bankRecharge',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				mui.confirm('恭喜你！回执单提交成功！请保持手机畅通。客服稍后以电话形式联系您<br/><span class="c-red">400-800-1613</span>', '提交回执单成功', ['返回个人中心', '确定'], function(e) {
					if(e.index == 0) {
						COM.openWindow('user/default','default.html',true);
					} else {
						window.location.reload();
					}
				}, 'div');
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
	
}
//=======================实名认证
function user_name_true() {
	var user_name = $("#user_name").val(),
		id_no = $("#id_no").val(),
		id_no_match = $("#id_no_match").val(),
		positive_value = $("#positive_value").val(),
		back_value = $("#back_value").val(),
		hold_value = $("#hold_value").val();
	if(user_name.length < 2) {
		$("#user_name").focus();
		layer.msg("请输入您的真实姓名");
		return;
	}
	/*身份证验证*/
	if(!ValidateIdCard(id_no)) {
		$("#id_no").focus();
		layer.msg("请输入正确的身份证号码");
		return;
	}

	if(id_no_match != id_no) {
		$("#id_no_match").focus();
		layer.msg("身份证号码不匹配");
		return;
	}
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=name_true',
		data: $("#form1").serialize(),
		beforeSend: function(XMLHttpRequest) {
			$("#btn_reset").attr("disabled", true);
			layer.load(0, {
				shade: false,
				time: 1000
			});
		},
		success: function(obj) {
			if(obj.status == "y") {
				mui.confirm(obj.info, '实名认证', ['返回个人中心'], function(e) {
					COM.openWindow('user/default','default.html',true);
				});
				return;
			} else {
				$("#btn_reset").attr("disabled", false);
				ToggleCode("#vCodeImg", 'tools/verify_code_sub.aspx');
				layer.msg(obj.info + "，请刷新页面重试");
				return;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#btn_reset").attr("disabled", false);
			ToggleCode("#vCodeImg", 'tools/verify_code_sub.aspx');
			layer.msg("状态：" + textStatus + "；出错提示：" + errorThrown);
			$("#btn_reset").attr("disabled", false);
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================绑定银行卡第1步
var bind_bank_step1 = function() {
	var user_name = $("#user_name").val(),
		card_no = $("#card_no").val();
	if(user_name.length < 2) {
		$("#user_name").focus();
		layer.msg("请输入您的持卡人姓名");
		return;
	}
	/*银行卡验证*/
	if(!bankcardCheck(card_no)) {
		$("#card_no").focus();
		layer.msg("银行卡号码不匹配");
		return;
	}
	layer.load(0, {
		shade: false,
		time: 1000
	});
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=bind_bank_step1&t' + new Date(),
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				$("#step1").hide();
				$("#step2").show();
				$("#bank_name").val(obj.info);
				return false;
			} else {
				layer.msg(obj.info);
				return false;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================绑定银行卡第2步
var bind_bank_step2 = function() {
	var bank_name = $("#bank_name").val(),
		bankArea = $("#bankArea").val(),
		upbank_name = $("#upbank_name").val(),
		mobile = $("#mobile").val();

	$("#mobile_txt").html(mobile);

	if(bank_name.length < 2) {
		$("#bank_name").focus();
		layer.msg("系统没有找到您的卡类型");
		return;
	}
	if(bankArea.length < 2) {
		$("#bankArea").focus();
		layer.msg("请选择开户地区");
		return;
	}
	if(upbank_name.length < 2) {
		$("#upbank_name").focus();
		layer.msg("请输入开户详细地址");
		return;
	}
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请填写正确的银行预留手机号");
		$("#mobile").focus();
		return;
	}
	if(!$('#agree').is(':checked')) {
		layer.msg("必须同意服务协议才能继续");
		$("#agree").focus();
		return;
	}
	layer.load(0, {
		shade: false,
		time: 1000
	});
	$("#step2").hide();
	$("#step3").show();
	$("#mobile_txt").val(mobile);
}
//=======================绑定银行卡
var bind_bank = function() {
	var user_name = $("#user_name").val(),
		card_no = $("#card_no").val(),
		bank_name = $("#bank_name").val(),
		bankArea = $("#bankArea").val(),
		upbank_name = $("#upbank_name").val(),
		mobile = $("#mobile").val();
	var _url = getUrlParam("url");

	if(user_name.length < 2) {
		$("#user_name").focus();
		layer.msg("请输入您的持卡人姓名");
		return;
	}
	/*银行卡验证*/
	if(!bankcardCheck(card_no)) {
		$("#card_no").focus();
		layer.msg("银行卡号码不匹配");
		return;
	}
	if(bank_name.length < 2) {
		$("#bank_name").focus();
		layer.msg("系统没有找到您的卡类型");
		return;
	}
	if(bankArea.length < 2) {
		$("#bankArea").focus();
		layer.msg("请选择开户地区");
		return;
	}
	if(upbank_name.length < 2) {
		$("#upbank_name").focus();
		layer.msg("请输入开户详细地址");
		return;
	}
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请填写正确的银行预留手机号");
		$("#mobile").focus();
		return;
	}
	if(!$('#agree').is(':checked')) {
		layer.msg("必须同意服务协议才能继续");
		$("#agree").focus();
		return;
	}
	layer.load(0, {
		shade: false,
		time: 1000
	});
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=addbank',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(obj.status == "y") {
				if(_url == "" || _url == undefined) {
					mui.confirm(obj.info, '绑定银行卡', ['确定'], function(e) {
						if(e.index == 0) {
							COM.openWindow('user/bank','bank.html',true);
						}
					});
				} else {
					mui.confirm(obj.info, '绑定银行卡', ['继续充值', '取消'], function(e) {
						if(e.index == 0) {
							COM.openWindow('user/pay_unspay','pay_unspay.html',true);
						} else {
							COM.openWindow('user/bank','bank.html',true);
						}
					});

				}

			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);

}
//=======================绑定邮箱
function changeEmail() {
	var email_new = $.trim($("#email_new").val()),
		code_email_new = $.trim($("#code_email_new").val());
	/*邮件验证*/
	if(!ValidateEmail(email_new)) {
		layer.msg("请输入正确的邮箱");
		$("#email_new").focus();
		return;
	}
	if(code_email_new.length != 4) {
		$("#code_email_new").focus();
		layer.msg("请输入正确的邮件验证码");
		return;
	}
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=change_email',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				alert(obj.info);
				window.location.reload();
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================绑定邮箱2
function changeEmail2() {
	var email_old_code = $.trim($("#email_old_code").val());
	if(email_old_code.length != 4) {
		$("#email_old_code").focus();
		layer.msg("请输入正确的邮件验证码");
		return;
	}
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=change_email2',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				$("#step2").hide();
				$("#step4").show();
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================绑定邮箱3
function changeEmail3() {
	var email_mobile_code = $.trim($("#email_mobile_code").val());
	if(email_mobile_code.length != 4) {
		$("#email_mobile_code").focus();
		layer.msg("请输入正确的手机验证码");
		return;
	}
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=change_email3',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				$("#step3").hide();
				$("#step4").show();
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
//=======================我要提款
var withdrawal = function() {
	var bank_id = $("#bank_id").val(),
		cash_money = $("#cash_money").val(),
		available_balance_money = $("#cash_money").attr("maxvalue"),
		trade_pass = $("#trade_pass").val();
	console.log('cash_money===' + cash_money);
	if(cash_money == null | cash_money == "") {
		$("#cash_money").focus();
		layer.msg("请输入提款金额");
		return;
	}

	if(isNaN(cash_money)) {
		$("#cash_money").focus();
		layer.msg("提款金额必须是数字");
		return;
	}
	if(parseFloat(cash_money) < 100) {
		$("#cash_money").focus();
		layer.msg("提款金额最低100元起提");
		return;
	}
	if(parseFloat(cash_money) > parseFloat(available_balance_money)) {
		$("#cash_money").focus();
		layer.msg("提款金额不能大于账户余额");
		return;
	}
	if(bank_id == "") {
		$("#bank_id").focus();
		layer.msg("请选择提款银行卡");
		return;
	}
	if(trade_pass == "") {
		$("#trade_pass").focus();
		layer.msg("请输入提现密码");
		return;
	}
	var ajaxObj = {
		url: 'tools/user_opt_ajax.ashx?act=withdrawal',
		data: $("#form1").serialize(),
		success: function(obj) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "y") {
				mui.confirm(obj.info, '提现申请', ['返回个人中心', '确定'], function(e) {
					if(e.index == 0) {
						COM.openWindow('user/default','default.html',true);
					} else {
						window.location.reload();
					}
				});
			} else {
				layer.msg(obj.info);
				return;
			}
		}
	}

	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}

///签到
var signNow = function(thi) {
	var ajaxObj = {
		url:'tools/user_opt_ajax.ashx?act=sign_today',
		success: function(obj) {

			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "n") {
				mui.confirm(obj.info, '签到失败', ['关闭', '查看记录'], function(e) {
					if(e.index == 1) {
						COM.openWindow('user/sign','user/sign.html',true);
					}
				});
				return;
			} else {
				$(thi).attr("url", "user/sign.html");
				$(thi).attr("title", "user/sign");
				$(thi).html("已签到");
				var rtn = obj.info.split(',');
				mui.confirm("签到成功，连续签到" + rtn[0] + "天", '签到成功', ['关闭', '查看记录'], function(e) {
					if(e.index == 1) {
						COM.openWindow('user/sign','user/sign.html',true);
					}
				});
				//$(".sign_num").html("连续签到" + rtn[0] + "天");
				//$(thi).removeClass("mui-btn-yellow").addClass("mui-btn-black");
				//$(thi).html("已领取<p>10牛币</p>");
				//layer.msg("签到成功，连续签到" + rtn[0] + "天");
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}
var signNow_d = function() {
	var ajaxObj = {
		url:'tools/user_opt_ajax.ashx?act=sign_today',
		success:function(obj){
			if(DEBUG) console.log('==========COM.ajax回调函数');
			if(obj.status == "n") {
				mui.confirm(obj.info, '签到失败', ['关闭', '知道啦'], function(e) {});
				return;
			} else {
				COM.doReload('user/task_list');
				COM.doReload('default');
				var rtn = obj.info.split(',');
				mui.confirm("签到成功，连续签到" + rtn[0] + "天", '签到成功', ['关闭', '知道啦'], function(e) {
					window.location.reload();
				});
			}
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}

//=======================快捷登录绑定================
function oauthbind() {
	var mobile = $("#mobile").val(),
		pwd = $("#pwd").val(),
		url = $("#url").val();
	if(mobile == "" || $("#pwd").val() == "") {
		layer.msg("请输入手机号码和登录密码");
		return false;
	}
	/*电话验证*/
	if(!ValidateMobile(mobile)) {
		layer.msg("请输入正确的手机号码");
		return false;
	}
	/*密码验证*/
	if(!ValidateChar(pwd)) {
		layer.msg("密码由6-24位的字母数字或下划线组成");
		return;
	}
	layer.load(0, {
		shade: false,
		time: 1000
	});
	$.ajax({
		type: "POST",
		url: "/tools/oauth_ajax.ashx?act=oauth",
		dataType: "json",
		data: $("#form1").serialize(),
		timeout: 20000,
		success: function(data, textStatus) {
			if(data.status == "y") {
				mui.confirm(obj.info, '绑定手机成功', ['去完善', '确定'], function(e) {
					if(e.index == 0) {
						COM.openWindow('user/userinfo','userinfo.html',true);
					} else {
						COM.openWindow('user/default','default.html',true);
					}
				});
			} else {
				layer.msg(data.info);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.msg("状态：" + textStatus + "；出错提示：" + errorThrown);
		}
	});
}
///认证支付充值
function money_rz_in() {
	var money = parseFloat($("#rz_money").val()),
		cardNo = $('#card_no').val();
		if(!cardNo){
			cardNo = $('#card_no2').val();
		}
		if(DEBUG)console.log('=money_rz_in cardNo===='+cardNo);
	if(isNaN(money)) {
		layer.msg("请输入充值金额");
//		$("#rz_money").focus();
		return false;
	}
	if(money < 1) {
		layer.msg("充值金额必须大于1元！");
//		$("#rz_money").focus();
		return false;
	}
	if(cardNo == "") {
		layer.msg("请选择充值银行卡！");
		$("#tkyhk").focus();
		return false;
	}
	COM.setStorage(LOCAL_STORAGE.zPayMoneyUrl, "api/unspay_auth/index.aspx?amount=" + money + "&cardNo=" + cardNo);
	COM.openWindow('user/pay_money','pay_money.html',true);
	
	//	window.open("/api/unspay_auth/index.aspx?amount=" + money + "&cardNo=" + cardNo, "_blank")
}
var reg_code = function() {
	var mobile = $("#mobile").val();
	/*电话验证*/
	if(ValidateMobile(mobile)) {
		reg_sms();
	} else {
		/*邮箱验证*/
		if(ValidateEmail(mobile)) {
			emailRegSend();
		} else {
			reg_sms();
		}
	}
}
//链接跳转
var golink = function(url) {
	window.location.href = url;
}