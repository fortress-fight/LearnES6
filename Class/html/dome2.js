// class Person {
//
// }
// console.log(typeof Person); // function
// console.log(Person.prototype.constructor === Person) // true

class Person {
    constructor(name) {
        this.name = name;
    }

    say () {
        console.log(this.name);
    }
}
var person1 = new Person('xiaoming');
person1.say() // xiaoming
// 相当于
// function Person (name){
//      this.name = name;
// }
//
// Person.prototype = {
//      say(){
//          console.log(this.name)
//      }
// }
//
