var exec = require("child_process").exec; 
var MyBmob = require('./bmob');
var url = require("url");
var Bmob = MyBmob.Bmob;
var querystring = require("querystring");

Bmob.initialize("2a2af664ae1930ed9856320ae7257d96", "b0755af19edba83a5a8be26922728dab", "bcb1c76abe663895e0fce7f8ff178470");

function login(request,response) {   
	console.log("Request handler 'login' was called."); 
    request.setEncoding('utf-8');
    var postData = "";

    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log("chunk = " + postDataChunk)
    });

    request.addListener("end", function () {

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        console.log("username = " + params.username);
        console.log("password = " + params.password);

        Bmob.User.logIn(params.username, params.password, {
          success: function(user) {
            // Do stuff after successful login
            console.log("登录成功"); 
            response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});   
            response.write("登录成功");  
            response.end();           
          },
          error: function(user, error) {
            // The login failed. Check error to see why.
            console.log("登录失败");
            response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});   
            response.write("登录失败");  
            response.end();
          }
        });
    });
}



exports.login = login;