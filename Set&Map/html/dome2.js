let s1 = new Set([1,2,1,3,435,3,2,5]);
let s2 = new Set([1,2,1,3,12,5]);
var union = new Set([...s1,...s2]);
console.log(1);
console.log([...union]); //  [ 1, 2, 3, 435, 5, 12 ]
var Intersect = new Set([...s1].filter(function(e,i){
    return s2.has(e)
}))
console.log(Intersect); // Set { 1, 2, 3, 5 }

var Difference = new Set([...s1].filter(function(e,i){
    return !s2.has(e)
}))
console.log(Difference); // Set { 435 }
