var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var bmobHelper = require("./bmobHelper");
var superrootHelper = require("./superrootHelper");
var superHelper = require("./superHelper");

var handle = {};  
handle["/"] = requestHandlers.start; 
handle["/start"] = requestHandlers.start;  
handle["/upload"] = requestHandlers.upload;
handle["/getPermission"] = requestHandlers.getPermission;
handle["/getPayPermission"] = requestHandlers.getPayPermission;
handle["/getConfigs"] = requestHandlers.getConfigs;
handle["/getModuleConfig"] = requestHandlers.getModuleConfig;
handle["/getActivityConfig"] = requestHandlers.getActivityConfig;

handle["/getTonglianPageInfo"] = requestHandlers.getTonglianPageInfo;
handle["/getKuaiqianPageInfo"] = requestHandlers.getKuaiqianPageInfo;
handle["/getKuaijiePageInfo"] = requestHandlers.getKuaijiePageInfo;
handle["/getHuifuPageInfo"] = requestHandlers.getHuifuPageInfo;
handle["/getYilianPageInfo"] = requestHandlers.getYilianPageInfo;
handle["/getLianlianPageInfo"] = requestHandlers.getLianlianPageInfo;

handle["/login"] = bmobHelper.login;


handle["/superroot/getPermission"] = superrootHelper.getPermission;
handle["/superroot/getConfigs"] = superrootHelper.getConfigs;
handle["/superroot/getActivityConfig"] = superrootHelper.getActivityConfig;

handle["/superhelper/getPermission"] = superHelper.getPermission;
handle["/superhelper/getConfigs"] = superHelper.getConfigs;
handle["/superhelper/getActivityConfig"] = superHelper.getActivityConfig;
handle["/superhelper/getModuleConfig"] = superHelper.getModuleConfig;
server.start(router.route,handle);