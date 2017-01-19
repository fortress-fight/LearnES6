// var fn = () => {};
//
// var a = new fn()
// //fn is not a constructor


var fn = (...arg) => {console.log(arg);} //[ 1, 2, 3, 4 ]
fn(1,2,3,4)
