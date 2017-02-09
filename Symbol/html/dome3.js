var obj = {
    [Symbol('1')]: 'a',
    [Symbol('2')]: 'b'
}
console.log(Object.getOwnPropertySymbols(obj)); //[ Symbol(1), Symbol(2) ]
console.log(Reflect.ownKeys(obj)); //[ Symbol(1), Symbol(2) ]
