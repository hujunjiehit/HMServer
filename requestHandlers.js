var exec = require("child_process").exec; 
var MyBmob = require('./bmob');
var url = require("url");
var Bmob = MyBmob.Bmob;
var querystring = require("querystring");

Bmob.initialize("2a2af664ae1930ed9856320ae7257d96", "b0755af19edba83a5a8be26922728dab", "bcb1c76abe663895e0fce7f8ff178470");

function start(request,response) {   
	console.log("Request handler 'start' was called."); 
    var content = "欢迎来到猫友圈首页";
   	response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});   
    response.write(content);  
    response.end();  

    // exec("find /",  
    //     { timeout: 10000, maxBuffer: 20000*1024 },  
    //     function (error, stdout, stderr) {  
	   //  response.writeHead(200, {"Content-Type": "text/plain"});  
    //         response.write(stdout);  
    //         response.end();  
    //     }  
    // ); 
}  

//验证用户权限
function upload(request,response) {
	var query = new Bmob.Query(Bmob.User);
	var arg = url.parse(request.url,true).query;   
    console.log("objectId = " + arg.objectId);  

	query.get(arg.objectId, {
	  success: function(user) {
	    // 查询成功，调用get方法获取对应属性的值
	     console.log("查询成功");  

	    var username = user.get("username");
	    var appVersion = user.get("appVersion");
	    var userType = user.get("userType");

		 response.writeHead(200, {"Content-Type": "json"}); 
		 if(username == ""){
		 	response.write(JSON.stringify({ status:"failed",message:"恶意诋毁软件，进行封号处理"}));  
		 }else{
		 	if(userType >= 1) {
		    	if(appVersion < 520){
		        	response.write(JSON.stringify({ status:"failed",message:"当前版本过低，请更新到最新版本5.2.0（去群共享下载，不要卸载旧的，覆盖安装就行。更新之后还不行的需要重启下手机)"}));  
		    	}else {
		        	response.write(JSON.stringify({ status:"ok",message:"验证成功"}));  	
	        	}
		    }else {
		        response.write(JSON.stringify({ status:"failed",message:"当前用户暂无授权，请联系软件作者购买授权"}));  
		    }
		 }

	    response.end(); 

	  },
	  error: function(object, error) {
	    // 查询失败
	     console.log("查询失败");  
	    response.writeHead(200, {"Content-Type": "json"});  
        response.write(JSON.stringify({status:"failed",message:"user not exist"}));  
        response.end(); 
	  }
	});
}

//验证用户权限
function getPayPermission(request,response) {
	var query = new Bmob.Query(Bmob.User);
	var arg = url.parse(request.url,true).query;   
    console.log("objectId = " + arg.objectId);  

	query.get(arg.objectId, {
	  success: function(user) {
	    // 查询成功，调用get方法获取对应属性的值
	     console.log("查询成功");  

	    var username = user.get("username");
	    var appVersion = user.get("appVersion");
	    var userType = user.get("userType");

		 response.writeHead(200, {"Content-Type": "json"}); 
		 if(username == ""){
		 	response.write(JSON.stringify({ status:"failed",message:"恶意诋毁软件，进行封号处理"}));  
		 }else{
		 	if(userType >= 1) {
		    	if(appVersion < 520){
		        	response.write(JSON.stringify({ status:"failed",message:"当前版本过低，请更新到最新版本5.2.0（去群共享下载，不要卸载旧的，覆盖安装就行。更新之后还不行的需要重启下手机)"}));  
		    	}else {
		        	response.write(JSON.stringify({ status:"ok",message:"验证成功"}));  	
	        	}
		    }else {
		        response.write(JSON.stringify({ status:"failed",message:"当前用户暂无授权，请联系软件作者购买授权"}));  
		    }
		 }

	    response.end(); 

	  },
	  error: function(object, error) {
	    // 查询失败
	     console.log("查询失败");  
	    response.writeHead(200, {"Content-Type": "json"});  
        response.write(JSON.stringify({status:"failed",message:"user not exist"}));  
        response.end(); 
	  }
	});
}

function getTonglianPageInfo(request,response) { 
	console.log("Request handler 'getTonglianPageInfo' was called."); 
    request.setEncoding('utf-8');
    var postData = "";
    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

	request.addListener("end", function () {
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
		 
		 //获取SDK客户端上传的参数
	    var action = params.action;
	    
	    var payerIDCard = params.payerIDCard;
	    var signType = params.signType;
	    var payerEmail = params.payerEmail;
	    var version = params.version;
	    var inputCharset = params.inputCharset;
	    var receiveUrl = params.receiveUrl;
	    var orderAmount = params.orderAmount;
	    var productNum = params.productNum;
	    var merchantId = params.merchantId;
	    var tradeNature = params.tradeNature;
	    var extTL = params.extTL;
	    var pickupUrl = params.pickupUrl;
	    var pid = params.pid;
	    var orderCurrency = params.orderCurrency;
	    var payerTelephone = params.payerTelephone;
	    var pan = params.pan;
	    var productId = params.productId;
	    
	    var issuerId = params.issuerId;
	    var productDesc = params.productDesc;
	    var orderNo = params.orderNo;
	    var ext1 = params.ext1;
	    var ext2 = params.ext2;
	    var orderExpireDatetime = params.orderExpireDatetime;
	    var signMsg = params.signMsg;
	    var payType = params.payType;
	    var language = params.language;
	    var orderDatetime = params.orderDatetime;
	    var productPrice = params.productPrice;
	    var productName = params.productName;
	    var payerName = params.payerName;

		var result;

	    result = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"'
	    + '"http://www.w3.org/TR/html4/loose.dtd">\n'
	    + '<html xmlns="http://www.w3.org/1999/xhtml">\n'
	    + '<head>\n'
	    + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n'
	    + '<title>在线充值</title>\n'
	    + '</head>'
	    + '<body>\n'
	    + '<div class="main_title">正在加载通联支付页面, 请稍候..</div>\n'
	    + '<form id="alipaysubmit" name="alipaysubmit" action="'
	    + action
	    + '" method="POST">'
	    + '<input type="hidden" name="payerIDCard" value="' + payerIDCard + '"/>'
	    + '<input type="hidden" name="signType" value="' + signType + '"/>'
	    + '<input type="hidden" name="payerEmail" value="' + payerEmail + '"/>'
	    + '<input type="hidden" name="version" value="' + version + '"/>'
	    + '<input type="hidden" name="inputCharset" value="' + inputCharset + '"/>'
	    + '<input type="hidden" name="receiveUrl" value="' + receiveUrl + '"/>'
	    + '<input type="hidden" name="orderAmount" value="' + orderAmount  + '"/>'
	    + '<input type="hidden" name="productNum" value="' + productNum + '"/>'
	    + '<input type="hidden" name="merchantId" value="' + merchantId + '"/>'
	    + '<input type="hidden" name="tradeNature" value="' + tradeNature + '"/>'
	    + '<input type="hidden" name="extTL" value="' + extTL + '"/>'
	    + '<input type="hidden" name="pickupUrl" value="' + pickupUrl + '"/>'
	    + '<input type="hidden" name="pid" value="' + pid + '"/>'
	    + '<input type="hidden" name="orderCurrency" value="' + orderCurrency + '"/>'
	    + '<input type="hidden" name="payerTelephone" value="' + payerTelephone + '"/>'
	    + '<input type="hidden" name="pan" value="' + pan + '"/>'
	    + '<input type="hidden" name="productId" value="' + productId + '"/>'
	    + '<input type="hidden" name="issuerId" value="' + issuerId + '"/>'
	    + '<input type="hidden" name="productDesc" value="' + productDesc + '"/>'
	    + '<input type="hidden" name="orderNo" value="' + orderNo + '"/>'
	    + '<input type="hidden" name="ext1" value="' + ext1 + '"/>'
	    + '<input type="hidden" name="ext2" value="' + ext2 + '"/>'
	    + '<input type="hidden" name="orderExpireDatetime" value="' + orderExpireDatetime + '"/>'
	    + '<input type="hidden" name="signMsg" value="' + signMsg + '"/>'
	    + '<input type="hidden" name="payType" value="' + payType + '"/>'
	    + '<input type="hidden" name="language" value="' + language + '"/>'
	    + '<input type="hidden" name="orderDatetime" value="' + orderDatetime + '"/>'
	    + '<input type="hidden" name="productPrice" value="' + productPrice + '"/>'
	    + '<input type="hidden" name="productName" value="' + productName + '"/>'
	    + '<input type="hidden" name="payerName" value="' + payerName + '"/>'
	    + '<input type="submit" value="确认" style="display:none;">'
	    + '</form>'
	    + '<script>document.forms[' + "'alipaysubmit'" + '].submit();</script>\n'
	    + '</body>\n'
	    + '</html>';
	    response.writeHead(200, {"Content-Type": "json"});  
        response.write(JSON.stringify({status:"ok",message:result}));  
        response.end(); 
	});
}

function getKuaiqianPageInfo(request,response) { 
	console.log("Request handler 'getKuaiqianPageInfo' was called."); 
    request.setEncoding('utf-8');
    var postData = "";
    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

	request.addListener("end", function () {
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
    	
    	//获取SDK客户端上传的参数
	    var action = params.action;
	    
	    var signType = params.signType;
	    var merchantAcctId = params.merchantAcctId;
	    var orderTime = params.orderTime;
	    var version = params.version;
	    var payerIdType = params.payerIdType;
	    var productDesc = params.productDesc;
	    var inputCharset = params.inputCharset;
	    var bgUrl = params.bgUrl;
	    var ext1 = params.ext1;
	    var orderAmount = params.orderAmount;
	    var productNum = params.productNum;
	    var signMsg = params.signMsg;
	    var payType = params.payType;
	    var payerId = params.payerId;
	    var language = params.language;
	    var productName = params.productName;
	    var orderId = params.orderId;
	    
	    var result;
    
	    result = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"'
	    + '"http://www.w3.org/TR/html4/loose.dtd">\n'
	    + '<html xmlns="http://www.w3.org/1999/xhtml">\n'
	    + '<head>\n'
	    + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n'
	    + '<title>在线充值</title>\n'
	    + '</head>'
	    + '<body>\n'
	    + '<div class="main_title">正在加载快钱支付页面, 请稍候..</div>\n'
	    + '<form id="alipaysubmit" name="alipaysubmit" action="'
	    + action
	    + '" method="POST">'
	    + '<input type="hidden" name="signType" value="' + signType + '"/>'
	    + '<input type="hidden" name="merchantAcctId" value="' + merchantAcctId + '"/>'
	    + '<input type="hidden" name="orderTime" value="' + orderTime + '"/>'
	    + '<input type="hidden" name="version" value="' + version + '"/>'
	    + '<input type="hidden" name="payerIdType" value="' + payerIdType + '"/>'
	    + '<input type="hidden" name="productDesc" value="' + productDesc + '"/>'
	    + '<input type="hidden" name="inputCharset" value="' + inputCharset  + '"/>'
	    + '<input type="hidden" name="bgUrl" value="' + bgUrl + '"/>'
	    + '<input type="hidden" name="ext1" value="' + ext1 + '"/>'
	    + '<input type="hidden" name="orderAmount" value="' + orderAmount + '"/>'
	    + '<input type="hidden" name="productNum" value="' + productNum + '"/>'
	    + '<input type="hidden" name="signMsg" value="' + signMsg + '"/>'
	    + '<input type="hidden" name="payType" value="' + payType + '"/>'
	    + '<input type="hidden" name="payerId" value="' + payerId + '"/>'
	    + '<input type="hidden" name="language" value="' + language + '"/>'
	    + '<input type="hidden" name="productName" value="' + productName + '"/>'
	    + '<input type="hidden" name="orderId" value="' + orderId + '"/>'
	    + '<input type="submit" value="确认" style="display:none;">'
	    + '</form>'
	    + '<script>document.forms[' + "'alipaysubmit'" + '].submit();</script>\n'
	    + '</body>\n'
	    + '</html>';

	    response.writeHead(200, {"Content-Type": "json"});  
        response.write(JSON.stringify({status:"ok",message:result}));  
        response.end(); 
	});
}

function getKuaijiePageInfo(request,response) { 
	console.log("Request handler 'getKuaijiePageInfo' was called."); 
    request.setEncoding('utf-8');
    var postData = "";
    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

	request.addListener("end", function () {
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
    	
        //获取SDK客户端上传的参数
	    var action = params.action;
	    
	    var userIP = params.userIP;
	    var requestTime = params.requestTime;
	    var pageUrl = params.pageUrl;
	    var signType = params.signType;
	    var outMemberRegistTime = params.outMemberRegistTime;
	    var charset = params.charset;
	    var jsCallback = params.jsCallback;
	    var outMemberName = params.outMemberName;
	    var bankCode = params.bankCode;
	    var currency = params.currency;
	    
	    var outMemberVerifyStatus = params.outMemberVerifyStatus;
	    var amount = params.amount;
	    var productDesc = params.productDesc;
	    var outMemberId = params.outMemberId;
	    var exts = params.exts;
	    var outMemberMobile = params.outMemberMobile;
	    var backUrl = params.backUrl;
	    var merchantOrderNo = params.merchantOrderNo;
	    var signMsg = params.signMsg;
	    var merchantNo = params.merchantNo;

	    var outMemberRegistIP = params.outMemberRegistIP;
	    var notifyUrl = params.notifyUrl;
	    var productName = params.productName;
	    var bankCardType = params.bankCardType;
	    
	    var result;
    
	    result = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"'
	    + '"http://www.w3.org/TR/html4/loose.dtd">\n'
	    + '<html xmlns="http://www.w3.org/1999/xhtml">\n'
	    + '<head>\n'
	    + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n'
	    + '<title>在线充值</title>\n'
	    + '</head>'
	    + '<body>\n'
	    + '<div class="main_title">正在加载快捷支付页面, 请稍候..</div>\n'
	    + '<form id="alipaysubmit" name="alipaysubmit" action="'
	    + action
	    + '" method="POST">'
	    + '<input type="hidden" name="userIP" value="' + userIP + '"/>'
	    + '<input type="hidden" name="requestTime" value="' + requestTime + '"/>'
	    + '<input type="hidden" name="pageUrl" value="' + pageUrl + '"/>'
	    + '<input type="hidden" name="signType" value="' + signType + '"/>'
	    + '<input type="hidden" name="outMemberRegistTime" value="' + outMemberRegistTime + '"/>'
	    + '<input type="hidden" name="charset" value="' + charset + '"/>'
	    + '<input type="hidden" name="jsCallback" value="' + jsCallback  + '"/>'
	    + '<input type="hidden" name="outMemberName" value="' + outMemberName + '"/>'
	    + '<input type="hidden" name="bankCode" value="' + bankCode + '"/>'
	    + '<input type="hidden" name="currency" value="' + currency + '"/>'
	    + '<input type="hidden" name="outMemberVerifyStatus" value="' + outMemberVerifyStatus + '"/>'
	    + '<input type="hidden" name="amount" value="' + amount + '"/>'
	    + '<input type="hidden" name="productDesc" value="' + productDesc + '"/>'
	    + '<input type="hidden" name="outMemberId" value="' + outMemberId + '"/>'
	    + '<input type="hidden" name="exts" value="' + exts + '"/>'
	    + '<input type="hidden" name="outMemberMobile" value="' + outMemberMobile + '"/>'
	    + '<input type="hidden" name="backUrl" value="' + backUrl + '"/>'
	    + '<input type="hidden" name="merchantOrderNo" value="' + merchantOrderNo + '"/>'
	    + '<input type="hidden" name="signMsg" value="' + signMsg + '"/>'
	    + '<input type="hidden" name="merchantNo" value="' + merchantNo + '"/>'
	    + '<input type="hidden" name="outMemberRegistIP" value="' + outMemberRegistIP + '"/>'
	    + '<input type="hidden" name="notifyUrl" value="' + notifyUrl + '"/>'
	    + '<input type="hidden" name="productName" value="' + productName + '"/>'
	    + '<input type="hidden" name="bankCardType" value="' + bankCardType + '"/>'
	    + '<input type="submit" value="确认" style="display:none;">'
	    + '</form>'
	    + '<script>document.forms[' + "'alipaysubmit'" + '].submit();</script>\n'
	    + '</body>\n'
	    + '</html>';
	    response.writeHead(200, {"Content-Type": "json"});  
        response.write(JSON.stringify({status:"ok",message:result}));  
        response.end(); 
	});
}

//验证用户权限
function getPermission(request,response) {
	var query = new Bmob.Query(Bmob.User);
	var arg = url.parse(request.url,true).query;   
    console.log("username = " + arg.username);  
	console.log("userType = " + arg.userType); 
	console.log("appVersion = " + arg.appVersion); 

	var username =  arg.username;
	var userType = arg.userType;
	var appVersion = arg.appVersion;

	response.writeHead(200, {"Content-Type": "json"}); 
	if(username == ""){
		response.write(JSON.stringify({ status:"failed",message:"恶意诋毁软件，进行封号处理"}));  
	}else{
		if(userType >= 1) {
			if(appVersion < 520){
		    	response.write(JSON.stringify({ status:"failed",message:"当前版本过低，请更新到最新版本5.2.0（去群共享下载，不要卸载旧的，覆盖安装就行。更新之后还不行的需要重启下手机)"}));  
			}else {
		    	response.write(JSON.stringify({ status:"ok",message:"验证成功,checksum=111"}));  	
			}
		}else {
	    	response.write(JSON.stringify({ status:"failed",message:"当前用户暂无授权，请联系软件作者购买授权"}));  
		}
	}
	response.end(); 
}

//获取配置信息
function getConfigs(request,response) {
    response.writeHead(200, {"Content-Type": "json"});  
    response.write(JSON.stringify({
    	status:"ok",
    	message:"get common configs",
    	buyAuthUrl:"https://item.taobao.com/item.htm?spm=686.1000925.0.0.3f11c9edBRzPCP&id=554827091968",
    	buyCoinsUrl:"https://item.taobao.com/item.htm?spm=686.1000925.0.0.33df4945lbxAVX&id=559716537351",
    	postCoinsCost:"2", 
    	specialCoinsCost:"1", 
    	freeTimesPerDay:"1200", 
    	updateLevelUrl:"https://item.taobao.com/item.htm?spm=686.1000925.0.0.3f11c9edBRzPCP&id=554827091968",
    	payCoinsCost:"1",  
    	activityOrNot:"0",  
    	qqGroup:"524326010", 
    	notification:"1、小号失效变绿色是由于手机时间不对导致的，将时间设置成自动时间，然后重启手机就好了|2、碰到问题，先自己重启手机，如果仍然有问题，再去qq群提问|3、小号管理左上角可以对小号进行备份，将小号备份到云端之后可以很方便的进行恢",
    	jumpOrNot:"0", 
    	minConfigTime:"0",
    	enableGiveCoins:1,
    	notice:{
    		content:"全自动付款独立成单独的app请加群重新下载",
    		url:"",
    		autoDismiss:true,
    		autoDissmissDuration:2000,
    		showIndicator:false,
    		enable:1
    	}
    }));  
    response.end(); 
}

//获取配置信息
function getActivityConfig(request,response) {
    response.writeHead(200, {"Content-Type": "json"});  
    response.write(JSON.stringify({
    	status:"ok",
    	message:"get common configs",
    	activityTitle:"国庆中秋活动",
    	activityContent:"1、金币购买优惠活动，88元1999金币，101元2388金币，128元3000金币，168元4000金币，每个账号仅限参加一次活动，只能选择一种套餐购买(付款备注猫友圈账号，或者将猫友圈账号发给客服也行)；\n2、活动期间发布课程免金币，特殊功能免金币；\n3、新增史上最安全的付款助手软件，完全模拟人手动点击来登录健康猫付款，详情看群共享文件",
    	activityUrl:"https://item.taobao.com/item.htm?spm=686.1000925.0.0.18b4bb7e3359jd&id=559386553971",
    	urlDesc:"点击参与活动"
    }));  
    response.end(); 
}

//获取配置信息
function getModuleConfig(request,response) {
    response.writeHead(200, {"Content-Type": "json"});  
    response.write(JSON.stringify({
    	status:"ok",
    	ret:[
    	{
    		moduleName:"全自动付款",
	    	moduleContent:"全自动付款独立成一个单独的app，请加群重新下载",
	    	url:"",
	    	urlDesc:"点击购买小号",
	    	order:0,
	    	enable:1
    	},
    	{
    		moduleName:"健康猫小号",
	    	moduleContent:"健康猫小号，0.5元一个，有积分，拍下之后自动发货",
	    	url:"http://h5.m.taobao.com/awp/core/detail.htm?spm=686.1000925.0.0.65ecc7c93DZqLU&id=561356305917",
	    	urlDesc:"点击购买小号",
	    	order:0,
	    	enable:0
    	},
  		{
  			moduleName:"金币自动充值",
	    	moduleContent:"购买金币充值卡密可以自己充值金币",
	    	url:"https://item.taobao.com/item.htm?spm=686.1000925.0.0.136dba14VlRFuA&id=559716537351",
	    	urlDesc:"点击购买卡密",
	    	order:1,
	    	enable:1
    	},
    	{
  			moduleName:"常见问题：小号变绿色",
	    	moduleContent:"小号失效变绿色是由于手机时间不对导致的，将时间设置成自动时间，然后重启手机就好了",
	    	url:"",
	    	urlDesc:"点击参与活动",
	    	order:2,
	    	enable:1
    	},
    	{
  			moduleName:"小技巧：备份小号",
	    	moduleContent:"小号管理左上角，可以备份小号到云端，换手机之后，直接从云端恢复小号即可",
	    	url:"",
	    	urlDesc:"点击参与活动",
	    	order:3,
	    	enable:1	
    	},
    	{
  			moduleName:"小技巧：获取金币",
	    	moduleContent:"邀请人开通永久，系统会自动赠送1888金币，让对方注册的时候，邀请人写你的猫友圈登录账号",
	    	url:"",
	    	urlDesc:"点击参与活动",
	    	order:4,
	    	enable:1
    	},
    	 {
  			moduleName:"小技巧：设置约课评价速度",
	    	moduleContent:"功能列表右上角，可以设置延迟，随心所欲的控制约课评价速度，想快就快，想慢就慢",
	    	url:"",
	    	urlDesc:"点击参与活动",
	    	order:5,
	    	enable:1
    	},
    	 {
  			moduleName:"自动评价演示视频",
	    	moduleContent:"下方是演示视频",
	    	url:"http://v.youku.com/v_show/id_XMTg4NzM3Njg2MA==.html?sharefrom=iphone&sharekey=b1a2e33cf32612e12a0c137a3db15e2b8",
	    	urlDesc:"点击观看视频",
	    	order:99,
	    	enable:0
    	}
    	]
    }));  
    response.end(); 
}

exports.start = start;  
exports.upload = upload;
exports.getPayPermission = getPayPermission;
exports.getPermission = getPermission;
exports.getConfigs = getConfigs;
exports.getModuleConfig = getModuleConfig;
exports.getActivityConfig = getActivityConfig;
exports.getTonglianPageInfo = getTonglianPageInfo;
exports.getKuaiqianPageInfo = getKuaiqianPageInfo;
exports.getKuaijiePageInfo = getKuaijiePageInfo;
