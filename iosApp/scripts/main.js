//======================活动配置查询(活动种类、产品类型、配资倍数、保证金、借款额)================
var product_gift = function(gift_type, product_type, times, money_deposit, money_borrow, url) {
	var ajaxObj = {
		url: "tools/list_ajax.ashx?act=product_gift&gift_type=" + gift_type + "&product_type=" + product_type + "&times=" + times + "&money_deposit=" + money_deposit + "&money_borrow=" + money_borrow + "&t=" + new Date() + "",
		success: function(data, textStatus) {
			var _reviewIntegral = $("#reviewIntegral").val();
			if(data.id == 0 || data.id == "0") {
				if(parseFloat(_reviewIntegral) > 0) {
					mui.confirm('您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '牛币活动奖励', ['返回修改', '确定提交'], function(e) {
						if(e.index == 0) {
							return;
						} else if(e.index == 1) {
							linkClick(url);
						}
					});
					return;
				}
				_step2 = -1
				linkClick(url);
				return;
			}
			var v = data;
			$(".fee_info").html("");
			$(".fee_count").html("");
			$(".fee_info_tips").html("");
			var fee = 0,
				fee_money = 0,
				fee_val = 0;
			var fee = 0;
			var moneyRate = 0,
				fee_val = 0;
			var fee = 0,
				fee_val = 0;
			_step2 = 1;
			//天配活动
			if(gift_type == 1) {
				if(typeof(v.id) != "undefined") {
					//免息天数
					if(v.day_unfee > 0) {
						if(_reviewIntegral > 0) {
							mui.confirm('1、活动期间前' + v.day_unfee + '天免息，' + v.day_unfee + '天后按正常利息收取</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '免息天数活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('活动期间前' + v.day_unfee + '天免息，' + v.day_unfee + '天后按正常利息收取</br>', '免息天数活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						}
					}
					//利率折扣
					if(v.fee_disrate > 0) {
						fee = parseFloat($("#fee_val").val(), 0), fee_money = parseFloat(fee * v.fee_disrate).toFixed(2), fee_val = parseFloat(fee - fee_money).toFixed(2);
						if(_reviewIntegral > 0) {
							mui.confirm('1、您当前可享受利息减免优惠，可减免' + fee_val + '元</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '利息折扣活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('您当前可享受利息减免优惠，可减免' + fee_val + '元</br>', '利息折扣活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						}
					}
					//利率减少数
					if(v.fee_lowrate > 0) {
						fee = parseFloat($("#fee_val").val(), 0);
						moneyRate = parseFloat($("#moneyRate").val(), 0),
							fee_val = parseFloat(fee - money_borrow * v.fee_lowrate).toFixed(2);
						//利率减免活动
						if(_reviewIntegral > 0) {
							mui.confirm('1、您当前可享受利率减免优惠，可减免' + parseFloat(money_borrow * v.fee_lowrate).toFixed(2) + '元</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '利率减免活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('您当前可享受利率减免优惠，可减免' + parseFloat(money_borrow * v.fee_lowrate).toFixed(2) + '元</br>', '利率减免活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});

						}
					}
					//利息减少金额
					if(v.fee_lowmoney > 0) {
						fee = parseFloat($("#fee_val").val(), 0), fee_val = parseFloat(fee - v.fee_lowmoney).toFixed(2);
						//利息优惠活动
						//利息折扣活动
						if(_reviewIntegral > 0) {
							mui.confirm('1、您当前可享受利息' + (v.fee_disrate * 100) + '折优惠，可减免' + v.fee_lowmoney + '元</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '利率减免活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('您当前可享受利息' + (v.fee_disrate * 100) + '折优惠，可减免' + v.fee_lowmoney + '元</br>', '利率减免活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						}
					}
				} else {
					$(".fee_info").html("按天收费，周末节假日免费");
				}
			} else if(gift_type == 2) { //月配活动
				if(typeof(v.id) != "undefined") {
					//利率折扣
					if(v.fee_disrate > 0) {
						var fee = parseFloat($("#fee_val").val(), 0);
						var fee = $(".fee").html();
						if(_reviewIntegral > 0) {
							mui.confirm('1、利息' + (v.fee_disrate * 100) + '折优惠，当前优惠' + Math.round(rMoney(fee) * (1 - v.fee_disrate)) + '元</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '利率折扣活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('利息' + (v.fee_disrate * 10) + '折优惠，当前优惠' + Math.round(rMoney(fee) * (1 - v.fee_disrate)) + '元。', '利率折扣活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						}
					}
					//利率减少数
					if(v.fee_lowrate > 0) {
						var fee = parseFloat($("#fee_val").val(), 0);
						var moneyRate = parseFloat($("#moneyRate").val(), 0),
							fee_val = parseFloat(fee - money_borrow * v.fee_lowrate).toFixed(2);
						$(".fee_info").html("享受利率减少优惠，当前优惠" + parseFloat(money_borrow * v.fee_lowrate).toFixed(2) + "元");
						$(".fee_count").html("");
						$(".fee_info_tips").html("");
						$("#fee").html(fee_val);
						if(_reviewIntegral > 0) {
							mui.confirm('1、享受利率减少优惠，当前优惠' + parseFloat(money_borrow * v.fee_lowrate).toFixed(2) + '元。</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '利率减免活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('享受利率减少优惠，当前优惠' + parseFloat(money_borrow * v.fee_lowrate).toFixed(2) + '元。', '利率减免活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						}
					}
					//利息减少金额
					if(v.fee_lowmoney > 0) {
						var fee = parseFloat($("#fee_val").val(), 0),
							fee_val = parseFloat(fee - v.fee_lowmoney).toFixed(2);
						$(".fee_info").html("可享受利息减免额" + v.fee_lowmoney + "元");
						$(".fee_count").html("");
						$(".fee_info_tips").html("");
						$("#fee").html(fee_val);
						if(_reviewIntegral > 0) {
							mui.confirm('1、可享受利息减免额' + v.fee_lowmoney + '元。</br>2、您当前配资还将获得 ' + _reviewIntegral + ' 牛币奖励，系统将在配资成功后发放到您的牛金所账户。', '利息减少活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						} else {
							mui.confirm('可享受利息减免额' + v.fee_lowmoney + '元。', '利息减少活动', ['返回修改', '确定提交'], function(e) {
								if(e.index == 0) {
									return;
								} else if(e.index == 1) {
									linkClick(url);
								}
							});
						}
					}
				} else {
					$(".fee_info").html("按天收费，周末节假日免费");
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			_step2 = -1
			linkClick(url);
			return;
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);

}
//======================活动牛币查询(活动种类、产品类型、配资倍数、保证金、借款额)================
var product_gift_integral = function(gift_type, product_type, times, money_deposit, money_borrow, url) {
	var ajaxObj = {
		url: "tools/list_ajax.ashx?act=product_gift_integral&gift_type=" + gift_type + "&product_type=" + product_type + "&times=" + times + "&money_deposit=" + money_deposit + "&money_borrow=" + money_borrow + "&t=" + new Date() + "",
		success: function(data, textStatus) {
			if(data.id == 0 || data.id == "0") {
				$("#reviewIntegral").val("0");
				if(product_type == 1) {
					product_gift(1, 1, times, money_deposit, money_borrow, url);
				} else if(product_type == 2) {
					product_gift(2, 2, times, money_deposit, money_borrow, url);
				}
				return;
			}
			$(".fee_integral").html("");
			if(data == null || data == '' || data == "{}" || data == "Object") {
				$("#reviewIntegral").val(0);
			} else {
				$.each(data.items, function(i, v) {
					if(typeof(v.id) != "undefined") {
						$("#reviewIntegral").val(parseInt(money_borrow * v.fee_lowrate).toFixed(0));
						_step1 = 1;
						if(product_type == 1) {
							product_gift(1, 1, times, money_deposit, money_borrow, url);
						} else if(product_type == 2) {
							product_gift(2, 2, times, money_deposit, money_borrow, url);
						}
					}
				});
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			linkClick(url);
		}
	}
	if(DEBUG) console.log('==========正在执行COM.ajax');
	COM.ajax(ajaxObj);
}