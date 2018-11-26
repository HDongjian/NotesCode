class Vue {
    constructor(option = {}) {
        this.$el = option.el;
        this.$data = option.data;
        this.$methods = option.methods;
        new Observer(this.$data);
        this.porxy(this.$data)
        this.porxy(this.$methods)
        if (this.$el) {
            //compile负责解析模板的内容
            let c = new Compile(this.$el, this);
        }
    }
    porxy(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return data[key]
                },
                set(newvalue) {
                    if (data[key] === newvalue) {
                        return
                    }
                    data[key] = newvalue;
                }
            })
        })
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}