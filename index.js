var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};  
handle["/"] = requestHandlers.start; 
handle["/start"] = requestHandlers.start;  
handle["/upload"] = requestHandlers.upload;

handle["/getTonglianPageInfo"] = requestHandlers.getTonglianPageInfo;
handle["/getKuaiqianPageInfo"] = requestHandlers.getKuaiqianPageInfo;
handle["/getKuaijiePageInfo"] = requestHandlers.getKuaijiePageInfo;
server.start(router.route,handle);