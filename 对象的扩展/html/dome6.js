var obj1= {
    name: 'ff',
    job: 'student'
}

var arr = Object.keys(obj1)
console.log(arr); //[ 'name', 'job' ]

// var arrV = Object.values(obj); Object.values is not a function
// console.log(arrV);

var arr1 = [1,2,3,4]
for (v of arr1.entries()) {
    console.log(v);
}

function values(obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
        arr.push(obj[key])
    }
    return arr;
}

var arr3 = values(obj1);
console.log(arr3);
// [ 'ff', 'student' ]

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}

var arr4 = entries(obj1);
console.log(arr4);
// [ [ 'name', 'ff' ], [ 'job', 'student' ] ]
