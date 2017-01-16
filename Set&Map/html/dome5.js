// var a = [[1, 'a'],[2, 'b'],[3, 'c']]
// let m = new Map(a);
// console.log(m); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
// console.log(m.size); // 3

let m = new Map();
m.set(1,'a');
console.log(m); // Map { 1 => 'a' }
m.set(2,'b')
 .set(3,'c');
console.log(m); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }

for (let [key, val] of m) {
    console.log(key,val);
} // 1 'a' // 2 'b' // 3 'c'

for (let [key, val] of m.entries()) {
    console.log(key,val);
}
