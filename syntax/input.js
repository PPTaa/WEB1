var readline = require('readline');

var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
r.on('line', function (word) {
    console.log('hello', word);
    console.log('a');
    console.log('b');
    if (word === '1') {
        console.log('c1');
    } else {
        console.log('c2');
    }
    console.log('d');
    r.close();
}).on('close', function () {
    process.exit();
})
