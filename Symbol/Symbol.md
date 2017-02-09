# Learn ES6

# Symbol

## 1.1 Symbol 的基础介绍

Symbol是为了保证每一个属性的名字都是独一无二的，从根本上解决了属性名冲突的问题

Symbol 是ES6 引入的第7 中数据类型，表示独一无二的值

声明：
`let a = Symbol(description?: string)`

```
let s =  Symbol('这里Symbol');
console.log(s); // Symbol(这里Symbol)
console.log(typeof s); // symbol
```

>注；
1. Symbol 构造函数前不能使用 new 操作符，否则会报错，这是因为 Symbol 是一个原始类型的值，而不是一个对象
2. Symbol 由于不是对象，所以不能添加属性和方法，
3. Symbol 是一种类似于字符串的数据类型

## 1.2 作为属性名的 Symbol

```
var obj = {};
    var sym1 = Symbol('1');
    obj = {
        [sym1]: function (str) {
            console.log(str);
        }
    }
    obj[sym1]('这里是一句话');
```

一个由多个模块共同管理的对象，就很难保证属性名不会重复，这时就可以使用 Symbol 来解决这个问题：

## 1.3 实例：

### 1.3.1 消除魔术字符串
[DOME2](././html/dome2.js)
魔术字符串是指：在代码中出现多次，与多段代码之间存在强耦合的关系，如果需要修改就必须每一个都要修改，这种方式会导致维护困难；
例如：
```
function getArea (shape, option)  {
    var area = 0;
    switch (shape) {
        case 'T':
            area = 0.5 * option.width * option.height;
            break;
    }
    return area;
}
var r = getArea('T', {width:200, height:100})
console.log(r); // 10000
```

这里的 T 就是魔术字符串，他与getArea 就具有了强耦合性；如果 T 想改名为 Triangle , 就需要修改两处；

修改：
```
var select = {
    'T': 'T'
}
function getArea (shape, option) {
    var area = 0;
    switch (shape) {
        case select.T:
            area = 0.5 * option.width * option.height;
            break;
    }
    return area;
}
var r = getArea(select.T, {width: 200, height: 100})
console.log(r); // 10000
```
这样就降低了 T 与 getArea 的耦合性，如果需要修改名称的话，只需要将 select 对象下的 T 属性修改就可以了。

其实我们并不需要将 select.T == T, 这样如果 select 的某个属性也被赋值为 T,就会导致 switch 无法正常使用，这是使用 Symbol() 就会解决这个问题：

```
var select = {
    'T': Symbol('T')
}
```

## 1.4 属性名的遍历

Symbol作为属性名，会使得该属性不会出现在`for...in`、`for...of`的循环中，也不会出现在`Object.keys()` `Object.getOwnPropertyNames()`、`JSON.stringify()`的返回中，但是与私有变量不同，Symbol 可以被 `Object.getOwnPropertySymbols()`以及`Reflect.ownKeys()`找到， 并返回由 Symbol 属性名构成的数组；

```
var obj = {
    [Symbol('1')]: 'a',
    [Symbol('2')]: 'b'
}
console.log(Object.getOwnPropertySymbols(obj)); //[ Symbol(1), Symbol(2) ]
console.log(Reflect.ownKeys(obj)); //[ Symbol(1), Symbol(2) ]
```

利用这种不可遍历的特点，我们可以创建一些不被外界访问的属性；

## 1.5 Symbol.for() || Symbol.keyFor()

### 1.5.1 Symbol.for(key)

如果想要使用相同的Symbol变量，就需要使用 Symbol.for() 来声明变量：

```
let A = Symbol.for('A');
let B = Symbol.for('A');
console.log(A===B); // true

let C = Symbol('c')
let D = Symbol('c')
console.log(C===D); // false
```
Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30次，会返回30个不同的Symbol值。

### 1.5.2 Symbol.keyFor()
[DOME4](././html/dome4.js)
Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

```
console.log(Symbol.keyFor(B)); // A
```

如果没有找到key 就返回 undefined

## 1.6 模块  Singleton 模式

[DOME6](././html/dome6.js)

如果需要在不同的模块之间都可以使用同一个实例，而不会每一次加载模块都会产生新的实例，这是我们会将这个实例挂在在全局中，而使用 Symbol 可以避免无意之间的修改，但是Symbol 又不能再次使用，每次加载都会和上一次不同，所以更好的是使用 Symbol.for()

## 1.7 内置的Symbol值

ES6 内置了 11 中 Symbol 值，如果需要细致了解，看书吧
