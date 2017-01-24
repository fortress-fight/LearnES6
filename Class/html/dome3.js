let sayN = 'sayName'
class Person {
    constructor (name) {
        this.name = name
    }

    [sayN] () {
        console.log(this.name);
    }
}
var addFn = {
    sayHi () {
        console.log("Hello ，My name is " + this.name);
    }
}

Object.assign(Person.prototype, addFn);

var person1 = new Person('ff');

person1.sayName() // ff
person1.sayHi() // Hello ，My name is ff

console.log(Object.keys(Person)); // []
console.log(Object.getOwnPropertyNames(Person)); // [ 'length', 'name', 'prototype' ]
