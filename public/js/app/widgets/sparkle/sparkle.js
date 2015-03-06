define('sparkle', function(require){
    require('css!sparkle.css');
    //http://bl.ocks.org/d3noob/4433087
    //check how to close fill
    var d3 = require('d3');
    var Ractive = require('ractive');
    var template = require('text!sparkle.html');

    var Sparkle = Ractive.extend({
        template: template,
        append:true,
        logger: console,
        onrender: function(o){
            this.observe('values', function(n, o){
                if(n === undefined && o === undefined) return;
                // var u = this.get('updates');
                // u = u.concat([n]);
                // console.log('UPDATE VALUES', u);
                // this.set('updates', u);
                // this.redraw(n);
            });

            var id = '#graph-1',
                width = 400,
                height = 100,
                interpolation = 'basis',
                animate = true,
                updateDelay = 1000,
                transitionDelay = 280;

            var graph = d3.select(id)
                .append("svg:svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("preserveAspectRatio", "xMidYMid meet");

            var data = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
            this.set('updates', data);

            var x = d3.scale.linear().domain([0, 48]).range([-5, width]);
            var y = d3.scale.linear().domain([0, 100]).range([0, height]);

            var line = d3.svg.line()
                .x(function(d,i) {
                    return x(i);
                })
                .y(function(d) {
                    return y(d);
                })
                .interpolate(interpolation)

            graph.append("svg:path").attr("d", line(data));

            this.x = x;
            this.line = line;
            this.graph = graph;
            this.transitionDelay = transitionDelay;
        },
        redraw: function(value){
            var data = this.get('updates');
            data.shift();
            data.push(value);
            this.graph.selectAll("path")
                    .data([data])
                    .attr("transform", "translate(" + this.x(1) + ")")
                    .attr("d", this.line)
                    .transition()
                    .ease("linear")
                    .duration(this.transitionDelay)
                    .attr("transform", "translate(" + this.x(0) + ")");
        },
        registerModel: function(dispatcher, keypath, options){
            this.set(options);
            // this.logger.log('REGISTER', keypath);
            dispatcher.observe(keypath, function(value){
                if(value === undefined) return;
                this.set('value', value);
                this.redraw(value);
            }.bind(this));
        },
        data:{
            updates: [],
            targetId: 'graph-1',
            width:400,
            height:100,
            interpolation: "basis",
            label: 'Label',
            animate: true

        }

    });

    Sparkle.register = function(id){
        Ractive.components[id] = Sparkle;
    };

    Ractive.components['sparkle'] = Sparkle;

    return Sparkle;
});
