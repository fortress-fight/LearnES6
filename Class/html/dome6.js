// class Person{
//     construct (name){
//         this.name = name;
//     }
//
//     sayName() {
//         this._createFakeName();
//         console.log(this.name);
//     }
//
//     _createFakeName(){
//         this.name = '就不告诉你'
//     }
// }
//
// var person1 = new Person('xiaoxiao');
// person1.sayName() // '就不告诉你'

// class Person{
//     construct (name){
//         this.name = name;
//     }
//
//     sayName() {
//         this.name = createFakeName.call(this)
//         console.log(this.name);
//     }
//
// }
//
//



class Person{
    constructor (name = 'DOTA'){
        this.name = name;
    }

    sayName() {
        // setTimeout(function(){
            console.log(this.name);
        // }, 5000)
    }
}

var person1 = new Person('xiaoxiao');
person1.sayName()

//
// let createFakeName = () => '就不告诉你';
//
// var person1 = new Person('xiaoxiao');
// person1.sayName() // '就不告诉你'
// person1.createFakeName() // person1.createFakeName is not a function

// const createFakeName = Symbol('createFakeName');
//
// class Person{
//     constructor (name = 'DOTA'){
//         this.name = name;
//         this.sayName = () => {
//             console.log(this.name);
//         }
//     }
//
//
// }
//
// var person1 = new Person('xiaoxiao');
// console.log(person1); // Person {}
//
// let {sayName} = person1;
// console.log(sayName); // [Function: sayName]
//
// sayName() // xiaoxiao
//
// console.log(Person.name); // Person
