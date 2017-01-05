// let {who} = {name:'ff', age:24}
// console.log(who);
//


// let {name, age, gender} = {name: 'ff', age: 24};
// console.log(name, age, gender); // ff  24 undefined
// -------- 变量名和属性名不相同
//
// let {who} = {name:'ff'}
// console.log(who); // undefined

// let {name:who} = {name:'ff'}
// console.log(who); // ff
// console.log(name); // error: name is not defined

// --------------- 赋值已经声明的变量；

// let a;
// [a] = [1]
// console.log(a); //1
// let name;
// {name} = {name:'ff'} // Unexpected token =
// console.log(name);

//
// let name;
// ({name} = {name: 'ff'})
// console.log(name); // ff

// ----------------- 嵌套对象的解构赋值

// let obj = {
//     person: {
//         name:'ff',
//         friend: ['小明', '小红']
//     }
// }
//
// let {person:{name, friend:[a, b]}} = obj;
// console.log(name, a, b); // ff '小明' '小红'


//  ----------------其它

// var {foo: {bar}} = {baz: 'baz'};
// //Cannot match against 'undefined' or 'null'.

// let { log, sin, cos, "PI":pi } = Math;
// console.log(sin); // [Function: sin]
// console.log(sin(60*pi/180)); //0.8660254037844386

// let arr = [1,2,3];
// let {0: first, [arr.length-1]: last} = arr;
// console.log(first, last); // 1 3
