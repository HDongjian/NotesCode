class Vue {
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        this.$methods = options.methods;
        new Observer(this)
        new Compile(this)
    }
}


class Dep {
    constructor() {
        this.wathcers = [];
    }
    sub(watcher) {
        if (watcher) {
            this.wathcers.push(watcher);
            console.log(this.wathcers)
        }
    }
    pub() {
        this.wathcers.forEach(cb => {
            cb.update();
        })
    }
}