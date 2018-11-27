class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // debugger
        Dep.target = this;
        console.log(0)
        this.oldValue = this.getVmValue(expr);
        Dep.target = null;
    }

    update() {
        console.log(this)
        let oldValue = this.oldValue;
        let newValue = this.getVmValue(this.expr)
            // console.log
            // debugger
        if (oldValue !== newValue) {
            this.cb(newValue, oldValue)
        }
    }

    getVmValue(type) {
        var data = this.vm.$data;
        type.split('.').forEach(k => {
            data = data[k]
        })
        return data;
    }
}