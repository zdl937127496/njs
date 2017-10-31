/*======================操盘列表==============================*/
function BorrowListCallback(page_id) {
    BorrowListData(page_id);
}
function BorrowListData(pageindx) {
	console.log('=====正在执行BorrowListData');
    gotop();
    var listcount = $("#borrow_list_count").val(), status = $("#status").val(), type_id = $("#type_id").val();
    var ajaxObj = {
    	url:'tools/user_opt_ajax.ashx',
    	type:'GET',
    	data:'text',
    	data:{ act: "user_borrow_list", status: status, type_id: type_id, p: (pageindx + 1), t: new Date() },
    	success:function(data){
    		if(DEBUG) console.log('==========COM.ajax回调函数');
    		if (listcount <= 10) {
	            $("#pager_borrow_list").css("display", "none");
	        } else {
	            $("#pager_borrow_list").css("display", "block");
	        }
	        $("#borrow_list").html(data);
    	}
    }
    if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
	
    $("#pager_borrow_list").pagination(listcount, {
        callback: BorrowListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}

/*======================操盘保证金列表==============================*/
function BorrowBeginListCallback(page_id) {
    BorrowBeginListData(page_id);
}
function BorrowBeginListData(pageindx) {
    gotop();
    var listcount = $("#borrow_beigin_list_count").val(), borrow_id = $("#borrow_id").val();
    var ajaxObj = {
    	url:'tools/user_opt_ajax.ashx',
    	dataType:'text',
    	type:'get',   
    	data:{ act: "user_borrow_begin_list", borrow_id: borrow_id, p: (pageindx + 1), t: new Date() },
    	success:function(data){
			if(DEBUG) console.log('==========COM.ajax回调函数');
    		if (listcount <= 10) {
	            $("#pager_borrow_begin_list").css("display", "none");
	        } else {
	            $("#pager_borrow_begin_list").css("display", "block");
	        }
	        $("#borrow_begin_list").html(data);
    	}
    } 
    if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
    $("#pager_borrow_begin_list").pagination(listcount, {
        callback: BorrowBeginListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}
/*======================操盘管理费列表==============================*/
function BorrowFeeListCallback(page_id) {
    BorrowFeeListData(page_id);
}
function BorrowFeeListData(pageindx) {
    gotop();
    var listcount = $("#borrow_fee_list_count").val(), borrow_id = $("#borrow_id").val();
    var ajaxObj = {
    	url:'tools/user_opt_ajax.ashx',
    	type:'GET',
    	dataType:'text',
    	data:{ act: "user_borrow_fee_list", borrow_id: borrow_id, p: (pageindx + 1), t: new Date() },
    	success:function(data){
    		if(DEBUG) console.log('==========COM.ajax回调函数');
    		if (listcount <= 10) {
	            $("#pager_borrow_fee_list").css("display", "none");
	        } else {
	            $("#pager_borrow_fee_list").css("display", "block");
	        }
	        $("#borrow_fee_list").html(data);
    	}
    }
 	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
    $("#pager_borrow_fee_list").pagination(listcount, {
        callback: BorrowFeeListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}
/*======================新闻列表==============================*/
function NewsListCallback(page_id) {
    NewsListData(page_id);
}
function NewsListData(pageindx) {
    gotop();
    var listcount = $("#news_count").val(), call_index = $("#call_index").val();
    $.get("/tools/list_ajax.ashx", { act: "news_list", call_index: call_index, p: (pageindx + 1), t: new Date() }, function (data) {
        if (listcount <= 10) {
            $("#pager_news_list").css("display", "none");
        } else {
            $("#pager_news_list").css("display", "block");
        }
        $("#news_list").html(data);
    });
    $("#pager_news_list").pagination(listcount, {
        callback: NewsListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}
/*======================用户积分列表==============================*/
function integralListCallback(page_id) {
    integralListData(page_id);
}
function integralListData(pageindx) {
    gotop();
    var listcount = $("#integral_count").val();
    $.get("/tools/user_opt_ajax.ashx", { act: "user_integral_list", p: (pageindx + 1), t: new Date() }, function (data) {
        if (listcount <= 10) {
            $("#pager_integral_list").css("display", "none");
        } else {
            $("#pager_integral_list").css("display", "block");
        }
        $("#integral_list").html(data);
    });
    $("#pager_integral_list").pagination(listcount, {
        callback: integralListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}

/*======================用户资金列表==============================*/
function moneyListCallback(page_id) {
    moneyListData(page_id);
}
function moneyListData(pageindx) {
    gotop();
    var listcount = $("#money_count").val();
    $.get("/tools/user_opt_ajax.ashx", { act: "user_money_list", p: (pageindx + 1), t: new Date() }, function (data) {
        if (listcount <= 10) {
            $("#pager_money_list").css("display", "none");
        } else {
            $("#pager_money_list").css("display", "block");
        }
        $("#money_list").html(data);
    });
    $("#pager_money_list").pagination(listcount, {
        callback: moneyListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}
/*======================用户消息列表==============================*/
function msgListCallback(page_id) {
    msgListData(page_id);
}
function msgListData(pageindx) {
    gotop();
    var listcount = $("#msg_count").val();
    $.get("/tools/user_opt_ajax.ashx", { act: "user_msg_list", p: (pageindx + 1), t: new Date() }, function (data) {
        if (listcount <= 10) {
            $("#pager_msg_list").css("display", "none");
        } else {
            $("#pager_msg_list").css("display", "block");
        }
        $("#msg_list").html(data);
    });
    $("#pager_msg_list").pagination(listcount, {
        callback: msgListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}

/*======================我的会员列表==============================*/
function extension_userListCallback(page_id) {
    extension_userListData(page_id);
}
function extension_userListData(pageindx) {
    gotop();
    var listcount = $("#extension_user_count").val();
    $.get("/tools/user_opt_ajax.ashx", { act: "user_reference_list", p: (pageindx + 1), t: new Date() }, function (data) {
        if (listcount <= 10) {
            $("#pager_extension_user_list").css("display", "none");
        } else {
            $("#pager_extension_user_list").css("display", "block");
        }
        $("#extension_user_list").html(data);
    });
    $("#pager_extension_user_list").pagination(listcount, {
        callback: extension_userListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}

/*======================我的会员佣金记录列表==============================*/
function user_commisionListCallback(page_id) {
    user_commisionListData(page_id);
}
function user_commisionListData(pageindx) {
    gotop();
    var listcount = $("#user_commision_count").val();
    $.get("/tools/user_opt_ajax.ashx", { act: "user_commision_list", p: (pageindx + 1), t: new Date() }, function (data) {
        if (listcount <= 10) {
            $("#pager_user_commision_list").css("display", "none");
        } else {
            $("#pager_user_commision_list").css("display", "block");
        }
        $("#user_commision_list").html(data);
    });
    $("#pager_user_commision_list").pagination(listcount, {
        callback: user_commisionListCallback,
        prev_text: '上一页',
        next_text: '下一页',
        items_per_page: 10,
        num_display_entries: 2,
        current_page: pageindx,
        num_edge_entries: 1
    });
}
/*======================至顶部==============================*/
var gotop = function () {
    $('html,body').animate({ scrollTop: '0px' }, 100);
}