# Learn ES6

## 1 Promise 对象
### 1.1 基础
#### 1.1.1 Promise对象的含义
Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件

#### 1.1.2 Promise 对象的特点
- 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。(值得注意的是，如果resolve()出现在reject()前就状态只会停留在resolve)
- 一旦状态改变，就不会再变，并且任何时候都可以得到这个结果。Promise对象的状态改变，

Promise也有一些缺点。
- 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 1.2 Promise 对象的基本用法

ES6 中规定，Promise对象是一个构造函数(接受一个函数)，用于生成Promise实例
下面代码创造了一个Promise实例。
```
new Promise(executor: fn(resolve: fn(value: ?), reject: fn(reason: ?)))
```
其中
- resolve 将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
- reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

当函数执行结束以后可以通过 then 的方法去执行相应的函数：

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
实例：
```
function timeOut (ms) {
  console.log(1);
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 2)
  })
};

timeOut(1000).then((num) => console.log(num));
```

执行：首先打印出 1，然后在 1s 以后打印出2

注意：这种回调方式，是在函数的__同步任务__执行结束以后才会执行，而不是根据resolve的位置决定执行顺序；

### 1.3 Promise 对象的实际应用

#### 1.3.1 图片异步加载

```
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

#### 1.3.2 Promise 对象处理 Ajax

```
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

### 1.4 Promise.prototype.then()
前面已经介绍了then的方法，可以看出then方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。
then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。
```
Promise.prototype.then(onFulfilled: fn(value: ?), onRejected: fn(reason: ?))
```

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
```
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

### 1.5 Promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
`.catch(onRejected: fn(reason: ?));`

```
getJSON("/posts.json").then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

注：
1. Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
2. 一般不建议在 then 中定义 reject 的回调函数，而是在最后 通过 catch 统一抓取；
3. 如果不存在函数接受 reject ，Promise 将会不会对错误产生任何行为
4. catch 会继续返回 promise 对象

### 1.6 Promise.all() || Promise.race()

Promise.all 和 Promise.race 方法用于将多个Promise实例，包装成一个新的Promise实例。
```
Promise.all(iterable: [Promise])
Promise.race(iterable: [Promise])
```

上面代码中，Promise.all 和 Promise.race方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。
（Promise.all || Promise.race方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）

区别：
1. Promise.all([p1, p2, p3])
p的状态由p1、p2、p3决定，分成两种情况。

- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

2. var p = Promise.race([p1, p2, p3]);
p的状态由p1、p2、p3决定。

- p1 p2 p3 只要有一个状态发生变化就会改变 p 的状态

### 1.6 Promise.resolve()

将一个对象转化成一个 Promise 对象

Promise.resolve等价于下面的写法。
```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

可以接受的参数：

1. Promise 实例
 如果传入的是一个Promise实例的话，将会原封不动的返回这个实例

2. 参数是一个thenable对象
 thenable 对象是指一个具有 then 方法的对象
 这个then方法会立即执行；
 ```
 var obj = {
   then () {
     console.log(1);
   }
 };
 var newPro = Promise.resolve(obj)
 ```
3. 参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。
```
var str = 'hello';
var newPro = Promise.resolve(str);

newPro.then(()=>{
  console.log(1);
})
```

4. 无参数
如果没有参数那么将会返回一个 resolve 状态的 Promise对象，并且是在本轮循环结束的时候，进入resolve状态的；
解释：

```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');
```

### 1.7 Promise.reject()

与Promise.resolve 的表现一致

### 1.8 两个有用的附加方法

#### 1.8.1 done()
Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
```
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```
它的实现代码相当简单。
```
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
```
从上面代码可见，done方法的使用，可以像then方法那样用，提供Fulfilled和Rejected状态的回调函数，也可以不提供任何参数。但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。

### 1.8.2 finally()
finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

下面是一个例子，服务器使用Promise处理请求，然后使用finally方法关掉服务器。
```
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
它的实现也很简单。
```
```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
上面代码中，不管前面的Promise是fulfilled还是rejected，都会执行回调函数callback。
简介解释一下：如果执行到最后一步的时候，先将 Promise 对象保存起来，然后利用Promise.resolve()将callback()(这里会立即执行callback),然后将其转化成为Promise对象，由于是非promise对象的参数所有立即调用then方法；

### 1.8.3 Promise.try()

不是很懂，简单的说一部分：

如果我们不知道一个行为是否是需要异步执行，可以通过
```
console.log(1);
new Promise(function (resolve, reject) {
  console.log('one');
  resolve()
}).then(function () {
  console.log('two');
})
console.log('three');
// 1 => one => two
```
简写成：

```
console.log('one');
Promise.resolve().then(function () {
  console.log('two');
})
console.log('three');
// one => three => two
```
来保证其能够异步执行；
但是，如果想要执行的是一个同步的事件呢

置于如何让同步表现成同步，异步表现出异步没能理解
