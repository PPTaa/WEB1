//초큼 어려워요

// function a() {
//     console.log('A');
// }
// a();

//익명함수는 변수의 값으로 가징 수 있음, 
//js에서는 함수가 값이다. 
var a = function () {
    console.log('Apple');
}

var b = function (){
    console.log('Bus');
}

function slowfunc(callback){
    callback();
}

slowfunc(b);
slowfunc(a);
