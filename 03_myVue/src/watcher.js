class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        Dep.target = this;
        this.oldValue = this.getVMValue(vm, expr);
        Dep.target = null;

    }

    update() {
        let oldValue = this.oldValue;
        let newValue = this.getVMValue(this.vm, this.expr)
        if (oldValue !== newValue) {
            this.cb(newValue, oldValue)
        }
    }


    //获取VM中的数据
    getVMValue(vm, expr) {
        let data = vm.$data;
        expr.split('.').forEach(key => {
            data = data[key]
        })
        return data;
    }
}