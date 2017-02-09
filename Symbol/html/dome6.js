var a = require('./dome5.js')
console.log(global[Symbol.for('foo')]()); //这里是传出的实例
