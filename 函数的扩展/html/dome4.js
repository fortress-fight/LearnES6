
// 如果有多条执行语句

var f = (num1, num2) => {
    var num = num1 + num2*10;
    return num;
}

console.log(f(100,2200)) // 22100

// // 相当于：
// function (num1, num2) {
//     var num = num1 + num2*10;
//     return num;
// }

// 只有一条语句
var f = () => '箭头函数简写';

console.log(f()) // 箭头函数简写

var f = (num1,num2) => num1+num2;
console.log(f(1,2)); // 3

// var f = v => v;
//
// console.log(f('箭头函数')) // 箭头函数
//
// // 相当于
// // var f = function (v) {
// //     return v
// // }
