define('helpers/repeat', ['extend'], function(extend) {
    /**
     * template:
     * repeat(20).with({image:default.png, private:true});
     */
    var repeat = function(times) {
        var a = Array.apply(null, new Array(times));
        a.with = function(template){
            return a.map(function(){
                return extend({}, template);
            });
        };
        return a;
    };
    return repeat;
});