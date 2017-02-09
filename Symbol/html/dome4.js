let A = Symbol.for('A');
let B = Symbol.for('A');
console.log(A===B); // true

let C = Symbol('c')
let D = Symbol('c')
console.log(C===D); // false

console.log(Symbol.keyFor(B)); // A
