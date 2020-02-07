var template = {
    HTML: function (title, list, body, google, tawk, disqus, control) {
        return `            
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>오늘의 뉴스 ~~ ${title}</title>
            <meta charset="utf-8">
            ${google}
        </head>
        
        <body>
            <h1><a href="/">News! Hello!</a></h1>
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
    },
    LIST: function (filelist) {
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i + 1
        }
        list = list + '</ul>';
        return list;

    }
}

module.exports = template;