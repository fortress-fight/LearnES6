class CreatePerson {
    constructor (name) {
        this.name = name;
        this.job = 'student';
    }

    static sayJob () {
        console.log(this.name); // undefined
        return 'student'
        // console.log(this.job);
    }
}

console.log(CreatePerson.sayJob()) // student

var person1 = new CreatePerson ('xiaoxiao');
// person1.sayJob() // person1.sayJob is not a function

class CreateStudent extends CreatePerson {
    sayHi () {
        console.log('My job is a '+ super.sayJob() +' ');
    }
}
CreateStudent.sayJob() // student

var student1 = new CreateStudent();
CreateStudent.sayHi()  // My job is a student
