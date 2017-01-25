class CreatePerson {
    constructor (name) {
        this.name = name;
    }
    get prop() {
        return 'getter'
    }
    set prop(value) {
        console.log('setter' + value);
    }
}

let person1 = new CreatePerson('ff');

person1.prop = ' say hi'; // setter say hi

console.log(person1.prop); // getter
