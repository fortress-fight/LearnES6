var arr = [1,2,3,4];
var obj = {
    name: 'ff',
    age: '24'
}
obj[Symbol.iterator] = function (){
    var self = this;
    var val = Object.keys(self);
    function next () {
        if (key = val.shift()) {
            return {
                value: self[key],
                done: false
            }
        } else {
            return {
                done: true
            }
        }
    };
    var iterator = {
        next: next
    };
    return iterator;
};

for (val of obj) {
    console.log(val);
}
