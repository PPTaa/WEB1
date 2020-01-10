var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //쿼리문 아래의 내용들을 지정
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    if (pathname=='/'){
        if (queryData.id === undefined){
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = '압도적 환영';
                var description = 'hello nodejs';
                var template = `
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
            <style>
                h1 {
                    color:blue;
                    font-size:100px;
                    text-align: left;
                }
            </style>
        </head>
        
        <body>
            <h1><a href="/">News</a></h1>
            <ol>
                <li><a href="/?id=20200103">2020.01.03</a></li>
                <li><a href="/?id=20200105">2020.01.05</a></li>
                <li><a href="/?id=20200106">2020.01.06</a></li>
            </ol>
            <h2>${title}</h2>
            ${description}
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
            `;
            response.writeHead(200);
            response.end(template);
            });    
        }
        else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var template = `
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
            <ol>
                <li><a href="/?id=20200103">2020.01.03</a></li>
                <li><a href="/?id=20200105">2020.01.05</a></li>
                <li><a href="/?id=20200106">2020.01.06</a></li>
            </ol>
            <h1>${title}</h1>
            ${description}
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
            `;
            response.writeHead(200);
            response.end(template);
            });
        }

    } else {
        response.writeHead(404);
        response.end('Not found');
    }
    console.log(url.parse(_url, true));
    //console.log(_url);
    //console.log(__dirname + _url) //웹페이지가 나타나는 정보들을 출력
    //response.end('pptaa : '+url); 사용자에게 전달 할 내용을 출력할 수 있음
    //response.end(fs.readFileSync(__dirname + _url));// 사용자가 접속한 url에 따라서 file들을 읽어주는 부분
});
app.listen(3000);