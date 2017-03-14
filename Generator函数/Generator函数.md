# Learn ES6

## 1. Generator 函数

### 1.1 简介

Generator函数是ES6提供的一种异步编程解决方案；

形式上，Generator 是一个普通函数，具有两个特征：

1. 使用function 关键字 与函数名之间存在一个 `*` 号；
2. 函数体内，定义了 yield 语句，定义了不同的状态；(yield -- 产出)

例如：

```js
function* helloWorldGenerator() {
    yield 'first';
    yield 'second';
    return 'end'
}

var hw = helloWorldGenerator();
var a = hw.next();
console.log(a);
//Object {value: "first", done: false}
var b = hw.next();
console.log(b);
// Object {value: "second", done: false}
var c = hw.next();
console.log(c);
// Object {value: "end", done: true}
```

从语法上可以将 generator 函数看成一个状态机，内部封存了很多状态；
可以将上例中的 Generator 函数分为三个状态，1：'first' 2: 'second 3：'end';

这里需要注意的是：

1. 在 Generator 函数，调用了以后，并不会立即执行。
2. Generator 函数调用以后返回的是一个指向内部状态的指针对象（遍历器对象），可以通过 next 方法将指针移动到下一个状态
3. 在返回的指针对象中存在两个值：value 返回状态 done - Boolean 表示是否已经结束了；

### 1.2 yield 语句

由于 Generator 是返回一个 可遍历的对象，只有调用 next 方法才会将指针下移，而 yield 就是相当于一个停顿的表示，在调用 next 方法后，会在遇到 yield 的时候停止，如果没有 yield 就会等到遇到 return 的时候停止；

只用运行到 yield 的时候才会执行 yield 后面的语句，如果是一个函数，则该函数的返回值就是返回对象的value值；

可以通过 yield 语句，实现一个惰性求值：（就是当函数之间调用的使用，不执行内部代码，而是在调用 next 方法的使用调用。暂时不知道意义何在）

值得注意的有：

   1. 如果在普通函数中使用 yield 的话，将会报错；
   2. 如果需要在表达式中使用 yield 就需要带上括号；

### 1.3 next 方法的参数

在 Generator 函数中，yield 本身将返回 undefined

证明：

```js
function* dome2() {
    var result = yield 2;
    console.log(result) // undefind
}

var obj = dome2();

obj.next();
obj.next();
```

在这里如果向next中传入一个参数，这个参数将会被当成 yield 的返回值存在；

例如：

```js
function* dome2() {
    var result = yield 2;
    console.log(result);
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
```

这里简单的介绍一下：

1. 建立了 Generator 函数；
2. 通过 next 执行到 第一个 yield 得到了  { value: 2, done: false },这时代码仅仅执行到 yield 的位置；
3. 然后继续执行 next ,这时 代码执行到了等式的左侧，通过 next 传入参数: "这是通过next传入的参数";这个函数作为 yield 的返回值，传递给了 result ；如果没有传入这个参数（obj1），result 就是 undefined

由于 使用 next 是相当于一步步的执行代码，所以通过 next 传入的参数，将会保留；

### 1.4 for...of 循环

通过 调用 next 将会返回一个具有遍历器的对象，我们很快就会想到与遍历器息息相关的 for...of 方法，使用 for...of 可以循环所有的 yield 但是没有return；

我们知道有些对象并不具备遍历器；而一个 Generator 可以返回一个具有遍历器的对象；那我们就可以这样操作：

```js
var obj1 = {
    name: 'ff',
    age: '24',
    job: 'student'
};

function* objEntres(obj) {
    let propkeys = Reflect.ownKeys(obj);

    for (let propkey of propkeys) {
        yield [propkey, obj[propkey]]
    }
}

for (let [item, value] of objEntres(obj1)) {
    console.log(`${item}:${value}`)
}

// name:ff
// age:24
// job:student
```

注：这里的 Reflect.ownKeys -- 返回一个有对象的key组成的数组

## 2. Generator 函数的方法

### 2.1 Generator.prototype.throw 

Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

```js
function* gener() {
    try {
        yield
    } catch (error) {
        console.log('内部拋错', error)
    }
};

var exam = gener();

exam.next(); // 执行到 try 中的 yield ，然后继续

exam.throw(); // 内部拋错 undefined
```

注：

1. Generator.prototype.throw 接受一个参数 -- 表示错误信息
2. 通过 throw 使的 yield 返回一个错误对象，从而被 try-catch 捕获；
3. 如果当内部的 catch 已经执行结束，或者在函数的内部本身就没有部署 try-catch，也就是内部无法捕获 throw，这个错误将在函数外部进行捕获；
4. 如果使用 throw 进行了错误的部署，但是内外都没有 try-catch 去捕获，那么将会导致程序报错，运行中止
5. 如果内部抛出一个错误，也可以通过外部的try-catch去捕获，但是如果内部没有被捕获的话，系统将会认定这个 Generator 函数运行结束了

```js
function* gener() {
    try {
        yield
    } catch (error) {
        console.log('内部拋错', error)
    }
};

var exam = gener();

exam.next(); // 执行到 try 中的 yield ，然后继续

exam.throw('a'); // 内部拋错 undefined

try {
    exam.throw('b')
} catch (error) {
    console.log('外部拋错', error) // 外部拋错 b
}
```

### 2.2 Generator.prototype.return()

Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。

```js
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
```

注：
如果在return 中不存在参数，那么返回的对象中的value就是 undefined；

如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers()
g.next() // { done: false, value: 1 }
g.next() // { done: false, value: 2 }
g.return(7) // { done: false, value: 4 }
g.next() // { done: false, value: 5 }
g.next() // { done: true, value: 7 }
```

上面代码中，调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。

## 1.3 yield* 结构

如果在Generater函数内部，调用另一个Generator函数，默认情况下是没有效果的。这是就需要使用 yield* 的结构来完成效果；

没什么复杂的简单解释一下：

如果 yield 后面跟着的是一个可遍历的对象（在这里就是一个遍历器对象），不能直接使用，需要进入到这个遍历器对象中，遍历这个对象，并对其每一个值 yield 输出；而 yield* 就是完成这一步的方法；

## 1.4 其余补充：

作为对象属性的Generator函数 § ⇧
如果一个对象的属性是Generator函数，可以简写成下面的形式。

```js
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```

上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个Generator函数。

它的完整形式如下，与上面的写法是等价的。

```js
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```
