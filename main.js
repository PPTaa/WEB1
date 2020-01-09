var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url) //웹페이지가 나타나는 정보들을 출력
    //response.end('pptaa : '+url); 사용자에게 전달 할 내용을 출력할 수 있음
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);