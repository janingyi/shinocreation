//express_demo.js �ļ�
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
   
   // ���������ļ���
   console.log("Request for " + pathname + " received."  +__dirname+pathname.substr(0));
   
   // ���ļ�ϵͳ�ж�ȡ������ļ�����
   fs.readFile(__dirname+pathname.substr(0), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP ״̬��: 404 : NOT FOUND
         // Content Type: text/plain
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP ״̬��: 200 : OK
         // Content Type: text/plain
         res.writeHead(200, {'Content-Type': 'text/html'});	
         //res.setHeader('Content-Type','text/javascript;charset=UTF-8');
         // ��Ӧ�ļ�����
         res.write(data.toString());		
      }
      //  ������Ӧ����
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