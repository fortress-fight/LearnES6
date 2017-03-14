function* gener() {
    try {
        yield
    } catch (error) {
        console.log('内部拋错', error)
    }
};

var exam = gener();

exam.next(); // 执行到 try 中的 yield ，然后继续

exam.throw('a'); // 内部拋错 undefined

try {
    exam.throw('b')
} catch (error) {
    console.log('外部拋错', error) // 外部拋错 b
}