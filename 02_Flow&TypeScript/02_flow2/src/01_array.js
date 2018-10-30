//@flow


//1.数组
let a: Array < number > = [1, 2, 3];


//2.函数

function test(a: number, b: number): number {
    return a + b;
};

test(1, 2);


//3.maybe

function test2(a: ? number) {
    a = a || 0;
    console.log(a)
}

test2()
test2(1)


//3.或 |

let b: number | string = 1;

b = 1;
b = '1'


//4.Object

function greet(obj: { sayHello: () => void, name: string }) {
    obj.sayHello();
}