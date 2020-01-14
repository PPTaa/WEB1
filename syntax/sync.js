var fs =require('fs');

//readFileSync
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C')
//-> ABC의 순서대로 나옴

//readFile
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C')
//함수가 실행되는 시간이 있어서 C가 먼저 실행되고 result가 출력됨