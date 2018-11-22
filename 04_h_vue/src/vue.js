class Vue {
    constructor(options) {
        // console.log(options)
        // console.log(this)
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        this.$methods = options.methods;

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
            const type = RegExp.$1;
            if (type.indexOf('.') >= 0) {
                var data = this.$data;
                type.split('.').forEach(k => {
                    data = data[k]
                })
                console.log(data)
                node.textContent = data
            } else {
                node.textContent = this.$data[type]
            }
        }

    }
    compileElement(node) {
        // console.dir(node)
        let attributes = node.attributes;
        this.toArray(attributes).forEach((attr) => {
            const attrName = attr.name;
            const attrValue = attr.value;
            if (attrName.startsWith('v-')) {
                const type = attrName.slice(2);

                if (type === 'text') {
                    node.textContent = this.$data[attrValue]
                } else if (type === 'html') {
                    node.innerHTML = this.$data[attrValue]
                } else if (type === 'model') {
                    node.value = this.$data[attrValue]
                }
                // console.log(type)
                if (type.startsWith('on:')) {
                    // console.log(attrValue)
                    const events = type.split(':')[1]
                        // console.log(this.$methods[attrValue])
                    if (events) {
                        node.addEventListener(events, this.$methods[attrValue].bind(this))
                    }
                }
            }
        })
    }





    toArray(likeArray) {
        return [].slice.call(likeArray)
    }
}


// function Vue(options) {
//     console.log(options)
// }