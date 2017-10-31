/**
 * Created by Administrator on 2015/5/11.
 */
var products = {};
/**
 * 初始化产品月
 * @param producttype
 */
function innitMonthProduct(producttype, flag) {
    if (flag == 1) {
    	var ajaxObj = {
    		url:'tools/list_ajax.ashx?act=Astock&productType=' + producttype,
    		error: function (a) {
                $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
            },
            success: function (result) {
            	if(DEBUG) console.log('==========COM.ajax回调函数');
                var product = eval(result["product"]);
                products = eval(result["products"]);
                var ddw_sel_content = "";
                if (product == null || product == "") {
                    ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
                } else {
                    var moneyTimes = "1", id = 0;
                    for (var i = 0; i < products.length; i++) {
                        if (products[i]["moneyTimes"] > moneyTimes) {
                            moneyTimes = products[i]["moneyTimes"];
                            id = products[i]["id"];
                            if (moneyTimes == 2) {
                                $("#money").attr("accept", product[i]["moneyMin"]);
                                $("#money").val(product[i]["moneyMin"]);
                                $("#money").attr("name", product[i]["moneyMax"]);
                                var t = "最少" + fomatNumber(product[i]["moneyMin"]) + ",最多" + fomatNumber(product[i]["moneyMax"]);
                          
                                $("#money").attr("title", t);
                                var t1 = product[i]["moneyMin"] + "-" + fomatNumber(product[i]["moneyMax"]);
                                $("#moneylimit").val(t1);
                                $("#money_times").val(moneyTimes);
                                $("#money_times").attr('title',moneyTimes);
                                ddw_sel_content = "{value: '" + moneyTimes + "', text: '" + moneyTimes + "倍',id:'" + id + "'}";
                            } else {
                                ddw_sel_content += ",{value: '" + moneyTimes + "', text: '" + moneyTimes + "倍',id:'" + id + "'}";
                            }
                        }
                    }
                }
                $("#productList").val(ddw_sel_content);
            }
    	}
        if(DEBUG) console.log('==========正在执行COM.ajax');
		COM.ajax(ajaxObj);
    }
    else {
    	var ajaxObj = {
    		url:"tools/list_ajax.ashx?act=Astock&productType=" + producttype,
    		error: function (a) {
                $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
            },
            success: function (result) {
            	if(DEBUG) console.log('==========COM.ajax回调函数');
                var product = eval(result["product"]);
                products = eval(result["products"]);
                var ddw_sel_content = "";

                if (product == null || product == "") {
                    ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
                } else {
                    /*$("#capitalMoney").val("最少"+fomatNumber(product[0]["moneyMin"])+",最多"+fomatNumber(product[0]["moneyMax"]));*/
                    for (var i = 0; i < products.length; i++) {
                        if (products[i]["moneyTimes"] == 1) {
                            $("#capitalMoney").attr("accept", products[i]["moneyMin"]);
                            $("#capitalMoney").attr("name", products[i]["moneyMax"]);
                            $("#capitalMoney").attr("title", "最少" + fomatNumber(products[i]["moneyMin"]) + ",最多" + fomatNumber(products[i]["moneyMax"]));
                            $("#moneylimit").text(products[i]["moneyMin"] + "-" + fomatNumber(products[i]["moneyMax"]));
                            ddw_sel_content = ddw_sel_content + "<li title=" + products[i]["moneyTimes"] + " class=\"curr\" name=" + products[i]["id"] + " onclick=\"checkproduct(this);\"><p><span>" + products[i]["moneyTimes"] + "倍</span>融资资金</p><p><i>0</i>元</p></li>";
                        }
                    }
                }
                $("#ddw_sel").html(ddw_sel_content);
            }
    	}
		if(DEBUG) console.log('==========正在执行COM.ajax');
		COM.ajax(ajaxObj);
    }
}



var productsDay = {};
/**
 * 初始化产品天
 * @param producttype
 */
function innitDayProduct(producttype) {
	var ajaxObj = {
		url:"tools/list_ajax.ashx?act=Astock&productType=" + producttype,
		success: function (result) {
			if(DEBUG) console.log('==========COM.ajax回调函数');
            var product = eval(result["product"]);
            productsDay = eval(result["products"]);
            var ddw_sel_content = "";
            if (product == null || product == "") {
                ddw_sel_content = "<center><li style=\"color:gray\">暂无产品</li></center>";
            } else {
                $("#money").attr("accept", product[0]["moneyMin"]);
                $("#money").val(product[0]["moneyMin"]);
                $("#money").attr("name", product[0]["moneyMax"]);
                $("#money").attr("title", "最少" + fomatNumber(product[0]["moneyMin"]) + ",最多" + fomatNumber(product[0]["moneyMax"]));
                $("#moneylimit").val(product[0]["moneyMin"] + "-" + fomatNumber(product[0]["moneyMax"]));
                var moneyTimes = 0, id = 0;
                for (var i = 0; i < productsDay.length; i++) {
                    if (productsDay[i]["moneyTimes"] > moneyTimes) {
                        moneyTimes = productsDay[i]["moneyTimes"];
                        id = productsDay[i]["id"];
                        if (i == 0) {
                            $("#money_times").val(moneyTimes);
                            $("#money_times").attr('title',moneyTimes);
                            ddw_sel_content = "{value: '" + moneyTimes + "', text: '" + moneyTimes + "倍',id:'" + id + "'}";
                        } else {
                            ddw_sel_content += ",{value: '" + moneyTimes + "', text: '" + moneyTimes + "倍',id:'" + id + "'}";
                        }
                    }
                }
            }
            $("#productList").val(ddw_sel_content);
            //checkMoney(2000);
        },
		error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        }
	}
   	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}


var productsWeek = {};
/**
 * 初始化产品周
 * @param producttype
 */
function innitWeekProduct(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productsWeek = eval(result["products"]);
            var ddw_sel_content = "";
            var ddw_sel_time = "";
            if (product == null || product == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                $("#capitalMoney").attr("accept", product[0]["moneyMin"]);
                $("#capitalMoney").attr("name", product[0]["moneyMax"]);
                $("#capitalMoney").attr("title", "最少" + (fomatNumber(product[0]["moneyMin"])) + ",最多" + (fomatNumber(product[0]["moneyMax"])));
                $("#capitalMoney").val("最少" + fomatNumber(product[0]["moneyMin"]) + ",最多" + fomatNumber(product[0]["moneyMax"]));
                var moneyTimes = 0;
                var timelimitinput = 0;
                for (var i = 0; i < productsWeek.length; i++) {
                    if (productsWeek[i]["moneyTimes"] > moneyTimes) {
                        moneyTimes = productsWeek[i]["moneyTimes"];
                        if (i == 0) {
                            $("#multipleinput").val(productsWeek[i]["moneyTimes"]);
                            $("#multiple").text(productsWeek[i]["moneyTimes"]);
                        }
                        ddw_sel_content += "<option onclick=\"setmultiple(" + productsWeek[i]["moneyTimes"] + ")\" value=\"" + productsWeek[i]["moneyTimes"] + "\">" + productsWeek[i]["moneyTimes"] + "倍</option>"
                    }
                    if (productsWeek[i]["monthMin"] > timelimitinput) {
                        timelimitinput = productsWeek[i]["monthMin"];
                        if (i == 0) {
                            $("#timelimitinput").val(productsWeek[i]["monthMin"]);
                            $("#useTime").text(productsWeek[i]["monthMin"]);
                        }
                        ddw_sel_time += "<option onclick=\"setTimeLimit(" + productsWeek[i]["monthMin"] + ")\" value=\"" + productsWeek[i]["monthMin"] + "\">" + productsWeek[i]["monthMin"] + "天</option>"
                    }
                }
            }
            $("#selectbeishu").html(ddw_sel_content);
            $("#days").html(ddw_sel_time)
        }
    });
}


var productsfree = {};
/**
 * 初始化产品免费体验
 * @param producttype
 */
function innitFreeProduct(producttype) {
	var ajaxObj = {
		url:"tools/list_ajax.ashx?act=Astock&productType=" + producttype,
		error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
        	if(DEBUG) console.log('==========COM.ajax回调函数');
            var product = eval(result["product"]);
            productsfree = eval(result["products"]);
            if (productsfree.length > 0) {
                var money = 1000;
                var productid = productsfree[0]["id"];
                var money_borrow = productsfree[0]["moneyTimes"] * money;
                var money_all = money_borrow + money;
                var rateWarn = money_borrow * productsfree[0]["rateWarn"];
                var rateOpenLine = money_borrow * productsfree[0]["rateOpenLine"];
                var fee = money_borrow * productsfree[0]["moneyRate"];
                var feemoney = money_borrow * productsfree[0]["moneyRate"];
                var matchMax = productsfree[0]["moneyMax"];
                $("#money_times").val(productsfree[0]["moneyTimes"]);
                $("#productId").val(productid);
                $("#money").val(money);
                $("#money_all").val(money_all);
                $("#money_borrow").val(money_borrow);
                $("#rateWarn").val(rateWarn);
                $("#rateOpenLine").val(rateOpenLine);
                $("#fee").val(feemoney);
                $("#fee_val").val(feemoney);
                $(".fee").html(fMoney(feemoney, 2) + "元");
                $(".rateWarn").html(fMoney(rateWarn, 2));
                $(".rateOpenLine").html(fMoney(rateOpenLine, 2));
                $(".money_all").html("￥" + fMoney(money_all, 2));
                $(".money_all").text(productsfree[0]["moneyMin"] + productsfree[0]["moneyMax"]);
                $(".money").text(productsfree[0]["moneyMin"]);
                $(".money_borrow").text(productsfree[0]["moneyMax"]);
                $(".stocktime").text(productsfree[0]["monthMin"]+"天");
            }
        }
	}	
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);

}


/**
 * 查询融资列表
 * @param pageIndex 当前页
 * @param size      每页大小
 * @param productType 项目类型
 * @param begintime   开始时间
 * @param endtime     结束时间
 */
function getstockList(pageIndex, size, productType, begintime, endtime) {
    $.ajax({
        type: "post",
        async: false,
        data: { "pageSize": size, "pageIndex": pageIndex, "productType": productType, "begintime": begintime, "endtime": endtime },
        url: "/account/account!ajaxGetstockList.action",
        dataType: 'JSON',
        success: function (result) {
            var resultdiv = "<tr><th>产品类型</th><th>配资金额</th><th>保证金</th><th>利率</th><th>融资时间</th><th>到期时间</th><th>状态</th><th  class=\"th1\">操作</th></tr>";
            var rs = eval(result)["rows"];
            if (rs.length > 0) {
                for (var i = 0; i < rs.length; i++) {
                    resultdiv += "<tr><td>" + rs[i]["productCode"] + "</td>";
                    if (rs[i]["flag"] == 21) {
                        resultdiv += "<td>" + fMoney((rs[i]["moneyDeposit"] / 6.5), 2) + "美金</td>";
                    }
                    else if (rs[i]["flag"] == 24) {
                        resultdiv += "<td>" + fMoney((rs[i]["moneyBorrow"] / 0.84), 2) + "港元</td>";
                    }
                    else {
                        resultdiv += "<td>" + rs[i]["moneyBorrow"] + "元</td>";
                    }
                    resultdiv += "<td>" + rs[i]["moneyDeposit"] + "元</td>" +
                        "<td>" + rs[i]["moneyRate"] + "</td>" +
                        "<td>" + rs[i]["moneyBegin"] + "</td>";
                    if (rs[i]["flag"] == 21) {
                        resultdiv += "<td>2-N天</td>";
                    }
                    else {
                        resultdiv += "<td>" + rs[i]["moneyEnd"] + "</td>";
                    }
                    resultdiv += "<td style=\"color:#349cd8\">" + stockstatus[rs[i]["status"]] + "</td>" +
                        "<td>" + "<a target=\"_blank\" onclick=\"return linkClick(this.href);\" href=\"" + "/stock/stockdetails/" + rs[i]["id"] + ".html\">查看</a>" + "</td>" +
                        "</tr>";
                }
            }
            else {
                resultdiv += "<tr><td colspan='8'>暂无记录</td></tr>";
            }
            $("#ajaxGetstockList").html(resultdiv);
            var total = eval(result)["total"]; //总共有多少条数据
            var currentPage = eval(result)["currentPage"]; //总共有几页
            var pageindex = eval(result)["pageindex"];     //第几页

            $("#total").text(total);
            $("#currentPage").text(currentPage);
            $("#pageindex").text(pageindex);
        }
    });
}


var productFutures = {};
/**
 * 初始化产品期货
 * @param producttype
 */
function innitFuturesProduct(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productFutures = eval(result["products"]);
            var ddw_sel_content = "";
            if (product == null || product == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                $("#capitalMoney").attr("accept", product[0]["moneyMin"]);
                $("#capitalMoney").val(product[0]["moneyMin"])
                $("#capitalMoney").attr("name", product[0]["moneyMax"]);
                $("#capitalMoney").attr("title", "最少" + fomatNumber(product[0]["moneyMin"]) + ",最多" + fomatNumber(product[0]["moneyMax"]));
                /*$("#capitalMoney").val("最少"+fomatNumber(product[0]["moneyMin"])+",最多"+fomatNumber(product[0]["moneyMax"]));*/
                $("#moneylimit").text(product[0]["moneyMin"] + "-" + fomatNumber(product[0]["moneyMax"]));
                var moneyTimes = "0";
                for (var i = 0; i < productFutures.length; i++) {
                    if (productFutures[i]["moneyTimes"] > moneyTimes) {
                        moneyTimes = productFutures[i]["moneyTimes"];
                        if (i == 0) {
                            ddw_sel_content = ddw_sel_content + "<li title=" + productFutures[i]["moneyTimes"] + " class=\"curr\" name=" + productFutures[i]["id"] + " onclick=\"checkproduct(this);\"><p><span>" + productFutures[i]["moneyTimes"] + "倍</span>资金</p><p><i>0</i>元</p></li>";
                        } else {
                            ddw_sel_content = ddw_sel_content + "<li title=" + productFutures[i]["moneyTimes"] + " name=" + productFutures[i]["id"] + " onclick=\"checkproduct(this);\"><p><span>" + productFutures[i]["moneyTimes"] + "倍</span>资金</p><p><i>0</i>元</p></li>";
                        }
                    }
                }
            }
            $("#ddw_sel").html(ddw_sel_content);
            checkMoney(5000);
        }
    });
}

var productFreeFutures = {};
/**
 * 初始化产品期货
 * @param producttype
 */
function innitFreeFuturesProduct(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productFreeFutures = eval(result["products"]);
            var ddw_sel_content = "";
            if (product == null || product == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                $("#capitalMoney").attr("accept", product[0]["moneyMin"]);
                $("#capitalMoney").val(product[0]["moneyMin"]);
                $("#capitalMoney").attr("name", product[0]["moneyMax"]);
                $("#capitalMoney").attr("title", "最少" + fomatNumber(product[0]["moneyMin"]) + ",最多" + fomatNumber(product[0]["moneyMax"]));
                $("#moneylimit").text(product[0]["moneyMin"] + "-" + fomatNumber(product[0]["moneyMax"]));
                var moneyTimes = 0;
                for (var i = 0; i < productFreeFutures.length; i++) {
                    var times = parseFloat(productFreeFutures[i]["moneyTimes"]);
                    if (times > moneyTimes) {
                        if (i == 0) {
                            ddw_sel_content += "<li title=" + productFreeFutures[i]["moneyTimes"] + " class=\"curr\" name=" + productFreeFutures[i]["id"] + " onclick=\"checkproduct(this);\"><strong>" + productFreeFutures[i]["moneyTimes"] + "</strong>倍<p>免息</p><p><i>0</i>元</p></li>";
                        } else {
                            ddw_sel_content += "<li title=" + productFreeFutures[i]["moneyTimes"] + " name=" + productFreeFutures[i]["id"] + " onclick=\"checkproduct(this);\"><strong>" + productFreeFutures[i]["moneyTimes"] + "</strong>倍<p>免息</p><p><i>0</i>元</p></li>";
                        }
                    }
                }
            }
            $("#ddw_sel").html(ddw_sel_content);
            checkMoney(2000);
        }
    });
}

var productStock = {};
/**
 * 初始化产品股指宝
 * @param producttype
 */
function innitProductStock(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productStock = eval(result["products"]);
            var ddw_sel_content = "";
            var stockmin = "";
            if (productStock == null || productStock == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                for (var i = 0; i < productStock.length; i++) {
                    if (productStock[i]["flag"] == 1) {
                        ddw_sel_content = ddw_sel_content + "<li title='" + productStock[i]["moneyTimes"] + "' onclick=\"checkproduct(this);\">"
                            + "<p class='m'><span>" + productStock[i]["moneyTimes"] + "</span>手</p><p class='p'>股指合约</p></li>";
                    }
                }
            }
            if (product == null || product == "") {
                stockmin = "<center><div style=\"color:gray\">暂无产品</div></center>"
            }
            else {
                for (var i = 0; i < product.length; i++) {
                    if (i == 0) {
                        stockmin = stockmin + "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'class='curr'>"
                            + "<p class='m'><span>低</span></p>"
                            + "<p class='p'>风险保证金</p>"
                            + "</li>"
                    }
                    else {
                        stockmin += "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'>";
                        if (product[i]["moneyTimes"] == 2) {
                            stockmin += "<p class='m'><span>中</span></p>";
                        }
                        else {
                            stockmin += "<p class='m'><span>高</span></p>";
                        }
                        stockmin += "<p class='p'>风险保证金</p></li>";
                    }
                }
            }

            $("#ddw_sel").html(ddw_sel_content);
            $("#stockmin").html(stockmin);
        }
    });
}


/**
 * 获取最新融资动态
 * @param pageIndex
 * @param type
 * @param pageSize
 */
function getUserBorrowHot(pageIndex, type, pageSize, id) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=user_borrow_hot&pageIndex=" + pageIndex + "&type=" + type + "&pageSize=" + pageSize,
        dataType: 'JSON',
        success: function (result) {
            result = eval(result);
            var stocks = result["rows"];
            var resultdiv = "";
            resultdiv += "<tr><th>申请人</th><th>保证金(元)</th><th>融资金额(元)</th><th>融资周期</th><th>申请时间</th></tr>"
            for (var i = 0; i < stocks.length; i++) {
                if (type == "2" || type == "6") {
                    resultdiv += " <tr>"
                        + "<td>" + stocks[i].id + "</td><td>￥" + fMoney(stocks[i].moneyDeposit) + "</td><td>￥" + fMoney(stocks[i].moneyBorrow) + "</td><td>" + stocks[i].borrowDays + "个月</td><td>" + new Date(stocks[i]["moneyTime"]).Format("yyyy-MM-dd hh:mm:ss") + "</td>"
                        + "</tr>"
                }
                else {
                    resultdiv += " <tr>"
                        + "<td>" + stocks[i].id + "</td><td>￥" + fMoney(stocks[i].moneyDeposit) + "</td><td>￥" + fMoney(stocks[i].moneyBorrow) + "</td><td>" + stocks[i].borrowDays + "天</td><td>" + new Date(stocks[i]["moneyTime"]).Format("yyyy-MM-dd hh:mm:ss") + "</td>"
                        + "</tr>"
                }
            }
            $("#" + id).html(resultdiv);
        }
    });
}

var productFs = {};
/**
 * 初始化产品富时A50
 * @param producttype
 */
function innitProductFs(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productFs = eval(result["products"]);
            var ddw_sel_content = "";
            var stockmin = "";
            if (productFs == null || productFs == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                for (var i = 0; i < productFs.length; i++) {
                    if (productFs[i]["flag"] == 1) {
                        ddw_sel_content = ddw_sel_content + "<li title='" + productFs[i]["moneyTimes"] + "' onclick=\"checkproduct(this);\">"
                            + "<p class='m'><span>" + productFs[i]["moneyTimes"] + "</span>手</p></li>";
                    }
                }
            }
            if (product == null || product == "") {
                stockmin = "<center><div style=\"color:gray\">暂无产品</div></center>"
            }
            else {
                for (var i = 0; i < product.length; i++) {
                    if (i == 0) {
                        stockmin = stockmin + "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'class='curr'>"
                            + "<p class='m1'><span>低</span></p>"
                            + "<p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>"
                            + "</li>"
                    }
                    else {
                        stockmin += "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'>";
                        if (product[i]["moneyTimes"] == 2) {
                            stockmin += "<p class='m1'><span>中</span></p><p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>";
                        }
                        else {
                            stockmin += "<p class='m1'><span>高</span></p><p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>";
                        }
                    }
                }
            }

            $("#ddw_sel").html(ddw_sel_content);
            $("#stockmin").html(stockmin);
        }
    });
}


var productHszs = {};
/**
 * 初始化产品恒生指数
 * @param producttype
 */
function innitProductHszs(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productHszs = eval(result["products"]);
            var ddw_sel_content = "";
            var stockmin = "";
            if (productHszs == null || productHszs == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                for (var i = 0; i < productHszs.length; i++) {
                    if (productHszs[i]["flag"] == 1) {
                        ddw_sel_content = ddw_sel_content + "<li title='" + productHszs[i]["moneyTimes"] + "' onclick=\"checkproduct(this);\">"
                            + "<p class='m'><span>" + productHszs[i]["moneyTimes"] + "</span>手</p></li>";
                    }
                }
            }
            if (product == null || product == "") {
                stockmin = "<center><div style=\"color:gray\">暂无产品</div></center>"
            }
            else {
                for (var i = 0; i < product.length; i++) {
                    if (i == 0) {
                        stockmin = stockmin + "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'class='curr'>"
                            + "<p class='m1'><span>低</span></p>"
                            + "<p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>"
                            + "</li>"
                    }
                    else {
                        stockmin += "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'>";
                        if (product[i]["moneyTimes"] == 2) {
                            stockmin += "<p class='m1'><span>中</span></p><p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>";
                        }
                        else {
                            stockmin += "<p class='m1'><span>高</span></p><p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>";
                        }
                    }
                }
            }

            $("#ddw_sel").html(ddw_sel_content);
            $("#stockmin").html(stockmin);
        }
    });
}


var market = {};
/**
 * 初始化产品国际市场
 * @param producttype
 */
function innitMarket(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            market = eval(result["products"]);
            var ddw_sel_content = "";

            if (product == null || product == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                /*$("#capitalMoney").val("最少"+fomatNumber(product[0]["moneyMin"])+",最多"+fomatNumber(product[0]["moneyMax"]));*/
                for (var i = 0; i < market.length; i++) {
                    if (market[i]["moneyTimes"] == 0) {
                        $("#capitalMoney").attr("accept", market[i]["moneyMin"]);
                        $("#capitalMoney").attr("name", market[i]["moneyMax"]);
                        $("#capitalMoney").attr("title", "最少" + fomatNumber(market[i]["moneyMin"]) + ",最多" + fomatNumber(market[i]["moneyMax"]));
                        $("#moneylimit").text(market[i]["moneyMin"] + "-" + fomatNumber(market[i]["moneyMax"]));
                        $("#productId").val(market[i]["id"]);
                    }
                }
            }
        }
    });
}

var productGjsc = {};
/**
 * 初始化产品国际期货
 * @param producttype
 */
function innitProductGjsc(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productGjsc = eval(result["products"]);
            var ddw_sel_content = "";
            var stockmin = "";
            if (productGjsc == null || productGjsc == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                $("#money").attr("accept", productGjsc[0]["moneyMin"]);
                $("#money").val(productGjsc[0]["moneyMin"]);
                $("#money").attr("name", productGjsc[0]["moneyMax"]);
                $("#money").attr("title", "最少" + fomatNumber(productGjsc[0]["moneyMin"]) + ",最多" + fomatNumber(productGjsc[0]["moneyMax"]));
                $("#moneylimit").val(productGjsc[0]["moneyMin"] + "-" + fomatNumber(productGjsc[0]["moneyMax"]));
                var moneyTimes = 0, id = 0;
                for (var i = 0; i < productGjsc.length; i++) {
                    if (productGjsc[i]["flag"] == 1) {
                        moneyTimes = productGjsc[i]["moneyTimes"];
                        if (moneyTimes == 1) {
                            //$("#money_times").val(moneyTimes);
                            ddw_sel_content = "{value: '" + moneyTimes + "', text: '" + moneyTimes + "手',id:'" + id + "'}";
                        }
                        else {
                            ddw_sel_content += ",{value: '" + moneyTimes + "', text: '" + moneyTimes + "手',id:'" + id + "'}";
                        }
                    }
                }
            }
            if (product == null || product == "") {
                stockmin = "<center><div style=\"color:gray\">暂无产品</div></center>"
            }
            else {
                for (var i = 0; i < product.length; i++) {
                    if (i == 0) {
                        stockmin = stockmin + "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'class='curr'>"
                            + "<p class='m1'><span>低</span></p>"
                            + "<p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>"
                            + "</li>"
                    }
                    else {
                        stockmin += "<li onclick='checkTimes(this)' title='" + product[i]["moneyTimes"] + "'>";
                        if (product[i]["moneyTimes"] == 2) {
                            stockmin += "<p class='m1'><span>中</span></p><p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>";
                        }
                        else {
                            stockmin += "<p class='m1'><span>高</span></p><p class='p' name='" + product[i]["moneyMin"] + "'><i>" + product[i]["moneyMin"] + "</i>元</p>";
                        }
                    }
                }
            }
            ddw_sel_content += ",{value: '0', text: '其他手数手动输入',id:'0'}";
            $("#productList").val(ddw_sel_content);
            //checkMoney(5000);
        }
    });
}

var productHkStock = {};
/**
 * 初始化产品港股操盘
 * @param producttype
 */
function innitHkStockProduct(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productHkStock = eval(result["products"]);
            var ddw_sel_content = "";
            if (product == null || product == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                $("#capitalMoney").attr("accept", RmbToHk(product[0]["moneyMin"]));
                $("#capitalMoney").attr("name", RmbToHk(product[0]["moneyMax"]));
                $("#capitalMoney").attr("title", "最少" + fomatNumber(RmbToHk(product[0]["moneyMin"])) + ",最多" + fomatNumber(RmbToHk(product[0]["moneyMax"])));
                $("#moneylimit").text(RmbToHk(product[0]["moneyMin"]) + "-" + fomatNumber(RmbToHk(product[0]["moneyMax"])));
                var moneyTimes = 0;
                for (var i = 0; i < productHkStock.length; i++) {
                    var times = parseFloat(productHkStock[i]["moneyTimes"]);
                    if (times > moneyTimes) {
                        if (i == 0) {
                            ddw_sel_content += "<li title=" + productHkStock[i]["moneyTimes"] + " class=\"curr\" name=" + productHkStock[i]["id"] + " onclick=\"checkproduct(this);\"><p><em>" + productHkStock[i]["moneyTimes"] + "倍</em>资金</p><p><i>0</i>元</p></li>";
                        } else {
                            ddw_sel_content += "<li title=" + productHkStock[i]["moneyTimes"] + " name=" + productHkStock[i]["id"] + " onclick=\"checkproduct(this);\"><p><em>" + productHkStock[i]["moneyTimes"] + "倍</em>资金</p><p><i>0</i>元</p></li>";
                        }
                    }
                }
            }
            $("#ddw_sel").html(ddw_sel_content);
        }
    });
}

var productsAStock = {};
/**
 * 初始化产品A股T+0
 * @param producttype
 */
function innitAStockProduct(producttype) {
    $.getJSON("/tools/list_ajax.ashx?act=Astock&productType=" + producttype, function (result) {
        var product = eval(result["product"]);
        productsAStock = eval(result["products"]);
        var ddw_sel_content = "";
        if (product == null || product == "") {
            ddw_sel_content = "<center><li style=\"color:gray\">暂无产品</li></center>";
        } else {
            $("#capitalMoney").attr("accept", product[0]["moneyMin"]);
            $("#capitalMoney").attr("name", product[0]["moneyMax"]);
            $("#capitalMoney").attr("title", "最少" + fomatNumber(product[0]["moneyMin"]) + ",最多" + fomatNumber(product[0]["moneyMax"]));
            $("#moneylimit").text(fomatNumber(product[0]["moneyMin"]) + "-" + fomatNumber(product[0]["moneyMax"]));
            var moneyTimes = 0;
            for (var i = 0; i < productsAStock.length; i++) {
                if (productsAStock[i]["moneyTimes"] > moneyTimes) {
                    moneyTimes = productsAStock[i]["moneyTimes"];
                    if (i == 0) {
                        ddw_sel_content = ddw_sel_content + "<li title=" + productsAStock[i]["moneyTimes"] + " class=\"curr\" name=" + productsAStock[i]["id"] + " onclick=\"checkproduct(this);\"><strong>" + productsAStock[i]["moneyTimes"] + "</strong>倍<p><i>0</i></p><p>市值</p></li>";
                    } else {
                        ddw_sel_content = ddw_sel_content + "<li title=" + productsAStock[i]["moneyTimes"] + " name=" + productsAStock[i]["id"] + " onclick=\"checkproduct(this);\"><strong>" + productsAStock[i]["moneyTimes"] + "</strong>倍<p><i>0</i></p><p>市值</p></li>";
                    }
                }
            }
        }
        ddw_sel_content += ""
        $("#ddw_sel").html(ddw_sel_content);
    });
}

var productOmqzFutures = {};
/**
 * 初始化产品期货
 * @param producttype
 */
function innitOmqzFuturesProduct(producttype) {
    $.ajax({
        type: "post",
        url: "/tools/list_ajax.ashx?act=Astock&productType=" + producttype,
        dataType: 'JSON',
        error: function (a) {
            $("#ddw_sel").html("<div style=\"color:gray\">网络异常...</div>");
        },
        success: function (result) {
            var product = eval(result["product"]);
            productOmqzFutures = eval(result["products"]);
            var ddw_sel_content = "";
            if (product == null || product == "") {
                ddw_sel_content = "<center><div style=\"color:gray\">暂无产品</div></center>";
            } else {
                $("#money").attr("accept", productOmqzFutures[0]["moneyMin"]);
                $("#money").val(productOmqzFutures[0]["moneyMin"]);
                $("#money").attr("name", productOmqzFutures[0]["moneyMax"]);
                $("#money").attr("title", "最少" + fomatNumber(productOmqzFutures[0]["moneyMin"]) + ",最多" + fomatNumber(productOmqzFutures[0]["moneyMax"]));
                $("#moneylimit").val(productOmqzFutures[0]["moneyMin"] + "-" + fomatNumber(productOmqzFutures[0]["moneyMax"]));
                var moneyTimes = 0, id = 0;
                for (var i = 0; i < productOmqzFutures.length; i++) {
                    if (productOmqzFutures[i]["moneyTimes"] > moneyTimes) {
                        moneyTimes = productOmqzFutures[i]["moneyTimes"];
                        id = productOmqzFutures[i]["id"];
                        if (i == 0) {
                            $("#money_times").val(moneyTimes);
                            ddw_sel_content = "{value: '" + moneyTimes + "', text: '" + moneyTimes + "倍',id:'" + id + "'}";
                        } else {
                            ddw_sel_content += ",{value: '" + moneyTimes + "', text: '" + moneyTimes + "倍',id:'" + id + "'}";
                        }
                    }
                }
            }
            $("#productList").val(ddw_sel_content);
            //getproduct(3000, 12, 1);
        }
    });
}
/*资金交易期：天*/
var daysInit = function () {
    var dayslist = "";
    for (var i = 2; i < 30; i++) {
        if (i == 0) {
            dayslist = "{value: '" + i + "', text: '" + i + "天'}";
        } else {
            dayslist += ",{value: '" + i + "', text: '" + i + "天'}";
        }
    }
    $("#daysCheckList").val(dayslist);
}
/*资金交易期：月*/
var monthInit = function () {
    var dayslist = "";
    for (var i = 1; i <= 6; i++) {
        if (i == 1) {
            dayslist = "{value: '" + i + "', text: '" + i + "月'}";
        } else {
            dayslist += ",{value: '" + i + "', text: '" + i + "月'}";
        }
    }
    $("#daysCheckList").val(dayslist);
}
/*国际期货初始化*/
var futuresInit_bak = function () {
    var futureslist = "{value: '1', text: '国际综合(OMQZ)'},{value: '2', text: '恒生指数(HSI)'},{value: '3', text: '富时A50(CN)'},{value: '4', text: '原油(CL)'},{value: '5', text: '美黄金(GC)'},{value: '6', text: '美白银(SI)'}";
    $("#stockType").on('tap', function (e) {
        var $this = $(this);
        var picker = new mui.PopPicker();
        var obj = eval('[' + futureslist + ']');
        picker.setData(obj);
        picker.show(function (selectItems) {
            var val = selectItems[0].value, tit = selectItems[0].text;
            if (val == 1) {
                window.location.href = "/futures/omqzfutures.html";
            } else if (val == 2) {
                window.location.href = "/futures/hszsfutures.html";
            } else if (val == 3) {
                window.location.href = "/futures/fsfutures.html";
            } else if (val == 4) {
                window.location.href = "/futures/yyfutures.html";
            } else if (val == 5) {
                window.location.href = "/futures/gcfutures.html";
            } else if (val == 6) {
                window.location.href = "/futures/sifutures.html";
            } else {
                window.location.href = "/futures/omqzfutures.html";
            }
        });
    });
}
var futuresInit = function () {
    var futureslist = "{value: '1', text: '国际综合(OMQZ)'}";
    $("#stockType").on('tap', function (e) {
        var $this = $(this);
        var picker = new mui.PopPicker();
        var obj = eval('[' + futureslist + ']');
        picker.setData(obj);
        picker.show(function (selectItems) {
            var val = selectItems[0].value, tit = selectItems[0].text;
            if (val == 1) {
                window.location.href = "/futures/omqzfutures.html";
            }
        });
    });
}