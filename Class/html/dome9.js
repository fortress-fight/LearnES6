class Person {
    constructor (name) {
        this.name = name;
    }

    say () {
        return this.name
    }
}

class Student extends Person {

}

var student1 = new Student('ff');

console.log(student1.__proto__ === Student.prototype) // true
console.log(Student.__proto__ === Person.prototype); // false
console.log(Student.prototype.__proto__ === Person.prototype); // true
