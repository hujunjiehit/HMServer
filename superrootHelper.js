var exec = require("child_process").exec; 
var MyBmob = require('./bmob');
var url = require("url");
var Bmob = MyBmob.Bmob;
var querystring = require("querystring");

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
			if(appVersion < 0){
		    	response.write(JSON.stringify({ status:"failed",message:"当前版本过低"}));  
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
    	buyAuthUrl:"",
    	buyCoinsUrl:"",
    	postCoinsCost:"0", 
    	specialCoinsCost:"0", 
    	freeTimesPerDay:"1200", 
    	updateLevelUrl:"",
    	payCoinsCost:"0",  
    	activityOrNot:"0",  
    	qqGroup:"QQ交流群:524326010\n加群免费领取试用时间", 
    	notification:"",
    	jumpOrNot:"0", 
    	minConfigTime:"100"
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

exports.getPermission = getPermission;
exports.getConfigs = getConfigs;
exports.getActivityConfig = getActivityConfig;