import React from 'react';


export default function Hello(props){

    //注意，不论在vue还是react中，组件props永远都是只读的，不能被重新赋值
    return <div>HELLO--{props.name}--{props.age}</div>

}