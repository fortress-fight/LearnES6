// const a = 3.12;
// a = 3;
// console.log(a); // Assignment to constant variable.

// --------------------- 1

// const a; // Missing initializer in const declaration

// ---------------- 2

// const foo = {};
// foo.prop  =  11;
// console.log(foo); //{ prop: 11 }

const foo = {};
Object.freeze(foo)
foo.prop  =  11;
console.log(foo); //{}
