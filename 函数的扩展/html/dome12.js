function tco (fn) {
    var value,
        active = false,
        accumulated = [];
    return function accumulator (){
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = fn.apply(this, accumulated.shift())
            }
            active = false;
            return value;
        }
    }
};
var sum = tco(function (x, y){
    if (y > 0) {
        return sum (x+1, y-1);
    } else {
        return x;
    }
})

console.log(sum(1, 10000)); // 10001

/**
 * 这里的accumulated的存在，不是很懂，仅仅使用一次；
 */
