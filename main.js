var http = require('http');
var fs = require('fs');
var url = require('url');
var googleanaltyics = fs.readFileSync('function/google', 'utf8')
var tawk = fs.readFileSync('function/tawk', 'utf8')
var disqus = fs.readFileSync('function/disqus', 'utf8')

function templateHTML(title, list, body, google, tawk, disqus) {
    return `            
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>오늘의 뉴스 ~~ ${title}</title>
        <meta charset="utf-8">
        ${google}
    </head>
    
    <body>
        <h1><a href="/">News!</a></h1>
        ${list}
        ${body}
        <p>
        ${disqus}
        </p>
        <p>
        ${tawk}
        </p>
    </body>
    </html>
    `
}

function templateLIST(filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1
    }
    list = list + '</ul>';
    return list;

}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //쿼리문 아래의 내용들을 지정
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    if (pathname == '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', function (error, filelist) {
                console.log(filelist);
                var title = '압도적 환영';
                var description = 'hello nodejs';
                var list = templateLIST(filelist);
                var template = templateHTML(title, list, `<h1>${title}</h1>${description}`, googleanaltyics, tawk, disqus);
                response.writeHead(200);
                response.end(template);
            })
        } else {
            fs.readdir('./data', function (error, filelist) {
                var list = templateLIST(filelist);
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var template = templateHTML(title, list, `<h1>${title}</h1>${description}`, googleanaltyics, tawk, disqus);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }

    } else {
        response.writeHead(404);
        response.end('Not found');
    }
    //console.log(url.parse(_url, true));
    //console.log(_url);
    //console.log(__dirname + _url) //웹페이지가 나타나는 정보들을 출력
    //response.end('pptaa : '+url); 사용자에게 전달 할 내용을 출력할 수 있음
    //response.end(fs.readFileSync(__dirname + _url));// 사용자가 접속한 url에 따라서 file들을 읽어주는 부분
});
app.listen(3000);