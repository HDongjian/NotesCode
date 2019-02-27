console.log('opp')


class Person {
    constructor(age, name) {
        this.age = age;
        this.name = name;
    }
}



class Chiness extends Person{
    constructor(age,name,id){
        super(age,name)
        this.id = id;
    }
}

console.log(new Chiness(12,'李四',12))


// console.log(new Person(12, '张三'))



// function PersonC(){}

// PersonC.prototype.c = function(){

// }

// PersonC.a = 1;
// PersonC.b = function(){

// }