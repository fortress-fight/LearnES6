// function sum (x,y) {
//     if(y>0) {
//         return sum(x+1, y-1)
//     } else{
//         return x
//     }
// }
// console.log(sum(1,100000)); //  Maximum call stack size exceeded

/**
 * 这里看出堆栈超出了
 * 下面使用蹦床函数实现循环代替递归
 */

function trampoline(f) {
    while (f && f instanceof Function) {
     f = f();
    }
    return f;
}

function sum (x, y) {
    if (y>0) {
        return sum.bind(null, x+1, y-1);
    } else {
        return x;
    }
}
console.log(trampoline(sum(1,10000))) //10001

/**
 * trampoline 就是如果传入的是一个函数就执行，如果不是就将参数返回
 * 而 sum 函数就改成了返回函数的形式，经过 while 循环实现计算
 */
