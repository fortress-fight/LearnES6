// let [a, b, c] = [1,2,3];
// console.log(a, b, c);
// // 1 2 3

// let a = 1;
// let b = 2;
// let c = 3;

// -------------------解构赋值示例
//
// let [a, b, [c, d]] = [1, 2, [3, 4]];
// console.log(a, b, c, d); // 1 2 3 4
//
// let [,,one] = [1,2,4];
// console.log(one); // 4
//
// let [head, ...body] = [1,2,3,4,5];
// console.log(head); // 1
// console.log(body); // [ 2, 3, 4, 5 ]
//
// let [x, y] = [1];
// console.log(y); // undefined

// -------------------数组解构赋值的错误应用

// // let [foo] = 1;
// // let [foo] = NaN;
// // let [foo] = undefined;
// // let [foo] = null;
// // let [foo] = {};
// let [foo] = false;
// console.log(foo); //undefined is not a function

// ------------------ 数组解构赋值--默认值
//
// let [a = 'a', b = 'b'] = [1];
// console.log(a, b); // 1  b

// function v () {
//     console.log('已经执行了');
//     return 'v';
// }
//
// let [a=v()] = [1];
// console.log(a); // 1
//
// let [ b = v() ] = [];
// console.log(b);
// // 已经执行了
// // v


let [x, y = x] = [1];
console.log(x, y); // 1 1
let [a, b = a] = [];
console.log(a,b); // undefined undefined

let [head = foot; foot] = [];
// 这里的foot在赋给head之前不能使用所以报错, 即使使用var也是一样
console.log(head, foot); // Unexpected token ;
