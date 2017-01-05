// function ex ([x, y]) {
//     console.log(x, y); // 1 2
// };
// ex([1,2])

// -----------------默认值

// function ex ([x=1, y=2]) {
//     console.log(x, y); // 3 , 2
// }
// ex([3])
//
// function ex ({x=1, y=2}) {
//     console.log(x, y); // error
// }
// ex()

function ex ({x=2, y = 4} = {}) {
    console.log(x , y); // a 4
}

ex({x:'a'})
