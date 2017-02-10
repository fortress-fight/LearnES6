# Learn ES6

## 1 Module

### 1.1 export & import 命令

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

#### 1.1.1 基础

1）export 输出变量

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。

```
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```
上面代码是profile.js文件，保存了用户信息。ES6将其视为一个模块，里面用export命令对外部输出了三个变量。

或是写成：

```
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```
上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

2） export 输出函数或者类

export命令除了输出变量，还可以输出函数或类（class）。
```
export function multiply(x, y) {
  return x * y;
};
```
上面代码对外输出一个函数multiply。

3） import 接受变量

```
import { name, age } from './dome'
```
>注：
1. import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js路径可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
2. import命令具有提升效果，会提升到整个模块的头部，首先执行。
3. import语句会执行所加载的模块，因此可以有下面的写法。
`import 'lodash';`
上面代码仅仅执行lodash模块，但是不会接受任何值。
4. 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
```
import 'lodash';
import 'lodash';
```
5. 上面代码加载了两次lodash，但是只会执行一次。
```
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```
上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式。
6. import 中只能使用静态变量
7. 可以通过 import * 去接受一个模块中除了 export default 的所有输出

#### 1.1.2 关键字 as

通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
```
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。
需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。

`import { name as surname } from './profile';`


#### 1.1.3 export 接口

1） 通过接口输出

```
// 报错
export 1;

// 报错
var m = 1;
export m;
```
上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样
```
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```
上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

同样的，function和class的输出，也必须遵守这样的写法。
```
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```
另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```
上面代码输出变量foo，值为bar，500毫秒之后变成baz。

最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
```
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```
上面代码中，export语句放在函数之中，结果报错。

使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

### 1.2 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（\*）指定一个对象，所有输出值都加载在这个对象上面。

下面是一个circle.js文件，它输出两个方法area和circumference。
```
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
现在，加载这个模块。
```
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```
上面写法是逐一指定要加载的方法，整体加载的写法如下。
```
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```
看来是必须要使用 as；

### 1.3 export default 命令

从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。这样就可以通过指定任意名字接受。

例如：
```
// export-default.js
export default function () {
  console.log('foo');
}
```
```
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

>注：
> 1. 这是import命令后面不需要使用大括号
> 2. 这里如果输出的不是一个匿名函数也会当成匿名函数处理
> 3. export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。
> 4. 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

export default 可以和 export 同时使用

如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。
例如：
```
import _, { each } from 'lodash';
```
对应上面代码的export语句如下。
```
export default function (obj) {
  // ···
}
export function each(obj, iterator, context) {
  // ···
}
export { each as forEach };
```

### 1.4 export 与 import 的复合写法
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
```
export { foo, bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
export { foo, bar };
```
上面代码中，export和import语句可以结合在一起，写成一行。

模块的接口改名和整体输出，也可以采用这种写法。
```
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```
默认接口的写法如下。
```
export { default } from 'foo';
```
具名接口改为默认接口的写法如下。
```
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```
同样地，默认接口也可以改名为具名接口。

```
export { default as es6 } from './someModule';
```

### 1.5  ES6 的模块加载的实质

ES6 的模块实质是值的引用而不是通过拷贝实现的
- 原文中 是将 ES6 模块加载与 commonJS 的模块加载做了比较，这里就不深入探讨

 
