# Learn ES6

# 1. Reflect

## 1.1 Reflect 简介
Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。


## 1.2 Reflect 13种静态方法：

>
Reflect.get(target,name,receiver)
Reflect.set(target,name,value,receiver)
Reflect.has(target,name)
Reflect.deleteProperty(target,name)
Reflect.apply(target,thisArg,args)
Reflect.construct(target,args)
Reflect.defineProperty(target,name,desc)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)


### 1.2.1 获取、设置属性
[DOME1](./html/dome1.js)
1）Reflect.get(target, name, receiver)

从target上查找name属性，如果查询不到就返回undefined；
如果这个属性上部署了读取函数（getter），那么在使用`Reflect.get`的时候就会触发，并且读取函数就绑定到receiver上，如果没有指定receiver的话，就绑定到当前对象上；

```
var obj = {
    name: 'ff',
    age: '24',
    job: 'student',
    get baz(){
        console.log(this); // obj2
        return 1
    }
};
var obj2 = {

}
console.log(Reflect.get(obj,'name')); // ff
console.log(Reflect.get(obj,'parent')); // undefined
console.log(Reflect.get(obj,'baz'), obj2); // undefined

```

2） Reflect.set(target, name, value, receiver)
Reflect.set方法设置target对象的name属性等于value。如果这个属性上部署了设置函数(setter)，那么在使用`Reflect.set`的时候就会触发，如果存在receiver，那么这个receiver就是设置函数的执行环境，如果不存在就是当前对象；

```
var obj = {
    set fn(v) {
        console.log(this.v = v); // 1
    }
};
var obj1 = {
    name: 'obj1'
}
Reflect.set(obj,'name','ff');

Reflect.set(obj,'fn', 1, obj1);
console.log(obj); //{ fn: [Setter], name: 'ff' }
console.log(obj1); // { name: 'obj1', v: 1 }
```

### 1.2.2 是否存在 及 删除

Reflect.has(obj, name)

Reflect.has方法对应name in obj里面的in运算符。
```
var obj = {
    name: 'ff',
    age: 24
};
console.log('name' in obj) // true
console.log(Reflect.has(obj,'name')); // true
```

### 1.2.3 Reflect.deleteProperty(obj.name)
Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
```
var obj = {
    name: 'ff',
    age: 24
};
delete obj.name;
console.log(obj); // { age: 24 }

var obj = {
    name: 'ff',
    age: 24
};
Reflect.deleteProperty(obj,'name')
console.log(obj); // { age: 24 }
```

### 1.2.4 Reflect.construct(target, args)

Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

--但是实验时报错
```
function createPerson (name){
    this.name = name
}

createPerson.prototype = {
    construct: createPerson,
    say: function (){
        console.log(this.name);
    }
}

var person1 = new createPerson('xiaobai')
person1.say() // xiaobai

var person2 = Reflect.construct(createPerson, 'xiaohong')
TypeError: CreateListFromArrayLike called on non-object
```

### 1.2.5 Reflect.getPrototypeOf(obj)

Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

```
function createPerson (){
    this.name = 'ff'
}

createPerson.prototype = {
    construct: createPerson
}

var person = new createPerson()
console.log(Reflect.getPrototypeOf(person)) // { construct: [Function: createPerson] }
```

>注：
> `Reflect.getPrototypeOf` 中不接受非对象类型的参数，而 `Object.getPrototypeOf` 中如果是非对象，就先转换成对象后在运行

### 1.2.6 Reflect.setPrototypeOf(obj, newProto)

Reflect.setPrototypeOf方法用于设置对象的__proto__属性，对应Object.setPrototypeOf(obj, newProto)。

```
function createPerson(){
    this.name = 'xiaobai'
};
createPerson.prototype = {
    construct: createPerson,
    say: function (){
        console.log(this.name);
    }
}
function createDog(){};
createDog.prototype = {
    construct: createDog,
    say: function (){
        console.log('wangwang');
    }
}
var person = new createPerson();

Reflect.setPrototypeOf(person, createDog.prototype)
person.say() // wangwang
```

>注：如果第一个参数不是对象，Reflect.setPrototypeOf和Object.setPrototypeOf都会报错。

### 1.2.7 Reflect.apply(func, thisArg, args)

Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。

意义在哪？ 搞不懂；

### 1.2.8 Reflect.defineProperty()

Reflect.defineProperty(target: ?, property: string, descriptor: propertyDescriptor)

Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。

```
var obj = {}
console.log(Reflect.defineProperty(obj, 'name', {value:'ff'})) // true
console.log(obj.name); // ff
console.log(obj); // {}
```
>注：
1. descriptor 必须是对象
2. 定义的属性包括{ value: 'ff',writable: false,enumerable: false,configurable: false }

如果需要得到，可以使用 `Reflect.getOwnPropertyDescriptor`

### 1.2.9 Reflect.getOwnPropertyDescriptor(target: ?, property: string)
Reflect.getOwnPropertyDescriptor(target: ?, property: string)
Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
```
console.log(Reflect.getOwnPropertyDescriptor(obj, 'name'));
// { value: 'ff',
//   writable: false,
//   enumerable: false,
//   configurable: false }
```

### 1.2.10 Reflect.isExtensible (target)

Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。

### 1.2.11 Reflect.preventExtensions(target)
Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

### 1.2.12 Reflect.ownKeys (target)
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。

```
var obj = {
    name: 'ff',
    age: 24,
    [Symbol('job')]: 'student'
}
console.log(obj); //{ name: 'ff', age: 24 }
console.log(Reflect.ownKeys(obj)); //[ 'name', 'age', Symbol(job) ]
for (val of Reflect.ownKeys(obj)) {
    console.log(obj[val]);
}
// ff
// 24
// student
```


## 1.3 总结


Reflect对象的设计目的有这样几个：
1.  将Object中一些明显的语言内部方法（比如：Object.defineProperty），放到Reflect 对象下，以后将只从Reflect 对象下取得这些方法
2.  在Object.defineProperty 中如果遇到一个不能定义的属性时，就会抛出一个错误，而使用Reflect 对象只会返回一个false；
3. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
