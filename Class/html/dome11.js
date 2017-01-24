var obj = {
    name: ['ff', 'xiao']
}
var obj1 = Object.create(obj);
obj1.name.push(1)
obj1.age = 24
console.log(obj1.name); // [ 'ff', 'xiao', 1 ]
console.log(obj.name); // [ 'ff', 'xiao', 1 ]
console.log(obj.age); // undefined
