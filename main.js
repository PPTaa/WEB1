var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var googleanaltyics = fs.readFileSync('function/google', 'utf8')
var tawk = fs.readFileSync('function/tawk', 'utf8')
var disqus = fs.readFileSync('function/disqus', 'utf8')

function templateHTML(title, list, body, google, tawk, disqus, control) {
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
        ${control}

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
                var template = templateHTML(title, list, `<h1>${title}</h1>${description}`, googleanaltyics, tawk, disqus, `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(template);
            })
        } else {
            fs.readdir('./data', function (error, filelist) {
                var list = templateLIST(filelist);
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var template = templateHTML(title, list, `<h1>${title}</h1>${description}`, googleanaltyics, tawk, disqus,
                        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }

    } else if (pathname === '/create') {
        fs.readdir('./data', function (error, filelist) {
            console.log(filelist);
            var title = 'WEB-CREATE';
            var list = templateLIST(filelist);
            var template = templateHTML(title, list, `
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="discription" placeholder="discription"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`, googleanaltyics, tawk, disqus, '');
            response.writeHead(200);
            response.end(template);
        })
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var discription = post.discription;
            fs.writeFile(`data/${title}`, discription, 'utf8', function (err) {
                response.writeHead(302, {
                    Location: `/?id=${title}`
                });
                response.end();
            })
            console.log(post.title);
        });
    } else if (pathname === '/update') {
        fs.readdir('./data', function (error, filelist) {
            var list = templateLIST(filelist);
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var template = templateHTML(title, list, `
                <form action="/update_process" method="post">
                    <input type='hidden' name='id' value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p>
                        <textarea name="discription" placeholder="discription">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>`, googleanaltyics, tawk, disqus,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                response.writeHead(200);
                response.end(template);
            });
        });
    } else if(pathname==="/update_process"){
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var discription = post.discription;
            fs.rename(`data/${id}`,`data/${title}`, function(error){
                fs.writeFile(`data/${title}`, discription, 'utf8', function (err) {
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    }else {
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