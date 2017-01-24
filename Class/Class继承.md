## 2 Class 的继承

### 2.1 Class 继承的基础知识

1) Class 继承的基础用法
[DOME7](./html/dome7.js)
Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```
class Person {
    constructor (name = 'ff') {
        this.name = name;
    }

    say () {
        console.log(this.name);
        return this.name;
    }
}

class Student extends Person {
    job () {
        return `My name is ${super.say()} , I'm a student`
    }
}

var student1 = new Student;
student1.say() // ff
console.log(student1.job()) // My name is ff , I'm a student
```

>注：在继承的子类中，存在一个`super`关键字，这个关键字指向继承父类的`this`对象

2) Class 子类中没有this对象，需要借用父级的this对象

[DOME8](./html/dome8.js)

```
class Person {
    constructor (name) {
        this.name = name;
        this.age = 24;
    }

    say () {
        return this.name;
    }
}

class Student extends Person {
    constructor (job) {
        this.job = job //  this is not defined
    }

    intor () {
        console.log(this);
        return this.name + this.age;
    }
}

var student1 = new Student('xiao')
console.log(student1.intor())
```

解决方法：使用super来调用继承父类的this对象；

```
class Person {
    constructor (name) {
        this.name = name;
        this.age = 24;
    }

    say () {
        return this.name;
    }
}

class Student extends Person {
    constructor (name, job) {
        super(name);
        this.job = job //  this is not defined
    }

    intor () {
        console.log(this);
        return this.name + " " +this.age +" "+ this.job;
    }
}

var student1 = new Student('xiao', 'student')

console.log(student1.intor()) // xiao 24 student
```

>注：
> 这里调用了 super 就相当于调用了父类的 constructor，这样就借用了父类的 this 对象

ES5的继承，实质是先创造子类的实例对象this（这个是指 fn.prototype = new fn1），然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

```
constructor(...args) {
  super(...args);
}
```

补充：

```
console.log(student1 instanceof Student) // true
console.log(student1 instanceof Person); // true
```

### 2.2 Class  的 prototype 属性和 `__proto__` 属性

[DOME9](./html/dome9.js)

```
class Person {
    constructor (name) {
        this.name = name;
    }

    say () {
        return this.name
    }
}

class Student extends Person {

}

var student1 = new Student('ff');

console.log(student1.__proto__ === Student.prototype) // true
console.log(student1.__proto__ === Person); // false
console.log(Student.__proto__ === Person.prototype); // false
console.log(Student.prototype.__proto__ === Person.prototype); // true
```

可以看出继承子类的原型对象可以通过原型链找到继承父类的原型对象；

类的继承（extends）相当于下面的方法：

[DOME10](./html/dome10.js)

```
// 继承prototype的原型对象
Object.setPrototypeOf(Student.prototype, Person.prototype)
// 继承静态属性
Object.setPrototypeOf(Student, Person)
```

补充：

Object.setPrototypeOf方法的实现。

```
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

```
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```
这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（\_\_proto\_\_属性）是父类（A）；作为一个构造函数，子类（B）的原型（prototype属性）是父类的实例。

```
Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

在回顾一下 create
`Object.create(proto, [ propertiesObject ])`
方法创建一个拥有指定原型和若干个指定属性的对象。
>
- proto
一个对象，作为新创建对象的原型。
- propertiesObject
可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的

```
var obj = {
    name: ['ff', 'xiao']
}
var obj1 = Object.create(obj);
obj1.name.push(1)
obj1.age = 24
console.log(obj1.name); // [ 'ff', 'xiao', 1 ]
console.log(obj.name); // [ 'ff', 'xiao', 1 ]
console.log(obj.age); // undefined
```

### 2.3 Extends 的继承目标

extends 后面可以跟多种类型的值；
1） 函数
只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

2）Object类
所有类型都是继承Object对象，不再多说

3）子类继承null
```
class A extends null {

}
console.log(A.__proto__ === Function.prototype); //true
console.log(A.prototype.__proto__); // undefined
```

### 2.4 Object.getPrototypeOf()
Object.getPrototypeOf方法可以用来从子类上获取父类。
```
class Person {
    constructor (name) {
        this.name = name
    }
}

class Student extends Person {
    say () {
        console.log(this.name);
    }
}

var student1 = new Student('ff')
student1.say() // ff
console.log(Object.getPrototypeOf(Student) === Person)  // true
```
因此，可以使用这个方法判断，一个类是否继承了另一个类。

### 2.5 super 关键字

[DOME12](./html/dome12.js)

super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数（如果不调用的话，就会自己调用）。

>注:
>1. super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。
>2. 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

```
class Person {
    constructor (name) {
        this.name = name
    }
}

class Student extends Person {
    constructor () {
        super()
    }
    say () {
        // super(); //'super' keyword unexpected here
        console.log(this.name);
    }
}

var student1 = new Student('ff')
student1.say() // ff
```

第二中情况
super作为对象时，指向父类的原型对象。

```
class Person {
    constructor (name) {
        this.name = name
    }
    sayHi (){
        console.log(`Hi My name is ${this.name}`);
    }
}

class Student extends Person {
    constructor (name) {
        super(name)
    }
    say () {
        super.sayHi()
    }
}

var student1 = new Student('ff')
student1.say() // Hi My name is ff
```

>注：
> 1. ES6 规定，通过super调用父类的方法时，super会绑定子类的this。
> 2. 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

### 2.6 实例的`__proto__`属性

实例的`__proto__`指向其构造函数的原型对象，而构造函数的原型对象上的`__proto__`又指向其继承父类的原型对象；
