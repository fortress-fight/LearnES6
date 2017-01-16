// var m = new Map();
// m.set(1,'number');
// m.set('1', 'string')
// console.log(m.get(1)); // number
// console.log(m.get('1')); // string
// console.log(m.get(2)); // undefined

// var arr = [['name','ff'],['age',24]];
// var m = new Map(arr);
// console.log(m); // Map { 'name' => 'ff', 'age' => 24 }

console.log(['1']===['1']); // false
let m = new Map();
m.set([1], 'ex1');
m.set([1], 'ex2');
console.log(m); // Map { [ 1 ] => 'ex1', [ 1 ] => 'ex2' }
