class Vue {
    constructor(option = {}) {
        this.$el = option.el;
        this.$data = option.data;
        this.$methods = option.methods;

        if (this.$el) {
            //compile负责解析模板的内容
            let c = new Compile(this.$el, this);
        }
    }
}