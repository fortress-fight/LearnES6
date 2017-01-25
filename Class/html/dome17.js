// class CreatePerson {
//     constructor (name) {
//         this.name = name;
//         console.log(new.target === CreatePerson);  // true
//     }
// }
// var person1 = new CreatePerson('ff')

// function CreatePerson (name) {
//     this.name = name;
//     console.log(new.target === CreatePerson);
// }
// var person1 = new CreatePerson('ff') // true
// CreatePerson() // false

class CreatePerson {
    constructor (name) {
        if (new.target === CreatePerson) {
            throw new Error('本类不能实例化')
        }
        this.name = name;
    }
}

class Student extends CreatePerson {
    constructor (name) {
        super (name);
        console.log(this.name);
    }
}

// var person1 = new CreatePerson('p'); // 本类不能实例化
var student1 = new Student('s') // s
