class Person {
    constructor (name = 'ff') {
        this.name = name;
    }

    say () {
        console.log(this.name);
        return this.name;
    }
}

class Student extends Person {
    job () {
        return `My name is ${super.say()} , I'm a student`
    }
}

var student1 = new Student;

student1.say() // ff

console.log(student1.job()) // My name is ff , I'm a student
