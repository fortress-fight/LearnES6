// var obj = {
//     name: 'ff',
//     age: '24',
//     job: 'student',
//     get baz(){
//         console.log(this); // obj2
//         return 1
//     }
// };
// var obj2 = {
//
// }
// console.log(Reflect.get(obj,'name')); // ff
// console.log(Reflect.get(obj,'parent')); // undefined
// console.log(Reflect.get(obj,'baz'), obj2); // undefined

var obj = {
    set fn(v) { // 必须写上形参不然会报错，这里接受到的是value
        console.log(this.v = v); // 1
    }
};
var obj1 = {
    name: 'obj1'
}
Reflect.set(obj,'name','ff');

Reflect.set(obj,'fn', 1, obj1);  // 触发set
console.log(obj); //{ fn: [Setter], name: 'ff' }
console.log(obj1); // { name: 'obj1', v: 1 }
