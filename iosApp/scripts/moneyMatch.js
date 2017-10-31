var moneyList = [
	{"name":"AU","price":"20000"},
	{"name":"AG","price":"6000"},
	{"name":"RU","price":"16000"},
	{"name":"CU","price":"23250"},
	{"name":"RB","price":"3000"},
	{"name":"NI","price":"8000"},
	{"name":"P","price":"5500"},
	{"name":"I","price":"13071"},
	{"name":"PP","price":"3000"},
	{"name":"PTA","price":"4000"},
	{"name":"M","price":"3000"},
	{"name":"L","price":"6515"},
	{"name":"Y","price":"6000"},
	{"name":"SR","price":"4000"},
	{"name":"MA","price":"3000"},
	{"name":"RM","price":"3000"},
	{"name":"HSZS","price":"5000"},
	{"name":"XHSZS","price":"1110"},
	{"name":"HGZS","price":"2300"},
	{"name":"FSA50","price":"1320"},
	{"name":"XDQGY","price":"30000"},
	{"name":"XXBZPE","price":"39000"},
	{"name":"XXNSDK","price":"39000"},
	{"name":"DGZS","price":"10670"},
	{"name":"GC","price":"5280"},
	{"name":"CL","price":"2640"},
	{"name":"SI","price":"5280"}
]
function moneyMatch(money){
	for(var i = 0; i < moneyList.length;i++){
		var hand = Math.floor(money/moneyList[i]["price"]);
		$("#"+moneyList[i]["name"]+"_hand").html(hand);
	}
}

