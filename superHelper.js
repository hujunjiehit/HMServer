var exec = require("child_process").exec; 
var MyBmob = require('./bmob');
var url = require("url");
var Bmob = MyBmob.Bmob;
var querystring = require("querystring");

Bmob.initialize("2a2af664ae1930ed9856320ae7257d96", "b0755af19edba83a5a8be26922728dab", "bcb1c76abe663895e0fce7f8ff178470");

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
            if(appVersion < 120){
                response.write(JSON.stringify({ status:"failed",message:"当前版本过低，请更新到最新版本（点击版本号，或者去群共享下载，不要卸载旧的，覆盖安装就行。更新之后还不行的需要重启下手机)"}));  
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
        qqGroup:"384031653", 
        notification:"1、小号失效变绿色是由于手机时间不对导致的，将时间设置成自动时间，然后重启手机就好了|2、碰到问题，先自己重启手机，如果仍然有问题，再去qq群提问|3、小号管理左上角可以对小号进行备份，将小号备份到云端之后可以很方便的进行恢",
        jumpOrNot:"0", 
        minConfigTime:"0",
        enableGiveCoins:0,
        maxCourses:200,
        tryDays:3,
        notice:{
            content:"活动期间注册就能免费试用三天--QQ群：384031653",
            url:"",
            autoDismiss:true,
            autoDissmissDuration:3000,
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
            moduleName:"双旦活动最后一天",
            moduleContent:"1、金币购买优惠活动，88元1999金币，168元4000金币，238元6000金币，298元8000金币，每个账号仅限参加一次活动，只能选择一种套餐购买\n2、金币购买之后会自动发放金币充值卡密，复制卡密到猫友圈个人中心进行充值即可",
            url:"https://item.taobao.com/item.htm?spm=a1z38n.10677092.0.0.685ecb84YsSlNS&id=559386553971",
            urlDesc:"点击参与活动",
            order:0,
            enable:0
        },
        {
            moduleName:"健康猫小号",
            moduleContent:"健康猫小号，0.5元一个，有积分，拍下之后自动发货",
            url:"https://item.taobao.com/item.htm?spm=a1z38n.10677092.0.0.39111a70tVEZ9Z&id=562296312600",
            urlDesc:"点击购买小号",
            order:2,
            enable:1
        },
        {
            moduleName:"双十二升级高级活动",
            moduleContent:"双十二期间，普通永久只需168元即可升级到高级永久",
            url:"https://item.taobao.com/item.htm?spm=a1z38n.10677092.0.0.400758ffzSZLsM&id=554740865316",
            urlDesc:"点击升级高级",
            order:0,
            enable:0
        },
         {
            moduleName:"元旦特殊功能免金币活动",
            moduleContent:"元旦期间，自动发课功能、统计功能、特殊功能免金币",
            url:"",
            urlDesc:"点击升级高级",
            order:1,
            enable:0
        },
        {
            moduleName:"金币自动充值",
            moduleContent:"购买金币充值卡密可以自己充值金币",
            url:"https://item.taobao.com/item.htm?spm=686.1000925.0.0.136dba14VlRFuA&id=559716537351",
            urlDesc:"点击购买卡密",
            order:2,
            enable:1
        },
        {
            moduleName:"常见问题：小号变绿色",
            moduleContent:"小号失效变绿色是由于手机时间不对导致的，将时间设置成自动时间，然后重启手机就好了",
            url:"",
            urlDesc:"点击参与活动",
            order:3,
            enable:1
        },
        {
            moduleName:"小技巧：备份小号",
            moduleContent:"小号管理左上角，可以备份小号到云端，换手机之后，直接从云端恢复小号即可",
            url:"",
            urlDesc:"点击参与活动",
            order:4,
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

exports.getPermission = getPermission;
exports.getConfigs = getConfigs;
exports.getModuleConfig = getModuleConfig;
exports.getActivityConfig = getActivityConfig;
