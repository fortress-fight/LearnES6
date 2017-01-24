# Learn ES6

#  Class

## 1 class 基本用法

### 1.1 基本概念

[DOME1](./html/dome1.js)
JavaScript语言的传统方法是通过构造函数，定义并生成新对象

```
function person (name) {
    this.name = name;
}
person.prototype = {
    constructor: person,
    say: function () {
        console.log(this.name);
    }
}
var person1 = new person('xiaobai');
person1.say()
```

ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。

```
class Person {
    constructor (name) {
        this.name = name;
    }

    say () {
        console.log(this.name);
    }
}
var person1 = new Person ('xiaohei');

person1.say() // xiaohei
```

>注：
> 1. constructor就是构造方法，其中的this就是构造函数的实例对象；
> 2. 定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
> 3. 方法之间不需要逗号分隔，加了会报错。

分析：
```
class Person {

}
console.log(typeof Person); // function
console.log(Person.prototype.constructor === Person) // true
```
上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

```
class Person {
    constructor(name) {
        this.name = name;
    }

    say () {
        console.log(this.name);
    }
}
var person1 = new Person('xiaoming');
person1.say() // xiaoming
// 相当于
// function Person (name){
//      this.name = name;
// }
//
// Person.prototype = {
//      say(){
//          console.log(this.name)
//      }
// }
```

### 1.2 添加方法

[DOME3](./html/dome3.js)

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。

```
class Person {
    constructor (name) {
        this.name = name
    }

    sayName () {
        console.log(this.name);
    }
}

var addFn = {
    sayHi () {
        console.log("Hello ，My name is " + this.name);
    }
}

Object.assign(Person.prototype, addFn);

var person1 = new Person('ff');

person1.sayName() // ff
person1.sayHi() // Hello ，My name is ff
```

### 1.3 Class 不可枚举

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

以上面的实例来看：
```
console.log(Object.keys(Person)); // []
console.log(Object.getOwnPropertyNames(Person)); // [ 'length', 'name', 'prototype' ]
```

### 1.4 类的属性名可以使用表达式

```
let sayN = 'sayName'
class Person {
    constructor (name) {
        this.name = name
    }

    [sayN] () {
        console.log(this.name);
    }
}
```

### 1.5 constructor 方法

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象

类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

### 1.6 类的实例对象

需要使用 new 操作符，创建类的实例；

与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

可以通过实例上的 `__proto__` 找到原型对象，并为原型对象添加方法，但是我觉得如果使用添加方法，不易维护，不建议使用

### 1.7 不存在变量提升

Class 创建的构造函数不存在变量提升（hoist），声明实例的时候必须在构造函数下面，否则会拋错，这一点与ES5完全不同。

### 1.8 Class 函数表达式

[DOME4](./html/dome4.js)

`console.log(typeof Person); // function` 可以看出 Person 是一个函数，所以也是具有函数的特征；

1. 可以使用函数表达式：
```
let newDog = class createDog{
    say(){
        console.log('WW');
    }
}

var dog1 = new newDog()
dog1.say() // ww

```
2. 可以直接调用

```
let person = new class Person {
    constructor(name){
        this.name = name;
    }

    sayName(){
        console.log(this.name);
    }
} ('ff')
person.sayName() //ff
```

### 1.9 创建私有方法

[DOME5](./html/dome5.js)

创建一个私有方法是十分有必要的（只有在构造函数内部使用），但是ES6 中并不可以直接创建私有方法；

1. 使用特殊命名表示私有方法

```
class Person{
    construct (name){
        this.name = name;
    }

    sayName() {
        this._createFakeName();
        console.log(this.name);
    }

    _createFakeName(){
        this.name = '就不告诉你'
    }
}

var person1 = new Person('xiaoxiao');
person1.sayName() // '就不告诉你'
```

>注：
> 这里使用`_`的方式区分了公共方法和私有方法，但是并不保险因为这种方式依旧可以被外部调用

2. 将私有方法移到模块外

```
class Person{
    construct (name){
        this.name = name;
    }

    sayName() {
        this.name = createFakeName.call(this)
        console.log(this.name);
    }

}

let createFakeName = () => '就不告诉你';

var person1 = new Person('xiaoxiao');
person1.sayName() // '就不告诉你'
person1.createFakeName() // person1.createFakeName is not a function
```

>注：
> 这里就将方法移到模块以外，所有由Person创建的实例就不能够调用`createFakeName`方法

3. 使用symbol的特性

```
// class Person{
//     construct (name){
//         this.name = name;
//     }
//
//     sayName() {
//         this._createFakeName();
//         console.log(this.name);
//     }
//
//     _createFakeName(){
//         this.name = '就不告诉你'
//     }
// }
//
// var person1 = new Person('xiaoxiao');
// person1.sayName() // '就不告诉你'

// class Person{
//     construct (name){
//         this.name = name;
//     }
//
//     sayName() {
//         this.name = createFakeName.call(this)
//         console.log(this.name);
//     }
//
// }
//
// let createFakeName = () => '就不告诉你';
//
// var person1 = new Person('xiaoxiao');
// person1.sayName() // '就不告诉你'
// person1.createFakeName() // person1.createFakeName is not a function

const createFakeName = Symbol('createFakeName');

class Person{
    construct (name){
        this.name = name;
    }

    sayName() {
        this[createFakeName]();
        console.log(this.name);
    }

    [createFakeName](){
        console.log(1);
        this.name = '我忘了'
    }

}

var person1 = new Person('xiaoxiao');
person1.sayName() // 我忘了
```
>注：这里的createFakeName属于模块内部变量，如果没有想外输出的话，就不能够在外部模块中使用，从而达到私有的目的

### 1.10 this 指向

类的方法内部如果含有this，它默认指向类的实例。

```
class Person{
    constructor (name = 'DOTA'){
        this.name = name;
    }

    sayName() {
        // setTimeout(function(){
            console.log(this.name);
        // }, 5000)
    }
}

var person1 = new Person('xiaoxiao');
person1.sayName()
```

但是，必须非常小心，一旦提取方法，并单独使用可能会出错；

```
const createFakeName = Symbol('createFakeName');

class Person{
    constructor (name = 'DOTA'){
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

var person1 = new Person('xiaoxiao');
console.log(person1); // Person {}

let {sayName} = person1;
console.log(sayName); // [Function: sayName]

sayName() // Cannot read property 'name' of undefined
```

>注：
> 这里提取了`sayName`方法，但是调用的使用this指向就会出问题了（这是因为是在编译器中运行的js代码）；

解决方法：

1. 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到方法了。

```
constructor (name = 'DOTA'){
    this.name = name;
    this.sayName = this.sayName.bind(this)
}
```

>注：由于constructor在创建实例的时候直接调用了，所以一开始就修改了sayName的this；

2. 另一种解决方法是利用箭头函数的this特性。

```
constructor (name = 'DOTA'){
    this.name = name;
    this.sayName = () => {
        console.log(this.name);
    }
}
```

>注：箭头函数没有自身的this，所以会找到上一级的this

3. 使用Proxy，获取方法的时候，自动绑定this。

```
function selfish (target) {
  const cache = new WeakMap(); // 创建一个WeakMap对象
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key); // 获取
      if (typeof value !== 'function') {
        return value; // 若是获得的不是个函数，就直接返回
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target)); // 如果获取的是一个函数就绑定到target上然后添加到 WeakMap 对象中
      }
      return cache.get(value); // 将绑定好的函数输出
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

### 1.11 严格模式
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

### 1.12 name

由于本质上，ES6的类只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
`console.log(Person.name); // Person`

name属性总是返回紧跟在class关键字后面的类名。
