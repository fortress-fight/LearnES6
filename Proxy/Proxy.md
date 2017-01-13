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
