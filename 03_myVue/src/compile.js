class Compile {
    constructor(el, vm) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.vm = vm;

        if (this.el) {
            let fragment = this.node2fragment(this.el)
            this.compile(fragment)
            document.body.appendChild(fragment)
        }
    }

    /**
     * 核心方法-生成文档碎片
     * @param {根Dom对象} node 
     */
    node2fragment(node) {
        let fragment = document.createDocumentFragment();
        let childNodes = node.childNodes;
        this.toArray(childNodes).forEach(node => {
            fragment.appendChild(node);
        });
        return fragment
    }

    /**
     * 解析文本碎片
     * @param {文本碎片} fragment 
     */
    compile(fragment) {
        let childNodes = fragment.childNodes;

        this.toArray(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElement(node)
            }

            if (this.isTextNode(node)) {
                this.compileText(node)
            }

            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }

    /**
     * 解析元素节点
     * @param {节点} node  
     */
    compileElement(node) {
        // 1.获取所有当前节点下的属性
        let attributes = node.attributes;
        this.toArray(attributes).forEach((attr) => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                let type = attrName.slice(2);
                let expr = attr.value;
                if (this.isEventDirective(type)) {
                    let eventType = attrName.split(':')[1];
                    CompileUtil.eventHandler(node, this.vm, eventType, expr)
                } else {
                    CompileUtil[type] && CompileUtil[type](node, this.vm, expr)
                }
            }
        })
    }

    /**
     * 解析文本节点
     * @param {节点} node 
     */
    compileText(node) {
        // debugger
        CompileUtil.mustache(node, this.vm)
    }

    /**
     * 工具方法-类数组转化数组
     * @param {类数组} likeArray 
     */
    toArray(likeArray) {
        return [].slice.call(likeArray)
    }

    /**
     * 判断是否是元素节点
     * @param {node} node 
     */
    isElementNode(node) {
        return node.nodeType === 1;
    }

    /**
     * 判断是否是文本节点
     * @param {node} node 
     */
    isTextNode(node) {
        return node.nodeType === 3;
    }

    /**
     * 判断是否属于指令
     * @param {自定义属性名称} attrName 
     */
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }

    /**
     * 判断是否是事件自定义属性
     * @param {自定义属性名称} attrName 
     */
    isEventDirective(attrName) {
        return attrName.split(":")[0] === 'on';
    }
}

//解析节点函数集合
let CompileUtil = {

    /**
     * @param {节点} node 
     * @param {vue对象} vm 
     * @param {指令内容} expr 
     */
    //解析文本节点
    mustache(node, vm) {
        let txt = node.textContent;
        let reg = /\{\{(.+)\}\}/;
        if (reg.test(txt)) {
            let expr = RegExp.$1;
            node.textContent = txt.replace(reg, this.getVMValue(vm, expr))
            new Watcher(vm, expr, (newVlaue, oldValue) => {
                node.textContent = txt.replace(reg, newVlaue)
            })
        }
    },
    //解析v-text指令
    text(node, vm, expr) {
        // debugger
        node.textContent = this.getVMValue(vm, expr)
        new Watcher(vm, expr, (newVlaue, oldValue) => {
            node.textContent = newVlaue
        })
    },
    //解析v-html指令
    html(node, vm, expr) {
        node.innerHTML = this.getVMValue(vm, expr)
        new Watcher(vm, expr, (newVlaue, oldValue) => {
            node.innerHTML = newVlaue
        })
    },
    //解析v-modal指令
    modal(node, vm, expr) {
        node.value = this.getVMValue(vm, expr)
        new Watcher(vm, expr, (newVlaue, oldValue) => {
            node.value = newVlaue
        })
        node.addEventListener('input', function() {
            var arr = expr.split('.');
            var data = vm.$data;
            arr.forEach((v, i) => {
                if (i == arr.length - 1) {
                    data[v] = this.value;
                } else {
                    data = data[v];
                }
                // console.log(data);
            })
        })
    },
    //解析v-on指令
    eventHandler(node, vm, eventType, expr) {
        node.addEventListener(eventType, vm.$methods[expr].bind(vm))
    },
    //获取VM中的数据
    getVMValue(vm, expr) {
        let data = vm.$data;
        expr.split('.').forEach(key => {
            data = data[key]
        })
        return data;
    }
}