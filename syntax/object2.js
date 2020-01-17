var f = function () {
    console.log(1 + 1);
    console.log(2 + 2);
}

// var i = if(true){console.log(1)}
// var w = while(true){console.log(1)}
console.log(f);
f()
console.log('=======')
var a = [f];
a[0]()
console.log('=======')
var o = {
    func: f,
    hello: f
}
o.func();
o.hello();