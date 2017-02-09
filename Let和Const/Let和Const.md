# ECMAScript6

内核 -- 翻译语言 将语言解析成机器能够识别的语言， 又叫 解析器，有很多引擎组成的；DOM 和 BOM 是基于ECMA实现的；


# 1 变量声明 let & const：

在js中声明变量使用了 var；而在E6中提供了新的方法---let 去声明变量

## 1.1 let 基本用法

[DOME1](././html/dome1.js)

### 1.1.1 let 代码块

```
{
    var a = 10;
    let b = 11;
    console.log(a); // 10
    console.log(b); // 11
}
console.log(a); // 10
console.log(b); // error
```

`var` 和 `let` 都可以声明变量，但是let声明的变量只能在let命令的代码块---‘{}’内有效；

### 1.1.2 let 在 for 中的运用

由于 let 声明的变量只会存在于let命令的代码块中，每一次使用都是新的变量；

使用for 时候要注意：
```
var fnArr = [];
for (var i = 0; i < 10 ; i++) {
    fnArr.push(function (){
        console.log(i);
    });
};
for (var j = 0; j < fnArr.length; j++) {
    fnArr[j]()
}
```
这里的 i  属于全局作用域，每一次修改都是对全局作用域中 i 的修改，所以在for循环结束的时候，全局域中的i就已经执行到10了；
如果使用了 let：

```
var fnArr = [];
for (let i = 0; i < 10; i++) {
    fnArr.push(function (){
        console.log(i);
    });
}
for (var i = 0; i < fnArr.length; i++) {
    fnArr[i]()
}
```
在这里使用 let，由 let 创建的 i 在每次循环的时候重新创建，并且只会在一次循环的代码块中，这样每一个 i 都是局部的，得以保留；
注：按理说下一轮在访问不到上一轮 i ，但在JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

### 1.1.3 let 不存在变量提升
let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

```
console.log(v); // undefined
console.log(l); // l is not defined
var v = 10;
let l = 10;
```
```
var name = 'A';
(function () {
    if (typeof name === 'undefined') {
        var name = 'B';
    }
    console.log(name); // B
})()

var name = 'A';

(function () {
    if (typeof name === 'undefined') {
        let name = 'B';
    }
    console.log(name); // A
})()
```

### 1.1.4 let 暂存死区

在一个块级作用域中，一个由let声明的变量就会将这个块级作用域与这个变量绑定到一起，这个变量将不会受到外界的影响；
```
var name = 'A';

if (true) {
    console.log(name); //name is not defined
    let name = 'B';
}
```
在块级作用域中，let 声明之前是不能使用let声明的变量的，这一个区域就是暂存死区；
需要注意的是：
虽然由于let不存在变量提升，所以在之前无法访问这种解释，看似没有提，但是实际上还是有差别的，虽说没有办法访问，但是let还是通知了作用域块，这个变量是被声明的，只是没法使用；例如：
使用 `typeof` 去判断一个没有声明的类型得到的将是 undefined，但是如果在let声明之前去使用 `typeof` 去判断的话就会报错：
```
console.log(typeof noval); // undefined

console.log(typeof b); // b is not defined
let b = 1;
```
个人解释：首先没有声明的变量，将会是全局域变量，也就是挂在了window的属性上了，typeof 访问一个没有值的属性，返回一个undefined；而 let 声明的变量就不会挂在window上，而且在声明之前是不让使用的；

### 1.1.5 let 不能重复声明
let 不允许在相同的作用域中，对一个变量重复赋值
```
(function () {
    let a = 10;
    let a = 11; //Identifier 'a' has already been declared
})()
```
不同作用域中是可以的：
```
(function () {
    let a = 10;
    (function () {
        let a = 11;
    })
})()
```

## 1.2 块级作用域
[DOME2](././html/dome2.js)

### 1.2.1 为什么要使用块级作用域

首先在E5中不存在块级作用域，这就导致了一些问题：

1. 内部变量会修改外部变量：

```
var tmp = new Date();

function t () {
    if (false) {
        var tmp = 'ff';
    }
    console.log(tmp); // undefined
}
t()
```

在这里可能由于不知道外面已经定义了一个 tmp 所以在函数内部又写了个var tmp 就会导致得不到想要的结果，并且难以维护

```
let tmp = new Date();

function t () {
    if (false) {
        let tmp = 'ff';
    }
    console.log(tmp); // 2017-01-04T05:49:19.620Z
}
t()
```
有let声明的变量依旧可以从子级向父级查找变量，同时又绑定了作用域，避免了修改全局作用域中的变量；

2. 用来计数的循环变量泄露为全局变量。

依旧使用for循环的实例：
```
var fnArr = [];
for (let i = 0; i < 10; i++) {
    fnArr.push(function (){
        console.log(i);
    });
}
for (var i = 0; i < fnArr.length; i++) {
    fnArr[i]()
}
```
这里如果使用var i 就成为了 全局变量，而使用let 的话每一循环都是新声明一个变量并且绑定到这一次的块级作用域中；

### 1.2.2 E6 中的块级作用域

1. 块级作用域可以嵌套
2. 块级作用域父级作用域不能访问子级作用域
3. 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）（闭包）不再必要了。

```

(function (){
    var a = 123;
})()

{
    let a =123;
}
```

## 1.3 const 命令
[DOME3](././html/dome3.js)

const 变量声明 -- 声明一个只读的变量，一旦声明就不能改变，如果修改的话就会报错；
```
const a = 3.12;
a = 3;
console.log(a); // Assignment to constant variable.
```

1. const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。否则就会报错

`const a; // Missing initializer in const declaration`

2. const的作用域与let命令相同：只在声明所在的块级作用域内有效。
3. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
4. const声明的常量，也与let一样不可重复声明。
5. const 声明复杂变量时，变量名并不是指向数据，而是指向数据所在的地址，只要地址没有发生变化，你在地址内发生什么是可以的
```
const foo = {};
foo.prop  =  11;
console.log(foo); //{ prop: 11 }
```
如果需要真正冻结一个变量，使其完全不能修改的话可以使用： Object.freeze();
```
const foo = {};
Object.freeze(foo)
foo.prop  =  11;
console.log(foo); //{}
```
6. 约定：常量的命名一般我们使用全大写


>注:
> ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6一共有6种声明变量的方法。

## 1.4 补充：
[DOME4](././html/dome4.js)

### 1.4.1 顶层对象的属性
在window中顶层对象是window 而在node中的顶层对象是 global, 在ES5中，顶层对象的属性和全局变量是等价的；

```
var a = 11;
console.log(window.a) // 11
```
顶层对象的属性与全局变量挂钩，被认为是JavaScript语言最大的设计败笔之一;
为了解决这个问题在ES6中：一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
```
let a = 12;
console.log(window.a); // undefined
```

### 1.4.2 global 对象

ES5的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。

1. 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
2. 浏览器和 Web Worker 里面，self也指向顶层对象，但是Node没有self。
3. Node 里面，顶层对象是global，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。

1. 全局环境中，this会返回顶层对象。但是，Node模块和ES6模块中，this返回的是当前模块。
2. 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
3. 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用。

可以使用：
```
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

-------------------由于不懂不敢妄言-----------待补充
