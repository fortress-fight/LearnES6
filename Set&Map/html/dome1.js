// var set = new Set();
//
// [1,2,3,1,2,3,22,13].map(function (e,i) {
//     set.add(e)
// })
// console.log(set); // Set { 1, 2, 3, 22, 13 }
// for (let i of set) {
//   console.log(i);
// }
// // 1
// // 2
// // 3
// // 22
// // 13

// var set = new Set([1,2,1,2,3,2,23])
// console.log(set); // Set { 1, 2, 3, 23 }
// console.log(set.size); // 4


// var arr = [1,2,3,43,2,2,3]
// var set = new Set(arr)
// var newArr = [...set]
// console.log(newArr); // [ 1, 2, 3, 43 ]
// console.log(Array.from(set)); // // [ 1, 2, 3, 43 ]


// var arr = [1,2,3,4,3,2,1,];
// var set = new Set(arr);
// set.add('a').add('b');
// console.log(set); // Set { 1, 2, 3, 4, 'a', 'b' }
// console.log(set.delete('a')) // true
// console.log(set); // Set { 1, 2, 3, 4, 'b' }
// console.log(set.has('b')) // true
// console.log(set.clear()); // undefined
// console.log(set); // Set{}

var arr = [1,2,3,1,2,1,2,11,12];
var set = new Set(arr);
for (let n of arr.keys()) {
    console.log(n);
    // 0 // 1 // 2 // 3 // 4 // 5 // 6 // 7 // 8
}
for (let n of arr.entries()) {
    console.log(n);
    // [ 0, 1 ] // [ 1, 2 ] // [ 2, 3 ] // [ 3, 1 ] // [ 4, 2 ] // [ 5, 1 ] // [ 6, 2 ] // [ 7, 11 ] // [ 8, 12 ]
}
set.forEach(function(key){
    console.log(key);
})
