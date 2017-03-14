function* helloWorldGenerator() {
    yield 'this is first';
    yield 'this is second';
    return 'this is end'
}

var hw = helloWorldGenerator();
var a = hw.next();
console.log(a);
//Object {value: "this is first", done: false}
var b = hw.next();
console.log(b);
// Object {value: "this is second", done: false}
var c = hw.next();
console.log(c);
// Object {value: "this is end", done: true}