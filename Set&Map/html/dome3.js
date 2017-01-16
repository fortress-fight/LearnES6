//
// var str = 'a';
// let wS = new WeakSet(str); // Invalid value used in weak set

var attr = [[1,2],[3,4]];
let wS = new WeakSet(attr)
console.log(wS);

var attr1 = [1,2,3,4];
let wS2 = new WeakSet(attr1) // Invalid value used in weak set
