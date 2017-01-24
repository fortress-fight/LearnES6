// function Person (name) {
//     this.name = name;
// }
// person.prototype = {
//     constructor: person,
//     say: function () {
//         console.log(this.name);
//     }
// }
// var person1 = new person('xiaobai');
// person1.say()

class Person {
    constructor (name) {
        this.name = name;
    }

    say () {
        console.log(this.name);
    }
}
var person1 = new Person ('xiaohei');

person1.say() // xiaohei
