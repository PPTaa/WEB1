var members = ['apple', 'bread', 'cat', 'dog'];
console.log(members[1]); //bread

var i =0;
while(i<members.length){
    console.log('while : ', members[i]);
    i = i+1;
}


var roles = {
    'programmer':'apple',
    'designer':'bread',
    'manager':'cat',
    'CEO':'dog'
}
console.log(roles['programmer']);

for(var name in roles){
    console.log('---')
    console.log('object :',name);
    console.log('value : ',roles[name]);
}