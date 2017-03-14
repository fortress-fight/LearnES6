function* gener() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
};

var obj = gener();

console.log(obj.next()); // { value: 1, done: false }
console.log(obj.next()); // { value: 2, done: false }
console.log(obj.return('这里是通过return 插入的')) // { value: '这里是通过return 插入的', done: true }
console.log(obj.next()); //{ value: undefined, done: true }
console.log(obj.next());
console.log(obj.next());