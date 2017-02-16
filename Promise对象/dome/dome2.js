// var obj = {
//   then () {
//     console.log(1);
//   }
// };
// var newPro = Promise.resolve(obj)

// var str = 'hello';
// var newPro = Promise.resolve(str);
//
// newPro.then(()=>{
//   console.log(1);
// })

// let pro = () => {
//   console.log(1);
//   return new Promise((resolve, reject) => {
//     // resolve(100);
//     reject(100);
//   })
// }
//
// pro().catch((num) => console.log(num));

// function fn () {
//   console.log(1);
// }
//
// Promise.resolve(fn)


// setTimeout(function () {
//   console.log('three');
// }, 0);
// function fn () {
//   console.log('four');
// };
// (
//   () => new Promise(function(resolve) {
//     resolve(fn())
//   })
// )()
//
// console.log('one');

// console.log(1);
// new Promise(function (resolve, reject) {
//   console.log('one');
//   resolve()
// }).then(function () {
//   console.log('two');
// })
// console.log('three');
// // 1 => one => two
//
// console.log('one');
// Promise.resolve().then(function () {
//   console.log('two');
// })
// console.log('three');
// // one => three => two


console.log(1);
console.log(1);
function fn () {
  console.log('two');
}
new Promise(function (resolve, reject) {
  console.log('one');
  resolve(fn())
  console.log('four');
})
console.log('three');
