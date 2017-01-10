var arr = [1,2,3,4,5,6,7];
for (val of arr) {
    console.log(val);
}
// 1 // 2 // 3 // 4 // 5 // 6 // 7
// var obj = {
//     1: 'a',
//     2: 'b',
//     length: 2
// }
// for (val of obj) {
//     console.log(val);
// }
// obj[Symbol.iterator] is not a function

var obj = {
    0: 'a',
    1: 'b',
    length: 2,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for (val of obj) {
    console.log(val);
}
// a // b

var obj = {
    0: 'a',
    1: 'b',
    length: 2,
    [Symbol.iterator](){

    } //Cannot read property 'next' of undefined
}
for (val of obj) {
    console.log(val);
}
