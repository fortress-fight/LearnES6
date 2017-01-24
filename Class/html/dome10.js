class Person {
    constructor (name) {
        this.name = name;
    }

    say () {
        return this.name
    }
}

class Student {

}

// 继承prototype的原型对象
Object.setPrototypeOf(Student.prototype, Person.prototype)
// 继承静态属性
Object.setPrototypeOf(Student, Person)


var student1 = new Student('ff');

console.log(student1.__proto__ === Student.prototype) // true
console.log(student1.__proto__ === Person); // false
console.log(Student.__proto__ === Person.prototype); // false
console.log(Student.prototype.__proto__ === Person.prototype); // true
