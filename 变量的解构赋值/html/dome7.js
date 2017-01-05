// let [x, y] = [1, 'a'];
// console.log(x, y); // 1 a
// ([x,y] = [y,x])
// console.log(x, y); // a 1

// ----------- 从函数返回多个值

// function getPerson () {
//     return {
//         name: 'ff',
//         age: 24
//     }
// };
//
// let{name: personName,age: personAge } = getPerson()
// console.log(personName,personAge); // ff 24

// --------------- 函数参数的定义
//
// function setMe ({name, age} = {}) {
//     console.log(name, age); // ff 24
// }
// setMe({age:24, name: 'ff'});

// -------------------- 提取JSON数据

// var data = {
//     id: 1,
//     pid: 0,
//     name: 'ff',
//     age: '24'
// }
// var {name: who} = data
// console.log(who); // ff


// ----------------函数参数的默认值

// function showMe ({name = 'ff', age=24}={}) {
//     console.log(name+ '想成为' + age + '岁');
// }
//
// showMe() // ff想成为24岁
// showMe({undefined, age:11}) //ff想成为11岁

// -------------------遍历Map结构

let {name='ff', age='24'} = {age: 11};
console.log(name, age); // ff 11
