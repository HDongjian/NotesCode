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
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log('获取了', value)
                return value;
            },
            set(newvalue) {
                if (newvalue === value) {
                    return
                }
                console.log('设置了', newvalue)
                value = newvalue;
                self.walk(value)
            }
        })
    }
}