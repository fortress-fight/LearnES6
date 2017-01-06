// let arrayLike = {
//     0: 'a',
//     1: 'b',
//     2: 'c',
//     length: 3
// };
//
// let newArr = Array.from(arrayLike);
// console.log(newArr); // [ 'a', 'b', 'c' ]

// --------------- E5下的转换

// var arrLike = {
//     0: 'a',
//     1: 'b',
//     2: 'c',
//     length: 3
// }
//
// var newArr = [].slice.call(arrLike);
// console.log(newArr); // [ 'a', 'b', 'c' ]
//
// var newArr = Array.prototype.slice.call(arrLike);
// console.log(newArr); // [ 'a', 'b', 'c' ]

// ---------------- 第二个参数

// var arrLike = {
//     0: 'a',
//     1: 'b',
//     2: 'c',
//     length: 3
// }
//
// var newArr = Array.from(arrLike, function(e){
//     return e + 'e';
// })
// console.log(newArr); // [ 'ae', 'be', 'ce' ]


// ---------------- arguments 转换

// function fn () {
//     console.log(arguments); // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
//     console.log(Array.from(arguments)); // [ 1, 2, 3, 4, 5 ]
// }
// fn(1, 2, 3, 4, 5)

// ------------- string

// var str  = 'hello';
// console.log(Array.from(str)); //[ 'h', 'e', 'l', 'l', 'o' ]

//
console.log(1);
var newArr = Array.from({ length: 2 }, () => 'jack')
console.log(newArr); // [ 'jack', 'jack' ]
