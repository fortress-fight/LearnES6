var obj = {
    name: 'ff',
    age: '24',
    job: 'student',
    1: 'number',
    [Symbol('这是一个symbol')]: 1
}

// for (var attr in obj) {
//     if (obj.hasOwnProperty(attr)) {
//         console.log(obj[attr]);
//     }
// }
// // ff
// // 24
// // student

// var arr = Object.keys(obj)
// console.log(arr); //[ 'name', 'age', 'job' ]
//
// var arr = Object.getOwnPropertyNames(Object);
// console.log(arr);
// // [ 'length', 'name', 'arguments', 'caller', 'prototype', .....

//
// var obj1 = {
//     [Symbol('这是一个symbol')]: 1
// }
// var arr1 = Object.getOwnPropertySymbols(obj1)
// console.log(arr1); //[ Symbol(这是一个symbol) ]

var newArr = Reflect.ownKeys(obj);
console.log(newArr); //[ '1', 'name', 'age', 'job', Symbol(这是一个symbol) ]
