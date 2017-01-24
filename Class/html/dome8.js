class Person {
    constructor (name) {
        this.name = name;
        this.age = 24;
    }

    say () {
        return this.name;
    }
}

class Student extends Person {
    constructor (name, job) {
        super(name);
        this.job = job //  this is not defined
    }

    intor () {
        console.log(this);
        return this.name + " " +this.age +" "+ this.job;
    }
}

var student1 = new Student('xiao', 'student')

console.log(student1.intor()) // xiao 24 student

console.log(student1 instanceof Student) // true
console.log(student1 instanceof Person); // true
