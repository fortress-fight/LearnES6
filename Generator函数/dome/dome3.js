var obj1 = {
    name: 'ff',
    age: '24',
    job: 'student'
};

function* objEntres(obj) {
    let propkeys = Reflect.ownKeys(obj);

    for (let propkey of propkeys) {
        yield [propkey, obj[propkey]]
    }
}

for (let [item, value] of objEntres(obj1)) {
    console.log(`${item}:${value}`)
}

// name:ff
// age:24
// job:student