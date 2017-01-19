// function fn (x=7,y=7) {
//     console.log(x,y);
// }
// fn() // 7  7

// function fn ([x,y=7]) {
//     console.log(x, y); // 10 7
// }
// fn ([10])
// 相当于 var [x,y=7] = [10]

function fn ([x,y=7] = []) {
    console.log(x, y); // 10 7
}
fn () // Cannot match against 'undefined' or 'null'.
