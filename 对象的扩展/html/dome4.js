var  obj = {
    name: 'ff'
}
var infor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(infor);
//{ value: 'ff',
// writable: true,
// enumerable: true,
// configurable: true }
