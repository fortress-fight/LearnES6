class Person {
    constructor (name) {
        this.name = name
    }
    sayHi (){
        console.log(`Hi My name is ${this.name}`);
    }
}

class Student extends Person {
    constructor (name) {
        super(name)
    }
    say () {
        super.sayHi()
    }
}

var student1 = new Student('ff')
student1.say() // Hi My name is ff
