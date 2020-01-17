// var v1 = 'v1';
// //다양한 코드들
// v1 = 'aa' 
// var v2 = 'v2';

// //해결책

var q = {
    v1: 'v1', //이렇게 객체에 담아서 보관하면 충돌될일이 없음
    v2: 'v2',
    f1: function () {
        console.log(this.v1);
    },
    f2: function () {
        console.log(this.v2);
    }
}

function f1() {
    console.log('bug')
}



q.f1()
f1()
q.f2()