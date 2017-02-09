// function getArea (shape, option)  {
//     var area = 0;
//     switch (shape) {
//         case 'T':
//             area = 0.5 * option.width * option.height;
//             break;
//     }
//     return area;
// }
// var r = getArea('T', {width:200, height:100})
// console.log(r); // 10000

var select = {
    'T': Symbol('T')
}
function getArea (shape, option) {
    var area = 0;
    switch (shape) {
        case select.T:
            area = 0.5 * option.width * option.height;
            break;
    }
    return area;
}
var r = getArea(select.T, {width: 200, height: 100})
console.log(r); // 10000
