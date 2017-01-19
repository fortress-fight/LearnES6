// function fn (first,...nums) {
//     for (num of nums) {
//         first+=num;
//     }
//     console.log(nums); // [ 1, 2, 3, 4, 5, 6 ]
//     return first
// }
// console.log(fn (1000,1,2,3,4,5,6)) // 1021
// console.log(fn.length); //1


// function fn (newArr, arr) {
//     console.log(...arr); // 1 2 3 4
//     console.log([...arr]); // [ 1, 2, 3, 4 ]
//     newArr.push(...arr);
// }
// var oldArr = [];
//
// fn(oldArr, [1,2,3,4])
// console.log(oldArr); //  [ 1, 2, 3, 4 ]
//
// function fn (a,b,c) {
//     console.log(a,b,c);// 1 2 3
// }
// var arr = [1,2,3]
// fn(...arr)

// var arr = [1,2,1,123,121,12,21];
// console.log(Math.max.apply(Math, arr)); // 123
// console.log(Math.max(...arr)); // 123

// var arr1 = ['a','b','c'],
//     arr2 = ['d'],
//     arr3 = ['f','g'];
//
// console.log(arr1.concat(arr2, arr3)) //[ 'a', 'b', 'c', 'd', 'f', 'g' ]
// console.log([...arr1, ...arr2, ...arr3]); // [ 'a', 'b', 'c', 'd', 'f', 'g' ]


// var arr = [1,2,3,4]
// var [first, ...newArr] = arr;
// console.log(first); // 1
// console.log(newArr); // [2,3,4]

// var str = 'hello';
// console.log([...str]); //[ 'h', 'e', 'l', 'l', 'o' ]
