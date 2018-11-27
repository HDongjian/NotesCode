class Compile {
    constructor(vm) {
        this.$vm = vm
        this.$el = vm.$el;
        this.$data = vm.$data;
        this.$methods = vm.$methods;
        let fragment = document.createDocumentFragment();
        let childNodes = this.$el.childNodes;
        this.toArray(childNodes).forEach(node => {
            fragment.appendChild(node)
        });
        this.compile(fragment)
        document.body.appendChild(fragment)
    }

    compile(fragment) {
        this.toArray(fragment.childNodes).forEach(node => {
            if (node.nodeType === 1) {
                //元素节点
                this.compileElement(node);
                if (node.childNodes && node.childNodes.length > 0) {
                    this.compile(node);
                }
            } else if (node.nodeType === 3) {
                //文本节点
                this.compileText(node)
            }
        });
    }
    compileText(node) {
        // console.log(node)
        const reg = /\{\{(.+)\}\}/
            // console.log(reg.test(node.nodeValue))
        if (reg.test(node.nodeValue)) {
            const expr = RegExp.$1;
            if (expr.indexOf('.') >= 0) {
                node.textContent = this.getVmValue(expr)
                new Watcher(this.$vm, expr, (newAalue, oldValue) => {
                    node.textContent = newAalue;
                })
            } else {
                node.textContent = this.$data[expr]
                new Watcher(this.$vm, expr, (newAalue, oldValue) => {
                    node.textContent = newAalue;
                })

            }
        }

    }

    getVmValue(type) {
        var data = this.$data;
        type.split('.').forEach(k => {
            data = data[k]
        })
        return data;
    }
    compileElement(node) {
        // console.dir(node)
        let attributes = node.attributes;
        this.toArray(attributes).forEach((attr) => {
            const attrName = attr.name;
            const expr = attr.value;
            if (attrName.startsWith('v-')) {
                const type = attrName.slice(2);

                if (type === 'text') {
                    node.textContent = this.getVmValue(expr)
                    new Watcher(this.$vm, expr, (newAalue, oldValue) => {
                        node.textContent = newAalue;
                    })
                } else if (type === 'html') {
                    node.innerHTML = this.getVmValue(expr)
                    new Watcher(this.$vm, expr, (newAalue, oldValue) => {
                        node.innerHTML = newAalue;
                    })
                } else if (type === 'model') {
                    node.value = this.getVmValue(expr)
                    new Watcher(this.$vm, expr, (newAalue, oldValue) => {
                        node.value = newAalue;
                    })
                }
                // console.log(type)
                if (type.startsWith('on:')) {
                    // console.log(expr)
                    const events = type.split(':')[1]
                        // console.log(this.$methods[expr])
                    if (events) {
                        node.addEventListener(events, this.$methods[expr].bind(this))
                    }
                }
            }
        })
    }

    toArray(likeArray) {
        return [].slice.call(likeArray)
    }
}