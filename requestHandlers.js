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
		    	if(appVersion < 460){
		        	response.write(JSON.stringify({ status:"failed",message:"当前版本过低，请更新到最新版本4.6.0（去群共享下载，不要卸载旧的，覆盖安装就行。更新之后还不行的需要重启下手机)"}));  
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
		    	if(appVersion < 100){
		        	response.write(JSON.stringify({ status:"failed",message:"当前版本过低，请更新到最新版本1.0.0（去群共享下载，不要卸载旧的，覆盖安装就行。更新之后还不行的需要重启下手机)"}));  
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
		response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"}); 
 		response.end(result);
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

		response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"}); 
 		response.end(result);
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
		response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"}); 
 		response.end(result);
	});
}

exports.start = start;  
exports.upload = upload;
exports.getPayPermission = getPayPermission;
exports.getTonglianPageInfo = getTonglianPageInfo;
exports.getKuaiqianPageInfo = getKuaiqianPageInfo;
exports.getKuaijiePageInfo = getKuaijiePageInfo;
