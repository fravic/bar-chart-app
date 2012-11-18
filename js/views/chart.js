var app = app || {};

$(function($) {
    'use strict';

    var BAR_HEIGHT = 25;

    app.ChartView = Backbone.View.extend({
        initialize: function(a) {
            var model;

            if (!a["dataModel"]) {
                throw "No data model specified";
            }

            model = a["dataModel"];
            model.on("change:counts", this.countsChanged, this);
        },

        countsChanged: function(model, counts) {
            this.render(model);
        },

        render: function(model) {
            var x, y, h, w, chart, counts, value, label;

            chart = d3.select("#chart");
            w = $("#chart").width();
            h = $("#chart").height();

            counts = model.bucketCounts();
            value = function(d) { return d[1]; }
            label = function(d) { return d[0]; }

            x = d3.scale
                .linear()
                .domain([0, model.maxVal()])
                .range(["0px", w + "px"]);

            chart.selectAll("div.bar")
                .data(counts)
                .enter().append("div")
                .attr("class", "bar")
                .style("width", function(d) {
                    return x(value(d));
                })
                .append("div")
                .attr("class", "label")
                .text(label)

            chart.selectAll("div.bar")
                .data(counts)            
                .insert("div", ".bar")
                .attr("class", "count")
                .text(value);
        }
    });
});
