// var arr = [1,2,2,4,4,5,6];
// for (val of arr) {
//     console.log(val);
// }

// var arr = [1,2,3,4,5]
// let [a, ...b]  = arr;
// console.log(a); // 1
// console.log(b); // [ 2, 3, 4, 5 ]


var str = 'hello';
let [a] = str;
console.log(a); // h
console.log([...str]); // [ 'h', 'e', 'l', 'l', 'o' ]
console.log(['nihao', ...str]); // [ 'nihao', 'h', 'e', 'l', 'l', 'o' ] 
