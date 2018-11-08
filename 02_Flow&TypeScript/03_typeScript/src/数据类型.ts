let b: number = Infinity;
let n2: number = 0xA12;
let n3: number = 0b1010;
let n4: number = 0o75;

let str: string = "abc";

let str2: string = "${str}def"


function error(message: string): never {
    throw new Error(message)
}


function fail(message: string) {
    return error(message)
}

function infinitloop(): never {
    while (true) { }
}

enum Color {
    Red = 1,
    Green = 2,
}


let someVal:any = 'this is a string';
// 断言1

let someLen:number =(<string>someVal).length;
// 断言2
let someLe2:number =(someVal as string).length;

