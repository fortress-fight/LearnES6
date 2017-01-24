let person = new class Person {
    constructor(name){
        this.name = name;
    }

    sayName(){
        console.log(this.name);
    }
} ('ff')

person.sayName()

let newDog = class createDog{
    say(){
        console.log('WW');
    }
}

var dog1 = new newDog()
dog1.say() // ww
