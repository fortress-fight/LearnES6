// let infor = 'age';
// let obj = {
//     ['na'+'me']: 'ff',
//     [infor]: 24,
//     ['say'+ 'name']() {
//         console.log(this.name);
//     }
// }
// console.log(obj); //{ name: 'ff', age: 24 }
// obj.sayname() // ff

// ---------------------
//
// let obj = {
//     [{}] : 'ff'
// }
// console.log(obj); //{ '[object Object]': 'ff' }

console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0));  // false
