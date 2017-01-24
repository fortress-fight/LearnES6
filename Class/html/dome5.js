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
// let createFakeName = () => '就不告诉你';
//
// var person1 = new Person('xiaoxiao');
// person1.sayName() // '就不告诉你'
// person1.createFakeName() // person1.createFakeName is not a function

const createFakeName = Symbol('createFakeName');

class Person{
    construct (name){
        this.name = name;
    }

    sayName() {
        this[createFakeName]();
        console.log(this.name);
    }

    [createFakeName](){
        console.log(1);
        this.name = '我忘了'
    }

}

var person1 = new Person('xiaoxiao');
person1.sayName() // 我忘了
