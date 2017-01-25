## 3. Class 其余相关

### 3.1 原生构造函数的继承

ECMAScript 原生的构造函数有

- Boolean()
- Array()
- Number()
- String()
- Date()
- RegExp()
- Error()
- Object()
- Function()

在ES5 中这些，新建的构造函数是无法继承原生构造函数的；主要原因是：ES5 是先创建继承子类的实例对象，然后将继承父类的属性添加到他的上面，而原生构造函数中的方法多数是不可见的，所以不能添加；

在ES6 中，由于是先实例化继承父类的this，然后，在这个this的基础上添加方法和属性，所以会继承构造函数所有的属性和方法；

具体没有细说，如果需要可以查看书中 Class 想关章节

### 3.2 Class 的取值函数(getter)和存值函数(setter)
[DOME14](./html/dome14.js)
与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```
class CreatePerson {
    constructor (name) {
        this.name = name;
    }
    get prop() {
        return 'getter'
    }
    set prop(value) {
        console.log('setter' + value);
    }
}

let person1 = new CreatePerson('ff');
person1.prop = ' say hi'; // setter say hi
console.log(person1.prop); // getter
```

>注：
1. 可以看出，set 和 get 后面跟着的是要拦截的属性名；
2. 存值函数和取值函数是设置在属性的descriptor对象上的。

### 3.3 Class 的 Generator 方法

待到Generator的时候详解

### 3.4 Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

[DOME15](./html/dome15.js)

```
class CreatePerson {
    constructor (name) {
        this.name = name;
        this.job = 'student';
    }

    static sayJob () {
        console.log(this.name); // undefined
        return 'student'
        // console.log(this.job);
    }
}

console.log(CreatePerson.sayJob()) // student
var person1 = new CreatePerson ('xiaoxiao');
person1.sayJob() // person1.sayJob is not a function
```

>注：这里的static 后面的 sayJob 的方法只能通过构造函数 CreatePerson 来调用，而不能通过其实例对象来使用；

父类的静态方法，可以被子类继承。

```
class CreateStudent extends CreatePerson {

}
CreateStudent.sayJob() // student
```

静态方法也是可以从super对象上调用的。

```
class CreateStudent extends CreatePerson {
    static sayHi () {
        console.log('My job is a '+ super.sayJob() +' ');
    }
}

CreateStudent.sayJob() // student
CreateStudent.sayHi()  // My job is a student
```

>这种调用必须是在继承子类的静态方法中， 否则会找不到super.sayJob, 我觉得是因为，super绑定的this发生了变化；

### 3.5 Class的静态属性和实例属性
[DOME16](./html/dome16.js)
静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性

```
class Foo {
};
Foo.p = 'ff';
console.log(Foo.p); //ff
```

在ES6 中规定，Class 内部只存在静态方法，没有静态属性；
但是ES7 中存在一个静态属性的提案，目前已经支持Babel转码，这个提案对实例属性和静态属性，都规定了新的写法。（头疼）
由于，浏览器还没有支持，所以目前仅作介绍；

1. 类的实例：

类的实例属性可以用等式，写入类的定义之中。
```
class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
```
相当于
```
class MyClass {
    constructor () {
        this.myProp = 42;
    }
}
```
为了可读性的目的，对于那些在constructor里面已经定义的实例属性，新写法允许直接列出。
即：
```
class MyClass {
    myProp = 42
}
```

2. 类的静态属性
类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。
```
class MyClass {
    static myProp = 42
}
```
相当于：
```
class MyClass {

}
MyClass.myProp = 42;
```

>注
> 上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。

### 3.6 new.target属性
