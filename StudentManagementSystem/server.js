//express_demo.js 文件
var express = require('express');
var fs = require('fs');
var url = require('url');
var app = express();

/*
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/web/" + "shinocreation.html" );
})
*/

app.get('/web/*', function (req, res) {
	res.setHeader('Content-Type','text/javascript;charset=UTF-8');
	var pathname = url.parse(req.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received."  +__dirname+pathname.substr(0));
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(__dirname+pathname.substr(0), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         res.writeHead(200, {'Content-Type': 'text/html'});	
         //res.setHeader('Content-Type','text/javascript;charset=UTF-8');
         // 响应文件内容
         res.write(data.toString());		
      }
      //  发送响应数据
      res.end();
   }); 
	
   
})

app.get('/student/*', function (req, res) { 
	response = { name:"hi" }; 
	console.log(response); res.send(JSON.stringify(response)); 
	}
)

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("address is2 : http://%s:%s", host, port)

})