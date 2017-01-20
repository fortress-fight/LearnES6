// function currying (fn, n) {
//     return function (m) {
//         return fn.call(this, m, n)
//     }
// };
//
// function factorial (n, total) {
//     if(n===1) return total;
//     return factorial(n-1, n*total)
// };
//
// var currFac = currying(factorial, 1);
// console.log(currFac(4)) // 24

const factorial = (n ,total = 1) => {
    if (n === 1) return total;
    return factorial(n-1, n*total)
}
console.log(factorial(4)) // 24
