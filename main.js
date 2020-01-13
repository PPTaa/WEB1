var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
    return `            
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>오늘의 뉴스 ${title}</title>
        <meta charset="utf-8">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155572449-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
    
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
    
            gtag('config', 'UA-155572449-1');
        </script>
    </head>
    
    <body>
        <h1><a href="/">News</a></h1>
        ${list}
        ${body}
        <p>
            <div id="disqus_thread"></div>
            <script>
                /**
                 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
                 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
                /*
                var disqus_config = function () {
                this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                };
                */
                (function () { // DON'T EDIT BELOW THIS LINE
                    var d = document,
                        s = d.createElement('script');
                    s.src = 'https://web1-yufiq6cwqc.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                })();
            </script>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by
                    Disqus.</a></noscript>
        </p><!-- 댓글기능 추가 -->
        <script type="text/javascript">
        var Tawk_API = Tawk_API || {},
            Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/5e14596d27773e0d832c3fc1/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
        </script>
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
                var template = templateHTML(title, list, `<h1>${title}</h1>${description}`);
                response.writeHead(200);
                response.end(template);
            })
        } else {
            fs.readdir('./data', function (error, filelist) {
                var list = templateLIST(filelist);
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var template = templateHTML(title, list, `<h1>${title}</h1>${description}`);
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