//CRUD
var arr = ['A', 'B', 'C', 12, true]; //create

console.log(arr[0]); //read
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[3]);
console.log(arr[4]);

arr[2] = 7; //update
console.log(arr[2]);
console.log(arr.length);
arr.push('apple');
console.log(arr);

arr.splice(3,1);//delete
console.log(arr);
delete arr[3];
console.log(arr);