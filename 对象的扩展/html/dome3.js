// function addInfor (obj) {
//     Object.assign(obj, {name: 'ff', age:'24'})
// }
//
// let person = {};
// addInfor(person);
// console.log(person); //{ name: 'ff', age: '24' }

// class Person {
//     constructor (name, age) {
//         Object.assign(this,{name,age})
//     }
// };
//
// var a = new Person('ff','24')
// console.log(a);// Person { name: 'ff', age: '24' }

// --------- 为对象添加方法

// class Person {
//     constructor (name, age) {
//         Object.assign(this,{name,age})
//     }
// };
// Object.assign(Person.prototype, {
//     say () {
//         console.log(this.name);
//     }
// })
//
// var person1 = new Person('xiaom','24');
// console.log(person1);
// person1.say() //xiaom

// -------------- 克隆对象
//
// let newObj = {};
// let obj = {
//     name: 'ff',
//     age: '24',
//     job: 'student',
//     home: {
//         size: 'big'
//     }
// }
//
// Object.assign(newObj, obj);
// console.log(1);
// newObj.name = 'xiaob'
// console.log(newObj); // { name: 'xiaob', age: '24', job: 'student', home: { size: 'big' } }
// console.log(obj); // { name: 'ff', age: '24', job: 'student', home: { size: 'big' } }
// newObj.home.size = 'veryBig'
// console.log(obj); //{ name: 'ff', age: '24', job: 'student',home: { size: 'veryBig' } }

// ------------------ 为属性指定默认值

const Init = {
    name: 'ff',
    age: '24'
}

function newPerson (set) {
    var infor = {};
    Object.assign(infor, Init, set)
    console.log(infor); // { name: 'ff', age: 11, job: 'student' }
}
newPerson({
    age: 11,
    job: 'student'
})
