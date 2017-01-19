// function fn (a,b,c,d){}
// console.log(fn.length); // 4
//
// function fn (a,b=1,c){}
// console.log(fn.length); // 1

// var x = 1;
//
// function fn (x, y=function(){ console.log(x+'dier'); x = 2}){
//     x = 3;
//     y()
//     console.log(x + 'diyi');
// }
// fn()
// console.log(x + 'disan');

function throwIfMissing (){
    throw new Error('Missing parameter');
}
function fn (a = throwIfMissing()) {
    return a
}
fn()
