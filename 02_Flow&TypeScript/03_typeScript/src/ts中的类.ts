// 1.基本使用

class Person {
    name: string
    age: number = 12
    private type: string = "12"
    constructor(name: string) {
        this.name = name;
    }
}


//2. 继承


class Teacher extends Person {
    types: string
    constructor(type: string) {
        super('12')
        this.types = type
    }
}


//3.访问修饰符

class Students extends Person {
    protected say() {
        // console.log(this.type)
    }
}

//4.参数属性

class Anmial {

    constructor(private name:string){}

}



//5.存取器

class People{
    private _name:string = "";
    get name():string{
        return this._name
    }
    set name(value:string){
        this._name = value;
    }
}