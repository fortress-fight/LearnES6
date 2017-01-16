# Learn ES6

# 1. Set&Map

## 1.1 Set & WeakSet
[DOME1](./html/dome1.js)
### 1.1.1 Set 基本用法

ES6 提供了一种新的数据结构 -- Set
这种数据结构类似于数组，但是成员的值都是唯一的，没有重复的值。

1. Set 本身是一个构造函数，用于生成 Set 数据结构，并且通过 add 的方法去添加数据；

```
var set = new Set();

[1,2,3,1,2,3,22,13].map(function (e,i) {
    set.add(e)
})
console.log(set); // Set { 1, 2, 3, 22, 13 }
for (let i of set) {
  console.log(i);
}
// 1 // 2 // 3 // 22 // 13
```
从中还可以看出，set 的数据结构具有 [Symbol Iterator]

2. Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。

```
var set = new Set([1,2,1,2,3,2,23])
console.log(set); // Set { 1, 2, 3, 23 }
```

3. Set 具有属性 size

```
var set = new Set([1,2,1,2,3,2,23])
console.log(set); // Set { 1, 2, 3, 23 }
console.log(set.size); // 4
```

4. 可以通过` ... `运算符（内部使用的是for of）或者是`Array.from()`将 set 转换成真正的数组

```
var arr = [1,2,3,43,2,2,3]
var set = new Set(arr)
var newArr = [...set]
console.log(newArr); // [ 1, 2, 3, 43 ]
console.log(Array.from(set)); // [ 1, 2, 3, 43 ]
```

>注：
>1. 向Set 添加值的时候，并不会转换类型，并且能够判断两个NaN是重复项
>2. Set 判断两个空对象为不重复

### 1.1.2 Set 实例的属性和方法

属性：
>Set.prototype.constructor -- set的构造函数，默认为set函数
>Set.prototype.size -- 返回Set实例成员的总数

方法：
1）操作方法：

>add(val) -- 添加某个值，返回Set结构本身
>delete(val) -- 删除某个值，返回一个表示是否成功的布尔值
>has(val) -- 返回一个布尔值，表示是否包含某个值
>clear() -- 清除所有成员，没有返回值

```
var arr = [1,2,3,4,3,2,1,];
var set = new Set(arr);
set.add('a').add('b');
console.log(set); // Set { 1, 2, 3, 4, 'a', 'b' }
console.log(set.delete('a')) // true
console.log(set); // Set { 1, 2, 3, 4, 'b' }
console.log(set.has('b')) // true
console.log(set.clear()); // undefined
console.log(set); // Set{}
```

2）遍历操作
Set结构的实例有四个遍历方法，可以用于遍历成员。

>keys()：返回键名的遍历器
>values()：返回键值的遍历器
>entries()：返回键值对的遍历器
>forEach()：使用回调函数遍历每个成员

```
var arr = [1,2,3,1,2,1,2,11,12];
var set = new Set(arr);
for (let n of arr.keys()) {
    console.log(n);
    // 0 // 1 // 2 // 3 // 4 // 5 // 6 // 7 // 8
}
for (let n of arr.entries()) {
    console.log(n);
    // [ 0, 1 ] // [ 1, 2 ] // [ 2, 3 ] // [ 3, 1 ] // [ 4, 2 ] // [ 5, 1 ] // [ 6, 2 ] // [ 7, 11 ] // [ 8, 12 ]
}
set.forEach(function(key){
    console.log(key);
})
```

>注：！！！在使用values的时候，抛出错误

2）遍历应用
[DOME2](./html/dome2.js)
- 使用Set实现并集（Union）、交集（Intersect）和差集（Difference）。

```
let s1 = new Set([1,2,1,3,435,3,2,5]);
let s2 = new Set([1,2,1,3,12,5]);
var union = new Set([...s1,...s2]);
console.log(1);
console.log([...union]); //  [ 1, 2, 3, 435, 5, 12 ]
var Intersect = new Set([...s1].filter(function(e,i){
    return s2.has(e)
}))
console.log(Intersect); // Set { 1, 2, 3, 5 }

var Difference = new Set([...s1].filter(function(e,i){
    return !s2.has(e)
}))
console.log(Difference); // Set { 435 }
```

### 1.1.4 WeakSet 的基本介绍
WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

1. WeakSet 的成员只能是对象(实际上是只要具有[Symbol Iterator])
```
var str = 'a';
let wS = new WeakSet(str); // Invalid value used in weak set
```

2. 其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

### 1.1.5 WeakSet 与 数组

WeakSet 同样可以接受一个参数，会将这个参数的成员添加到 WeakSet 的数据结构中；

```
var attr = [[1,2],[3,4]];
let wS = new WeakSet(attr)
console.log(wS);

var attr1 = [1,2,3,4];
let wS2 = new WeakSet(attr1) // Invalid value used in weak set
```

### 1.1.6 WeakSet 实例的属性和方法

属性：
>WeakSet.prototype.constructor -- set的构造函数，默认为set函数

方法：
1）操作方法：

>add(val) -- 添加某个值，返回WeakSet结构本身
>delete(val) -- 删除某个值，返回一个表示是否成功的布尔值
>has(val) -- 返回一个布尔值，表示是否包含某个值

2) 遍历应用：

WeakSet不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

（不懂，我的理解就是，无需通过手动设置为null，就可以将其移出环境等待下次的回收）

## 1.2 Map & WeakMap
[DOME4](./html/dome4.js)
ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。
- 通过 set 来设置
- 通过 get 来获取
- 如果读取一个不存在的键，就会返回 undefined

```
var m = new Map();
m.set(1,'number');
m.set('1', 'string')
console.log(m.get(1)); // number
console.log(m.get('1')); // string
console.log(m.get(2)); // undefined
```

注意：
`console.log(['1']===['1']); // false`
由此可见set 使用内存地址来判断key值是否存在重复
```
let m = new Map();
m.set([1], 'ex1');
m.set([1], 'ex2');
console.log(m); // Map { [ 1 ] => 'ex1', [ 1 ] => 'ex2' }
```

如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。


### 1.2.1 Map 与 数组

Map 同样可以接受一个数组参数，数组中的成员是能够表示键值对的数组；

```
var arr = [['name','ff'],['age',24]];
var m = new Map(arr);
console.log(m); // Map { 'name' => 'ff', 'age' => 24 }
```

### 1.2.2 Map实例的属性和操作方法

- 属性：

1) size -- 返回Map所有成员的总数

```
var a = [[1, 'a'],[2, 'b'],[3, 'c']]
let m = new Map(a);
console.log(m); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
console.log(m.size); // 3
```

- 方法

1) set(key, value)

set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。

```
let m = new Map();
m.set(1,'a');
console.log(m); // Map { 1 => 'a' }
```
由于返回Map结构，所以可以使用链接：
```
m.set(2,'b')
 .set(3,'c');
console.log(m); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
```

2) get(key)

3) has(key)

4) delete(key)

6) clear(key)


### 1.2.3 Map的遍历方法

同Set一样,
>keys()：返回键名的遍历器。
>values()：返回键值的遍历器。
>entries()：返回所有成员的遍历器。
>forEach()：遍历Map的所有成员。

例：
```
for (let [key, val] of m) {
    console.log(key,val);
} // 1 'a' // 2 'b' // 3 'c'
相当于
for (let [key, val] of m.entries()) {
    console.log(key,val);
}
```

可以通过`...`标识符，将其转换成数组

### 1.2.4 WeakMap

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。

WeakMap 和 WeakSet 都是对象的弱引用（垃圾回收机制不会将这种引用考虑在内），当对象被移除的时候，WeakSet 就会自动移出其所在的键值对； 这种结构有助于防止内存泄漏；

但是目前对其了解不深，待补充；
