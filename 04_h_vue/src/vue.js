class Vue {
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        this.$methods = options.methods;
        this.porxy(this.$data)
        this.porxy(this.$methods)
        new Observer(this)
        new Compile(this)
        console.log(this)
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
        this.wathcers = [];
    }
    sub(watcher) {
        if (watcher) {
            this.wathcers.push(watcher);
            // console.log(this.wathcers)
        }
    }
    pub() {
        this.wathcers.forEach(cb => {
            cb.update();
        })
    }
}