// {
//     var a = 10;
//     let b = 11;
//     console.log(a); // 10
//     console.log(b); // 11
// }
// console.log(a); // 10
// console.log(b); // error
// ------------- for & let

// var fnArr = [];
// for (var i = 0; i < 10 ; i++) {
//     fnArr.push(function (){
//         console.log(i);
//     });
// };
// for (var j = 0; j < fnArr.length; j++) {
//     fnArr[j]()
// }
// 10 ...............

// var fnArr = [];
// for (let i = 0; i < 10; i++) {
//     fnArr.push(function (){
//         console.log(i);
//     });
// }
// for (var i = 0; i < fnArr.length; i++) {
//     fnArr[i]()
// }
// // 0--9


// ------------------ 不存在变量提升
//
// console.log(v); // undefined
// console.log(l); // l is not defined
// var v = 10;
// let l = 10;

// var name = 'A';
//
// (function () {
//     if (typeof name === 'undefined') {
//         let name = 'B';
//     }
//     console.log(name);
// })()

// ----------------- 暂存死区


// var name = 'A';
//
// if (true) {
//     console.log(let); //let is not defined
//     let name = 'B';
// }

// console.log(typeof noval); // undefined
//
// console.log(typeof b); // b is not defined
// let b = 1;

// -------------重复定义
//
// (function () {
//     let a = 10;
//     let a = 11; //Identifier 'a' has already been declared
// })()
//
// (function () {
//     let a = 10;
//     (function () {
//         let a = 11;
//     })
// })()
