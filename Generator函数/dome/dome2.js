function* dome2() {
    var result = yield 2;
    console.log(result); // 2
    if (result) return result;
}

var obj = dome2();

console.log(obj.next()); // { value: 2, done: false }
// result = 这是通过next 传入的参数
console.log(obj.next('这是通过next 传入的参数')); // { value: '这是通过next 传入的参数', done: true }

var obj1 = dome2();

console.log(obj1.next()) // { value: 2, done: false }

// result = undefined

console.log(obj1.next()) // { value: undefined, done: true }