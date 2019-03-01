(function (global, undefined) {

    "use strict" 

    function Library() {
        this.author = 'H_dongjian'
    }

    Library.prototype = {
       
       

    }



    var _global,

    library = new Library()

    // 最后将插件对象暴露给全局对象
    _global = (function () { return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = library;
    } else if (typeof define === "function" && define.amd) {
        define(function () { return library; });
    } else {
        _global.library = library;
    }
}())


