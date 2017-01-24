class Person {
    constructor (name) {
        this.name = name
    }
}

class Student extends Person {
    constructor () {
        super()
    }
    say () {
        // super(); //'super' keyword unexpected here
        console.log(this.name);
    }
}

var student1 = new Student('ff')
student1.say() // ff
