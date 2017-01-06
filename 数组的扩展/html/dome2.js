// let arr1 = new Array(4);
// console.log(arr1); // [, , , ]
// let arr2 = Array.of(4);
// console.log(arr2); // [4]

// let arr3 = [1,2,3,4,5,6];
// var newArr = arr3.find(function (value, index, arr) {
//     console.log(value);
//     console.log(index);
//     console.log(arr);
//     return value > 4
// })
// console.log(newArr);

// let arr4 = [1,2,3,4,5,6];
// var newArr = arr4.findIndex(function (value, index, arr) {
//     // console.log(value);
//     // console.log(index);
//     // console.log(arr);
//     return value > 4
// })
//
// console.log(newArr); // 4

// var arr =  new Array(4);
// arr.fill('a') // [ 'a', 'a', 'a', 'a' ]
// console.log(arr);

// ----------------------  entries()，keys()和values()
//
// var arr = ['a', 'b', 'c'];
// // for (let key of arr.keys()) {
// //     console.log(key); // 0 1 2
// // }
//
// // for (let val of arr.entries()) {
// //     console.log(val); //[ 0, 'a' ] [ 1, 'b' ] [ 2, 'c' ]
// // }
//
// for (let [key, val] of arr.entries()) {
//     console.log(key);
//     console.log(val);
// }
// // 0
// // a
// // 1
// // b
// // 2
// // c

// -------------------- 数组实例的includes()

// var arr = [1,2,3,'a','ac','b'];
// console.log(arr.includes('a')); // true
// var arr1 = [1,1,1,1,1,1,1,1]
// console.log(arr1.includes(1, 4, 5)); // false

//  ------------------- 数组的空位指
var arr = new Array (6);
console.log(arr); //[ , , , , ,  ]
var newArr = Array.from(arr);
console.log(newArr);//[ undefined, undefined, undefined, undefined, undefined, undefined ]
