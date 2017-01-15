# Learn ES6

# 1. Proxy 简介

proxy -- 代理 ： 代理器

Proxy 用于修改某些操作的默认行为，可以理解成，在目标对象之前加上一层，外界对其进行访问的时候都必须要进过这一层，并且这一层可以对外界的访问进行过滤以及修改；

## 1.1 Proxy 实例方法：

Proxy 的实例方法共有 13 种：
1. get(target, propKey, receiver)


### 1.1.1 get(target, propKey, receiver)
[DOME1](./html/dome1.html)
拦截对象属性的读取，比如proxy.foo和proxy['foo']。
最后一个参数receiver是一个对象，

```
<script type="text/javascript">
    var person = {
        name: 'ff'
    }
    var proxy = new Proxy(person, {
        get: function (obj, attr) {
            console.log(arguments); // [Object, "name", Proxy]
            if (attr in obj) {
                return obj[attr]+'get'
            } else {
                throw new ReferenceError('这是一个错误：'+ attr + '没有找到')
            }
        }
    })
    console.log(proxy.name); // ffget
    console.log(proxy.age); //Uncaught ReferenceError: 这是一个错误：age没有找到
</script>
```

示例：
1） 使用get拦截，实现数组读取负数的索引。
[DOME2](./html/dome2.html)
```
function createArr(...arg){
    handle= {
        get: function (target, index) {
            console.log(index); // -2
            if (index>=0) {
            } else {
                index = target.length + +index;
            }
            console.log(index); // 4
            return target[index]
        }
    }
    return new Proxy(arg, handle)
}
var a = createArr(1,2,3,4,5,'a');
console.log(a[-2]) // 5
```

2) 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作

3) 利用get拦截，实现一个生成各种DOM节点的通用函数dom。
```
const dom = new Proxy({}, {
    get (target, property) {
        return function (attr = {}, ...children) {
            const el = document.createElement(property);
            for (let prop of Object.keys(attr)) {
                el.setAttribute(prop, attr[prop])
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child)
                }
                el.appendChild(child)
            }
            return el;
        }
    }
})
const el = dom.div(
    {"style": 'font-size:100px'},'this is a div element',
    dom.span({"style": 'color: red'},'this is a span')
)
document.body.appendChild(el)
```

注；  如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
```
<script type="text/javascript">
    var obj = {}
    Reflect.defineProperty(obj, 'name', {
        value: 123,
        writable: false,
        configurable: false
    })
    var proxy = new Proxy(obj, {
        get: function (o, v){
            return 1
        }
    })
    console.log(proxy.name) // get' on proxy: property 'name' is a read-only and non-configurable dat.....
</script>
```

### 1.1.2 set(target, propKey, receiver)

[DOME6](./html/dome6.html)

set() -- 用于连接某个属性的赋值行为

```
<script type="text/javascript">
    var handle = {
        set(target,attr,val) {
            if(attr == 'age') {
                if(val >= 100) {
                    throw new Error('年龄不能超出100')
                }
            }
            target[attr]=val;
        }
    }
    var proxy = new Proxy({}, handle);
    proxy.age = '110';
    console.log(proxy.age);
</script>
```

注：如果年龄设置超出100的时候，抛出错误

1. 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。
2. 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。


### 1.1.3 apply(target, propKey, receiver)
[DOME6](./html/dome6.html)
apply方法拦截函数的调用、call和apply操作。
`apply (target, ctx, args)`

- target --  目标对象，
- ctx -- 目标对象的执行环境
- args -- 目标对象参数数组

```
var target = function () {
    console.log('this is a normal fun');
}
var handle = {
    apply (target,ctx,arg){
        console.log(arg); // ["这个是proxy对象", "这个是第二个参数"]
    }
}
var proxy = new Proxy(target, handle);
proxy('这个是proxy对象','这个是第二个参数')
```

### 1.1.4 has (target, key)
`has (target, key)`

has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
但是has拦截只对in循环生效，对for...in循环不生效，导致不符合要求的属性没有被排除在for...in循环之外。

### 1.1.5 construct (target, args, newTarget)
`construct (target, args, newTarget)`

construct方法用于拦截new命令，下面是拦截对象的写法。

### 1.1.6  deleteProperty (target, key)
`deleteProperty (target, key)`

deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

### 1.1.7  defineProperty (target, key, descriptor)
`defineProperty (target, key, descriptor)`

defineProperty方法拦截了Object.defineProperty操作。

### 1.1.8 getOwnPropertyDescriptor (target, key)
`getOwnPropertyDescriptor (target, key)`

getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor，返回一个属性描述对象或者undefined。

### 1.1.9  getPrototypeOf(target)
` getPrototypeOf(target)`

getPrototypeOf方法主要用来拦截Object.getPrototypeOf()运算符，以及其他一些操作。

>Object.prototype.__proto__
Object.prototype.isPrototypeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof运算符

### 1.1.10 isExtensible() -- 待

isExtensible方法拦截Object.isExtensible操作。

### 1.1.11 ownKeys()
ownKeys方法用来拦截以下操作。

>Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys()





-----------------------------能力有限是在看不下去了，只知道是各种拦截，等需要了再来继续学习
