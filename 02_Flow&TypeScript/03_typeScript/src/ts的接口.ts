// 1.基本使用

interface AjaxOptins {
    url: string
    type?: string
    data: object
    success(data: object): void;
}

function ajax(options: AjaxOptins) {

}

ajax({
    url: "http",
    data: {},
    success(data: object) {

    }
})

// 3. 额外的属性检查
interface Point {
    readonly x: number
    y: number,
    [propName: string]: any,
}

let poi: Point = {
    x: 10,
    y: 10,
    z: 19,
}


// 类类型

interface ClockInterFace {
    currentTime: Date,
}

class Clock implements ClockInterFace {
    currentTime: Date = new Date()
    constructor(h: number, m: number) {

    }
}


//接口继承接口

interface TwoPointP {
    x: number,
    y: number,
}

interface ThreePointP extends TwoPointP {
    z: number
}

let poi2: ThreePointP = {
    z: 100,
    x: 100,
    y: 100
}


// 函数类型接口

interface SumInterface{
    (a:number,b:number):number
}

let sum:SumInterface = function(a:number,b:number){
    return a+b
}


// 接口继承类

class Animal {
    name:string =""
    eat(){}
}

interface AnimalInterFace extends Animal{

}

class Bird implements AnimalInterFace {
    name:string = "12"
    eat(){}
}