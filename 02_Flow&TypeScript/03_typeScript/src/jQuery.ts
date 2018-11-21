(function(w,d){


    class Init {
        length:number = 0;
        constructor(){

        }

        each(callback:(data:number)=>{}){
            for (var i = 0; i < this.length; i++) {
                callback(i)
            }
        }
    }

    
})(window,document)