const FOO = Symbol.for('foo');
global[FOO]= function () {
    console.log('这里是传出的实例');
}
exports = global[FOO];
