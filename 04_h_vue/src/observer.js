class Observer {
    constructor(vm) {
        this.$data = vm.$data;
        this.walk(this.$data)
    }

    walk(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            this.walk(data[key])
        })
    }

    defineReactive(data, key, value) {
        var dep = new Dep();
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log(Dep.target)
                dep.sub(Dep.target)
                return value;
            },
            set(newValue) {
                if (value === newValue) {
                    return
                }
                // console.log(window.watcher)
                value = newValue;
                // window.watcher.update();
                dep.pub();
            },
        })
    }
}