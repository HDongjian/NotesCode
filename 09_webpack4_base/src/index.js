
import React from 'react';
import ReactDOM from 'react-dom';

// import './oop.js'


//如果不做单独配置不能省略后缀名
//@符号表示src目录下，也是经过webpack配置的
import Hello from '@/components/hello'

const li = {
    name:'小白',
    age:"12"
}



class Movie extends React.Component{

    constructor(){
        super();
        this.state={
            msg:"大家好"
        }
    }

    render(){
        return <div>{this.props.name}---{this.state.msg}</div>
    }
}


ReactDOM.render(<div>
    <Movie {...li}></Movie>
</div>,document.getElementById('app'));

