// var obj = {
//     name: 'ff',
//     age: 24
// };
// console.log('name' in obj) // true
// console.log(Reflect.has(obj,'name')); // true

// var obj = {
//     name: 'ff',
//     age: 24
// };
// delete obj.name;
// console.log(obj); // { age: 24 }
//
// var obj = {
//     name: 'ff',
//     age: 24
// };
// Reflect.deleteProperty(obj,'name')
// console.log(obj); // { age: 24 }

// function createPerson (name){
//     this.name = name
// }
//
// createPerson.prototype = {
//     construct: createPerson,
//     say: function (){
//         console.log(this.name);
//     }
// }
//
// var person1 = new createPerson('xiaobai')
// person1.say() // xiaobai
//
// var person2 = Reflect.construct(createPerson, 'xiaohong')
// // console.log(person2);


// function createPerson (){
//     this.name = 'ff'
// }
//
// createPerson.prototype = {
//     construct: createPerson
// }
//
// var person = new createPerson()
// console.log(Reflect.getPrototypeOf(person)) // { construct: [Function: createPerson] }

// function createPerson(){
//     this.name = 'xiaobai'
// };
// createPerson.prototype = {
//     construct: createPerson,
//     say: function (){
//         console.log(this.name);
//     }
// }
// function createDog(){};
// createDog.prototype = {
//     construct: createDog,
//     say: function (){
//         console.log('wangwang');
//     }
// }
// var person = new createPerson();
//
// Reflect.setPrototypeOf(person, createDog.prototype)
// person.say() // wangwang


// Reflect.defineProperty(target, propertyKey, attributes)
// Reflect.getOwnPropertyDescriptor(target: ?, property: string)

// var obj = {}
// console.log(Reflect.defineProperty(obj, 'name', {value:'ff'}))
// console.log(1);
// console.log(obj.name);
// console.log(obj);
// console.log(Reflect.getOwnPropertyDescriptor(obj, 'name'));
// // { value: 'ff',
// //   writable: false,
// //   enumerable: false,
// //   configurable: false }



var obj = {
    name: 'ff',
    age: 24,
    [Symbol('job')]: 'student'
}
console.log(obj); //{ name: 'ff', age: 24 }
console.log(Reflect.ownKeys(obj)); //[ 'name', 'age', Symbol(job) ]
for (val of Reflect.ownKeys(obj)) {
    console.log(obj[val]);
}
// ff
// 24
// student
