class Observer {
    constructor(data) {
        this.walk(data);
    }

    walk(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key])
            this.walk(data[key])
        })
    }
    defineReactive(obj, key, value) {
        const self = this;
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newvalue) {
                if (newvalue === value) {
                    return
                }
                value = newvalue;
                dep.notify();
                self.walk(value)
            }
        })
    }
}