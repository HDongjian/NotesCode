// ;(function(undefined) {
//     "use strict"
//     var _global;

//     function result(args,type){
//         var argsArr = Array.prototype.slice.call(args);
//         if(argsArr.length == 0) return 0;
//         switch(type) {
//             case 1: return argsArr.reduce(function(p,c){return p + c;});
//             case 2: return argsArr.reduce(function(p,c){return p - c;});
//             case 3: return argsArr.reduce(function(p,c){return p * c;});
//             case 4: return argsArr.reduce(function(p,c){return p / c;});
//             case 5: return argsArr.reduce(function(p,c){return p % c;});
//             default: return 0;
//         }
//     }

//     function Calculate(){}
//     Calculate.prototype.add = function(){console.log(result(arguments,1));return this;}
//     Calculate.prototype.sub = function(){console.log(result(arguments,2));return this;}
//     Calculate.prototype.mul = function(){console.log(result(arguments,3));return this;}
//     Calculate.prototype.div = function(){console.log(result(arguments,4));return this;}
//     Calculate.prototype.sur = function(){console.log(result(arguments,5));return this;}


//     // 最后将插件对象暴露给全局对象
//     _global = (function(){ 
//         console.log(this)
//         return this || (0, eval)('this'); 
//     }());
//     console.log(_global)
//     if (typeof module !== "undefined" && module.exports) {
//         module.exports = Calculate;
//     } else if (typeof define === "function" && define.amd) {
//         define(function(){return Calculate;});
//     } else {
//         !('Calculate' in _global) && (_global.Calculate = Calculate);
//     }
// }());

;(function(global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    var
        version = "3.3.1",

        // Define a local copy of jQuery
        jQuery = function(selector, context) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        }

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,
    }



    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }

    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});