// function factorial(n) {
//     if (n===1) return 1;
//     return n*factorial(n-1);
// };
//
// console.log(factorial (5)) // 120
/**
 * 注：
 * 这里的递归，每次都会保留 n 的调用记录，（我的理解就是，n* （等待下一个的函数的返回值，
 * 这样每次都要保留n的调用记录））,也可以是说在尾调用中除了函数调用外还存在运算，
 * 所以不算是尾调函数；
 * 改进方法：
 */

function factorial (n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total)
}
console.log(factorial(4, 1)) // 24

/**
 * 注：
 * 这里的调用中不需要保留 每一次调用的n，而是通过传递的方式来达到相同的效果
 */
