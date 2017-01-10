function Iterator (array) {
    var nowIndex = 0;
    return {
        next: function () {
            return nowIndex < array.length ?
                {value: array[nowIndex++], done: false}:
                {value: undefined, done: true}
        }
    }
}

var arr = Iterator([1,2,3,4]);
console.log(arr.next()) // { value: 1, done: false }
console.log(arr.next()) // { value: 2, done: false }
console.log(arr.next()) // { value: 3, done: false }
console.log(arr.next()) // { value: 4, done: false }
console.log(arr.next()) // { value: undefined, done: true }
