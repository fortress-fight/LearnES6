var {name:a,age:b,c} = { name: 'ff', age: '24', job: 'student'}
console.log(a, b, c); //ff 24 undefined
let [ x, y, ...z ] = [1,2,3,4,5,6];
console.log(x, y, z);  // 1 2 [ 3, 4, 5, 6 ]

let obj= {
    name: 'ff'
}

var arr = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(1);
console.log(arr);
