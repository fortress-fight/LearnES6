// // let name = 'ff';
// // let person = {name}
// // console.log(person); // { ff: 'name' }
//
// let name = 'ff';
// let person = {name:name};
// console.log(person); // { name: 'ff' }

// -------------------- 对象的方法简写
//
// let creatPerson = {
//     name () {
//         console.log('ff');
//     }
// }
//
// creatPerson.name() // ff

// --------------------实例

// let barth = 1991;
//
// let person1 = {
//     name: 'xiaoming',
//     barth,
//     say () {
//         console.log(this.name);
//     }
// }
//
// console.log(person1); // { name: 'xiaoming', barth: 1991, say: [Function: say] }
// person1.say() //xiaoming

// --------------- 用于返回值

// function math () {
//     var x = 1;
//     var y = 2;
//     return {x, y}
// }
//
// var sum = math()
// console.log(sum); // x: 1, y: 2 }

// ----------- 属性名都是字符串

// let person = {
//     class () {
//         console.log('class1');
//     }
// }
// person.class() // class1
